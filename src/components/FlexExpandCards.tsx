
import React, { useState, useCallback } from 'react';
import { useMobile } from '../hooks/useMobile';

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
  const isMobile = useMobile();
  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? '');

  const handleToggle = useCallback(
    (id: string) => {
      setActiveId((prev) => {
        if (isMobile) return prev === id ? '' : id;
        return id;
      });
    },
    [isMobile]
  );

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3" role="list" aria-label="Serviços">
        {services.map((service) => {
          const isActive = activeId === service.id;

          return (
            <article
              key={service.id}
              role="listitem"
              className={[
                'relative overflow-hidden rounded-[24px] border transition-all duration-300',
                'bg-[rgba(15,27,52,0.88)] border-white/10',
                isActive
                  ? 'shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_24px_60px_rgba(2,8,23,0.45)]'
                  : 'shadow-[0_10px_30px_rgba(2,8,23,0.22)]',
              ].join(' ')}
            >
              <button
                type="button"
                onClick={() => handleToggle(service.id)}
                className="w-full text-left px-5 py-4 flex items-center gap-4"
                aria-expanded={isActive}
                aria-controls={`service-panel-${service.id}`}
              >
                <span className="text-[12px] font-semibold tracking-[0.24em] text-blue-300/70 min-w-[28px]">
                  {service.number}
                </span>

                <div className="shrink-0 text-blue-400">{service.icon}</div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-100 leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400 leading-snug">
                    {service.tagline}
                  </p>
                </div>

                <span
                  className={[
                    'ml-2 shrink-0 transition-transform duration-300 text-blue-300',
                    isActive ? 'rotate-180' : 'rotate-0',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id={`service-panel-${service.id}`}
                className={[
                  'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                  isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-90',
                ].join(' ')}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-1 border-t border-white/8">
                    <p className="text-blue-300 text-sm font-semibold italic leading-snug">
                      "{service.tagline}"
                    </p>

                    <p className="mt-4 text-slate-300 text-[15px] leading-8">
                      {service.description}
                    </p>

                    <ul
                      className="mt-5 space-y-3"
                      aria-label={`O que inclui ${service.title}`}
                    >
                      {service.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-300 text-[15px] leading-7"
                        >
                          <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-400/20 via-blue-400 to-blue-300/20" />
              )}
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="flex gap-3 min-h-[560px] w-full"
      role="list"
      aria-label="Serviços"
    >
      {services.map((service) => {
        const isActive = activeId === service.id;

        return (
          <article
            key={service.id}
            role="listitem"
            tabIndex={0}
            onClick={() => handleToggle(service.id)}
            onMouseEnter={() => setActiveId(service.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle(service.id);
              }
            }}
            aria-expanded={isActive}
            aria-label={`Serviço: ${service.title}`}
            className={[
              'group relative overflow-hidden rounded-[28px] border cursor-pointer',
              'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
              'bg-[linear-gradient(180deg,rgba(15,27,52,0.92),rgba(8,18,37,0.98))]',
              'border-white/10',
              isActive
                ? 'shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_40px_100px_rgba(2,8,23,0.55)]'
                : 'shadow-[0_20px_60px_rgba(2,8,23,0.28)] hover:border-blue-400/30',
            ].join(' ')}
            style={{
              flex: isActive ? 4 : 1,
            }}
          >
            <span className="absolute left-5 top-5 text-[12px] font-semibold tracking-[0.24em] text-blue-300/55 z-10">
              {service.number}
            </span>

            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <span className="text-slate-300/72 text-[15px] font-semibold tracking-[0.2em] uppercase [writing-mode:vertical-rl] rotate-180">
                  {service.title}
                </span>
              </div>
            )}

            <div
              className={[
                'h-full transition-opacity duration-300',
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
              ].join(' ')}
            >
              <div className="relative z-10 h-full flex flex-col px-7 pt-16 pb-7">
                <div className="mb-5 text-blue-400">{service.icon}</div>

                <h3 className="text-[28px] font-black text-slate-100 leading-tight">
                  {service.title}
                </h3>

                <p className="mt-3 text-blue-300 text-[15px] font-semibold italic leading-7 max-w-[36ch]">
                  "{service.tagline}"
                </p>

                <p className="mt-5 text-slate-300 text-[15px] leading-8 max-w-[42ch]">
                  {service.description}
                </p>

                <ul
                  className="mt-6 space-y-3"
                  aria-label={`O que inclui ${service.title}`}
                >
                  {service.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 text-[15px] leading-7"
                    >
                      <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_30%)]" />
              </div>
            </div>

            {isActive && (
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-400/10 via-blue-400 to-blue-300/10" />
            )}
          </article>
        );
      })}
    </div>
  );
};

export default FlexExpandCards;
