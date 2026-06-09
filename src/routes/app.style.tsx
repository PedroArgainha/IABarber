import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AccessGate } from "@/components/AccessGate";
import { AppHeader } from "./app.index";
import { Toast } from "@/components/Toast";
import { HAIRSTYLES, type HairstyleId } from "@/lib/hairstyles";

export const Route = createFileRoute("/app/style")({
  ssr: false,
  head: () => ({ meta: [{ title: "Escolhe o estilo — 777 HairVision" }, { name: "robots", content: "noindex" }] }),
  component: () => <AccessGate><StylePage /></AccessGate>,
});

function StylePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<HairstyleId | null>(null);
  const [popKey, setPopKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(true);

  useEffect(() => {
    try {
      const photo = sessionStorage.getItem("photoBase64");
      if (!photo) { setHasPhoto(false); navigate({ to: "/app", replace: true }); return; }
      const s = sessionStorage.getItem("selectedStyleId");
      if (s) setSelected(s as HairstyleId);
    } catch { /* noop */ }
  }, [navigate]);

  function pick(id: HairstyleId) {
    setSelected(id);
    setPopKey(k => k + 1);
  }

  function next() {
    if (!selected) { setToast("Escolhe um estilo primeiro."); return; }
    const h = HAIRSTYLES.find(x => x.id === selected);
    if (!h) return;
    try {
      sessionStorage.setItem("selectedStyleId", h.id);
      sessionStorage.setItem("selectedStylePrompt", h.prompt);
      sessionStorage.setItem("selectedStyleName", h.name);
    } catch { /* noop */ }
    navigate({ to: "/app/loading" });
  }

  if (!hasPhoto) return null;

  return (
    <div className="min-h-dvh bg-bg">
      <AppHeader current={2} backTo="/app" backLabel="← Voltar" />
      <div className="mx-auto max-w-[680px] px-6 pb-24">
        <div className="fade-up">
          <h1 className="text-3xl md:text-4xl text-white">Escolhe o teu estilo</h1>
          <p className="mt-2 text-text-secondary">Clica no corte que queres experimentar.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {HAIRSTYLES.map(h => {
            const isSel = selected === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => pick(h.id)}
                aria-pressed={isSel}
                className="text-left p-2 rounded-xl transition-all hover:scale-[1.02]"
                style={{
                  background: isSel ? "var(--accent-dim)" : "var(--bg-elevated)",
                  border: isSel ? "2px solid var(--accent)" : "1px solid var(--border)",
                  animation: isSel ? `pop-in 200ms ease ${popKey}` : undefined,
                }}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden" style={{ background: h.gradient }}>
                  <img
                    src={h.imageUrl}
                    alt={h.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  {isSel && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full grid place-items-center text-xs font-bold" style={{ background: "var(--accent)", color: "#0a0a0a" }}>✓</div>
                  )}
                </div>
                <p className="mt-2 font-display font-bold text-[13px] text-white">{h.name}</p>
                <p className="text-[11px] text-text-tertiary">{h.short}</p>
              </button>
            );
          })}
        </div>

        <button onClick={next} disabled={!selected} className="btn-primary mt-8 w-full">Simular com IA →</button>
      </div>
      {toast && <Toast message={toast} kind="error" onClose={() => setToast(null)} />}
    </div>
  );
}
