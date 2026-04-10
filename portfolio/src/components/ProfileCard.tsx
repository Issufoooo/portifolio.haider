import React from 'react';

// ============================================================
// PROFILE CARD
// Adapted component — dark/blue glass-morphism, simplified hover,
// image, name, bio, links row. Mobile-optimised layout.
// ============================================================

export interface ProfileLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface ProfileCardProps {
  image?: string;
  name: string;
  role: string;
  location?: string;
  bio: string;
  links: ProfileLink[];
  className?: string;
  badge?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  role,
  location,
  bio,
  links,
  className = '',
  badge,
}) => {
  // Initials fallback
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`profile-card ${className}`}>
      {/* Top gradient band */}
      <div className="h-24 relative" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 100%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 bg-grid opacity-30"
          style={{ backgroundSize: '24px 24px' }}
        />
      </div>

      {/* Avatar row */}
      <div className="px-6 -mt-10 mb-4 flex items-end gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={`Foto de ${name}`}
              className="profile-card-avatar w-20 h-20"
            />
          ) : (
            <div
              className="profile-card-avatar w-20 h-20 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #3B82F6)',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
              }}
              aria-label={`Iniciais: ${initials}`}
            >
              {initials}
            </div>
          )}

          {/* Online badge */}
          <span
            className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
            style={{
              background: '#22c55e',
              borderColor: '#0F1B34',
            }}
            title="Disponível"
            aria-label="Disponível para projetos"
          />
        </div>

        {/* Optional badge */}
        {badge && (
          <span
            className="mb-1 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.3)',
              color: '#3B82F6',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-gray-200 leading-tight">{name}</h2>
        <p className="text-blue-400 text-sm font-medium mb-1">{role}</p>

        {location && (
          <p className="text-gray-500 text-xs flex items-center gap-1 mb-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.74 3.5 6.5 3.5 6.5s3.5-3.76 3.5-6.5C9.5 2.57 7.93 1 6 1zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
                fill="#6B7280"
              />
            </svg>
            {location}
          </p>
        )}

        {/* Bio */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{bio}</p>

        {/* Divider */}
        <div className="section-divider mb-5" aria-hidden="true" />

        {/* Links */}
        <nav aria-label={`Links de ${name}`}>
          <div className="flex flex-wrap gap-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="profile-card-link"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
              >
                <span aria-hidden="true">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProfileCard;
