import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import faTranslation from './locales/fa/translation.json';
import zhTranslation from './locales/zh/translation.json';
import frTranslation from './locales/fr/translation.json';
import trTranslation from './locales/tr/translation.json';
import deTranslation from './locales/de/translation.json';
import ruTranslation from './locales/ru/translation.json';
import arTranslation from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fa: {
        translation: faTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      tr: {
        translation: trTranslation,
      },
      de: {
        translation: deTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
  });

export default i18n;
