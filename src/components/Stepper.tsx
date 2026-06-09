import { useNavigate } from "@tanstack/react-router";

const STEPS = [
  { n: 1, path: "/app" as const, label: "Foto" },
  { n: 2, path: "/app/style" as const, label: "Estilo" },
  { n: 3, path: "/app/result" as const, label: "Resultado" },
];

export function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2" role="navigation" aria-label="Passos da app">
      {STEPS.map((s, idx) => {
        const completed = current > s.n;
        const active = current === s.n;
        const clickable = completed;
        return (
          <div key={s.n} className="flex items-center gap-2">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && navigate({ to: s.path })}
              aria-label={`Passo ${s.n}: ${s.label}${active ? " (atual)" : completed ? " (concluído)" : ""}`}
              aria-current={active ? "step" : undefined}
              className="w-8 h-8 rounded-full grid place-items-center text-xs font-display font-bold transition-all"
              style={{
                background: active ? "var(--accent)" : completed ? "rgba(181,245,66,0.4)" : "var(--bg-elevated)",
                color: active ? "#0a0a0a" : completed ? "#0a0a0a" : "var(--text-tertiary)",
                border: completed ? "1px solid var(--accent-border)" : "1px solid var(--border)",
                cursor: clickable ? "pointer" : "default",
              }}
            >
              {completed ? "✓" : s.n}
            </button>
            {idx < STEPS.length - 1 && (
              <div
                className="w-8 sm:w-12 h-0.5 rounded-full"
                style={{ background: current > s.n ? "var(--accent-border)" : "var(--border)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
