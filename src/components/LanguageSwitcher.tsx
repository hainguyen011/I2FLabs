import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Lang = 'vi' | 'en';

const LangButton = ({
  code,
  label,
  active,
  onSelect,
}: {
  code: Lang;
  label: string;
  active: boolean;
  onSelect: (c: Lang) => void;
}) => (
  <button
    type="button"
    onClick={() => onSelect(code)}
    className={`rounded-md px-2.5 py-1 text-[10px] font-black tracking-[0.2em] transition-colors md:px-3 md:text-[11px] ${
      active ? 'bg-white/15 text-white' : 'text-white/45 hover:text-white/80'
    }`}
    aria-pressed={active}
    lang={code}
  >
    {label}
  </button>
);

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'vi').startsWith('en') ? 'en' : 'vi';

  const setLang = (lng: Lang) => {
    void i18n.changeLanguage(lng).then(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  };

  return (
    <div
      className="fixed right-6 top-8 z-50 flex items-center gap-0.5 rounded-lg border border-white/10 bg-black/50 px-0.5 py-0.5 backdrop-blur-xl md:right-8"
      role="group"
      aria-label={t('lang.switch')}
    >
      <LangButton code="vi" label="VI" active={current === 'vi'} onSelect={setLang} />
      <span className="select-none text-white/15" aria-hidden>
        |
      </span>
      <LangButton code="en" label="EN" active={current === 'en'} onSelect={setLang} />
    </div>
  );
};

export default LanguageSwitcher;
