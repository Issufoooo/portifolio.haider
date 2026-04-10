import React from 'react';
import FlexExpandCards from '../components/FlexExpandCards';
import type { ServiceItem } from '../components/FlexExpandCards';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 3 — SERVICES
// Uses FlexExpandCards component, adapted to blue system.
// ============================================================

// ── Icons ────────────────────────────────────────────────────
const DesignIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="10" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.5"/>
    <rect x="15" y="3" width="10" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5"/>
    <rect x="3" y="15" width="10" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="20" cy="20" r="5" stroke="#3B82F6" strokeWidth="1.5"/>
  </svg>
);

const DevIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M8 10L4 14l4 4M20 10l4 4-4 4M16 7l-4 14" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M5 8h18M5 12h14M5 16h10M5 20h6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="22" cy="20" r="3" fill="#3B82F6" opacity="0.3" stroke="#3B82F6" strokeWidth="1"/>
  </svg>
);

const SocialIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="7" cy="14" r="3" stroke="#3B82F6" strokeWidth="1.5"/>
    <circle cx="21" cy="7" r="3" stroke="#3B82F6" strokeWidth="1.5"/>
    <circle cx="21" cy="21" r="3" stroke="#3B82F6" strokeWidth="1.5"/>
    <path d="M10 12.5l8-4M10 15.5l8 4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Service data ─────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    id: 'design',
    number: '01',
    title: 'Design',
    tagline: 'Se o teu design parece fraco, o teu negócio também parece.',
    description:
      'Trabalho principalmente com pequenas empresas que querem ser levadas a sério. Não entrego só um ficheiro bonito — entrego algo que representa bem o negócio. Trato cada projecto como se fosse meu.',
    icon: <DesignIcon />,
    points: [
      'Identidade visual e comunicação de marca',
      'Posts, flyers e catálogos para redes sociais',
      'Comunicação de produto (lançamentos, stock, promoções)',
      'Materiais para campanhas e eventos',
    ],
  },
  {
    id: 'web',
    number: '02',
    title: 'Websites',
    tagline: 'Hoje, sem um bom site, o teu negócio perde credibilidade.',
    description:
      'Desenvolvo sites e pequenas plataformas. O que me distingue é que não me limito a executar o pedido — pego na ideia base do cliente, aprimoro-a, dou sugestões fortes e penso o projecto como se fosse meu negócio.',
    icon: <DevIcon />,
    points: [
      'Websites institucionais e portfólios',
      'Pequenas plataformas e aplicações web',
      'SEO — para aparecer no Google sem pagar anúncios',
      'Sugestões e melhorias além do pedido inicial',
    ],
  },
  {
    id: 'social',
    number: '03',
    title: 'Social Media',
    tagline: 'Postar não é estratégia. Consistência sim.',
    description:
      'O meu trabalho em redes sociais parte do design — crio os posts, os templates e o visual. Mas vai além disso: traço planos mensais de conteúdo, ajusto estratégias para impulsionar páginas e trabalho para melhorar o posicionamento e atrair leads reais.',
    icon: <SocialIcon />,
    points: [
      'Plano mensal de conteúdo com estratégia definida',
      'Criação de posts, stories e templates visuais',
      'Crescimento de seguidores e interacção com potenciais clientes',
      'Acompanhamento e ajuste com base em resultados',
    ],
  },
  {
    id: 'copy',
    number: '04',
    title: 'Copywriting',
    tagline: 'Não é escrever bonito. É fazer alguém agir.',
    description:
      'O copy é algo que integro naturalmente no que faço. Quando desenvolvo um site ou uma campanha, os textos fazem parte da estratégia — não são um extra. Palavras certas no momento certo fazem toda a diferença.',
    icon: <CopyIcon />,
    points: [
      'Textos para sites e landing pages',
      'Legendas e copy para redes sociais',
      'Copy de produto e promoções',
      'Integrado no processo de design e desenvolvimento',
    ],
  },
];

const Services: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="services"
      className="py-20 md:py-28"
      aria-label="Serviços"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div
          ref={ref}
          className={`reveal mb-10${inView ? ' visible' : ''}`}
        >
          <span className="section-label block mb-3">Serviços</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-lg" style={{ color: '#F3F4F6' }}>
              O que faço e{' '}
              <span className="gradient-text-blue">como penso</span>.
            </h2>
            <p className="text-sm max-w-xs md:text-right leading-relaxed" style={{ color: '#CBD5E1' }}>
              Clica em cada serviço para ver o detalhe. No mobile, toca para expandir.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className={`reveal reveal-delay-2${inView ? ' visible' : ''}`}>
          <FlexExpandCards services={SERVICES} />
        </div>

      </div>
    </section>
  );
};

export default Services;
