import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AccessGate } from "@/components/AccessGate";

export const Route = createFileRoute("/app/loading")({
  ssr: false,
  head: () => ({ meta: [{ title: "A criar o teu novo look — 777 HairVision" }, { name: "robots", content: "noindex" }] }),
  component: () => <AccessGate><LoadingPage /></AccessGate>,
});

const MESSAGES = [
  "A analisar o teu rosto...",
  "A adaptar o corte ao teu formato facial...",
  "A gerar uma simulação realista...",
  "A finalizar o resultado...",
];

function LoadingPage() {
  const navigate = useNavigate();
  const [msgIdx, setMsgIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    start();
    async function start() {
      let photo: string | null = null;
      let mime: string | null = null;
      let prompt: string | null = null;
      let name: string | null = null;
      try {
        photo = sessionStorage.getItem("photoBase64");
        mime = sessionStorage.getItem("photoMimeType");
        prompt = sessionStorage.getItem("selectedStylePrompt");
        name = sessionStorage.getItem("selectedStyleName");
      } catch { /* noop */ }
      if (!photo || !mime || !prompt || !name) {
        navigate({ to: "/app", replace: true });
        return;
      }
      try {
        const res = await fetch("/api/hairstyle", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: photo, imageMimeType: mime, stylePrompt: prompt, styleName: name }),
        });
        const data = await res.json();
        if (!res.ok || !data?.predictionId) {
          setError(data?.error ?? "Não foi possível iniciar.");
          return;
        }
        setPredictionId(data.predictionId);
      } catch {
        setError("Erro de ligação. Verifica a tua internet.");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (!predictionId) return;
    let cancelled = false;
    const poll = async () => {
      while (!cancelled) {
        try {
          const r = await fetch(`/api/hairstyle-status?id=${encodeURIComponent(predictionId)}`, { credentials: "include" });
          const d = await r.json();
          if (cancelled) return;
          if (d?.status === "succeeded" && d?.imageUrl) {
            try { sessionStorage.setItem("resultImageUrl", String(d.imageUrl)); } catch {}
            navigate({ to: "/app/result", replace: true });
            return;
          }
          if (d?.status === "failed") {
            setError(d?.error ?? "Não foi possível gerar a simulação.");
            return;
          }
        } catch { /* ignore one tick */ }
        await new Promise(res => setTimeout(res, 3000));
      }
    };
    poll();
    return () => { cancelled = true; };
  }, [predictionId, navigate]);

  if (error) {
    return (
      <div className="min-h-dvh grid place-items-center bg-bg px-6 text-center">
        <div className="max-w-sm fade-up">
          <div className="text-5xl">⚠️</div>
          <h1 className="mt-4 text-2xl text-white">Erro na geração</h1>
          <p className="mt-2 text-text-secondary">{error}</p>
          <div className="mt-6 flex flex-col gap-2">
            <button onClick={() => { setError(null); startedRef.current = false; setPredictionId(null); window.location.reload(); }} className="btn-primary">Tentar novamente</button>
            <Link to="/app/style" className="btn-outline">← Escolher outro corte</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh grid place-items-center bg-bg px-6">
      <div className="text-center max-w-md fade-up">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent" style={{ borderTopColor: "var(--accent)", animation: "spin-slow 1.2s linear infinite" }} />
          <div className="absolute inset-0 grid place-items-center text-2xl">✂️</div>
        </div>
        <h1 className="mt-6 text-2xl md:text-3xl text-white">A criar o teu novo look</h1>
        <p key={msgIdx} className="mt-3 text-text-secondary fade-up" style={{ animation: "fade-in 0.5s ease both" }}>{MESSAGES[msgIdx]}</p>

        <div className="mt-6 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
          <div style={{ background: "var(--accent)", height: "100%", animation: "progress-grow 25s ease-out forwards" }} />
        </div>

        <ul className="mt-8 text-sm text-left space-y-2">
          <li style={{ color: "var(--accent)" }}>Foto recebida ✓</li>
          <li style={{ color: "var(--accent)" }}>Estilo carregado ✓</li>
          <li className="text-white" style={{ animation: "pulse-soft 1.5s ease-in-out infinite" }}>IA a processar...</li>
          <li className="text-text-tertiary">Resultado</li>
        </ul>

        <p className="mt-6 text-xs text-text-tertiary">⏱ Pode demorar até 30–60 segundos</p>
      </div>
    </div>
  );
}
