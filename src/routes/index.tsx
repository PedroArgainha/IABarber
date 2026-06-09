import { createFileRoute, Link } from "@tanstack/react-router";
import { WebNav } from "@/components/WebNav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HAIRSTYLES } from "@/lib/hairstyles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "777 HairVision — Vê o teu novo corte antes de cortar" },
      { name: "description", content: "Envia uma selfie, escolhe o estilo e a nossa IA mostra-te como ficas em segundos. Sem surpresas na cadeira do barbeiro." },
      { property: "og:title", content: "777 HairVision" },
      { property: "og:description", content: "Simula o teu próximo corte de cabelo com IA. Grátis." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-dvh bg-bg">
      <WebNav />
      <Hero />
      <Stats />
      <HowItWorks />
      <Styles />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="radial-hero pt-[130px] pb-[120px] px-6 md:px-8">
      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12">
        <div className="fade-up">
          <span
            className="inline-block italic text-sm px-3 py-1.5 rounded-full"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
          >
            O teu novo look em segundos · Grátis para testar
          </span>
          <h1 className="mt-6 text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] text-white">
            Vê o teu<br />
            <span style={{ color: "var(--accent)" }} className="text-glow">novo corte</span><br />
            antes de cortar.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] lg:text-[17px] text-text-secondary leading-relaxed">
            Envia uma selfie, escolhe o estilo e a nossa IA mostra-te como ficas — em segundos. Sem surpresas na cadeira do barbeiro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/app" className="btn-primary">Experimentar grátis →</Link>
            <a href="#como-funciona" className="btn-outline">Como funciona</a>
          </div>
        </div>
        <div className="hidden lg:block">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div
      className="mx-auto w-[280px] h-[560px] p-3"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-strong)",
        borderRadius: "40px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 80px rgba(181,245,66,0.05)",
      }}
    >
      <div className="w-full h-full rounded-[32px] p-5 flex flex-col gap-4" style={{ background: "var(--bg)" }}>
        <div className="text-xs text-text-tertiary text-center">9:41</div>
        <div className="text-[11px] eyebrow text-center">Passo 1 de 3</div>
        <div
          className="flex-1 rounded-2xl grid place-items-center text-center px-4"
          style={{ background: "var(--accent-dim)", border: "1.5px dashed var(--accent-border)" }}
        >
          <div>
            <div className="text-3xl">📸</div>
            <p className="mt-2 text-[13px] text-white">Envia a tua foto</p>
            <p className="mt-1 text-[10px] text-text-tertiary">JPG ou PNG · Máx. 10MB</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["taper_fade", "mid_fade", "buzzcut", "corte_social"]
            .map((id) => HAIRSTYLES.find((h) => h.id === id)!)
            .map((h) => (
              <div key={h.id} className="aspect-square rounded-lg overflow-hidden" style={{ background: "#141414" }}>
                <img src={h.imageUrl} alt={h.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
        </div>
        <div className="h-10 rounded-xl grid place-items-center text-[12px] font-display font-bold" style={{ background: "var(--accent)", color: "#0a0a0a" }}>
          Escolher estilo →
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { k: "Rápido", v: "Pré-visualiza o corte em poucos passos" },
    { k: "Simples", v: "Basta uma selfie para começar" },
    { k: "Útil", v: "Vê o look antes de ir ao barbeiro" },
    { k: "Fácil", v: "Testa sem complicações" },
  ];
  return (
    <section className="border-y" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-[1280px] grid grid-cols-2 md:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.k}
            className="px-6 py-8 md:px-8 md:py-10 text-center"
            style={{ borderLeft: i > 0 ? "0.5px solid var(--border)" : "none" }}
          >
            <p className="font-display font-bold text-2xl md:text-3xl" style={{ color: "var(--accent)" }}>{it.k}</p>
            <p className="mt-2 text-xs md:text-sm text-white">{it.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", e: "📸", t: "Envia a tua selfie", d: "Rosto visível, boa iluminação, fundo neutro. Quanto melhor a foto, melhor o resultado." },
    { n: "02", e: "✂️", t: "Escolhe o estilo", d: "10 cortes com prompts de IA otimizados para testares o look antes de cortar." },
    { n: "03", e: "⚡", t: "Vê o resultado", d: "A IA gera o teu novo look em segundos. Compara antes e depois e partilha com os amigos." },
  ];
  return (
    <section id="como-funciona" className="px-6 md:px-8 py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="eyebrow">Como funciona</p>
          <h2 className="mt-3 text-[30px] md:text-[48px] text-white">3 passos. Resultado real.</h2>
          <p className="mt-3 text-text-secondary max-w-xl">Sem complicações. Em menos de um minuto tens o teu novo look.</p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <article className="card-base p-6 relative h-full">
                <span className="absolute top-4 right-5 font-display font-extrabold text-5xl" style={{ color: "#b5f542" }}>{s.n}</span>
                <div className="text-3xl">{s.e}</div>
                <h3 className="mt-4 text-xl text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Styles() {
  return (
    <section className="px-6 md:px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="eyebrow">Estilos disponíveis</p>
          <h2 className="mt-3 text-[30px] md:text-[48px] text-white">Criados pelos melhores.</h2>
          <p className="mt-3 text-text-secondary max-w-xl">10 cortes pensados para qualquer rosto. Escolhe e simula em segundos.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {HAIRSTYLES.map((h, i) => (
            <Reveal key={h.id} delay={i * 40}>
              <Link
                to="/app"
                className="block p-3 rounded-xl group transition-all hover:-translate-y-0.5"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
              >
                <div className="aspect-square rounded-lg relative overflow-hidden" style={{ background: h.gradient }}>
                  <img
                    src={h.imageUrl}
                    alt={h.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-2 text-center">
                    <div>
                      <p className="font-display font-bold text-white text-base">{h.name}</p>
                      <p className="mt-1 text-[10px] text-accent">Clica para experimentar</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 font-display font-bold text-[13px] text-white">{h.name}</p>
                <p className="text-[11px] text-text-tertiary">{h.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Miguel S.", l: "Lisboa", q: "Fui ao barbeiro sem dúvidas pela primeira vez na vida. Incrível o que a IA consegue fazer." },
    { n: "Diogo F.", l: "Porto", q: "Experimentei o mid fade antes de ir ao barbeiro. Ficou muito mais fácil decidir." },
    { n: "Tomás R.", l: "Braga", q: "A minha mulher aprovou o corte antes de eu ir ao barbeiro. Nunca mais houve surpresas." },
  ];
  return (
    <section className="px-6 md:px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="eyebrow">O que dizem</p>
          <h2 className="mt-3 text-[30px] md:text-[48px] text-white">Resultados reais.</h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <Reveal key={t.n} delay={i * 100}>
              <article className="card-base p-6 h-full">
                <p style={{ color: "var(--accent)" }}>★★★★★</p>
                <p className="mt-4 italic text-text-secondary leading-relaxed">"{t.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }} />
                  <div>
                    <p className="font-display font-bold text-[13px] text-white">{t.n}</p>
                    <p className="text-[11px] text-text-tertiary">{t.l}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 md:px-8 py-24">
      <div className="mx-auto max-w-[1080px]">
        <Reveal>
          <div
            className="radial-cta rounded-2xl p-10 md:p-14 text-center"
            style={{ border: "0.5px solid var(--accent-border)" }}
          >
            <h2 className="text-[28px] md:text-[48px] text-white">Pronto para experimentar?</h2>
            <p className="mt-3 text-text-secondary">Sem registo. Sem cartão. Grátis agora.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/app" className="btn-primary">Experimentar grátis →</Link>
              <Link to="/about" className="btn-outline">Conhece a equipa</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
