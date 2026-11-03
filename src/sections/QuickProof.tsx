import React from 'react';
import { useInView } from '../hooks/useInView';
import { useHeaderReveal } from '../hooks/useHeaderReveal';
import { FocusCards, type FocusCardItem } from '../components/aceternity/focus-cards';

// ============================================================
// SECTION 2 — QUICK PROOF
// 4 destaques visuais. Aceternity "Focus Cards": ao passar o rato
// num cartão, os restantes desfocam e o foco fica no trabalho.
// ============================================================

const PROOF_ITEMS: FocusCardItem[] = [
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
  useHeaderReveal(ref);

  return (
    <section id="quick-proof" className="py-20 md:py-28 overflow-hidden" aria-label="Trabalhos em destaque">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div ref={ref} className="mb-12">
          <span data-fade className="section-label block mb-3">
            Prova rápida
          </span>
          <h2
            data-split
            className="text-3xl md:text-4xl font-bold leading-tight text-balance"
            style={{ color: '#F3F4F6' }}
          >
            Resultados que falam <span className="gradient-text-blue">por si</span>.
          </h2>
        </div>

        {/* Grid */}
        <div className={`reveal reveal-delay-2${inView ? ' visible' : ''}`}>
          <FocusCards cards={PROOF_ITEMS} />
        </div>

        {/* Bottom note */}
        <p
          className={`text-center text-sm mt-8 reveal reveal-delay-3${inView ? ' visible' : ''}`}
          style={{ color: '#64748B' }}
        >
          Cada projeto abaixo tem o contexto completo — problema, solução e resultado.
        </p>
      </div>
    </section>
  );
};

export default QuickProof;
