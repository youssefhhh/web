import type { Localized } from "@/i18n/config";

export interface Testimonial {
  name: Localized;
  courseSlug: string;
  rating: number;
  quote: Localized;
}

/**
 * ⚠️ SAMPLE CONTENT — replace with real student reviews before launch.
 */
export const testimonials: Testimonial[] = [
  {
    name: { en: "Nour H.", ar: "نور ح." },
    courseSlug: "confident-driver",
    rating: 5,
    quote: {
      en: "I was terrified of driving in Cairo. After eight sessions I drove to work on my own — and the training was calm and pressure-free the whole way.",
      ar: "كنت مرعوبة من السواقة في القاهرة. بعد 8 حصص رحت الشغل بعربيتي لوحدي — والتدريب كان هادي ومن غير أي ضغط طول الوقت.",
    },
  },
  {
    name: { en: "Omar K.", ar: "عمر ك." },
    courseSlug: "parking-skills",
    rating: 5,
    quote: {
      en: "Three sessions and parallel parking finally clicked. The reference-point method is simple and it actually works.",
      ar: "3 حصص والركن الطولي أخيرًا بقى سهل. طريقة النقاط المرجعية بسيطة وبتنفع فعلًا.",
    },
  },
  {
    name: { en: "Mariam S.", ar: "مريم س." },
    courseSlug: "license-ready",
    rating: 5,
    quote: {
      en: "The mock tests made test day feel like just another session. I passed on my first try.",
      ar: "الاختبارات التجريبية خلّت يوم الاختبار كأنه حصة عادية. نجحت من أول مرة.",
    },
  },
  {
    name: { en: "Youssef A.", ar: "يوسف أ." },
    courseSlug: "city-traffic",
    rating: 5,
    quote: {
      en: "I had a license for two years but avoided busy roads. Now roundabouts and U-turns don't stress me at all.",
      ar: "كان معايا رخصة من سنتين بس كنت بتجنب الشوارع الزحمة. دلوقتي الميادين والدورانات مبقتش توترني خالص.",
    },
  },
  {
    name: { en: "Salma M.", ar: "سلمى م." },
    courseSlug: "confident-driver",
    rating: 5,
    quote: {
      en: "Booking was easy, the car was spotless and I got a female captain exactly like I asked. Highly recommended.",
      ar: "الحجز كان سهل والعربية نضيفة جدًا وجالي كابتن سيدة زي ما طلبت بالظبط. أنصح بيهم جدًا.",
    },
  },
  {
    name: { en: "Karim F.", ar: "كريم ف." },
    courseSlug: "pro-driver",
    rating: 5,
    quote: {
      en: "The highway and night sessions were exactly what I needed. I feel like a completely different driver.",
      ar: "حصص الطريق السريع والسواقة بالليل كانت بالظبط اللي محتاجه. حاسس إني بقيت سواق مختلف تمامًا.",
    },
  },
];
