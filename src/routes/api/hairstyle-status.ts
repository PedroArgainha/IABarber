import { createFileRoute } from "@tanstack/react-router";
import { readAccessCookie, verifyAccessToken } from "@/lib/access.server";
import { getClientIp, rateLimit } from "@/lib/rate-limit.server";

export const Route = createFileRoute("/api/hairstyle-status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!verifyAccessToken(readAccessCookie(request.headers.get("cookie")))) {
          return json({ error: "Sem acesso." }, 401);
        }
        const ip = getClientIp(request.headers);
        const rl = rateLimit(`status:${ip}`, 120, 60 * 1000);
        if (!rl.ok) {
          return new Response(
            JSON.stringify({ error: "Demasiados pedidos." }),
            { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(rl.retryAfter) } },
          );
        }

        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if (!id || !/^[A-Za-z0-9_-]{6,80}$/.test(id)) return json({ error: "Id inválido." }, 400);

        const token = process.env.REPLICATE_API_TOKEN;
        if (!token) return json({ error: "Serviço indisponível." }, 503);

        try {
          const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (!res.ok) {
            console.error("Replicate status error", res.status, data);
            return json({ error: "Não foi possível obter o estado." }, 502);
          }
          if (data.status === "succeeded") {
            const output = Array.isArray(data.output) ? data.output[0] : data.output;
            return json({ ok: true, status: "succeeded", imageUrl: output });
          }
          if (data.status === "failed" || data.status === "canceled") {
            console.error("Replicate prediction failed", data.error);
            return json({ ok: false, status: "failed", error: "Não foi possível gerar a simulação." });
          }
          return json({ ok: true, status: data.status });
        } catch (err) {
          console.error("status fetch failed", err);
          return json({ error: "Erro de rede." }, 502);
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
