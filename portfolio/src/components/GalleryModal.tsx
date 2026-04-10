import React, { useCallback, useEffect, useState } from 'react';
import type { WorkItem } from '../data/companies';

// ============================================================
// GALLERY MODAL (LIGHTBOX)
// Opens on work click in 3D gallery. Shows all images for that
// work with prev/next navigation and keyboard support.
// ============================================================

interface GalleryModalProps {
  work: WorkItem;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ work, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = work.images.length;

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  return (
    <div
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria: ${work.name}`}
    >
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-4">
        <div>
          <span className="section-label text-xs">{work.label}</span>
          <h3 className="text-lg font-bold text-gray-200">{work.name}</h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Counter */}
          <span className="text-gray-500 text-sm" aria-live="polite">
            {currentIndex + 1} / {total}
          </span>

          {/* Close */}
          <button
            className="modal-close static"
            onClick={onClose}
            aria-label="Fechar galeria"
            style={{ position: 'relative', top: 'auto', right: 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="flex items-center gap-4 w-full max-w-4xl px-4">
        {/* Prev */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.25)',
            color: '#CBD5E1',
          }}
          aria-label="Imagem anterior"
          disabled={total <= 1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          {work.images[currentIndex] ? (
            <img
              key={currentIndex}
              src={work.images[currentIndex]}
              alt={`${work.name} — imagem ${currentIndex + 1}`}
              className="lightbox-img"
            />
          ) : (
            <div
              className="lightbox-img placeholder-img"
              style={{ width: '100%', maxWidth: 600, height: 400 }}
              aria-hidden="true"
            >
              <span className="text-sm tracking-widest">Imagem {currentIndex + 1}</span>
            </div>
          )}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.25)',
            color: '#CBD5E1',
          }}
          aria-label="Próxima imagem"
          disabled={total <= 1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div
          className="flex gap-2 mt-4 flex-wrap justify-center px-4"
          role="tablist"
          aria-label="Miniaturas"
        >
          {work.images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Ver imagem ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
              style={{
                border: `2px solid ${i === currentIndex ? '#3B82F6' : 'rgba(59,130,246,0.15)'}`,
                opacity: i === currentIndex ? 1 : 0.5,
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full placeholder-img" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      <p className="mt-4 text-xs text-gray-600" aria-hidden="true">
        ← → para navegar · Esc para fechar
      </p>
    </div>
  );
};

export default GalleryModal;
