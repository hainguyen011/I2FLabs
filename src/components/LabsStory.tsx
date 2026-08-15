import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../lib/SoundManager';
import { ArrowRight, Compass, Shield, Cpu, Zap } from 'lucide-react';

const CHAPTERS = [
  {
    id: '01',
    icon: Compass,
    titleKey: 'story.chapters.01.title',
    headlineKey: 'story.chapters.01.headline',
    leadKey: 'story.chapters.01.lead',
    subKey: 'story.chapters.01.sub',
  },
  {
    id: '02',
    icon: Cpu,
    titleKey: 'story.chapters.02.title',
    headlineKey: 'story.chapters.02.headline',
    leadKey: 'story.chapters.02.lead',
    subKey: 'story.chapters.02.sub',
  },
  {
    id: '03',
    icon: Shield,
    titleKey: 'story.chapters.03.title',
    headlineKey: 'story.chapters.03.headline',
    leadKey: 'story.chapters.03.lead',
    subKey: 'story.chapters.03.sub',
  },
  {
    id: '04',
    icon: Zap,
    titleKey: 'story.chapters.04.title',
    headlineKey: 'story.chapters.04.headline',
    leadKey: 'story.chapters.04.lead',
    subKey: 'story.chapters.04.sub',
  },
];

export default function LabsStory() {
  const { t } = useTranslation();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = CHAPTERS[activeChapterIndex];

  const handleSelectChapter = (idx: number) => {
    soundManager.playClick();
    setActiveChapterIndex(idx);
  };

  return (
    <section id="story" className="w-full bg-[#e5e6ea] text-[#121316] py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 01 // MANIFESTO & STORY ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              Pioneering the Next Era <br className="hidden sm:inline" />
              of Autonomous Intelligence.
            </h2>
          </div>
          
          {/* Chapter Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {CHAPTERS.map((chap, idx) => {
              const isSelected = activeChapterIndex === idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`loco-pill !text-xs ${
                    isSelected ? '!bg-[#121316] !text-white !border-black shadow-sm font-semibold' : ''
                  }`}
                >
                  <span>{chap.id}</span>
                  <span className="hidden sm:inline opacity-70">/ {t(chap.titleKey, { defaultValue: `Chapter ${chap.id}` })}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Editorial Story Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[380px]">
          
          {/* Left: Giant Chapter Number Watermark & Icon */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono font-semibold tracking-widest text-neutral-400">
                PHASE // 0{activeChapterIndex + 1}
              </span>
              <div className="w-10 h-10 rounded-full bg-[#121316] text-white flex items-center justify-center">
                <activeChapter.icon className="w-5 h-5" />
              </div>
            </div>

            <div className="my-8 z-10">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                {t(activeChapter.titleKey, { defaultValue: 'Core Pillar' })}
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wider">
                I2F Research Collective
              </p>
            </div>

            {/* Giant Watermark ID */}
            <div className="absolute -bottom-10 -right-6 text-[180px] font-black text-black/[0.04] leading-none pointer-events-none select-none">
              {activeChapter.id}
            </div>

            {/* Next Chapter Trigger */}
            <button
              onClick={() => handleSelectChapter((activeChapterIndex + 1) % CHAPTERS.length)}
              className="z-10 flex items-center space-x-2 text-xs font-semibold text-neutral-800 hover:text-black transition-colors"
            >
              <span>Next Phase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Rich Editorial Content */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.2] tracking-[-0.03em] text-[#121316]">
                  {t(activeChapter.headlineKey, {
                    defaultValue: 'Architecting intelligence from first principles.'
                  })}
                </h3>

                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                  {t(activeChapter.leadKey, {
                    defaultValue: 'We build foundational agentic frameworks, resilient decentralized kernels, and human-aligned intelligence tools.'
                  })}
                </p>

                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl border-l-2 border-neutral-400 pl-4">
                  {t(activeChapter.subKey, {
                    defaultValue: 'Engineered for extreme performance, auditability, and multi-modal synergy.'
                  })}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
