import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from '../config';
i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  .use(LanguageDetector)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,    
    fallbackLng: config.translations.fallbackLng, 
    ns: config.translations.defaultNS,   
    defaultNS: config.translations.defaultNS,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
    //saveMissing: true, // send not translated keys to endpoint
  });
export default i18n;