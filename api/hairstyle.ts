export const config = {
  api: {
    bodyParser: {
      sizeLimit: "12mb",
    },
  },
};

const REPLICATE_API_BASE = "https://api.replicate.com/v1";
const DEFAULT_MODEL = process.env.REPLICATE_MODEL || "black-forest-labs/flux-kontext-max";

function withCors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function buildPrompt(styleName: string, basePrompt: string) {
  return [
    `Create a photorealistic hairstyle simulation for a men's portrait photo using the selected haircut: ${styleName}.`,
    "Preserve the person's identity, face shape, skin tone, facial features, expression, pose, clothing, and background.",
    "Only change the hairstyle and hair volume. Do not change the face.",
    "The result must look realistic, natural, high-quality, and suitable as a barber preview.",
    "Keep correct anatomy, consistent lighting, natural hair texture, realistic shadows, and clean haircut lines.",
    "Do not add hats, accessories, extra people, extra text, logos, or watermark.",
    basePrompt,
  ].join(" ");
}

function getCreatePredictionRequest(modelRef: string, input: Record<string, unknown>) {
  const cleanModelRef = modelRef.trim();

  // Modelos oficiais: owner/model -> /models/owner/model/predictions
  if (cleanModelRef.includes("/") && !cleanModelRef.includes(":")) {
    return {
      url: `${REPLICATE_API_BASE}/models/${cleanModelRef}/predictions`,
      body: { input },
    };
  }

  // Fallback para versões específicas: owner/model:version ou version
  const version = cleanModelRef.includes(":")
    ? cleanModelRef.split(":").slice(1).join(":")
    : cleanModelRef;

  return {
    url: `${REPLICATE_API_BASE}/predictions`,
    body: { version, input },
  };
}

export default async function handler(req: any, res: any) {
  withCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    return res.status(500).json({
      error: "REPLICATE_API_TOKEN não está definido no servidor.",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const imageBase64 = body?.imageBase64;
    const imageMimeType = body?.imageMimeType || "image/jpeg";
    const styleName = body?.styleName || "hairstyle";
    const stylePrompt = body?.stylePrompt || "";

    if (!imageBase64 || !stylePrompt) {
      return res.status(400).json({ error: "Faltam dados obrigatórios para gerar a imagem." });
    }

    const prompt = buildPrompt(styleName, stylePrompt);
    const imageDataUrl = `data:${imageMimeType};base64,${imageBase64}`;

    const input = {
      prompt,
      input_image: imageDataUrl,
      aspect_ratio: "match_input_image",
      output_format: "jpg",
      safety_tolerance: 2,
    };

    const request = getCreatePredictionRequest(DEFAULT_MODEL, input);

    const response = await fetch(request.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Prefer: "wait=1",
      },
      body: JSON.stringify(request.body),
    });

    const rawText = await response.text();
    let data: any = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = { rawText };
    }

    if (!response.ok) {
      const message = data?.detail || data?.error || data?.title || rawText || "Erro ao criar prediction na Replicate.";
      throw new Error(message);
    }

    return res.status(200).json({
      ok: true,
      predictionId: data.id,
      status: data.status,
    });
  } catch (error: any) {
    console.error("[api/hairstyle]", error);
    return res.status(500).json({
      error: error?.message || "Falha ao iniciar a simulação do corte.",
    });
  }
}
