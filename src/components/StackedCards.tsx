import React from 'react';
import type { Company } from '../data/companies';

// ============================================================
// STACKED CARDS
// Adapted component — no logos, design-work images only,
// blue/dark depth stack, click to open company portfolio.
// ============================================================

interface StackedCardsProps {
  company: Company;
  onClick: (company: Company) => void;
}

const StackedCards: React.FC<StackedCardsProps> = ({ company, onClick }) => {
  // Collect up to 3 cover images across the company's works for visual layering
  const coverImages = company.works
    .slice(0, 3)
    .map((w) => w.coverImage);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(company);
    }
  };

  return (
    <div
      className="stacked-card-wrapper"
      onClick={() => onClick(company)}
      onKeyDown={handleKey}
      tabIndex={0}
      role="button"
      aria-label={`Ver trabalhos de ${company.name}`}
    >
      {/* Depth shadows */}
      <div className="stacked-card-shadow-2" aria-hidden="true" />
      <div className="stacked-card-shadow-1" aria-hidden="true" />

      {/* Main card */}
      <div className="stacked-card-main">
        {/* Preview image — design work, NO logos */}
        <div
          className="w-full aspect-[4/3] overflow-hidden relative"
          aria-hidden="true"
        >
          {coverImages[0] ? (
            <img
              src={coverImages[0]}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full placeholder-img">
              <span className="text-xs tracking-widest">Design Preview</span>
            </div>
          )}

          {/* Work count badge */}
          <span
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(10,15,28,0.8)',
              border: '1px solid rgba(59,130,246,0.3)',
              color: '#CBD5E1',
            }}
          >
            {company.works.length} trabalho{company.works.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Info */}
        <div className="p-5">
          {/* Industry tag */}
          <span className="section-label text-xs mb-2 block">
            {company.industry}
          </span>

          {/* Company name */}
          <h3 className="text-lg font-bold text-gray-200 mb-1.5 leading-tight">
            {company.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {company.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            {/* Year */}
            <span className="text-xs text-gray-500 font-medium">{company.year}</span>

            {/* CTA */}
            <span
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors"
              aria-hidden="true"
            >
              Ver trabalhos
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
