import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../lib/SoundManager';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          soundManager.playRazorClick();
          return 100;
        }
        return prev + 6;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#07080c] text-white flex flex-col items-center justify-center font-mono select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(16px)',
        scale: 1.02,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Background Quantum Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Center Logo & Progress HUD */}
      <div className="relative z-10 flex flex-col items-center space-y-5 px-6 max-w-sm text-center">
        {/* Slanted Logo with subtle glow */}
        <div className="relative group">
          <img
            src="/I2FLabs-logo-new.png"
            alt="I2F Labs"
            className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          />
          {/* Laser Scanline Beam across logo */}
          <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        </div>

        {/* Telemetry Status text */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 tracking-[0.25em] uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SYNCHRONIZING BIO-DIGITAL RUNTIME</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            [ OMEGA INTENT ENGINE : <span className="text-white font-bold">{progress}%</span> ]
          </div>
        </div>

        {/* Precision Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-white transition-all duration-150 ease-out shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
