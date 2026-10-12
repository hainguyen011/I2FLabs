import { useTranslation } from 'react-i18next';
import { soundManager } from '../lib/SoundManager';
import { ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const { t, i18n } = useTranslation();

  const handleTalkClick = () => {
    soundManager.playRazorClick();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  const toggleLanguage = () => {
    soundManager.playRazorClick();
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pt-4 md:pt-5 pb-2 px-6 sm:px-10 md:px-12 lg:px-16 flex items-center justify-between pointer-events-none select-none">
      
      {/* Brand Logo (Left) with New Kinetic Razor Logo */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={() => {
            soundManager.playRazorClick();
            window.location.reload();
          }}
          className="flex items-center gap-3 cursor-pointer text-left focus:outline-none group"
        >
          {/* New Slanted Razor Sharp Logo */}
          <div className="relative flex items-center">
            <img
              src="/I2FLabs-logo-new.png"
              alt="I2F Labs Vietnam"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-white/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          
          {/* Sub-label badge: Autonomous Systems Research */}
          <div className="hidden sm:flex flex-col justify-center border-l border-white/15 pl-3 py-0.5">
            <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase font-semibold">
              AUTONOMOUS RESEARCH
            </span>
            <span className="text-[8px] font-mono text-slate-500 tracking-wider">
              SWARM & LOCAL-FIRST OS
            </span>
          </div>
        </button>
      </div>

      {/* Right Controls: Language & "Let's talk" */}
      <div className="pointer-events-auto flex items-center space-x-4 sm:space-x-6">
        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          className="px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors focus:outline-none cursor-pointer"
        >
          {i18n.language === 'vi' ? 'EN' : 'VI'}
        </button>

        {/* Let's Talk Trigger with Sleek Glass Pill */}
        <button
          onClick={handleTalkClick}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-slate-200 text-xs sm:text-sm font-medium tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all cursor-pointer focus:outline-none"
        >
          <span>{t('nav.letsTalk', { defaultValue: "Let's talk" })}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </header>
  );
}
