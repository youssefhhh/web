import type { Locale } from "./config";
import ar from "./dictionaries/ar";
import en, { type PluralForms } from "./dictionaries/en";

const dictionaries = { ar, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

/** Picks the right plural form, e.g. plural(3, "ar", dict.common.sessions) -> "حصص". */
export function plural(count: number, locale: Locale, forms: PluralForms) {
  const rule = new Intl.PluralRules(locale).select(count);
  return forms[rule] ?? forms.other;
}

export type { Dictionary } from "./dictionaries/en";
