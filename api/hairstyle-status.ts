export const config = {
  api: {
    bodyParser: false,
  },
};

const REPLICATE_API_BASE = "https://api.replicate.com/v1";

function withCors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function extractOutputUrl(prediction: any) {
  const { output } = prediction || {};

  if (typeof output === "string") return output;
  if (Array.isArray(output) && typeof output[0] === "string") return output[0];
  if (Array.isArray(output) && output[0]?.url) return output[0].url;
  if (output?.url) return output.url;

  return null;
}

async function outputFileToDataUrl(apiToken: string, outputUrl: string) {
  const response = await fetch(outputUrl, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });

  if (!response.ok) {
    throw new Error("A imagem final foi gerada, mas não foi possível descarregá-la do servidor da IA.");
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const arrayBuffer = await response.arrayBuffer();
  const BufferCtor = (globalThis as any).Buffer;

  if (!BufferCtor) {
    throw new Error("Buffer não está disponível neste ambiente de execução.");
  }

  const base64 = BufferCtor.from(arrayBuffer).toString("base64");
  return `data:${contentType};base64,${base64}`;
}

export default async function handler(req: any, res: any) {
  withCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    return res.status(500).json({
      error: "REPLICATE_API_TOKEN não está definido no servidor.",
    });
  }

  try {
    const predictionId = req.query?.id;

    if (!predictionId || typeof predictionId !== "string") {
      return res.status(400).json({ error: "Falta o id da prediction." });
    }

    const response = await fetch(`${REPLICATE_API_BASE}/predictions/${predictionId}`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    const rawText = await response.text();
    let prediction: any = null;

    try {
      prediction = rawText ? JSON.parse(rawText) : null;
    } catch {
      prediction = { rawText };
    }

    if (!response.ok) {
      const message = prediction?.detail || prediction?.error || rawText || "Erro ao consultar prediction.";
      throw new Error(message);
    }

    if (["starting", "processing", "queued"].includes(prediction.status)) {
      return res.status(200).json({
        ok: true,
        status: prediction.status,
      });
    }

    if (prediction.status !== "succeeded") {
      throw new Error(prediction?.error || "A geração não terminou com sucesso.");
    }

    const outputUrl = extractOutputUrl(prediction);

    if (!outputUrl) {
      throw new Error("A Replicate respondeu sem URL de imagem final.");
    }

    const imageUrl = await outputFileToDataUrl(apiToken, outputUrl);

    return res.status(200).json({
      ok: true,
      status: prediction.status,
      imageUrl,
      predictionId: prediction.id,
    });
  } catch (error: any) {
    console.error("[api/hairstyle-status]", error);
    return res.status(500).json({
      error: error?.message || "Falha ao consultar a simulação do corte.",
    });
  }
}
