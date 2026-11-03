import React, { useRef } from 'react';
import SliceButton from '../components/SliceButton';
import Magnetic from '../components/Magnetic';
import HeroBackdrop from '../components/three/HeroBackdrop';
import { Spotlight } from '../components/aceternity/spotlight';
import { FlipWords } from '../components/aceternity/flip-words';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { splitReveal } from '../lib/splitReveal';
import { heroState, scrollToTarget } from '../lib/scroll';
import { useGsapContext } from '../hooks/useGsapContext';

// ============================================================
// SECTION 1 — HERO  — dominant, intentional, memorable
//
// Camadas:  3D (R3F)  →  Spotlight (Aceternity)  →  conteúdo
// Animação: entrada orquestrada com GSAP (uma só vez), depois
//           o scroll "desmonta" o logótipo 3D e desvanece o texto.
// ============================================================

const WORDS = ['designer', 'developer', 'estratega'];

const STATS = [
  { n: 3, suffix: '+', l: 'Anos activo' },
  { n: 20, suffix: '+', l: 'Projectos' },
  { n: 100, suffix: '%', l: 'No resultado' },
];

const Hero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGsapContext(
    root,
    () => {
      const q = gsap.utils.selector(root);

      // ── Entrada orquestrada ────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(q('[data-hero="eyebrow"]'), { y: 16, opacity: 0, duration: 0.7 }, 0.05)
        .from(q('[data-hero="line"]'), { yPercent: 115, duration: 1.05, ease: 'power4.out' }, 0.15)
        .add(() => {
          // depois da entrada, deixa a troca de palavras sair da "janela"
          gsap.set(q('[data-hero="mask"]'), { overflow: 'visible' });
        }, '>')
        .from(q('[data-hero="cta"]'), { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.75)
        .from(q('[data-hero="stat"]'), { y: 14, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.95)
        .from(q('[data-hero="cue"]'), { opacity: 0, duration: 0.8 }, 1.3);

      const subSplit = splitReveal(q('[data-hero="sub"]')[0], { delay: 0.45, duration: 0.95 });
      const leadSplit = splitReveal(q('[data-hero="lead"]')[0], { delay: 0.6, duration: 0.9, stagger: 0.07 });

      // ── Contadores ─────────────────────────────────────────
      q('[data-count]').forEach((el) => {
        const target = Number(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') ?? '';
        const o = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(o, {
          v: target,
          duration: 1.8,
          delay: 1.05,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(o.v)}${suffix}`;
          },
        });
      });

      // ── Scroll: texto sobe e desvanece; 3D lê o progresso ──
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroState.scroll = self.progress;
        },
      });
      gsap.to(content.current, {
        yPercent: -10,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
      });

      return () => {
        st.kill();
        subSplit.revert();
        leadSplit.revert();
        heroState.scroll = 0;
      };
    },
    []
  );

  return (
    <section
      ref={root}
      id="hero"
      className="relative min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center overflow-x-hidden pt-24 md:pt-28"
      style={{ background: '#081225' }}
      aria-label="Apresentação"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" aria-hidden="true" />

      {/* Strong central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 65%, rgba(59,130,246,0.13) 0%, transparent 68%)',
        }}
      />

      {/* 3D — React Three Fiber (só desktop, carregado sob demanda) */}
      <HeroBackdrop />

      {/* Aceternity Spotlight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-48" fill="#60A5FA" />
      </div>

      {/* Horizontal accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.3) 35%, rgba(96,165,250,0.3) 65%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={content}
        className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center pt-8 pb-24 md:pt-10 md:pb-28"
      >
        {/* Eyebrow */}
        <div data-hero="eyebrow">
          <div
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(96,165,250,0.18)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="section-label" style={{ letterSpacing: '0.14em' }}>
              Haider Issufo · Maputo–Matola
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="text-[2.2rem] sm:text-5xl md:text-[3.75rem] lg:text-[5rem] font-black leading-[1.02] tracking-tight mb-7 text-balance"
          style={{ color: '#F3F4F6' }}
        >
          <span data-hero="mask" className="block overflow-hidden py-[0.12em] -my-[0.12em]">
            <span data-hero="line" className="block">
              Não precisas de um{' '}
              <FlipWords words={WORDS} className="text-secondary" />.
            </span>
          </span>
          <span
            data-hero="sub"
            className="block mt-2"
            style={{ color: '#64748B', fontWeight: 400, fontSize: '0.7em', letterSpacing: '-0.01em' }}
          >
            Precisas de alguém que pense{' '}
            <span style={{ color: '#F3F4F6', fontWeight: 600 }}>o teu negócio.</span>
          </span>
        </h1>

        {/* Subline */}
        <p
          data-hero="lead"
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-11 leading-relaxed"
          style={{ color: '#94A3B8' }}
        >
          Dou forma ao teu posicionamento digital —{' '}
          <span style={{ color: '#CBD5E1', fontWeight: 500 }}>design, websites e comunicação que funcionam</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div data-hero="cta">
            <Magnetic>
              <SliceButton
                variant="primary"
                size="lg"
                onClick={() => scrollToTarget('#web-projects')}
                icon={
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path
                      d="M3 7.5h9M9 4.5l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Ver trabalhos
              </SliceButton>
            </Magnetic>
          </div>

          <div data-hero="cta">
            <Magnetic>
              <SliceButton
                variant="outline"
                size="lg"
                href="https://wa.me/258871368121"
                external
                icon={
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path
                      d="M7.5 1.5a6 6 0 100 12 6 6 0 000-12zM5 7.5c0 2.5 3.5 5 5.5 4M9.5 5.5c0 0-.5-.5-1-.5s-2.5 1-2.5 3"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                iconPosition="left"
              >
                Falar comigo
              </SliceButton>
            </Magnetic>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 md:mt-20 flex items-center justify-center gap-0 flex-wrap">
          {STATS.map((s, i) => (
            <React.Fragment key={s.l}>
              <div data-hero="stat" className="text-center px-6 md:px-12 py-2">
                <div
                  className="text-2xl md:text-3xl font-black gradient-text-blue mb-0.5 tabular-nums"
                  data-count={s.n}
                  data-suffix={s.suffix}
                >
                  {s.n}
                  {s.suffix}
                </div>
                <div className="text-xs font-medium" style={{ color: '#64748B' }}>
                  {s.l}
                </div>
              </div>
              {i < STATS.length - 1 && (
                <div
                  className="hidden sm:block w-px h-8 flex-shrink-0"
                  style={{ background: 'rgba(96,165,250,0.15)' }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero="cue"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(96,165,250,0.1)' }}>
          <div
            className="absolute top-0 left-0 right-0 h-5"
            style={{
              background: 'linear-gradient(to bottom, #60A5FA, transparent)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
