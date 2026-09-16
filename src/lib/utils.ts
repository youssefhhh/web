import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/data/site";

/** Inline style that staggers a `[data-reveal]` element. */
export function revealDelay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

/** Builds a locale-prefixed path: href("ar", "/courses") -> "/ar/courses". */
export function href(locale: Locale, path = "/") {
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

const numberFormats = new Map<number, Intl.NumberFormat>();

/** Western digits with grouping, e.g. 2500 -> "2,500". */
export function formatNumber(value: number, decimals = 0) {
  let formatter = numberFormats.get(decimals);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    numberFormats.set(decimals, formatter);
  }
  return formatter.format(value);
}

export function formatPrice(value: number, locale: Locale) {
  return locale === "ar" ? `${formatNumber(value)} ج.م` : `EGP ${formatNumber(value)}`;
}

/** Replaces {placeholders} in a dictionary string. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function padNumber(value: number) {
  return value.toString().padStart(2, "0");
}
