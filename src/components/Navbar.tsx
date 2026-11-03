import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import SliceButton from './SliceButton';
import { lockScroll, unlockScroll, scrollToTarget, scrollToTop } from '../lib/scroll';

// ============================================================
// NAVBAR  (Motion + Lenis)
// • Esconde ao descer, volta ao subir (mais ecrã para o conteúdo)
// • Indicador animado (layoutId) na secção activa
// • Menu mobile com entrada escalonada; bloqueia o scroll via Lenis
// ============================================================

const NAV_LINKS = [
  { label: 'Trabalhos', href: '#web-projects' },
  { label: 'Design', href: '#design-portfolio' },
  { label: 'Serviços', href: '#services' },
  { label: 'Sobre', href: '#about' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const { scrollY } = useScroll();

  // Esconder / mostrar consoante a direcção do scroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (menuOpen) return;
    if (latest > prev && latest > 240) setHidden(true);
    else if (latest < prev) setHidden(false);
  });

  // Secção activa
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Fechar menu ao passar para desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Bloquear scroll com o menu aberto (Lenis) + Esc para fechar
  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // pequeno atraso para o menu fechar e o Lenis voltar a arrancar
    setTimeout(() => scrollToTarget(href), 60);
  };

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="banner"
        animate={{ y: hidden && !menuOpen ? '-110%' : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between"
          aria-label="Navegação principal"
        >
          {/* Logo / brand */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-gray-200 font-bold text-lg tracking-tight no-underline relative z-50"
            aria-label="Início"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              setMenuOpen(false);
            }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #3B82F6)' }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" opacity="0.9" />
                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.9" />
              </svg>
            </span>
            <span className="gradient-text">Haider Issufo</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`relative block px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-gray-100' : 'text-gray-400 hover:text-gray-200'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'rgba(59,130,246,0.12)',
                          border: '1px solid rgba(96,165,250,0.2)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <SliceButton
              href="#about"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#about');
              }}
            >
              Falar comigo
            </SliceButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`hamburger md:hidden relative z-50${menuOpen ? ' open' : ''}`}
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
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(8,18,37,0.97)', backdropFilter: 'blur(16px)' }}
              onClick={() => setMenuOpen(false)}
            />
            <nav className="absolute top-0 left-0 right-0 pt-24 pb-10 px-6 flex flex-col" aria-label="Menu móvel">
              <ul className="space-y-1 mb-8" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      className="block text-2xl font-bold text-gray-300 hover:text-white py-3 border-b transition-colors"
                      style={{ borderColor: 'rgba(59,130,246,0.12)' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4 }}
              >
                <SliceButton
                  href="#about"
                  variant="primary"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#about');
                  }}
                >
                  Falar comigo
                </SliceButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
