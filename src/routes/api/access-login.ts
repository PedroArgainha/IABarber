import { createFileRoute } from "@tanstack/react-router";
import { passwordMatches, signAccessToken, buildAccessCookie } from "@/lib/access.server";

export const Route = createFileRoute("/api/access-login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { password?: unknown };
        try { body = await request.json(); } catch { body = {}; }
        const password = typeof body?.password === "string" ? body.password : "";
        if (!password || password.length > 256 || !passwordMatches(password)) {
          return new Response(JSON.stringify({ error: "Chave inválida." }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        const token = signAccessToken();
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Set-Cookie": buildAccessCookie(token) },
        });
      },
    },
  },
});
