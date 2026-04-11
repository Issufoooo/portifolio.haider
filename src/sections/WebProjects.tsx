import React, { useState } from 'react';
import { webProjects, type WebProject } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import { useInView } from '../hooks/useInView';

// ============================================================
// SECTION 4 — WEB PROJECTS
// Mozatour featured large. MesaFácil + LIFT in a row below.
// ============================================================

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
    style={{
      background: 'rgba(59,130,246,0.1)',
      color: '#60A5FA',
      border: '1px solid rgba(59,130,246,0.18)',
    }}
  >
    {label}
  </span>
);

const ProjectCard: React.FC<{
  project: WebProject;
  onClick: () => void;
  featured?: boolean;
  delay?: number;
  inView: boolean;
}> = ({ project, onClick, featured = false, delay = 1, inView }) => (
  <button
    className={`project-card ${
      featured ? 'featured' : ''
    } group text-left w-full reveal reveal-delay-${delay}${
      inView ? ' visible' : ''
    }`}
    onClick={onClick}
    aria-label={`Ver detalhes: ${project.name}`}
    type="button"
  >
    {/* Media */}
    <div
      className={`overflow-hidden w-full ${
        featured ? 'aspect-[16/9] md:aspect-[16/8]' : 'aspect-[16/10] sm:aspect-[16/9]'
      }`}
    >
      {project.preview?.endsWith('.mp4') ? (
        <video
          src={project.preview}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
        />
      ) : project.preview ? (
        <img
          src={project.preview}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full placeholder-img" aria-hidden="true">
          <span className="text-xs tracking-widest">Preview</span>
        </div>
      )}
    </div>

    {/* Hover CTA */}
    <div className="project-card-overlay" aria-hidden="true">
      <span className="project-card-cta">Ver projecto →</span>
    </div>

    {/* Info */}
    <div className={featured ? 'p-5 sm:p-6 md:p-7' : 'p-5'}>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>

      <h3
        className={`font-bold leading-tight mb-2 ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}
        style={{ color: '#F3F4F6' }}
      >
        {project.name}
      </h3>

      <p
        className={`leading-relaxed ${
          featured ? 'text-sm sm:text-base' : 'text-sm line-clamp-3'
        }`}
        style={{ color: '#94A3B8' }}
      >
        {project.description}
      </p>

      <div
        className="flex items-center gap-1.5 mt-4 text-sm font-semibold"
        style={{ color: '#60A5FA' }}
      >
        <span>Ver caso completo</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 6.5h8M7 3.5l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </button>
);

const WebProjects: React.FC = () => {
  const [selected, setSelected] = useState<WebProject | null>(null);
  const { ref, inView } = useInView();

  const [featured, ...rest] = webProjects;

  return (
    <section
      id="web-projects"
      className="py-24 md:py-32"
      style={{ background: '#081225' }}
      aria-label="Projectos Web"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div ref={ref} className={`reveal mb-14${inView ? ' visible' : ''}`}>
          <span className="section-label block mb-3">Projectos Web</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: '#F3F4F6' }}
            >
              Não só bonito —{' '}
              <span className="gradient-text-blue">funcional</span>.
            </h2>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: '#64748B' }}
            >
              Clica para ver o problema, a solução e o resultado real.
            </p>
          </div>
        </div>

        {/* Featured project */}
        {featured && (
          <div className={`mb-4 reveal reveal-delay-1${inView ? ' visible' : ''}`}>
            <ProjectCard
              project={featured}
              onClick={() => setSelected(featured)}
              featured
              delay={1}
              inView={inView}
            />
          </div>
        )}

        {/* Secondary projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              delay={i + 2}
              inView={inView}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default WebProjects;
