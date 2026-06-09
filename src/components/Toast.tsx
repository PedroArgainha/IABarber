import { useEffect } from "react";

export function Toast({ message, kind = "info", onClose }: { message: string; kind?: "info" | "error" | "success"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const color = kind === "error" ? "#ff6b6b" : kind === "success" ? "var(--accent)" : "white";
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-4 py-3 rounded-xl text-sm fade-up"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${kind === "error" ? "rgba(255,107,107,0.4)" : "var(--accent-border)"}`,
        color,
      }}
    >
      {message}
    </div>
  );
}
