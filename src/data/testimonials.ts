// ============================================================
// TESTIMONIALS DATA
// ============================================================
// To ADD: push a new object to the array.
// To EDIT: change the fields in each object.
// avatar is optional — leave empty string '' to show initials instead.
// ============================================================

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Não é só design. É pensar o negócio de forma diferente. Depois do trabalho em conjunto, a forma como o mercado nos vê mudou completamente. O nosso site passou a converter clientes antes mesmo de falarmos com eles.',
    name: 'Maria Fernandes',
    role: 'CEO',
    company: 'Studio Beta',
    avatar: '',
  },
  {
    id: 'test-2',
    quote: 'Trabalhámos com outros freelancers antes, mas a diferença é clara: aqui há estratégia por trás de cada decisão visual. O resultado não é bonito por acaso — é bonito porque funciona.',
    name: 'João Macamo',
    role: 'Diretor de Marketing',
    company: 'Empresa Alpha',
    avatar: '',
  },
  {
    id: 'test-3',
    quote: 'Entregou mais do que esperávamos, dentro do prazo e com uma atenção ao detalhe que raramente se vê. O nosso packaging ficou melhor do que qualquer referência que tínhamos mostrado.',
    name: 'Carla Nunes',
    role: 'Fundadora',
    company: 'Marca Gamma',
    avatar: '',
  },
];
