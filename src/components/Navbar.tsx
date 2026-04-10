import React, { useEffect, useState } from 'react';
import SliceButton from './SliceButton';

// ============================================================
// NAVBAR
// Fixed top, transparent → blurred dark on scroll.
// Desktop: inline links. Mobile: hamburger slide-down menu.
// ============================================================

const NAV_LINKS = [
  { label: 'Trabalhos', href: '#web-projects' },
  { label: 'Design', href: '#design-portfolio' },
  { label: 'Serviços', href: '#services' },
  { label: 'Sobre', href: '#about' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        <nav
          className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between"
          aria-label="Navegação principal"
        >
          {/* Logo / brand */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-gray-200 font-bold text-lg tracking-tight no-underline"
            aria-label="Início"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMenuOpen(false);
            }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #3B82F6)',
              }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
              </svg>
            </span>
            <span className="gradient-text">Haider Issufo</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <SliceButton
              href="#about"
              variant="outline"
              size="sm"
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                handleNavClick('#about');
              }}
            >
              Falar comigo
            </SliceButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`hamburger md:hidden z-50${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 transition-all duration-400 md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'rgba(8,18,37,0.96)', backdropFilter: 'blur(16px)' }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu content */}
        <nav
          className={`absolute top-0 left-0 right-0 pt-24 pb-10 px-6 flex flex-col transition-all duration-400 ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          aria-label="Menu móvel"
        >
          <ul className="space-y-2 mb-8" role="list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-2xl font-bold text-gray-300 hover:text-white py-3 border-b transition-colors"
                  style={{
                    borderColor: 'rgba(59,130,246,0.12)',
                    transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <SliceButton
            href="#about"
            variant="primary"
            size="lg"
            onClick={(e?: React.MouseEvent) => {
              e?.preventDefault();
              handleNavClick('#about');
            }}
          >
            Falar comigo
          </SliceButton>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
