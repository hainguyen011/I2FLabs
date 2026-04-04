import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import vi from '../locales/vi.json';
import en from '../locales/en.json';

const STORAGE_KEY = 'i2f-lang';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en },
    },
    fallbackLng: 'vi',
    supportedLngs: ['vi', 'en'],
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
    },
  });

function syncDocumentLang(lng: string) {
  document.documentElement.lang = lng === 'en' ? 'en' : 'vi';
}

syncDocumentLang(i18n.language || 'vi');

i18n.on('languageChanged', (lng) => {
  syncDocumentLang(lng);
});

export { STORAGE_KEY };
export default i18n;
