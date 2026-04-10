import React, { useEffect, useState } from 'react';
import type { WebProject } from '../data/projects';
import MobileMockupFrame from './MobileMockupFrame';
import SliceButton from './SliceButton';

// ============================================================
// PROJECT MODAL
// Supports phone mockup (mobile-first) and desktop mockup (SaaS).
// Order: video/mockup → problem/solution/result → screenshots → link
// ============================================================

// ── Desktop browser frame ─────────────────────────────────
const DesktopFrame: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div
    className="w-full rounded-xl overflow-hidden"
    style={{
      background: '#0F1B34',
      border: '1px solid rgba(59,130,246,0.2)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    }}
  >
    {/* Browser chrome */}
    <div
      className="flex items-center gap-2 px-4 py-2.5"
      style={{ background: '#0B1A30', borderBottom: '1px solid rgba(59,130,246,0.1)' }}
    >
      <div className="flex gap-1.5" aria-hidden="true">
        {['#EF4444','#F59E0B','#22C55E'].map((c, i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
      </div>
      <div
        className="flex-1 rounded-md px-3 py-1 text-xs text-gray-600 font-mono truncate"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      >
        haiderissufo.dev/{'{projecto}'}
      </div>
    </div>
    {/* Screenshot */}
    <div className="w-full overflow-hidden" style={{ maxHeight: 320 }}>
      <img src={src} alt={alt} className="w-full object-cover object-top block" loading="lazy" />
    </div>
  </div>
);

// ── Tag pill ──────────────────────────────────────────────
const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="text-xs font-semibold px-2.5 py-1 rounded-full"
    style={{
      background: 'rgba(59,130,246,0.12)',
      border: '1px solid rgba(59,130,246,0.25)',
      color: '#3B82F6',
    }}
  >
    {label}
  </span>
);

// ── Info block ────────────────────────────────────────────
const InfoBlock: React.FC<{
  label: string;
  color: string;
  iconPath: string;
  iconStroke: string;
  children: React.ReactNode;
}> = ({ label, color, iconPath, iconStroke, children }) => (
  <section aria-label={label}>
    <div className="flex items-center gap-2 mb-2">
      <span
        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d={iconPath} stroke={iconStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="text-xs font-bold tracking-wider uppercase" style={{ color }}>
        {label}
      </h3>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed pl-8">{children}</p>
  </section>
);

// ── Main modal ────────────────────────────────────────────
interface ProjectModalProps {
  project: WebProject;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [screenshotIdx, setScreenshotIdx] = useState(0);
  const isPhone = project.mockupType === 'phone';
  const hasScreenshots = (project.screenshots?.length ?? 0) > 1;

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape to close
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes: ${project.name}`}
    >
      <div className="modal-container">
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 md:p-8">

          {/* Header */}
          <div className="mb-6 pr-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map(t => <Tag key={t} label={t} />)}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200 leading-tight mb-2">
              {project.name}
            </h2>
            <p className="text-gray-400 text-base">{project.description}</p>
          </div>

          {/* ── Layout: phone = side-by-side, desktop = stacked ── */}
          {isPhone ? (
            // PHONE LAYOUT — mockup left, text right
            <div className="flex flex-col md:flex-row gap-8 mb-6">
              {/* Phone mockup */}
              <div className="flex justify-center md:justify-start flex-shrink-0">
                <MobileMockupFrame
                  src={project.video ?? project.preview}
                  type={project.video ? 'video' : 'image'}
                  alt={`Preview de ${project.name}`}
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6">
                <InfoBlock label="Problema" color="#EF4444" iconPath="M6 2v5M6 8.5v.5" iconStroke="#EF4444">
                  {project.problem}
                </InfoBlock>
                <InfoBlock label="Solução" color="#3B82F6" iconPath="M2 6l3 3 5-5" iconStroke="#3B82F6">
                  {project.solution}
                </InfoBlock>
                <InfoBlock label="Resultado" color="#22C55E" iconPath="M6 10V4M3 7l3-3 3 3" iconStroke="#22C55E">
                  {project.result}
                </InfoBlock>
                {project.link && (
                  <div className="pt-2">
                    <SliceButton href={project.link} variant="primary" size="md" external
                      icon={
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V9M8 2h4v4M12 2L6 8"
                            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                    >
                      Ver projecto ao vivo
                    </SliceButton>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // DESKTOP LAYOUT — mockup full width on top, text below
            <div className="space-y-6 mb-6">
              {/* Desktop mockup */}
              {project.screenshots && project.screenshots.length > 0 && (
                <DesktopFrame
                  src={project.screenshots[screenshotIdx]}
                  alt={`${project.name} — screenshot ${screenshotIdx + 1}`}
                />
              )}

              {/* Screenshot tabs (if multiple) */}
              {hasScreenshots && (
                <div className="flex gap-2 flex-wrap">
                  {project.screenshots!.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setScreenshotIdx(i)}
                      className="w-16 h-10 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0"
                      style={{
                        border: `2px solid ${i === screenshotIdx ? '#3B82F6' : 'rgba(59,130,246,0.15)'}`,
                        opacity: i === screenshotIdx ? 1 : 0.5,
                      }}
                      aria-label={`Ver screenshot ${i + 1}`}
                      aria-pressed={i === screenshotIdx}
                    >
                      <img src={s} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              {/* Text info row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <InfoBlock label="Problema" color="#EF4444" iconPath="M6 2v5M6 8.5v.5" iconStroke="#EF4444">
                  {project.problem}
                </InfoBlock>
                <InfoBlock label="Solução" color="#3B82F6" iconPath="M2 6l3 3 5-5" iconStroke="#3B82F6">
                  {project.solution}
                </InfoBlock>
                <InfoBlock label="Resultado" color="#22C55E" iconPath="M6 10V4M3 7l3-3 3 3" iconStroke="#22C55E">
                  {project.result}
                </InfoBlock>
              </div>

              {project.link && (
                <SliceButton href={project.link} variant="primary" size="md" external
                  icon={
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V9M8 2h4v4M12 2L6 8"
                        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                >
                  Ver projecto ao vivo
                </SliceButton>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
