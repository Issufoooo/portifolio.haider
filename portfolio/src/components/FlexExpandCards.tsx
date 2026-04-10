import React, { useState, useCallback } from 'react';
import { useMobile } from '../hooks/useMobile';

// ============================================================
// FLEX EXPAND CARDS
// Adapted component — blue design system, semantic HTML,
// desktop: hover/click to expand. Mobile: tap accordion.
// ============================================================

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
}

interface FlexExpandCardsProps {
  services: ServiceItem[];
}

const FlexExpandCards: React.FC<FlexExpandCardsProps> = ({ services }) => {
  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? '');
  const isMobile = useMobile();

  const handleToggle = useCallback((id: string) => {
    setActiveId((prev) => (isMobile && prev === id ? '' : id));
  }, [isMobile]);

  return (
    <div
      className="service-cards-container"
      role="list"
      aria-label="Serviços"
    >
      {services.map((service) => {
        const isActive = activeId === service.id;

        return (
          <article
            key={service.id}
            role="listitem"
            className={`service-card${isActive ? ' is-active' : ''}`}
            onClick={() => handleToggle(service.id)}
            onMouseEnter={() => !isMobile && setActiveId(service.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle(service.id);
              }
            }}
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`Serviço: ${service.title}`}
          >
            {/* Number indicator */}
            <span className="service-card-number" aria-hidden="true">
              {service.number}
            </span>

            {/* Vertical label (collapsed state) */}
            <span className="service-card-label-vertical" aria-hidden="true">
              {service.title}
            </span>

            {/* Expanded content */}
            <div className="service-card-content">
              {/* Icon */}
              <div className="mb-4 text-blue-500" aria-hidden="true">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-200 mb-2 leading-tight">
                {service.title}
              </h3>

              {/* Tagline */}
              <p className="text-blue-400 text-sm font-semibold mb-3 leading-snug italic">
                "{service.tagline}"
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Points */}
              <ul className="space-y-1.5" aria-label={`O que inclui ${service.title}`}>
                {service.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-400 text-sm"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Active glow border */}
            {isActive && (
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"
                aria-hidden="true"
              />
            )}
          </article>
        );
      })}
    </div>
  );
};

export default FlexExpandCards;
