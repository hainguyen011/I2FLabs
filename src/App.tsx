import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // Quick cinematic intro for punchy first impression

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loading key="loading" />}
      </AnimatePresence>
      
      {!loading && (
        <main className="w-screen h-screen overflow-hidden bg-[#d6d7db] text-[#121316] font-sans relative flex flex-col justify-between select-none">
          <Navigation />
          <Hero />
        </main>
      )}
    </>
  );
}

export default App;