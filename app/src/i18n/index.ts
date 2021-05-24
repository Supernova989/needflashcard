import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationEN = require("./en.json");

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
