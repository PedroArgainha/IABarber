import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "./Logo";

type State = "loading" | "gated" | "ok";

export function AccessGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    try {
      const res = await fetch("/api/access-check", { credentials: "include" });
      const data = await res.json();
      setState(data?.ok ? "ok" : "gated");
    } catch {
      setState("gated");
    }
  }

  useEffect(() => { check(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/access-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      let data: { ok?: boolean; error?: string } = {};
      try { data = await res.json(); } catch {}
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? `Erro ${res.status}. Tenta novamente.`);
        return;
      }
      setPassword("");
      // Re-check session; if the cookie didn't stick, surface a clear error
      const check2 = await fetch("/api/access-check", { credentials: "include" });
      const checkData = await check2.json().catch(() => ({}));
      if (checkData?.ok) {
        setState("ok");
      } else {
        setError("Sessão não foi guardada. Verifica se os cookies estão activos no teu browser.");
      }
    } catch (err) {
      setError(`Erro de ligação: ${err instanceof Error ? err.message : "desconhecido"}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (state === "loading") {
    return (
      <div className="min-h-dvh grid place-items-center bg-bg">
        <div className="w-10 h-10 rounded-full border-2 border-transparent" style={{ borderTopColor: "var(--accent)", animation: "spin-slow 0.8s linear infinite" }} aria-label="A carregar" />
      </div>
    );
  }

  if (state === "gated") {
    return (
      <div className="min-h-dvh grid place-items-center bg-bg px-6">
        <div className="w-full max-w-sm card-base p-8 text-center fade-up">
          <div className="mb-6"><Logo /></div>
          <h1 className="text-2xl text-white">Acesso reservado</h1>
          <p className="mt-2 text-text-secondary text-sm">Introduz a chave de acesso fornecida para testar a aplicação.</p>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
            <label htmlFor="access-password" className="sr-only">Chave de acesso</label>
            <input
              id="access-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Chave de acesso"
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)", color: "white" }}
              required
              maxLength={256}
            />
            {error && <p className="text-xs" style={{ color: "#ff6b6b" }}>{error}</p>}
            <button type="submit" disabled={submitting || !password} className="btn-primary">
              {submitting ? "A entrar..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
