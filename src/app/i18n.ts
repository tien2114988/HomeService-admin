import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import vn from "./locales/vn.json";
import { getLanguage, LANGUAGE_STORAGE_KEY } from "./locales/LanguageHelper";

const lang = getLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vn: { translation: vn },
    },
    lng: `${lang}`,
    fallbackLng: `${lang}`,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
