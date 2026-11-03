import React, { useRef } from 'react';
import { gsap, SplitText } from '../lib/gsap';
import { useGsapContext } from '../hooks/useGsapContext';

// ============================================================
// SECTION 6 — THINKING  (GSAP ScrollTrigger + SplitText, com scrub)
// O texto "acende" palavra a palavra à medida que fazes scroll —
// quem lê é quem controla o ritmo. As 3 perguntas entram em
// sequência e a citação final fecha o momento.
// Sem "reduzir movimento": o texto aparece todo, sem animação.
// ============================================================

const QUESTIONS = [
  'Como é que isto vai ser percebido?',
  'O que é que isto comunica sem palavras?',
  'Isto faz alguém confiar… ou não?',
];

const Thinking: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGsapContext(root, () => {
    const q = gsap.utils.selector(root);
    const splits: SplitText[] = [];

    // 1) Frases grandes: palavra a palavra, ligadas ao scroll
    q('[data-scrub]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words', autoSplit: true });
      splits.push(split);
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: 0.6 },
        }
      );
    });

    // 2) Perguntas: a linha desenha-se e o texto desliza
    q('[data-question]').forEach((li) => {
      const line = li.querySelector('[data-line]');
      const text = li.querySelector('[data-text]');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: li, start: 'top 85%', end: 'top 55%', scrub: 0.5 },
      });
      tl.from(line, { scaleX: 0, transformOrigin: 'left center', ease: 'none' }, 0).from(
        text,
        { x: 28, opacity: 0, ease: 'none' },
        0.1
      );
    });

    // 3) Fecho
    gsap.from(q('[data-closing]'), {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: q('[data-closing]')[0], start: 'top 88%', once: true },
    });

    // 4) A palavra fantasma sobe devagar (parallax)
    gsap.fromTo(
      q('[data-ghost]'),
      { yPercent: 18 },
      {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );

    return () => splits.forEach((s) => s.revert());
  }, []);

  return (
    <section
      ref={root}
      id="thinking"
      className="py-24 md:py-36 relative overflow-hidden"
      aria-label="Como penso"
    >
      {/* Ghost word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          data-ghost
          className="text-[22vw] font-black leading-none tracking-tighter"
          style={{ color: 'rgba(59,130,246,0.025)' }}
        >
          THINK
        </span>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <span className="section-label">Como penso</span>
        </div>

        {/* Opening */}
        <div className="mb-10">
          <p
            data-scrub
            className="text-3xl md:text-5xl font-black mb-3 leading-tight text-balance"
            style={{ color: '#F3F4F6' }}
          >
            A maioria das pessoas cria sem pensar.
          </p>
          <p
            data-scrub
            className="text-3xl md:text-5xl font-black leading-tight text-balance"
            style={{ color: '#60A5FA' }}
          >
            Eu faço o contrário.
          </p>
        </div>

        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#CBD5E1' }}>
          Antes de abrir qualquer programa, eu penso:
        </p>

        <ul className="space-y-5 mb-12">
          {QUESTIONS.map((q) => (
            <li key={q} data-question className="flex items-start gap-5">
              <span
                data-line
                className="mt-3 flex-shrink-0 w-8 h-px"
                style={{ background: '#3B82F6' }}
                aria-hidden="true"
              />
              <span data-text className="text-xl md:text-2xl font-semibold leading-snug" style={{ color: '#F3F4F6' }}>
                {q}
              </span>
            </li>
          ))}
        </ul>

        <div className="section-divider mb-10" aria-hidden="true" />

        <div>
          <p data-closing className="text-sm font-medium mb-4" style={{ color: '#64748B' }}>
            Olho cada projecto como aprendizado — não como meta.
            <br />É por isso que cada entrega tem empenho real.
          </p>
          <blockquote data-closing className="border-l-2 pl-6" style={{ borderColor: '#3B82F6' }}>
            <p className="text-2xl md:text-3xl font-bold mb-1.5 leading-snug" style={{ color: '#CBD5E1' }}>
              Não é o que tu fazes.
            </p>
            <p className="text-2xl md:text-3xl font-black leading-snug" style={{ color: '#60A5FA' }}>
              É como és visto.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Thinking;
