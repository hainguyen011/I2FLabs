import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t, i18n } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tacticalLogs = t('loading.logs', { returnObjects: true }) as string[];
    const ctx = gsap.context(() => {
      // 1. Progress Counter Animation
      const progressObj = { val: 0 };
      gsap.to(progressObj, {
        val: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(progressObj.val));
        }
      });

      // 2. Narrative Logs Sequencing
      const logTimeline = gsap.timeline();
      tacticalLogs.forEach((log, index) => {
        logTimeline.to({}, {
          duration: 0.4,
          onStart: () => {
            setLogs(prev => [...prev, log].slice(-5)); // Keep last 5 logs
          }
        }, index * 0.45);
      });
    });

    return () => ctx.revert();
  }, [t, i18n.language]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px) contrast(200%) brightness(200%)",
        transition: { duration: 0.8, ease: "circIn" }
      }}
    >
      {/* 1. Pure Black Background */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* 2. Tactical Background Grid (Faint White) */}
      <div className="absolute inset-0 opacity-[0.01] z-0" 
           style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 3. Progress — centered (no scanner ring) */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-5xl font-black tracking-tighter text-white flex items-baseline">
            <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{progress.toString().padStart(3, '0')}</span>
            <span className="text-[10px] ml-2 text-white/40 font-bold tracking-[0.2em] uppercase">{t('loading.sysInit')}</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-3 border border-white/10 ${i < progress / 5 ? 'bg-white shadow-[0_0_5px_white]' : 'bg-transparent'}`} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {progress === 100 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col items-center"
            >
              <div className="px-8 py-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-black tracking-[0.8em] text-[10px] uppercase animate-pulse">
                {t('loading.accessGranted')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Terminal Logs (Bottom Left - Monochrome) */}
      <div className="absolute bottom-12 left-12 z-40 max-w-md pointer-events-none">
        <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-4 font-black">
          {t('loading.terminalTitle')}
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-[10px] font-bold tracking-wider ${i === logs.length - 1 ? 'text-white' : 'text-white/20'}`}
            >
              {log.replace('_', ' ')}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Corner Decorations (Subtle) */}
      <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/10" />
      <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-white/10" />
      <div className="absolute bottom-12 right-12 w-32 h-16 border-b border-r border-white/10 text-white/10 p-2 text-[8px] flex items-end justify-end tracking-tighter">
        {t('loading.corner')}
      </div>

    </motion.div>
  );
};

export default Loading;
