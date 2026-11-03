import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import QuickProof from './sections/QuickProof';
import Services from './sections/Services';
import WebProjects from './sections/WebProjects';
import DesignPortfolio from './sections/DesignPortfolio';
import Thinking from './sections/Thinking';
import AboutContact from './sections/AboutContact';
import FinalCTA from './sections/FinalCTA';
import { initScroll } from './lib/scroll';

// ============================================================
// ROOT APP — Haider Issufo Portfolio
// To reorder sections: move the component up or down in <main>.
// Testimonials section has been removed per brief.
//
// Bibliotecas e o papel de cada uma:
//   Lenis    → scroll suave (lib/scroll.ts)
//   GSAP     → coreografia ligada ao scroll (Hero, títulos, Thinking, parallax)
//   Motion   → estados/gestos de componentes (Navbar, modais, cartões)
//   R3F      → cena 3D do Hero (components/three)
//   shadcn   → primitivas acessíveis (Dialog) em components/ui
//   Aceternity → efeitos prontos em components/aceternity
// ============================================================

const App: React.FC = () => {
  useEffect(() => initScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-gray-200 font-sans">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <QuickProof />
          <Services />
          <WebProjects />
          <DesignPortfolio />
          <Thinking />
          <AboutContact />
          <FinalCTA />
        </main>
      </div>
    </MotionConfig>
  );
};

export default App;
