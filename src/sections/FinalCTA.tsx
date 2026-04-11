import React from 'react';
import SliceButton from '../components/SliceButton';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 8 — FINAL CTA + FOOTER
// ============================================================

const FinalCTA: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="final-cta"
      className="py-28 md:py-40 relative overflow-hidden"
     
      aria-label="Contacto final"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 100%, rgba(59,130,246,0.1) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.22), transparent)' }} />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">

        <div className={`reveal mb-8${inView ? ' visible' : ''}`}>
          <span className="section-label">Próximo passo</span>
        </div>

        <h2
          className={`reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5${inView ? ' visible' : ''}`}
          style={{ color: '#F3F4F6' }}
        >
          Se queres continuar igual,{' '}
          <br className="hidden md:block" />
          <span className="font-light" style={{ color: '#475569' }}>não precisas de mim.</span>
        </h2>

        <p className={`reveal reveal-delay-2 text-xl md:text-2xl font-semibold mb-3${inView ? ' visible' : ''}`} style={{ color: '#CBD5E1' }}>
          Mas se queres mudar como o teu negócio é visto…
        </p>

        <p className={`reveal reveal-delay-3 text-base max-w-md mx-auto mb-12 leading-relaxed${inView ? ' visible' : ''}`} style={{ color: '#64748B' }}>
          conversamos sobre o business. fazemos o brainstorming,e Vemos juntos como prosseguir.
        </p>

        <div className={`reveal reveal-delay-4${inView ? ' visible' : ''}`}>
          <SliceButton
            href="https://wa.me/258871368121"
            variant="primary"
            size="lg"
            external
            icon={
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <path d="M8.5 1.5a7 7 0 100 14 7 7 0 000-14zM5.5 8.5c0 3 4 5.5 6.5 4.5M11 6.5s-.5-.5-1-.5-3 1-3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            }
            iconPosition="left"
          >
            Falar comigo no WhatsApp
          </SliceButton>
        </div>

        <p className={`reveal reveal-delay-4 text-xs mt-5${inView ? ' visible' : ''}`} style={{ color: '#334155' }}>
          Respondo rápido · Conversa inicial sem compromisso
        </p>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 mt-20 md:mt-28 pt-8"
        style={{ borderTop: '1px solid rgba(96,165,250,0.08)' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: '#334155' }}>
          <span>© {new Date().getFullYear()} Haider Issufo · Todos os direitos reservados</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
            <span>Feito com empenho. E código.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
