export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

/** localStorage key remembering the visitor's chosen language. */
export const LOCALE_STORAGE_KEY = "mdrive-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

/** Open Graph locales (values Facebook recognises). */
export const openGraphLocale: Record<Locale, string> = {
  ar: "ar_AR",
  en: "en_US",
};

/** hreflang codes — region-specific, since the academy serves Egypt. */
export const hreflang: Record<Locale, string> = {
  ar: "ar-EG",
  en: "en-EG",
};

/** A value that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;
