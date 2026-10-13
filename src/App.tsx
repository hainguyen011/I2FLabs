import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import HorizontalStory from './components/HorizontalStory';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Loading key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <main className="w-screen h-screen overflow-hidden bg-black text-[#F8FAFC] font-sans relative flex flex-col justify-between select-none">
        <HorizontalStory isLoading={loading} />
      </main>
    </>
  );
}

export default App;
