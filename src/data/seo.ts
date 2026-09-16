import type { Localized } from "@/i18n/config";

/**
 * Search keywords per page.
 * Google ranks on titles, headings and page text (the keywords meta tag is
 * ignored by Google but still read by some other engines), so the same terms
 * are also woven into every page's title, description, H1 and copy.
 */

export type SeoPage = "home" | "courses" | "locations" | "about" | "contact" | "book";

/** Brand searches — people who already know the academy. */
export const brandKeywords: Localized<string[]> = {
  ar: ["M Drive", "إم درايف", "ام درايف", "أكاديمية M Drive", "M Drive لتعليم السواقة", "مينا درايف", "أكاديمية مينا درايف", "Mena Drive Academy"],
  en: ["M Drive", "M Drive Academy", "Mena Drive Academy", "M Drive driving school", "M Drive Cairo", "M Drive Egypt"],
};

export const pageKeywords: Record<SeoPage, Localized<string[]>> = {
  home: {
    ar: [
      "تعليم السواقة",
      "تعليم سواقة",
      "تعليم القيادة",
      "تعليم قيادة السيارات",
      "مدرسة تعليم السواقة",
      "مدرسة تعليم قيادة",
      "أكاديمية تعليم قيادة",
      "تعليم السواقة في القاهرة",
      "تعليم السواقة في مصر",
      "كورس تعليم سواقة",
      "دروس تعليم السواقة",
      "كابتن تعليم سواقة",
      "تعليم السواقة للمبتدئين",
      "تعليم السواقة للبنات",
      "كابتن سيدة لتعليم السواقة",
      "تعليم سواقة أوتوماتيك",
      "تعليم سواقة مانيوال",
      "تعليم سواقة قريب مني",
    ],
    en: [
      "driving school Cairo",
      "driving school in Egypt",
      "driving lessons Cairo",
      "driving lessons in Egypt",
      "learn to drive in Cairo",
      "driving instructor Cairo",
      "female driving instructor Cairo",
      "driving course Cairo",
      "automatic driving lessons Cairo",
      "manual driving lessons Cairo",
      "driving school near me",
    ],
  },
  courses: {
    ar: [
      "أسعار تعليم السواقة",
      "أسعار كورسات تعليم السواقة",
      "سعر حصة تعليم السواقة",
      "سعر كورس تعليم القيادة",
      "باقات تعليم السواقة",
      "كورس سواقة للمبتدئين",
      "كورس اختبار رخصة القيادة",
      "كورس تعليم ركن السيارة",
      "كورسات تعليم القيادة في القاهرة",
    ],
    en: [
      "driving lessons prices Cairo",
      "driving course prices Egypt",
      "driving lesson cost Cairo",
      "beginner driving course Cairo",
      "driving license test course Egypt",
      "parking lessons Cairo",
    ],
  },
  locations: {
    ar: [
      "تعليم السواقة مدينة نصر",
      "تعليم سواقة التجمع الخامس",
      "تعليم سواقة القاهرة الجديدة",
      "تعليم سواقة المعادي",
      "تعليم سواقة الشيخ زايد",
      "تعليم سواقة 6 أكتوبر",
      "تعليم سواقة مصر الجديدة",
      "تعليم سواقة مع استلام من البيت",
    ],
    en: [
      "driving school Nasr City",
      "driving school New Cairo",
      "driving lessons Fifth Settlement",
      "driving school Maadi",
      "driving school Sheikh Zayed",
      "driving lessons 6th of October",
      "driving lessons with home pickup Cairo",
    ],
  },
  about: {
    ar: ["أكاديمية تعليم قيادة في القاهرة", "أفضل مدرسة تعليم سواقة", "كباتن تعليم سواقة محترفين", "تعليم القيادة الآمنة"],
    en: ["best driving school in Cairo", "professional driving instructors Egypt", "safe driving academy Cairo"],
  },
  contact: {
    ar: ["رقم تعليم سواقة", "واتساب تعليم السواقة", "التواصل مع مدرسة تعليم قيادة", "مواعيد تعليم السواقة"],
    en: ["driving school contact Cairo", "driving lessons WhatsApp Cairo", "driving school phone number Cairo"],
  },
  book: {
    ar: ["حجز حصة تعليم سواقة", "حجز كورس تعليم القيادة", "احجز تعليم سواقة أونلاين"],
    en: ["book driving lessons Cairo", "book a driving lesson online Egypt"],
  },
};

/** Most specific first: page-specific extras, page keywords, then brand names — de-duplicated. */
export function keywordsFor(page: SeoPage, locale: keyof Localized, extra: string[] = []) {
  return Array.from(new Set([...extra, ...pageKeywords[page][locale], ...brandKeywords[locale]]));
}
