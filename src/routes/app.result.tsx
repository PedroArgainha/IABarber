import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AccessGate } from "@/components/AccessGate";
import { Stepper } from "@/components/Stepper";
import { Toast } from "@/components/Toast";

export const Route = createFileRoute("/app/result")({
  ssr: false,
  head: () => ({ meta: [{ title: "O teu novo visual — 777 HairVision" }, { name: "robots", content: "noindex" }] }),
  component: () => <AccessGate><ResultPage /></AccessGate>,
});

function ResultPage() {
  const navigate = useNavigate();
  const [before, setBefore] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [styleName, setStyleName] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const b = sessionStorage.getItem("photoBase64");
      const m = sessionStorage.getItem("photoMimeType");
      const r = sessionStorage.getItem("resultImageUrl");
      const n = sessionStorage.getItem("selectedStyleName") ?? "";
      if (!r || !b || !m) { navigate({ to: "/app", replace: true }); return; }
      setBefore(`data:${m};base64,${b}`);
      setAfter(r);
      setStyleName(n);
    } catch { navigate({ to: "/app", replace: true }); }
  }, [navigate]);

  async function share() {
    if (!after) return;
    const url = after;
    const text = `O meu novo look com 777 HairVision: ${styleName}`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try { await (navigator as any).share({ title: "777 HairVision", text, url }); return; } catch { /* ignore */ }
    }
    try {
      await navigator.clipboard.writeText(`${text} — ${url}`);
      setToast("Link copiado para a área de transferência.");
    } catch { setToast("Não foi possível partilhar."); }
  }

  if (!before || !after) return null;

  return (
    <div className="min-h-dvh bg-bg">
      <header className="px-6 pt-6 pb-4">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between gap-3">
          <Link to="/" className="text-sm text-text-secondary hover:text-white">× Fechar</Link>
          <Stepper current={3} />
          <span className="text-sm text-text-tertiary">3 de 3</span>
        </div>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-24">
        <div className="text-center fade-up">
          <span className="inline-block text-xs px-3 py-1 rounded-full" style={{ background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>✓ Pronto!</span>
          <h1 className="mt-4 text-3xl md:text-4xl text-white">O teu novo visual</h1>
          <p className="mt-2 text-text-secondary">Estilo: <span style={{ color: "var(--accent)" }}>{styleName}</span></p>
        </div>

        <div className="mt-8">
          <BeforeAfter before={before} after={after} />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={share} className="btn-primary w-full">↗ Partilhar resultado</button>
          <a href={after} target="_blank" rel="noreferrer" className="btn-outline w-full">Guardar imagem</a>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/app/style" className="btn-outline">Outro estilo</Link>
            <Link to="/app" className="btn-outline">Nova foto</Link>
          </div>
        </div>

        <div className="mt-8 card-base p-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--accent-border)" }}>
          <div>
            <p className="font-display font-bold text-white">Queres HD + sem marcas?</p>
            <p className="text-xs text-text-tertiary mt-1">10 imagens por apenas 2€</p>
          </div>
          <button className="btn-primary !text-sm !py-2.5 !px-4">Ver planos</button>
        </div>
        <p className="mt-3 text-center text-xs text-text-tertiary">Ou ver anúncio para desbloquear grátis</p>

        <div className="mt-10 text-center">
          <p className="text-sm text-text-secondary">Gostas do resultado?</p>
          <div className="mt-2 flex justify-center gap-1" role="radiogroup" aria-label="Avaliação">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} estrelas`}
                onClick={() => setRating(n)}
                className="text-2xl transition-transform hover:scale-110"
                style={{ color: rating >= n ? "var(--accent)" : "rgba(255,255,255,0.2)" }}
              >★</button>
            ))}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} kind="success" onClose={() => setToast(null)} />}
    </div>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function setFromClient(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      setFromClient(x);
    }
    function onUp() { dragging.current = false; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setPos(p => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos(p => Math.min(100, p + 4));
  }

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl select-none"
      style={{ height: "min(60vw, 340px)", background: "var(--bg-card)", border: "1px solid var(--border-strong)" }}
    >
      <img src={before} alt="Antes" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <span className="absolute bottom-3 left-3 text-[11px] px-2 py-1 rounded-md" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>ANTES</span>
      <span className="absolute bottom-3 right-3 text-[11px] px-2 py-1 rounded-md" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>DEPOIS</span>
      <div className="absolute top-0 bottom-0" style={{ left: `${pos}%`, width: 2, background: "white", transform: "translateX(-1px)" }} />
      <button
        type="button"
        aria-label="Arrasta para comparar antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        role="slider"
        onKeyDown={onKey}
        onMouseDown={(e) => { dragging.current = true; setFromClient(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; setFromClient(e.touches[0].clientX); }}
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center text-sm font-bold cursor-ew-resize"
        style={{ left: `${pos}%`, transform: "translate(-50%, -50%)", background: "white", color: "#0a0a0a", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
      >
        ⇆
      </button>
    </div>
  );
}
