import React, { useEffect, useState } from 'react';
import SliceButton from '../components/SliceButton';

// ============================================================
// SECTION 1 — HERO  — dominant, intentional, memorable
// ============================================================

const WORDS = ['designer', 'developer', 'estratega'];

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const entry = () =>
    `transition-all duration-700 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center overflow-x-hidden pt-24 md:pt-28"
      style={{ background: '#081225' }}
      aria-label="Apresentação"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 bg-grid pointer-events-none opacity-60"
        aria-hidden="true"
      />

      {/* Strong central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 65%, rgba(59,130,246,0.13) 0%, transparent 68%)',
        }}
      />

      {/* Left orb */}
      <div
        className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          filter: 'blur(72px)',
        }}
      />

      {/* Right orb */}
      <div
        className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

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
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center pt-8 pb-24 md:pt-10 md:pb-28">
        {/* Eyebrow */}
        <div className={entry()} style={{ transitionDelay: '0ms' }}>
          <div
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(96,165,250,0.18)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0"
              aria-hidden="true"
            />
            <span className="section-label" style={{ letterSpacing: '0.14em' }}>
              Haider Issufo · Maputo–Matola
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`${entry()} text-[2.2rem] sm:text-5xl md:text-[3.75rem] lg:text-[5rem] font-black leading-[1.02] tracking-tight mb-7`}
          style={{ transitionDelay: '100ms', color: '#F3F4F6' }}
        >
          Não precisas de um{' '}
          <span
            className="gradient-text-blue inline-block"
            style={{
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
            aria-live="polite"
          >
            {WORDS[wordIdx]}
          </span>
          .
          <br />
          <span
            className="block mt-2"
            style={{
              color: '#64748B',
              fontWeight: 400,
              fontSize: '0.7em',
              letterSpacing: '-0.01em',
            }}
          >
            Precisas de alguém que pense{' '}
            <span style={{ color: '#F3F4F6', fontWeight: 600 }}>
              o teu negócio.
            </span>
          </span>
        </h1>

        {/* Subline */}
        <p
          className={`${entry()} text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-11 leading-relaxed`}
          style={{ transitionDelay: '200ms', color: '#94A3B8' }}
        >
          Dou forma ao teu posicionamento digital —{' '}
          <span style={{ color: '#CBD5E1', fontWeight: 500 }}>
            design, websites e comunicação que funcionam
          </span>
          .
        </p>

        {/* CTAs */}
        <div
          className={`${entry()} flex flex-col sm:flex-row items-center justify-center gap-3`}
          style={{ transitionDelay: '300ms' }}
        >
          <SliceButton
            variant="primary"
            size="lg"
            onClick={() => scrollTo('#web-projects')}
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
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

          <SliceButton
            variant="outline"
            size="lg"
            href="https://wa.me/258871368121"
            external
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
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
        </div>

        {/* Stats */}
        <div
          className={`${entry()} mt-14 md:mt-20 flex items-center justify-center gap-0 flex-wrap`}
          style={{ transitionDelay: '460ms' }}
        >
          {[
            { n: '3+', l: 'Anos activo' },
            { n: '20+', l: 'Projectos' },
            { n: '100%', l: 'No resultado' },
          ].map((s, i) => (
            <React.Fragment key={s.l}>
              <div className="text-center px-6 md:px-12 py-2">
                <div className="text-2xl md:text-3xl font-black gradient-text-blue mb-0.5">
                  {s.n}
                </div>
                <div className="text-xs font-medium" style={{ color: '#475569' }}>
                  {s.l}
                </div>
              </div>
              {i < 2 && (
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
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
        aria-hidden="true"
      >
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: 'rgba(96,165,250,0.1)' }}
        >
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
