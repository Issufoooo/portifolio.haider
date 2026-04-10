import React, { useState, useRef, useEffect } from 'react';
import { companies, type Company, type WorkItem } from '../data/companies';
import GalleryModal from '../components/GalleryModal';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 5 — DESIGN PORTFOLIO
// Company cards (stacked depth) → expanded panel (all works/images)
// ============================================================

// ── Company card ──────────────────────────────────────────────
const CompanyCard: React.FC<{
  company: Company;
  isActive: boolean;
  index: number;
  inView: boolean;
  onClick: () => void;
}> = ({ company, isActive, index, inView, onClick }) => {
  const cover = company.works[0]?.coverImage ?? '';
  const totalImages = company.works.reduce((sum, w) => sum + w.images.length, 0);

  return (
    <div
      className={`stacked-card-wrapper reveal reveal-delay-${Math.min(index + 1, 4)}${inView ? ' visible' : ''}`}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`${isActive ? 'Fechar' : 'Ver trabalhos de'} ${company.name}`}
    >
      <div className="stacked-card-shadow-2" aria-hidden="true" />
      <div className="stacked-card-shadow-1" aria-hidden="true" />

      <div className="stacked-card-main" style={isActive ? {
        borderColor: 'rgba(96,165,250,0.5)',
        boxShadow: '0 0 0 1px rgba(96,165,250,0.25), 0 20px 48px rgba(0,0,0,0.45)',
      } : {}}>
        {/* Cover */}
        <div className="w-full overflow-hidden relative" style={{ aspectRatio: '4/3' }}>
          {cover ? (
            <img src={cover} alt="" loading="lazy"
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 0.55s ease',
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
              }} />
          ) : (
            <div className="w-full h-full placeholder-img"><span>Preview</span></div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0" style={{
            background: isActive
              ? 'linear-gradient(to top, rgba(8,18,37,0.75) 0%, rgba(8,18,37,0.1) 60%)'
              : 'linear-gradient(to top, rgba(8,18,37,0.55) 0%, transparent 55%)',
            transition: 'background 0.4s ease',
          }} aria-hidden="true" />

          {/* Active glow top border */}
          {isActive && (
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, #60A5FA, transparent)' }}
              aria-hidden="true" />
          )}

          {/* Image/work counts */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: '#F3F4F6', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {company.works.length} trabalho{company.works.length > 1 ? 's' : ''}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(8,18,37,0.75)', color: '#94A3B8', border: '1px solid rgba(96,165,250,0.2)' }}>
              {totalImages} img
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="section-label text-[0.65rem] block mb-1">{company.industry}</span>
              <h3 className="text-base font-bold leading-tight truncate" style={{ color: '#F3F4F6' }}>
                {company.name}
              </h3>
            </div>
            <div
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-300"
              style={{
                background: isActive ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.07)',
                border: `1px solid ${isActive ? 'rgba(96,165,250,0.45)' : 'rgba(96,165,250,0.15)'}`,
                color: isActive ? '#93C5FD' : '#60A5FA',
              }}
              aria-hidden="true"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d={isActive ? 'M9 5.5H2' : 'M2 5.5h7M5.5 2l3 3.5-3 3.5'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <p className="text-xs leading-relaxed mt-2 line-clamp-2" style={{ color: '#475569' }}>
            {company.description}
          </p>
          <span className="text-xs mt-2.5 block font-medium" style={{ color: '#334155' }}>{company.year}</span>
        </div>
      </div>
    </div>
  );
};

// ── Work block ────────────────────────────────────────────────
const WorkBlock: React.FC<{
  work: WorkItem;
  onImageClick: () => void;
}> = ({ work, onImageClick }) => (
  <div>
    {/* Work label row */}
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-6 h-px" style={{ background: '#3B82F6' }} aria-hidden="true" />
        <span className="text-xs font-black tracking-wider px-2.5 py-1 rounded-lg"
          style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}>
          {work.label}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-bold" style={{ color: '#F3F4F6' }}>{work.name}</h4>
        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#475569' }}>{work.description}</p>
      </div>
      <span className="text-xs flex-shrink-0 font-medium" style={{ color: '#334155' }}>
        {work.images.length} imagens
      </span>
    </div>

    {/* All images — no limits */}
    <div className="grid gap-2.5" style={{
      gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
    }}>
      {work.images.map((img, i) => (
        <button key={i} onClick={onImageClick}
          className="relative rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ aspectRatio: '1/1', background: '#0F1B34', border: '1px solid rgba(96,165,250,0.08)' }}
          aria-label={`Abrir galeria — ${work.name}`}>
          {img ? (
            <img src={img} alt={`${work.name} ${i + 1}`} loading="lazy"
              className="w-full h-full object-cover"
              style={{ transition: 'transform 0.4s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
          ) : (
            <div className="w-full h-full placeholder-img" />
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
            style={{ background: 'rgba(8,18,37,0.55)' }} aria-hidden="true">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.9)', backdropFilter: 'blur(4px)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ── Expanded panel ────────────────────────────────────────────
const CompanyPanel: React.FC<{
  company: Company;
  onClose: () => void;
  onImageClick: (work: WorkItem) => void;
}> = ({ company, onClose, onImageClick }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  }, []);

  return (
    <div ref={panelRef} className="mt-8 rounded-2xl overflow-hidden"
      style={{
        background: '#060F1E',
        border: '1px solid rgba(96,165,250,0.18)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.08)',
        animation: 'modalIn 0.35s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      }}
      aria-live="polite" aria-label={`Portfólio de ${company.name}`}>

      {/* Panel header */}
      <div className="flex items-start justify-between p-6 md:p-7"
        style={{ borderBottom: '1px solid rgba(96,165,250,0.1)' }}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" />
            <span className="section-label text-[0.65rem]">{company.industry} · {company.year}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-1" style={{ color: '#F3F4F6' }}>
            {company.name}
          </h3>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: '#64748B' }}>
            {company.description}
          </p>
        </div>
        <button onClick={onClose} aria-label="Fechar"
          className="flex-shrink-0 ml-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(96,165,250,0.15)', color: '#94A3B8' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.15)'; e.currentTarget.style.color = '#F3F4F6'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.07)'; e.currentTarget.style.color = '#94A3B8'; }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Works */}
      <div className="p-6 md:p-7 space-y-10">
        {company.works.map((work, i) => (
          <React.Fragment key={work.id}>
            <WorkBlock work={work} onImageClick={() => onImageClick(work)} />
            {i < company.works.length - 1 && (
              <div className="section-divider" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────
const DesignPortfolio: React.FC = () => {
  const { ref, inView } = useInView();
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);

  const toggle = (company: Company) => {
    setActiveCompany(prev => prev?.id === company.id ? null : company);
    setActiveWork(null);
  };

  return (
    <section id="design-portfolio" className="py-24 md:py-32 overflow-hidden"
      style={{ background: '#0A1628' }} aria-label="Portfólio de Design">

      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal mb-14${inView ? ' visible' : ''}`}>
          <span className="section-label block mb-3">Portfólio de Design</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#F3F4F6' }}>
              Trabalho que <span className="gradient-text-blue">posiciona</span>.
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#64748B' }}>
              Selecciona uma empresa para ver todos os trabalhos e imagens.
            </p>
          </div>
        </div>

        {/* Company grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {companies.map((company, i) => (
            <CompanyCard key={company.id} company={company}
              isActive={activeCompany?.id === company.id}
              index={i} inView={inView}
              onClick={() => toggle(company)} />
          ))}
        </div>

        {/* Expanded panel */}
        {activeCompany && (
          <CompanyPanel
            company={activeCompany}
            onClose={() => setActiveCompany(null)}
            onImageClick={work => setActiveWork(work)}
          />
        )}
      </div>

      {activeWork && <GalleryModal work={activeWork} onClose={() => setActiveWork(null)} />}
    </section>
  );
};

export default DesignPortfolio;
