import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import ResearchAreas from './components/ResearchAreas';
import Technologies from './components/Technologies';
import Capabilities from './components/Capabilities';
import Projects from './components/Projects';
import Team from './components/Team';
import OpenSource from './components/OpenSource';
import AIEthics from './components/AIEthics';
import AIEcosystemVN from './components/AIEcosystemVN';
import Contact from './components/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loading key="loading" />}
      </AnimatePresence>
      
      {!loading && (
        <div className="bg-black text-white min-h-screen font-mono">
          <Navigation />
          <Hero />
          <About />
          <ResearchAreas />
          <Technologies />
          <Capabilities />
          <Projects />
          <Team />
          <OpenSource />
          <AIEthics />
          <AIEcosystemVN />
          <Contact />
        </div>
      )}
    </>
  );
}

export default App;