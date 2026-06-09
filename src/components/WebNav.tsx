import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function WebNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-200"
      style={{
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.75)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#como-funciona" className="text-text-secondary hover:text-white text-sm transition-colors">Como funciona</a>
          <Link to="/about" className="text-text-secondary hover:text-white text-sm transition-colors" activeProps={{ style: { color: "white" } }}>Sobre nós</Link>
          <Link to="/app" className="btn-primary !text-sm !py-2.5 !px-4">Experimentar grátis</Link>
        </nav>
        <button
          className="md:hidden p-2 -mr-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t" style={{ borderColor: "var(--border)", animation: "slide-down 0.2s ease-out" }}>
          <div className="px-6 py-4 flex flex-col gap-3 bg-bg">
            <a href="/#como-funciona" onClick={() => setOpen(false)} className="text-text-secondary hover:text-white py-2">Como funciona</a>
            <Link to="/about" onClick={() => setOpen(false)} className="text-text-secondary hover:text-white py-2">Sobre nós</Link>
            <Link to="/app" onClick={() => setOpen(false)} className="btn-primary w-full">Experimentar grátis</Link>
          </div>
        </div>
      )}
    </header>
  );
}
