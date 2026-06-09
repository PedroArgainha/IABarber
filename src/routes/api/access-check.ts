import { createFileRoute } from "@tanstack/react-router";
import { readAccessCookie, verifyAccessToken } from "@/lib/access.server";

export const Route = createFileRoute("/api/access-check")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = readAccessCookie(request.headers.get("cookie"));
        const ok = verifyAccessToken(token);
        return new Response(JSON.stringify({ ok }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
