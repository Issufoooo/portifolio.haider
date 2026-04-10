// ============================================================
// DESIGN PORTFOLIO DATA — Haider Issufo
// ============================================================
// Structure: Company → Works → Images
//
// To ADD a company:  push to `companies` array.
// To ADD a work:     push to company.works array.
// To ADD an image:   push a path to work.images array.
//
// Image paths are relative to /public
// IMPORTANT: Do NOT use company logos. Use ONLY design work previews.
// ============================================================

export interface WorkItem {
  id: string;
  label: string;
  name: string;
  description: string;
  coverImage: string;
  images: string[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  year: string;
  works: WorkItem[];
}

export const companies: Company[] = [
  // ──────────────────────────────────────────────────────────
  // DHS — Marca de Streetwear
  // ──────────────────────────────────────────────────────────
  {
    id: 'dhs',
    name: 'DHS',
    industry: 'Streetwear & Moda',
    description: 'Comunicação visual completa para marca de streetwear local — t-shirts, hoodies e identidade de produto.',
    year: '2024',
    works: [
      {
        id: 'dhs-tshirts',
        label: '1.1',
        name: 'T-Shirts — Comunicação de Produto',
        description: 'Layouts de produto para redes sociais. Cada peça com identidade própria — Lost Reality, Find Joy, Abstract Art.',
        coverImage: '/assets/designs/dhs/tshirts/tshirt-lost-reality.jpg',
        images: [
          '/assets/designs/dhs/tshirts/tshirt-lost-reality.jpg',
          '/assets/designs/dhs/tshirts/tshirt-abstract.jpg',
          '/assets/designs/dhs/tshirts/tshirt-find-joy.jpg',
          '/assets/designs/dhs/tshirts/tshirt-friendzone.jpg',
        ],
      },
      {
        id: 'dhs-hoodies',
        label: '1.2',
        name: 'Hoodies — Comunicação de Produto',
        description: 'Visual de produto para a linha de hoodies DHS. Design consistente com a identidade da marca.',
        coverImage: '/assets/designs/dhs/hoodies/hoodie-smurfenoff.jpg',
        images: [
          '/assets/designs/dhs/hoodies/hoodie-smurfenoff.jpg',
          '/assets/designs/dhs/hoodies/hoodie-done-with-it.jpg',
          '/assets/designs/dhs/hoodies/hoodie-lost-in-reality.jpg',
          '/assets/designs/dhs/hoodies/hoodie-skeleton.jpg',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Momas Electronics — Electrónica & Gaming
  // ──────────────────────────────────────────────────────────
  {
    id: 'momas-electronics',
    name: 'Momas Electronics',
    industry: 'Electrónica & Gaming',
    description: 'Catálogos de produto, comunicação de stock e campanha Fantasy Premier League para loja de electrónica em Matola.',
    year: '2023–2024',
    works: [
      {
        id: 'momas-elec-catalogs',
        label: '2.1',
        name: 'Catálogos de Jogos PS4/PS5',
        description: 'Comunicação visual de stock disponível — layouts de produto para Instagram e WhatsApp.',
        coverImage: '/assets/designs/momas-electronics/catalog-ps4-1.png',
        images: [
          '/assets/designs/momas-electronics/stock-disponivel.png',
          '/assets/designs/momas-electronics/catalog-ps4-1.png',
          '/assets/designs/momas-electronics/catalog-ps4-ps5.png',
          '/assets/designs/momas-electronics/catalog-ps5-1.png',
          '/assets/designs/momas-electronics/catalog-ps5-2.png',
        ],
      },
      {
        id: 'momas-elec-fantasy',
        label: '2.2',
        name: 'Campanha Fantasy Premier League',
        description: 'Campanha visual para o torneio Fantasy Premier League 2024-2025 (6ª Edição) — cartaz de prémios, rankings GW e classificações gerais semanais.',
        // 📌 ADICIONA AS IMAGENS AQUI quando tiveres os ficheiros prontos
        coverImage: '/assets/designs/momas-electronics/fantasy-pl/fantasy-pl-prizes.jpg',
        images: [
          '/assets/designs/momas-electronics/fantasy-pl/fantasy-pl-prizes.jpg',
          '/assets/designs/momas-electronics/fantasy-pl/fantasy-pl-prizes.jpg',
          '/assets/designs/momas-electronics/fantasy-pl/fantasy-pl-top10-gw5.jpg',
          '/assets/designs/momas-electronics/fantasy-pl/fantasy-pl-top10-gw1.jpg',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Momas Events — Organização de Eventos
  // ──────────────────────────────────────────────────────────
  {
    id: 'momas-events',
    name: 'Momas Events',
    industry: 'Eventos & Hospitalidade',
    description: 'Material de comunicação visual para empresa de organização de eventos premium em Matola.',
    year: '2023',
    works: [
      {
        id: 'momas-events-promo',
        label: '3.1',
        name: 'Comunicação de Espaço e Evento',
        description: 'Promoção visual dos espaços e montagens da empresa para redes sociais.',
        coverImage: '/assets/designs/momas-events/event-tent-1.jpg',
        images: [
          '/assets/designs/momas-events/event-tent-1.jpg',
          '/assets/designs/momas-events/event-tent-2.jpg',
          '/assets/designs/momas-events/event-dance-floor.jpg',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Outros — Projectos Soltos
  // ──────────────────────────────────────────────────────────
  {
    id: 'outros',
    name: 'Outros Projectos',
    industry: 'Vários Sectores',
    description: 'Trabalhos pontuais para clientes de sectores diferentes — campanhas, flyers e comunicação de produto.',
    year: '2023–2024',
    works: [
      {
        id: 'outros-fatima',
        label: '4.1',
        name: "Fatima's Gift — Campanha Valentine's Day",
        description: 'Flyer promocional para loja de presentes personalizados. Foco em emoção e conversão.',
        coverImage: '/assets/designs/outros/fatimas-gift-valentines.png',
        images: [
          '/assets/designs/outros/fatimas-gift-valentines.png',
        ],
      },
      {
        id: 'outros-ismael',
        label: '4.2',
        name: 'Ismael Cangy Transportes — Comunicação de Serviços',
        description: 'Flyer de apresentação de serviços de logística e transporte para empresa em Matola.',
        coverImage: '/assets/designs/outros/ismael-cangy-transportes.jpg',
        images: [
          '/assets/designs/outros/ismael-cangy-transportes.jpg',
        ],
      },
    ],
  },
];
