import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#d6d7db] text-[#121316] flex flex-col items-center justify-center font-mono select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        <span className="text-3xl font-normal tracking-[-0.04em]">
          I2F Labs<sup className="text-xs">®</sup>
        </span>
        <div className="flex items-center space-x-2 text-xs text-neutral-500 font-mono">
          <span>INITIALIZING VIETNAM RESEARCH LABS // AGENTIC AI</span>
          <span className="text-black font-semibold">{progress}%</span>
        </div>
        <div className="w-36 h-1 bg-neutral-300 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-neutral-900 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
