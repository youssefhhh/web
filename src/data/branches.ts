import type { Localized } from "@/i18n/config";

export interface Branch {
  slug: string;
  name: Localized;
  district: Localized;
  meetingPoint: Localized;
  /** Search text for Google Maps directions. */
  mapQuery: string;
  /** Structured-data address details. */
  address: { street: string; locality: string; region: string; postalCode: string };
  /** Approximate coordinates of the meeting point. */
  geo: { latitude: number; longitude: number };
  /** Pin position on the stylised Cairo map (viewBox 600 × 420). */
  pin: { x: number; y: number };
}

/**
 * Training meeting points.
 * ⚠️ Placeholder locations — replace with the academy's real branches.
 */
export const branches: Branch[] = [
  {
    slug: "nasr-city",
    name: { en: "Nasr City", ar: "مدينة نصر" },
    district: { en: "East Cairo", ar: "شرق القاهرة" },
    meetingPoint: {
      en: "Abbas El-Akkad St. — captains’ meeting point",
      ar: "شارع عباس العقاد — نقطة تجمع الكباتن",
    },
    mapQuery: "Abbas El Akkad Street, Nasr City, Cairo",
    address: { street: "Abbas El-Akkad Street", locality: "Nasr City", region: "Cairo Governorate", postalCode: "11765" },
    geo: { latitude: 30.0597, longitude: 31.338 },
    pin: { x: 392, y: 168 },
  },
  {
    slug: "new-cairo",
    name: { en: "New Cairo", ar: "التجمع الخامس" },
    district: { en: "Fifth Settlement", ar: "القاهرة الجديدة" },
    meetingPoint: {
      en: "North 90th Street — near the main service road",
      ar: "شارع التسعين الشمالي — بجوار طريق الخدمة الرئيسي",
    },
    mapQuery: "North 90th Street, New Cairo",
    address: { street: "North 90th Street", locality: "New Cairo", region: "Cairo Governorate", postalCode: "11835" },
    geo: { latitude: 30.0283, longitude: 31.47 },
    pin: { x: 506, y: 262 },
  },
  {
    slug: "maadi",
    name: { en: "Maadi", ar: "المعادي" },
    district: { en: "South Cairo", ar: "جنوب القاهرة" },
    meetingPoint: {
      en: "Road 9 — Maadi metro station side",
      ar: "شارع 9 — ناحية محطة مترو المعادي",
    },
    mapQuery: "Road 9, Maadi, Cairo",
    address: { street: "Road 9", locality: "Maadi", region: "Cairo Governorate", postalCode: "11728" },
    geo: { latitude: 29.9602, longitude: 31.2569 },
    pin: { x: 300, y: 318 },
  },
  {
    slug: "sheikh-zayed",
    name: { en: "Sheikh Zayed", ar: "الشيخ زايد" },
    district: { en: "West Giza", ar: "غرب الجيزة" },
    meetingPoint: {
      en: "Central Axis — main entrance area",
      ar: "المحور المركزي — منطقة المدخل الرئيسي",
    },
    mapQuery: "Sheikh Zayed City, Giza",
    address: { street: "Central Axis", locality: "Sheikh Zayed City", region: "Giza Governorate", postalCode: "12588" },
    geo: { latitude: 30.04, longitude: 30.983 },
    pin: { x: 92, y: 196 },
  },
];

export const pickupAreas: Localized<string[]> = {
  en: ["Nasr City", "Heliopolis", "New Cairo", "Maadi", "Mokattam", "Zamalek", "Dokki", "Sheikh Zayed", "6th of October"],
  ar: ["مدينة نصر", "مصر الجديدة", "التجمع", "المعادي", "المقطم", "الزمالك", "الدقي", "الشيخ زايد", "6 أكتوبر"],
};

export function getBranch(slug: string) {
  return branches.find((branch) => branch.slug === slug);
}
