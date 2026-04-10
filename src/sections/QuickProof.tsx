import React from 'react';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 2 — QUICK PROOF
// 3–4 image-focused visual highlights. Minimal text.
// Scroll-reveal on entry.
// ============================================================

const PROOF_ITEMS = [
  {
    id: 'proof-1',
    image: '/assets/designs/dhs/tshirts/tshirt-lost-reality.jpg',
    label: 'Social Media Design',
    title: 'DHS — Streetwear',
    stat: 'Comunicação de produto',
  },
  {
    id: 'proof-2',
    image: '/assets/designs/momas-electronics/catalog-ps4-1.png',
    label: 'Catálogo Digital',
    title: 'Momas Electronics',
    stat: 'Catálogos PS4 & PS5',
  },
  {
    id: 'proof-3',
    image: '/assets/designs/momas-events/event-tent-1.jpg',
    label: 'Eventos',
    title: 'Momas Events',
    stat: 'Comunicação de espaço',
  },
  {
    id: 'proof-4',
    image: '/assets/designs/outros/fatimas-gift-valentines.png',
    label: 'Campanha',
    title: "Fatima's Gift",
    stat: "Valentine's Day",
  },
];

const QuickProof: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="quick-proof"
      className="py-20 md:py-28 overflow-hidden"
      aria-label="Trabalhos em destaque"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div
          ref={ref}
          className={`reveal mb-12${inView ? ' visible' : ''}`}
        >
          <span className="section-label block mb-3">Prova rápida</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#F3F4F6' }}>
            Resultados que falam{' '}
            <span className="gradient-text-blue">por si</span>.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {PROOF_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`proof-card reveal reveal-delay-${i + 1}${inView ? ' visible' : ''}`}
            >
              {/* Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full placeholder-img" aria-hidden="true" />
              )}

              {/* Overlay */}
              <div className="proof-card-overlay" aria-hidden="true">
                <span
                  className="text-xs font-bold tracking-widest uppercase mb-1 block"
                  style={{ color: '#3B82F6' }}
                >
                  {item.label}
                </span>
                <span className="text-sm font-semibold style={{ color: '#F3F4F6' }} leading-tight block">
                  {item.title}
                </span>
                <span className="text-xs style={{ color: '#CBD5E1' }} mt-0.5 block">{item.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className={`text-center style={{ color: '#64748B' }} text-sm mt-8 reveal reveal-delay-4${inView ? ' visible' : ''}`}
        >
          Cada projeto abaixo tem o contexto completo — problema, solução e resultado.
        </p>
      </div>
    </section>
  );
};

export default QuickProof;
