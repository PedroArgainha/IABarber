import { createFileRoute, Link } from "@tanstack/react-router";
import { WebNav } from "@/components/WebNav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre nós — 777 HairVision" },
      { name: "description", content: "Conhece a equipa por trás do 777 HairVision. Orgulhosamente português." },
      { property: "og:title", content: "Sobre nós — 777 HairVision" },
      { property: "og:description", content: "Conhece a equipa por trás do 777 HairVision." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <WebNav />
      <section className="pt-[130px] pb-16 px-6 md:px-8 radial-hero">
        <div className="mx-auto max-w-[1280px] text-center">
          <p className="eyebrow">Sobre nós</p>
          <h1 className="mt-3 text-[36px] md:text-[56px] text-white">A equipa por trás do espelho.</h1>
          <p className="mt-4 max-w-xl mx-auto text-text-secondary">
            Pequena equipa portuguesa a usar IA para tirar a incerteza da próxima ida ao barbeiro.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-12">
        <Reveal>
          <article className="mx-auto max-w-[560px] card-base p-8 text-center">
            <div className="mx-auto w-24 h-24 rounded-full grid place-items-center text-4xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}>👤</div>
            <span className="mt-4 inline-block text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>Founder & CEO</span>
            <h2 className="mt-3 text-3xl text-white">Gustavo Correia</h2>
            <p className="mt-1 text-text-secondary text-sm">777 HairVision · Fundador</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Empreendedor", "Barbearia", "Visão"].map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>{t}</span>
              ))}
            </div>
          </article>
        </Reveal>
      </section>

      <section className="px-6 md:px-8 py-12">
        <div className="mx-auto max-w-[720px] grid md:grid-cols-2 gap-4">
          {[
            { n: "Tomás Melo", bio: "Responsável pelo desenvolvimento da interface web, focando-se na experiência do utilizador, estrutura visual e integração da plataforma." },
            { n: "Pedro Argainha", bio: "Responsável pela implementação técnica da aplicação web, garantindo desempenho, organização do código e uma navegação fluida." },
          ].map((d, i) => (
            <Reveal key={d.n} delay={i * 100}>
              <article className="card-base p-6 text-center h-full">
                <div className="mx-auto w-16 h-16 rounded-full grid place-items-center text-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}>👤</div>
                <span className="mt-3 inline-block text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>Web Dev</span>
                <h3 className="mt-2 text-lg text-white">{d.n}</h3>
                <p className="mt-1 text-sm text-text-secondary">Developer</p>
                <p className="mt-3 text-xs text-text-tertiary leading-relaxed">{d.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 py-16">
        <div className="mx-auto max-w-[1080px]">
          <Reveal><p className="eyebrow text-center">Os nossos valores</p><h2 className="mt-3 text-[28px] md:text-[40px] text-white text-center">O que nos move.</h2></Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              { e: "🎯", t: "Foco no utilizador", d: "Cada decisão começa em quem vai usar a app." },
              { e: "⚡", t: "Velocidade com qualidade", d: "Resultados rápidos sem cortar onde importa." },
              { e: "🇵🇹", t: "Orgulhosamente português", d: "Feito em Portugal, para barbearias portuguesas." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <article className="card-base p-6 h-full">
                  <div className="text-3xl">{v.e}</div>
                  <h3 className="mt-4 text-lg text-white">{v.t}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{v.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16">
        <div className="mx-auto max-w-[720px]">
          <Reveal><p className="eyebrow">A nossa história</p></Reveal>
          <div className="mt-8 pl-6 flex flex-col gap-8" style={{ borderLeft: "2px solid var(--accent-border)" }}>
            {[
              { t: "O problema", d: "Muita gente chega ao barbeiro sem conseguir explicar exatamente o que quer — e sai com algo diferente do que imaginava." },
              { t: "A ideia", d: "Usar tecnologia para mostrar o corte antes da tesoura tocar no cabelo, tornando a decisão mais simples e visual." },
              { t: "O resultado", d: "Mais clareza, mais confiança e uma experiência muito mais tranquila antes de cada corte." },
            ].map((h, i) => (
              <Reveal key={h.t} delay={i * 100}>
                <div>
                  <h3 className="text-xl text-white">{h.t}</h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">{h.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16">
        <div className="mx-auto max-w-[720px] grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "𝕏", label: "Twitter", handle: "@777hairvision" },
            { icon: "in", label: "LinkedIn", handle: "Gustavo Correia" },
            { icon: "@", label: "Instagram", handle: "@777gustavocorrei.l" },
          ].map(s => (
            <a key={s.label} href="#" className="card-base p-4 flex items-center gap-3" aria-label={`${s.label}: ${s.handle}`}>
              <div className="w-10 h-10 rounded-lg grid place-items-center font-display font-bold" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>{s.icon}</div>
              <div>
                <p className="text-xs text-text-tertiary">{s.label}</p>
                <p className="text-sm text-white">{s.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 text-center">
        <Link to="/app" className="btn-primary">Experimentar grátis →</Link>
      </section>

      <Footer />
    </div>
  );
}
