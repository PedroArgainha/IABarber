import { createAccessToken, setAccessCookie } from "./_access";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const expectedPassword = process.env.ACCESS_PASSWORD;

  if (!expectedPassword) {
    return res.status(500).json({
      error: "ACCESS_PASSWORD não está definida no servidor.",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const password = String(body?.password || "");

    if (password !== expectedPassword) {
      return res.status(401).json({
        error: "Chave de acesso inválida.",
      });
    }

    const token = createAccessToken();
    setAccessCookie(res, token);

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(400).json({ error: "Pedido inválido." });
  }
}
