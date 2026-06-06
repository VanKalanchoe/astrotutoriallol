import { ui, type Lang } from "./ui";

export const SUPPORTED_LANGS = Object.keys(ui) as Lang[];

/**
 * Safe language resolver (ONLY ONE in entire app)
 */
export function toLang(input?: string): Lang {
  return SUPPORTED_LANGS.includes(input as Lang)
    ? (input as Lang)
    : "en";
}

/**
 * Astro-native language detection (BEST option)
 */
export function getLang(Astro: any): Lang {
  return toLang(
    Astro.currentLocale ??
    Astro.params?.lang ??
    Astro.request?.headers?.get("accept-language")?.slice(0, 2)
  );
}

/**
 * Auto static routes (NO MORE typing arrays)
 */
export function langStaticPaths() {
  return SUPPORTED_LANGS.map((lang) => ({
    params: { lang },
  }));
}

/**
 * Direct dictionary access (simple mode)
 */
export function t(lang: Lang) {
  return ui[lang];
}