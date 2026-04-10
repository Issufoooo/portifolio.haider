import React from 'react';
import ProfileCard from '../components/ProfileCard';
import LayeredCard from '../components/LayeredCard';
import { useInView } from '../hooks/useInView';
import type { ProfileLink } from '../components/ProfileCard';
import type { SocialLink } from '../components/LayeredCard';

// ============================================================
// SECTION 7 — ABOUT / CONTACT
// ProfileCard (left) + LayeredCard social links (right).
// Stacked vertically on mobile.
// ============================================================

// ── Icons ────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="#3B82F6" strokeWidth="1.2"/>
    <circle cx="7" cy="7" r="2.5" stroke="#3B82F6" strokeWidth="1.2"/>
    <circle cx="10.5" cy="3.5" r="0.6" fill="#3B82F6"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1.5A5.5 5.5 0 0112.5 7 5.5 5.5 0 017 12.5a5.47 5.47 0 01-2.8-.77L1.5 12.5l.78-2.7A5.47 5.47 0 011.5 7 5.5 5.5 0 017 1.5z" stroke="#3B82F6" strokeWidth="1.2"/>
    <path d="M5 5.5c0 2.5 3.5 5 5.5 4M9 5.5c0 0-.5-.5-1-.5s-2.5 1-2.5 3" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#3B82F6" strokeWidth="1.2"/>
    <path d="M1.5 4.5l5.5 4 5.5-4" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ── Link data ─────────────────────────────────────────────────
// 📌 EDIT LINKS: Change href values to your real URLs
const PROFILE_LINKS: ProfileLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/haider.issufo?igsh=ZXg4em85ajBwN3U1',
    external: true,
    icon: <InstagramIcon />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/258871368121',
    external: true,
    icon: <WhatsAppIcon />,
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    label: 'Issufohaider@gmail.com',
    href: 'mailto:Issufohaider@gmail.com',
    icon: <EmailIcon />,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp — +258 87 136 8121',
    href: 'https://wa.me/258871368121',
    external: true,
    icon: <WhatsAppIcon />,
  },
  {
    id: 'instagram',
    label: '@haider.issufo',
    href: 'https://www.instagram.com/haider.issufo?igsh=ZXg4em85ajBwN3U1',
    external: true,
    icon: <InstagramIcon />,
  },
];

const AboutContact: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="py-20 md:py-28"
      aria-label="Sobre e Contacto"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div
          ref={ref}
          className={`reveal mb-12${inView ? ' visible' : ''}`}
        >
          <span className="section-label block mb-3">Sobre & Contacto</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#F3F4F6' }}>
            A pessoa por trás{' '}
            <span className="gradient-text-blue">do trabalho</span>.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8 md:gap-10">

          {/* Left: Profile Card */}
          <div className={`reveal reveal-delay-1${inView ? ' visible' : ''}`}>
            <ProfileCard
              // 📌 EDIT: Replace with your real profile image path when ready
              image="/assets/profile/photo.jpg"
              name="Haider Issufo"
              role="Freelancer — Design, Websites & Social Media"
              location="Maputo–Matola, Moçambique"
              bio="Trabalho com pequenas empresas que querem ser levadas a sério. Não entrego só ficheiros — entrego empenho. Trato cada projecto como se fosse meu, porque acredito que é assim que o trabalho fica mesmo bom. Design, websites, social media — faço tudo com a mesma atenção."
              badge="Disponível para projectos"
              links={PROFILE_LINKS}
            />
          </div>

          {/* Right: Contact + Social */}
          <div className={`reveal reveal-delay-2${inView ? ' visible' : ''} space-y-6`}>

            {/* Layered contact card */}
            <LayeredCard
              title="Fala comigo"
              subtitle="Respondo em menos de 24 horas."
              links={SOCIAL_LINKS}
              footer={
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
                  Prefiro começar com uma conversa curta para perceber se faz sentido trabalharmos juntos. Sem compromisso.
                </p>
              }
            />

            {/* Process snippet */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.12)',
              }}
            >
              <h4 className="text-sm font-bold text-gray-300 mb-3">Como trabalho</h4>
              <ol className="space-y-2.5" aria-label="Processo de trabalho">
                {[
                  '01 — Conversa inicial (gratuita)',
                  '02 — Proposta e alinhamento',
                  '03 — Execução com atualizações regulares',
                  '04 — Entrega e suporte pós-projeto',
                ].map((step) => (
                  <li key={step} className="flex items-center gap-2 text-xs" style={{ color: '#CBD5E1' }}>
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: '#3B82F6' }}
                      aria-hidden="true"
                    />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContact;
