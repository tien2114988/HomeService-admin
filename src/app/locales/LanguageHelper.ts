export const LANGUAGE_STORAGE_KEY = "location";

export type LanguageSupported = "en" | "vn";
const defaultLanguage: LanguageSupported = "vn";
const getLanguage = (): LanguageSupported => {
  if (!localStorage) {
    return defaultLanguage;
  }

  const ls_value: LanguageSupported | null = localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  ) as LanguageSupported;

  if (!ls_value) {
    return defaultLanguage;
  }
  return ls_value;
};

const setLanguage = (lang: LanguageSupported) => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.error("LOCAL STORAGE SAVE ERROR", error);
  }
};

export { getLanguage, setLanguage };
