import React from 'react';

// ============================================================
// LAYERED CARD
// Adapted component — blue/dark system, depth shadows removed of
// colorful gradients, clean link rows with hover slide effect.
// ============================================================

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface LayeredCardProps {
  title?: string;
  subtitle?: string;
  links: SocialLink[];
  className?: string;
  footer?: React.ReactNode;
}

const LayeredCard: React.FC<LayeredCardProps> = ({
  title = 'Contacto',
  subtitle,
  links,
  className = '',
  footer,
}) => {
  return (
    <div className={`layered-card-wrapper ${className}`}>
      {/* Depth layers */}
      <div className="layered-card-layer layered-card-layer-3" aria-hidden="true" />
      <div className="layered-card-layer layered-card-layer-2" aria-hidden="true" />

      {/* Main card */}
      <div className="layered-card-main">
        {/* Header */}
        <header className="mb-5">
          {title && (
            <h3 className="text-lg font-bold text-gray-200 mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-400">{subtitle}</p>
          )}
        </header>

        {/* Links */}
        <nav aria-label={title}>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="layered-card-link"
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                >
                  {/* Icon */}
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(59,130,246,0.12)',
                      border: '1px solid rgba(59,130,246,0.2)',
                    }}
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>

                  {/* Label */}
                  <span className="flex-1 font-medium">{link.label}</span>

                  {/* Arrow */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="flex-shrink-0 opacity-40"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Optional footer slot */}
        {footer && (
          <div className="mt-5 pt-4 border-t border-blue-900/30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayeredCard;
