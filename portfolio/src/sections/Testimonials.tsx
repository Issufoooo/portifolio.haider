import React from 'react';
import { testimonials } from '../data/testimonials';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 8 — TESTIMONIALS
// 2–3 testimonial cards with quote styling and stagger.
// ============================================================

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#3B82F6" aria-hidden="true">
    <path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9L3.4 12l.7-4L1.2 5.2l4-.6L7 1z"/>
  </svg>
);

const Testimonials: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-canvas-light"
      aria-label="Testemunhos"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div
          ref={ref}
          className={`reveal mb-12 text-center${inView ? ' visible' : ''}`}
        >
          <span className="section-label block mb-3">Testemunhos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 leading-tight">
            O que dizem{' '}
            <span className="gradient-text-blue">quem trabalhou comigo</span>.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              className={`testimonial-card reveal reveal-delay-${i + 1}${inView ? ' visible' : ''}`}
              aria-label={`Testemunho de ${t.name}`}
            >
              {/* Stars */}
              <div
                className="flex gap-0.5 mb-4"
                aria-label="5 estrelas"
                role="img"
              >
                {Array.from({ length: 5 }).map((_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-5">
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  {t.quote}
                </p>
              </blockquote>

              {/* Divider */}
              <div
                className="h-px mb-4"
                style={{ background: 'rgba(59,130,246,0.12)' }}
                aria-hidden="true"
              />

              {/* Author */}
              <footer className="flex items-center gap-3">
                {/* Avatar or initials */}
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(59,130,246,0.15))',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: '#3B82F6',
                  }}
                  aria-hidden="true"
                >
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    t.name.charAt(0)
                  )}
                </div>

                <div>
                  <cite className="not-italic text-sm font-semibold text-gray-200 block">
                    {t.name}
                  </cite>
                  <span className="text-xs text-gray-500">
                    {t.role} · {t.company}
                  </span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className={`text-center text-gray-500 text-sm mt-10 reveal reveal-delay-4${inView ? ' visible' : ''}`}>
          Resultados reais. Nomes com autorização dos clientes.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
