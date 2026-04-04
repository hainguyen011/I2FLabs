import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import LanguageSwitcher from './components/LanguageSwitcher';
import Hero from './components/Hero';
import BrandBar from './components/BrandBar';
import LabsStory from './components/LabsStory';
import ResearchVision from './components/ResearchVision';
import BentoGrid from './components/BentoGrid';
import ProcessPipeline from './components/ProcessPipeline';
import PartnerLogos from './components/PartnerLogos';
import OpenSourceShowcase from './components/OpenSourceShowcase';
import Team from './components/Team';
import MetricsShowcase from './components/MetricsShowcase';
import CareersSection from './components/CareersSection';
import FAQSection from './components/FAQSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5 seconds for cinematic pacing

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis for smooth buttery scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loading key="loading" />}
      </AnimatePresence>
      
      {!loading && (
        <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
          <Navigation />
          <LanguageSwitcher />
          <Hero />
          <BrandBar />
          <LabsStory />
          <ResearchVision />
          <BentoGrid />
          <ProcessPipeline />
          <PartnerLogos />
          <OpenSourceShowcase />
          <Team />
          <MetricsShowcase />
          <CareersSection />
          <FAQSection />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;