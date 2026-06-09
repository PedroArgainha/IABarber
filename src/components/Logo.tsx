import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-display font-extrabold text-[20px] tracking-tight ${className}`} aria-label="777 HairVision — início">
      <span style={{ color: "var(--accent)" }}>777</span> HairVision
    </Link>
  );
}
