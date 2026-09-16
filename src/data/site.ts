import type { Localized } from "@/i18n/config";

export interface SiteStat {
  value: number;
  suffix: string;
  decimals?: number;
  label: Localized;
}

/**
 * Global business details.
 * ⚠️ Placeholder values — replace the phone, WhatsApp, email, social links
 * and statistics with the academy's real information before launch.
 */
export const site = {
  name: "M Drive",
  legalName: "Mena Drive Academy",
  /** Public URL without a trailing slash. The GitHub Pages workflow sets it automatically. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://mdriveacademy.com").replace(/\/+$/, ""),
  /** Sub-path the site is served from ("" on the custom domain, "/web" on a github.io project URL). */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  city: { en: "Cairo, Egypt", ar: "القاهرة، مصر" } as Localized,
  contact: {
    phone: "+201000000000",
    phoneDisplay: "+20 100 000 0000",
    /** International format without "+" — used for wa.me links. */
    whatsapp: "201000000000",
    email: "hello@mdrive-academy.com",
  },
  hours: {
    en: "Daily · 9:00 AM – 10:00 PM",
    ar: "يوميًا · من 9 الصبح لـ 10 بالليل",
  } as Localized,
  /** Same hours in machine-readable form (structured data). */
  openingHours: { opens: "09:00", closes: "22:00" },
  /** Replace with the real page URLs (e.g. https://www.facebook.com/mdrive). */
  social: [
    { id: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
    { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/" },
  ] as { id: "facebook" | "instagram" | "tiktok"; label: string; url: string }[],
  rating: { value: 4.9, students: 2500 },
  stats: [
    { value: 7, suffix: "+", label: { en: "Years on Cairo roads", ar: "سنين خبرة في شوارع القاهرة" } },
    { value: 2500, suffix: "+", label: { en: "Students trained", ar: "متدرب اتعلم معانا" } },
    { value: 30, suffix: "+", label: { en: "Professional captains", ar: "كابتن محترف" } },
    { value: 4.9, decimals: 1, suffix: "/5", label: { en: "Average student rating", ar: "متوسط تقييم المتدربين" } },
  ] as SiteStat[],
};
