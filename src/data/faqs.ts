import type { Locale, Localized } from "@/i18n/config";
import { branches, pickupAreas } from "@/data/branches";
import { courses } from "@/data/courses";
import { getDictionary, plural } from "@/i18n/get-dictionary";
import { format, formatPrice } from "@/lib/utils";

export type FaqCategory = "start" | "pricing" | "booking";

export interface Faq {
  id: string;
  category: FaqCategory;
  question: Localized;
  /** May contain {placeholders} filled from live data — see `faqAnswer`. */
  answer: Localized;
}

export const faqs: Faq[] = [
  {
    id: "beginner",
    category: "start",
    question: { en: "I've never driven before. Where do I start?", ar: "عمري ما سقت قبل كده.. أبدأ منين؟" },
    answer: {
      en: "Start with our beginner driving course, Confident Driver — it's built for complete beginners. Not sure? Book an assessment session and your captain will recommend the right plan.",
      ar: "ابدأ بكورس تعليم السواقة للمبتدئين (كورس السواق الواثق) — متصمم مخصوص للي بيبدأ من الصفر. مش متأكد؟ احجز حصة تحديد مستوى والكابتن هيرشحلك الخطة المناسبة.",
    },
  },
  {
    id: "how-many",
    category: "start",
    question: { en: "How many lessons do I need to learn to drive?", ar: "محتاج كام حصة علشان أتعلم السواقة؟" },
    answer: {
      en: "Most beginners need 8–10 sessions to drive confidently on their own. If you've driven before, 3–5 sessions are often enough — an assessment session tells you exactly how many you need.",
      ar: "أغلب المبتدئين بيحتاجوا من 8 لـ 10 حصص علشان يسوقوا لوحدهم بثقة. ولو سقت قبل كده، غالبًا 3 لـ 5 حصص بيكفوا — وحصة تحديد المستوى بتحدد العدد المناسب ليك بالظبط.",
    },
  },
  {
    id: "price",
    category: "pricing",
    question: { en: "How much do driving lessons cost in Cairo?", ar: "كام سعر كورس تعليم السواقة؟" },
    answer: {
      en: "Prices start at {assessmentPrice} for an assessment session, and our beginner driving course ({beginnerSessions}) costs {beginnerPrice}. Every price includes the training car, fuel and your captain.",
      ar: "الأسعار بتبدأ من {assessmentPrice} لحصة تحديد المستوى، وكورس تعليم السواقة للمبتدئين ({beginnerSessions}) بـ {beginnerPrice}. وكل الأسعار شاملة عربية التدريب والبنزين والكابتن.",
    },
  },
  {
    id: "car-included",
    category: "pricing",
    question: { en: "Is the car included in the price?", ar: "هل العربية داخلة في السعر؟" },
    answer: {
      en: "Yes. Every price includes a clean, air-conditioned training car and fuel.",
      ar: "أيوه. كل الأسعار شاملة عربية تدريب نضيفة ومكيفة والبنزين.",
    },
  },
  {
    id: "female-captain",
    category: "start",
    question: { en: "Do you have female driving instructors?", ar: "فيه كابتن سيدة لتعليم السواقة للبنات؟" },
    answer: {
      en: "Yes. Choose a female captain when booking and we'll match you with one, subject to availability.",
      ar: "أيوه. اختاري كابتن سيدة وقت الحجز وهنرتبلك التدريب معاها حسب المواعيد المتاحة.",
    },
  },
  {
    id: "transmission",
    category: "start",
    question: { en: "Do you teach on automatic or manual cars?", ar: "بتعلموا السواقة على أوتوماتيك ولا مانيوال؟" },
    answer: {
      en: "Both. Pick the transmission you want to learn on when you book.",
      ar: "الاتنين متاحين. اختار نوع الفتيس اللي عايز تتعلم عليه وقت الحجز.",
    },
  },
  {
    id: "areas",
    category: "booking",
    question: { en: "Where in Cairo do you give driving lessons?", ar: "بتعلموا السواقة في أنهي مناطق في القاهرة؟" },
    answer: {
      en: "We train from meeting points in {branches}, and offer home pickup in {pickupAreas}.",
      ar: "عندنا نقاط تدريب في {branches}، ومتاح الاستلام من البيت في {pickupAreas}.",
    },
  },
  {
    id: "payment",
    category: "pricing",
    question: { en: "How do I book and pay?", ar: "إزاي أحجز وأدفع؟" },
    answer: {
      en: "Book online in two minutes or message us on WhatsApp. Pay per session or per package — cash, InstaPay or mobile wallets.",
      ar: "احجز أونلاين في دقيقتين أو ابعتلنا على واتساب. تقدر تدفع بالحصة أو بالباقة — كاش أو إنستاباي أو محافظ الموبايل.",
    },
  },
  {
    id: "reschedule",
    category: "booking",
    question: { en: "Can I reschedule a session?", ar: "ينفع أغيّر ميعاد حصة؟" },
    answer: {
      en: "Yes — free of charge when you let us know at least 24 hours before.",
      ar: "أيوه — مجانًا لو بلّغتنا قبل الميعاد بـ 24 ساعة على الأقل.",
    },
  },
  {
    id: "license",
    category: "booking",
    question: { en: "Do you help with the driving license test?", ar: "بتساعدوني في اختبار رخصة القيادة؟" },
    answer: {
      en: "Yes. Our License Ready course covers the traffic rules, the test maneuvers and full mock tests. You can also add a test-day car with a captain.",
      ar: "أيوه. كورس جاهز للرخصة بيغطي قواعد المرور ومناورات الاختبار واختبارات تجريبية كاملة. وتقدر كمان تضيف عربية يوم الاختبار مع كابتن.",
    },
  },
  {
    id: "pickup",
    category: "booking",
    question: { en: "Do you pick me up from home?", ar: "بتستلموني من البيت؟" },
    answer: {
      en: "Home pickup is available in selected areas for a small extra fee per session.",
      ar: "الاستلام من البيت متاح في مناطق معينة برسوم بسيطة على الحصة.",
    },
  },
];

export function getFaq(id: string) {
  return faqs.find((faq) => faq.id === id)!;
}

/** Answer text with prices and areas filled in from the live data files. */
export function faqAnswer(faq: Faq, locale: Locale) {
  const assessment = courses.find((course) => course.slug === "assessment")!;
  const beginner = courses.find((course) => course.slug === "confident-driver")!;
  const separator = locale === "ar" ? "، " : ", ";

  return format(faq.answer[locale], {
    assessmentPrice: formatPrice(assessment.price, locale),
    beginnerPrice: formatPrice(beginner.price, locale),
    beginnerSessions: `${beginner.sessions} ${plural(beginner.sessions, locale, getDictionary(locale).common.sessions)}`,
    branches: branches.map((branch) => branch.name[locale]).join(separator),
    pickupAreas: pickupAreas[locale].join(separator),
  });
}
