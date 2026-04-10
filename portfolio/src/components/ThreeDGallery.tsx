import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { WorkItem } from '../data/companies';
import { useMobile } from '../hooks/useMobile';

// ============================================================
// 3D DESIGN GALLERY
// CSS perspective + rotateY cylinder carousel.
// Desktop: drag to rotate, click to open work.
// Mobile: responsive 2-column grid fallback.
// ============================================================

interface ThreeDGalleryProps {
  works: WorkItem[];
  onWorkClick: (work: WorkItem) => void;
}

const RADIUS_BASE = 320; // px — adjusted by item count
const AUTO_ROTATE_SPEED = 0.18; // degrees per frame

const ThreeDGallery: React.FC<ThreeDGalleryProps> = ({ works, onWorkClick }) => {
  const isMobile = useMobile(900);

  const [rotation, setRotation] = useState(0);
  const rotRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRot = useRef(0);
  const autoRotateRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const n = works.length;
  const angleStep = n > 0 ? 360 / n : 0;
  const radius = Math.max(RADIUS_BASE, n * 72);

  // ── Auto-rotate ──────────────────────────────────────────
  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) return;
    const tick = () => {
      rotRef.current += AUTO_ROTATE_SPEED;
      setRotation(rotRef.current);
      autoRotateRef.current = requestAnimationFrame(tick);
    };
    autoRotateRef.current = requestAnimationFrame(tick);
  }, []);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      cancelAnimationFrame(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isMobile) startAutoRotate();
    return () => stopAutoRotate();
  }, [isMobile, startAutoRotate, stopAutoRotate]);

  // ── Mouse drag ───────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartRot.current = rotRef.current;
    stopAutoRotate();
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (e.clientX - dragStartX.current) * 0.4;
    rotRef.current = dragStartRot.current - delta;
    setRotation(rotRef.current);
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    startAutoRotate();
  }, [startAutoRotate]);

  // ── Touch drag ───────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartRot.current = rotRef.current;
    stopAutoRotate();
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const delta = (e.touches[0].clientX - dragStartX.current) * 0.4;
    rotRef.current = dragStartRot.current - delta;
    setRotation(rotRef.current);
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    // Don't restart auto-rotate on touch — let user stay in control
  }, []);

  // Global listeners
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  // ── Click guard: don't fire click after drag ─────────────
  const dragDistance = useRef(0);

  const handleItemClick = (work: WorkItem, e: React.MouseEvent) => {
    // Suppress if user dragged more than 8px
    if (Math.abs(dragDistance.current) > 8) {
      dragDistance.current = 0;
      return;
    }
    e.stopPropagation();
    onWorkClick(work);
  };

  // ── MOBILE: flat grid ────────────────────────────────────
  if (isMobile) {
    return (
      <div className="gallery-mobile-grid" role="list">
        {works.map((work) => (
          <button
            key={work.id}
            role="listitem"
            className="rounded-xl overflow-hidden bg-canvas-card border border-blue-900/20 cursor-pointer text-left w-full transition-all duration-300 hover:border-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onWorkClick(work)}
            aria-label={`Abrir trabalho: ${work.name}`}
          >
            {/* Image */}
            <div className="w-full aspect-[4/3] overflow-hidden relative">
              {work.coverImage ? (
                <img
                  src={work.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full placeholder-img">
                  <span className="text-xs tracking-widest">{work.label}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <span className="text-xs text-blue-500 font-bold">{work.label}</span>
              <h4 className="text-sm font-semibold text-gray-200 mt-0.5 leading-tight">
                {work.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {work.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  // ── DESKTOP: 3D carousel ─────────────────────────────────
  return (
    <div
      className="gallery-3d-scene"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      role="region"
      aria-label="Galeria 3D de trabalhos — arrasta para rodar"
    >
      {/* Hint */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Arrasta para rodar · Clica para ver
      </div>

      {/* 3D Carousel */}
      <div
        ref={carouselRef}
        className="gallery-3d-carousel"
        style={{
          transform: `rotateY(${rotation}deg)`,
        }}
        aria-hidden="true" // Items are keyboard-accessible via the mobile fallback pattern
      >
        {works.map((work, i) => {
          const angle = angleStep * i;
          return (
            <div
              key={work.id}
              className="gallery-3d-item"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
              onClick={(e) => handleItemClick(work, e)}
              onMouseDown={() => { dragDistance.current = 0; }}
              onMouseMove={(e) => {
                if (isDragging.current) dragDistance.current += Math.abs(e.movementX);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onWorkClick(work);
              }}
              aria-label={`${work.label} — ${work.name}`}
            >
              {/* Work preview image */}
              {work.coverImage ? (
                <img
                  src={work.coverImage}
                  alt={work.name}
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full placeholder-img">
                  <span className="text-xs tracking-widest">{work.label}</span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="gallery-3d-item-overlay">
                <span className="text-xs text-blue-400 font-bold mb-0.5 block">
                  {work.label}
                </span>
                <span className="text-sm font-semibold text-gray-200 block leading-tight">
                  {work.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeDGallery;
