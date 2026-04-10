// ============================================================
// WEB PROJECTS DATA — Haider Issufo
// ============================================================
// mockupType: 'phone'   → phone frame in modal (mobile-first sites)
//             'desktop' → browser/laptop frame (web apps, SaaS)
// screenshots: extra images shown in the modal gallery
// ============================================================

export interface WebProject {
  id: string;
  name: string;
  description: string;
  preview: string;
  video?: string;
  screenshots?: string[];
  link?: string;
  tags: string[];
  mockupType: 'phone' | 'desktop';
  problem: string;
  solution: string;
  result: string;
}

export const webProjects: WebProject[] = [
  {
    id: 'mozatour',
    name: 'MozaTour',
    description: 'Website de turismo para Moçambique com SEO activo — para atrair clientes sem depender de anúncios pagos.',
    preview: '/assets/websites/mozatour-video.mp4',
    video: '/assets/websites/mozatour-video.mp4',
    mockupType: 'phone',
    link: 'https://mozatour.agency',
    tags: ['Website', 'Turismo', 'SEO'],
    problem: 'A MozaTour não tinha presença digital. Todo o negócio dependia das redes sociais e do boca-a-boca. Sem site, qualquer cliente que pesquisasse no Google simplesmente não os encontrava.',
    solution: 'Desenvolvi um website bilingue (PT/EN) focado em turismo moçambicano, com conteúdo editorial sobre destinos, rotas e experiências. A par do desenvolvimento, implementei estratégia de SEO para o site aparecer em pesquisas orgânicas no Google — sem depender de anúncios do Meta.',
    result: 'Presença digital activa com tráfego orgânico crescente. O negócio passou a ter um canal de aquisição de clientes independente das redes sociais e um caminho directo para o WhatsApp.',
  },
  {
    id: 'mesafacil',
    name: 'MesaFácil',
    description: 'Plataforma de gestão para restaurantes moçambicanos — dashboard, reservas e pedidos em tempo real.',
    preview: '/assets/websites/mesafacil-main.png',
    screenshots: [
      '/assets/websites/mesafacil-main.png',
      '/assets/websites/mesafacil-tutorials.png',
    ],
    mockupType: 'desktop',
    tags: ['Web App', 'Restauração', 'SaaS'],
    problem: 'Restaurantes em Maputo gerem reservas, mesas e pedidos de forma manual — WhatsApp, papel, ou nada. Sem visibilidade da operação em tempo real, perdem mesas e perdem clientes.',
    solution: 'Plataforma web com dashboard de gestão de mesas, sistema de reservas e controlo de pedidos. Pensado para o contexto moçambicano — rápido, simples, funciona em ligações lentas. Inclui secção de tutoriais integrada para onboarding da equipa.',
    result: 'Em desenvolvimento activo. Auditoria de segurança completa realizada e vulnerabilidades críticas corrigidas antes do lançamento.',
  },
  {
    id: 'lift-studio',
    name: 'LIFT Studio',
    description: 'Webportfólio imersivo para estúdio criativo — posicionamento de marca, identidade e serviços.',
    preview: '/assets/websites/lift-studio-video.mp4',
    video: '/assets/websites/lift-studio-video.mp4',
    mockupType: 'phone',
    tags: ['Website', 'Portfólio', 'Branding'],
    problem: 'O estúdio tinha trabalho de qualidade mas não tinha forma de o apresentar digitalmente ao mesmo nível. Mandavam PDFs e capturas de ecrã — e perdiam oportunidades antes de qualquer conversa.',
    solution: 'Idealizei e desenvolvi um webportfólio com navegação imersiva, foco nas peças de trabalho e narrativa visual clara sobre o que o estúdio faz e para quem. Design pensado para impressionar antes de qualquer palavra ser lida.',
    result: 'O estúdio passou a usar o link como primeiro contacto com clientes potenciais. A percepção de marca subiu imediatamente — o portfólio passou a representar o nível real do trabalho.',
  },
];
