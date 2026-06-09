import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AccessGate } from "@/components/AccessGate";
import { Stepper } from "@/components/Stepper";
import { Toast } from "@/components/Toast";

export const Route = createFileRoute("/app/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Envia a tua foto — 777 HairVision" }, { name: "robots", content: "noindex" }] }),
  component: UploadPage,
});

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function UploadPage() {
  return (
    <AccessGate>
      <Upload />
    </AccessGate>
  );
}

function Upload() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<{ base64: string; mime: string } | null>(null);
  const [drag, setDrag] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: "error" | "info" | "success" } | null>(null);
  const fileGallery = useRef<HTMLInputElement>(null);
  const fileCamera = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const b = sessionStorage.getItem("photoBase64");
      const m = sessionStorage.getItem("photoMimeType");
      if (b && m) setPhoto({ base64: b, mime: m });
    } catch { /* noop */ }
  }, []);

  function handleFile(f: File | null | undefined) {
    if (!f) return;
    if (!ALLOWED.includes(f.type)) {
      setToast({ msg: "Formato não suportado. Usa JPG, PNG ou WEBP.", kind: "error" });
      return;
    }
    if (f.size > MAX_BYTES) {
      setToast({ msg: "Imagem demasiado grande (máx. 10MB).", kind: "error" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      const base64 = dataUrl.split(",")[1] ?? "";
      try {
        sessionStorage.setItem("photoBase64", base64);
        sessionStorage.setItem("photoMimeType", f.type);
      } catch { /* noop */ }
      setPhoto({ base64, mime: f.type });
      setToast({ msg: "Foto carregada.", kind: "success" });
    };
    reader.readAsDataURL(f);
  }

  useEffect(() => {
    function onDragOver(e: DragEvent) { e.preventDefault(); setDrag(true); }
    function onDragLeave(e: DragEvent) { if (e.target === document.body) setDrag(false); }
    function onDrop(e: DragEvent) {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer?.files?.[0];
      handleFile(f);
    }
    function onPaste(e: ClipboardEvent) {
      const item = Array.from(e.clipboardData?.items ?? []).find(i => i.type.startsWith("image/"));
      if (item) handleFile(item.getAsFile());
    }
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
      window.removeEventListener("paste", onPaste);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-bg">
      <AppHeader current={1} backTo="/" backLabel="← Sair" />
      <div className="mx-auto max-w-[560px] px-6 pb-24">
        <div className="fade-up">
          <h1 className="text-3xl md:text-4xl text-white">A tua selfie</h1>
          <p className="mt-2 text-text-secondary">Para um resultado realista, usa uma foto com boa qualidade.</p>
        </div>

        {!photo ? (
          <div
            className="mt-8 p-8 text-center rounded-2xl transition-all"
            style={{
              background: drag ? "rgba(181,245,66,0.18)" : "var(--accent-dim)",
              border: `1.5px dashed ${drag ? "var(--accent)" : "var(--accent-border)"}`,
            }}
          >
            <div className="mx-auto w-16 h-16 rounded-full grid place-items-center text-2xl" style={{ background: "var(--accent-dim)" }}>📸</div>
            <h2 className="mt-4 text-xl text-white">Envia a tua foto</h2>
            <p className="mt-1 text-xs text-text-tertiary">JPG, PNG ou WEBP · Máx. 10MB · arrasta ou cola (Ctrl+V)</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => fileGallery.current?.click()} className="btn-outline">🖼️ Galeria</button>
              <button type="button" onClick={() => fileCamera.current?.click()} className="btn-primary">📷 Câmara</button>
            </div>
            <input ref={fileGallery} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            <input ref={fileCamera} type="file" accept="image/*" capture="user" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
          </div>
        ) : (
          <div className="mt-8">
            <img
              src={`data:${photo.mime};base64,${photo.base64}`}
              alt="Selfie carregada"
              className="w-full h-[380px] object-cover rounded-2xl"
              style={{ border: "1px solid var(--border-strong)" }}
            />
            <button onClick={() => { setPhoto(null); try { sessionStorage.removeItem("photoBase64"); sessionStorage.removeItem("photoMimeType"); } catch {} }} className="btn-outline mt-3 w-full">Trocar foto</button>
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[{ e: "☀️", t: "Boa luz" }, { e: "👤", t: "Rosto visível" }, { e: "🔳", t: "Fundo neutro" }].map(t => (
            <div key={t.t} className="card-base p-3 text-center text-xs">
              <div className="text-lg">{t.e}</div>
              <p className="mt-1 text-text-secondary">{t.t}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-text-tertiary">🔒 A tua foto não é guardada nos nossos servidores.</p>

        <button
          disabled={!photo}
          onClick={() => navigate({ to: "/app/style" })}
          className="btn-primary mt-6 w-full"
        >
          Escolher estilo →
        </button>
      </div>
      {toast && <Toast message={toast.msg} kind={toast.kind} onClose={() => setToast(null)} />}
    </div>
  );
}

export function AppHeader({ current, backTo, backLabel = "← Voltar" }: { current: 1 | 2 | 3; backTo: "/" | "/app" | "/app/style"; backLabel?: string }) {
  return (
    <header className="px-6 pt-6 pb-4">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between gap-3">
        <Link to={backTo} className="text-sm text-text-secondary hover:text-white">{backLabel}</Link>
        <Stepper current={current} />
        <span className="text-sm text-text-tertiary">{current} de 3</span>
      </div>
    </header>
  );
}
