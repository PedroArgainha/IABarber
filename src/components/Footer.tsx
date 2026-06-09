import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-8 flex flex-col md:flex-row items-center md:justify-between gap-4 text-sm">
        <Logo />
        <nav className="flex items-center gap-6 text-text-secondary">
          <a href="/#como-funciona" className="hover:text-white">Como funciona</a>
          <Link to="/about" className="hover:text-white">Sobre nós</Link>
          <Link to="/app" className="hover:text-white">App</Link>
        </nav>
        <p className="text-text-tertiary">© 2026 · Portugal 🇵🇹</p>
      </div>
    </footer>
  );
}
