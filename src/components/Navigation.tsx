import { useTranslation } from 'react-i18next';
import { soundManager } from '../lib/SoundManager';

export default function Navigation() {
  const { t, i18n } = useTranslation();

  const handleTalkClick = () => {
    soundManager.playClick();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  const toggleLanguage = () => {
    soundManager.playClick();
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pt-5 md:pt-6 pb-2 px-6 sm:px-10 md:px-12 lg:px-16 flex items-center justify-between pointer-events-none select-none">
      
      {/* Brand Logo (Left) */}
      <div className="pointer-events-auto">
        <button
          onClick={() => {
            soundManager.playClick();
            window.location.reload();
          }}
          className="flex items-center cursor-pointer text-left focus:outline-none"
        >
          <span className="text-xl md:text-2xl font-normal tracking-[-0.03em] text-[#111111]">
            I2F Labs<sup className="text-[11px] ml-0.5 font-normal">®</sup>
          </span>
        </button>
      </div>

      {/* Right Controls: Language & "Let's talk" */}
      <div className="pointer-events-auto flex items-center space-x-6">
        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          className="text-xs font-medium tracking-wide text-neutral-600 hover:text-black focus:outline-none cursor-pointer"
        >
          {i18n.language === 'vi' ? 'EN' : 'VI'}
        </button>

        {/* Let's Talk Trigger (Clean, No-Scale, No-Shadow) */}
        <button
          onClick={handleTalkClick}
          className="text-lg md:text-xl font-normal tracking-[-0.02em] text-[#111111] hover:text-neutral-700 focus:outline-none cursor-pointer"
        >
          {t('nav.letsTalk', { defaultValue: "Let's talk" })}
        </button>
      </div>

    </header>
  );
}