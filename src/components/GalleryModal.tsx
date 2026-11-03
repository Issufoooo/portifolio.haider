import React, { useCallback, useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import type { WorkItem } from '../data/companies';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { useLenisLock } from '../hooks/useLenisLock';

// ============================================================
// GALLERY MODAL (LIGHTBOX)
// shadcn Dialog (acessibilidade) + Motion (transição entre imagens
// com direcção e gesto de arrastar no telemóvel).
// Abre na imagem em que clicaste.
// ============================================================

interface GalleryModalProps {
  work: WorkItem;
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const slide = {
  enter: (dir: number) => ({ x: dir * 70, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir * -70, opacity: 0, scale: 0.98 }),
};

const GalleryModal: React.FC<GalleryModalProps> = ({ work, initialIndex = 0, open, onOpenChange }) => {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([initialIndex, 0]);
  const total = work.images.length;

  useLenisLock(open);

  // Ao abrir, começa na imagem clicada
  useEffect(() => {
    if (open) setPage([initialIndex, 0]);
  }, [open, initialIndex, work.id]);

  const paginate = useCallback(
    (dir: number) => setPage(([i]) => [(i + dir + total) % total, dir]),
    [total]
  );

  // Setas do teclado (o Esc é tratado pelo Dialog)
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, paginate]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (total <= 1) return;
    if (info.offset.x < -70 || info.velocity.x < -500) paginate(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) paginate(-1);
  };

  const img = work.images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-[rgba(8,18,37,0.97)] z-[1100]"
        className="z-[1101] left-0 top-0 translate-x-0 translate-y-0 w-full h-full flex flex-col items-center justify-center p-4"
        aria-describedby="gallery-desc"
        onClick={(e) => {
          if (e.target === e.currentTarget) onOpenChange(false);
        }}
      >
        {/* Header */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-4">
          <div>
            <span className="section-label text-xs">{work.label}</span>
            <DialogTitle className="text-lg font-bold text-gray-200">{work.name}</DialogTitle>
            <DialogDescription id="gallery-desc" className="sr-only">
              Galeria de imagens. Usa as setas para navegar e Esc para fechar.
            </DialogDescription>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm" aria-live="polite">
              {currentIndex + 1} / {total}
            </span>
            <DialogPrimitive.Close
              className="modal-close"
              aria-label="Fechar galeria"
              style={{ position: 'relative', top: 'auto', right: 'auto' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </DialogPrimitive.Close>
          </div>
        </div>

        {/* Main image */}
        <div className="flex items-center gap-4 w-full max-w-4xl px-4">
          <button
            onClick={() => paginate(-1)}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-primary/25"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#CBD5E1' }}
            aria-label="Imagem anterior"
            disabled={total <= 1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex-1 flex justify-center overflow-hidden min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={onDragEnd}
                className="flex justify-center touch-pan-y"
              >
                {img ? (
                  <img
                    src={img}
                    alt={`${work.name} — imagem ${currentIndex + 1}`}
                    className="lightbox-img pointer-events-none select-none"
                    draggable={false}
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
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(1)}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-primary/25"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#CBD5E1' }}
            aria-label="Próxima imagem"
            disabled={total <= 1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 mt-4 flex-wrap justify-center px-4" role="tablist" aria-label="Miniaturas">
            {work.images.map((thumb, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Ver imagem ${i + 1}`}
                onClick={() => setPage([i, i > currentIndex ? 1 : -1])}
                className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
                style={{
                  border: `2px solid ${i === currentIndex ? '#3B82F6' : 'rgba(59,130,246,0.15)'}`,
                  opacity: i === currentIndex ? 1 : 0.5,
                }}
              >
                {thumb ? (
                  <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full placeholder-img" />
                )}
              </button>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-600" aria-hidden="true">
          ← → para navegar · Esc para fechar
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
