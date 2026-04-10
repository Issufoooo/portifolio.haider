import React from 'react';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 6 — THINKING
// ============================================================

const Thinking: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="thinking"
      className="py-24 md:py-36 relative overflow-hidden"
     
      aria-label="Como penso"
    >
      {/* Ghost word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="text-[22vw] font-black leading-none tracking-tighter" style={{ color: 'rgba(59,130,246,0.025)' }}>
          THINK
        </span>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8" ref={ref}>

        <div className={`reveal mb-10${inView ? ' visible' : ''}`}>
          <span className="section-label">Como penso</span>
        </div>

        {/* Opening */}
        <div className="mb-10">
          <p className={`reveal reveal-delay-1${inView ? ' visible' : ''} text-3xl md:text-5xl font-black mb-3 leading-tight`} style={{ color: '#F3F4F6' }}>
            A maioria das pessoas cria sem pensar.
          </p>
          <p className={`reveal reveal-delay-2${inView ? ' visible' : ''} text-3xl md:text-5xl font-black leading-tight gradient-text-blue`}>
            Eu faço o contrário.
          </p>
        </div>

        <p className={`reveal reveal-delay-2${inView ? ' visible' : ''} text-lg mb-8 leading-relaxed`} style={{ color: '#CBD5E1' }}>
          Antes de abrir qualquer programa, eu penso:
        </p>

        <ul className="space-y-5 mb-12">
          {[
            'Como é que isto vai ser percebido?',
            'O que é que isto comunica sem palavras?',
            'Isto faz alguém confiar… ou não?',
          ].map((q, i) => (
            <li
              key={i}
              className={`reveal reveal-delay-${i + 2}${inView ? ' visible' : ''} flex items-start gap-5`}
            >
              <span className="mt-3 flex-shrink-0 w-8 h-px" style={{ background: '#3B82F6' }} aria-hidden="true" />
              <span className="text-xl md:text-2xl font-semibold leading-snug" style={{ color: '#F3F4F6' }}>{q}</span>
            </li>
          ))}
        </ul>

        <div className="section-divider mb-10" aria-hidden="true" />

        <div className={`reveal reveal-delay-4${inView ? ' visible' : ''}`}>
          <p className="text-sm font-medium mb-4" style={{ color: '#64748B' }}>
            Olho cada projecto como aprendizado — não como meta.<br />
            É por isso que cada entrega tem empenho real.
          </p>
          <blockquote className="border-l-2 pl-6" style={{ borderColor: '#3B82F6' }}>
            <p className="text-2xl md:text-3xl font-bold mb-1.5 leading-snug" style={{ color: '#CBD5E1' }}>
              Não é o que tu fazes.
            </p>
            <p className="text-2xl md:text-3xl font-black leading-snug gradient-text-blue">
              É como és visto.
            </p>
          </blockquote>
        </div>

      </div>
    </section>
  );
};

export default Thinking;
