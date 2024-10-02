import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resumeData, resumeDataPL } from './resumeData';


i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: resumeData,
    },
    pl: {
      translation: resumeDataPL,
    },
  },
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react escapes by default
  },
});

export default i18n;
