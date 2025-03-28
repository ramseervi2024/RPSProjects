import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en'
import es from './locales/es'
import hi from './locales/hi'
import kn from './locales/kn'
import ar from './locales/ar'

i18n.use(initReactI18next).init({
  resources: {
    en,
    es,
    hi,
    kn,
    ar
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;