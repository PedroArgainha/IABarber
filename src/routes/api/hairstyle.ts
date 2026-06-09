import { createFileRoute } from "@tanstack/react-router";
import { readAccessCookie, verifyAccessToken } from "@/lib/access.server";
import { buildFullPrompt } from "@/lib/hairstyles";
import { getClientIp, rateLimit } from "@/lib/rate-limit.server";

const ALLOWED_MIME = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

export const Route = createFileRoute("/api/hairstyle")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!verifyAccessToken(readAccessCookie(request.headers.get("cookie")))) {
          return json({ error: "Sem acesso." }, 401);
        }

        const ip = getClientIp(request.headers);
        const rl = rateLimit(`gen:${ip}`, 5, 60 * 60 * 1000);
        if (!rl.ok) {
          return new Response(
            JSON.stringify({ error: "Demasiados pedidos. Tenta novamente mais tarde." }),
            { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(rl.retryAfter) } },
          );
        }


        let body: { imageBase64?: unknown; imageMimeType?: unknown; stylePrompt?: unknown; styleName?: unknown };
        try { body = await request.json(); } catch { return json({ error: "Pedido inválido." }, 400); }

        const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64 : "";
        const imageMimeType = typeof body.imageMimeType === "string" ? body.imageMimeType : "";
        const stylePrompt = typeof body.stylePrompt === "string" ? body.stylePrompt : "";
        const styleName = typeof body.styleName === "string" ? body.styleName : "";

        if (!imageBase64 || imageBase64.length < 100 || imageBase64.length > 15_000_000) return json({ error: "Foto inválida." }, 400);
        if (!ALLOWED_MIME.has(imageMimeType)) return json({ error: "Formato de imagem não suportado." }, 400);
        if (!/^[A-Za-z0-9+/=\s]+$/.test(imageBase64)) return json({ error: "Foto inválida." }, 400);
        if (!stylePrompt || stylePrompt.length > 2000) return json({ error: "Estilo inválido." }, 400);
        if (!styleName || styleName.length > 100) return json({ error: "Estilo inválido." }, 400);

        const token = process.env.REPLICATE_API_TOKEN;
        if (!token) {
          console.error("REPLICATE_API_TOKEN missing");
          return json({ error: "Serviço temporariamente indisponível." }, 503);
        }

        const fullPrompt = buildFullPrompt(styleName, stylePrompt);
        const dataUrl = `data:${imageMimeType};base64,${imageBase64.replace(/\s/g, "")}`;

        try {
          const res = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-max/predictions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              input: {
                prompt: fullPrompt,
                input_image: dataUrl,
                aspect_ratio: "match_input_image",
                output_format: "jpg",
                safety_tolerance: 2,
              },
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            console.error("Replicate error", res.status, data);
            return json({ error: "Não foi possível iniciar a geração." }, 502);
          }
          return json({ ok: true, predictionId: data.id, status: data.status });
        } catch (err) {
          console.error("Replicate fetch failed", err);
          return json({ error: "Não foi possível contactar o serviço." }, 502);
        }
      },
    },
  },
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
