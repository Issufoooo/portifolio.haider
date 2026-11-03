import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// Aceternity UI — Focus Cards
// Ao passar o rato num cartão, os outros desfocam.
// Adaptado: dados por props, texto sempre legível em mobile
// (onde não existe hover) e gradiente de leitura por baixo.
// ============================================================

export type FocusCardItem = {
  id: string;
  image: string;
  label: string;
  title: string;
  stat: string;
};

const Card = ({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FocusCardItem;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) => (
  <figure
    tabIndex={0}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    onFocus={() => setHovered(index)}
    onBlur={() => setHovered(null)}
    className={cn(
      'group relative m-0 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-primary/10 bg-canvas-card',
      'outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-secondary',
      hovered !== null && hovered !== index && 'scale-[0.98] blur-[3px] md:blur-sm'
    )}
  >
    <img
      src={card.image}
      alt={`${card.title} — ${card.label}`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(to top, rgba(8,18,37,0.92) 0%, rgba(8,18,37,0.35) 38%, transparent 62%)',
      }}
      aria-hidden="true"
    />
    <figcaption className="absolute inset-x-0 bottom-0 p-3.5 md:p-5">
      <span className="mb-1 block text-[0.7rem] font-semibold text-secondary">{card.label}</span>
      <span className="block text-sm font-semibold leading-tight text-gray-100 md:text-base">
        {card.title}
      </span>
      <span className="mt-0.5 block text-xs text-slate-300 md:translate-y-1 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
        {card.stat}
      </span>
    </figcaption>
  </figure>
);

export function FocusCards({ cards, className }: { cards: FocusCardItem[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4', className)}>
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}
