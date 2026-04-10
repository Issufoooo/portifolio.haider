import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import QuickProof from './sections/QuickProof';
import Services from './sections/Services';
import WebProjects from './sections/WebProjects';
import DesignPortfolio from './sections/DesignPortfolio';
import Thinking from './sections/Thinking';
import AboutContact from './sections/AboutContact';
import FinalCTA from './sections/FinalCTA';

// ============================================================
// ROOT APP — Haider Issufo Portfolio
// To reorder sections: move the component up or down in <main>.
// Testimonials section has been removed per brief.
// ============================================================

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-gray-200 font-sans">
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
  );
};

export default App;
