import type { Metadata } from "next";
import { branches } from "@/data/branches";
import { courses } from "@/data/courses";
import { keywordsFor, type SeoPage } from "@/data/seo";
import { site } from "@/data/site";
import { hreflang, locales, openGraphLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { format, formatNumber } from "@/lib/utils";

/** Fills {fromPrice} and {branches} in meta copy from the live data files. */
export function fillMeta(text: string, locale: Locale) {
  return format(text, {
    fromPrice: formatNumber(Math.min(...courses.map((course) => course.price))),
    branches: branches.map((branch) => branch.name[locale]).join(locale === "ar" ? "، " : ", "),
  });
}

/** Site-relative page URL with the trailing slash used by the static export: ("ar", "/courses") → "/ar/courses/". */
export function pagePath(locale: Locale, path = "/") {
  return `/${locale}${path === "/" ? "" : path}/`;
}

/** Absolute public URL for a site-relative path (includes the GitHub Pages sub-path). */
export function absoluteUrl(path: string) {
  return `${site.url}${path}`;
}

/** Shortens text to `max` characters on a word boundary. */
export function truncate(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,،.:;—–-]+$/, "")}…`;
}

export function shareImage(locale: Locale) {
  return {
    url: `/og/og-${locale}.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: getDictionary(locale).meta.siteName,
  };
}

/** Site-wide defaults shared by every root layout. */
export function baseMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.home.title, template: "%s | M Drive" },
    applicationName: site.name,
    authors: [{ name: site.legalName, url: `${site.url}/` }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "education",
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    ...(verification ? { verification: { google: verification } } : {}),
    other: { "geo.region": "EG-C", "geo.placename": locale === "ar" ? "القاهرة" : "Cairo" },
  };
}

interface PageMetadataOptions {
  locale: Locale;
  page: SeoPage | "course";
  /** Path without the locale prefix, e.g. "/courses". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of appending " | M Drive". */
  absoluteTitle?: boolean;
  extraKeywords?: string[];
  /** Override the canonical URL (e.g. for the root entry page). */
  canonicalPath?: string;
}

/** Title, description, keywords, canonical, hreflang, Open Graph and Twitter tags for a page. */
export function pageMetadata({
  locale,
  page,
  path,
  title,
  description,
  absoluteTitle,
  extraKeywords = [],
  canonicalPath,
}: PageMetadataOptions): Metadata {
  const dict = getDictionary(locale);
  const fullTitle = absoluteTitle ? title : `${title} | M Drive`;
  const summary = truncate(description);
  const image = shareImage(locale);
  const url = canonicalPath ?? pagePath(locale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: summary,
    keywords: keywordsFor(page === "course" ? "courses" : page, locale, extraKeywords),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((code) => [hreflang[code], pagePath(code, path)])),
        "x-default": pagePath("ar", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: fullTitle,
      description: summary,
      url,
      locale: openGraphLocale[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => openGraphLocale[code]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/** Safely serialises JSON-LD for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
