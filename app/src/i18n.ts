import i18next, { type i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';

export type Lang = 'en' | 'es';

const instances: Partial<Record<Lang, i18n>> = {};

/**
 * Returns a memoised i18next instance bound to a single language.
 *
 * Each language gets its own instance so server prerendering is deterministic
 * (no shared mutable global state leaking between prerendered pages).
 *
 * English strings live inline in the JSX as `t(key, 'English default')`, so the
 * English resource bundle is intentionally empty and falls back to the default.
 */
export function getI18n(lng: Lang): i18n {
  const cached = instances[lng];
  if (cached) return cached;

  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    lng,
    fallbackLng: 'en',
    resources: {
      en: { translation: {} },
      es: { translation: es },
    },
    nsSeparator: false,
    keySeparator: '.',
    returnEmptyString: false,
    interpolation: { escapeValue: false },
  });

  instances[lng] = instance;
  return instance;
}
