import type { Localized } from "@/i18n/config";

export type ModuleId = "basics" | "rules" | "control" | "parking" | "traffic" | "highway";

export interface LearningModule {
  id: ModuleId;
  title: Localized;
  summary: Localized;
  points: Localized<string[]>;
}

export const modules: LearningModule[] = [
  {
    id: "basics",
    title: { en: "Know your car", ar: "اعرف عربيتك" },
    summary: {
      en: "Seat, mirrors, pedals, gears and the dashboard — everything that matters before the engine starts.",
      ar: "الكرسي والمرايات والدواسات والفتيس والطبلون — كل اللي محتاج تعرفه قبل ما تدوّر العربية.",
    },
    points: {
      en: ["The perfect seat & mirror setup", "Pedals, gears and handbrake", "Dashboard warning lights", "Quick checks: tyres, oil and water"],
      ar: ["ضبط الكرسي والمرايات صح", "الدواسات والفتيس وفرملة اليد", "لمبات التحذير في الطبلون", "فحص سريع: الكاوتش والزيت والمية"],
    },
  },
  {
    id: "rules",
    title: { en: "Rules & road signs", ar: "القواعد وإشارات المرور" },
    summary: {
      en: "The signs, signals and right-of-way rules you need on the road — and in your license test.",
      ar: "العلامات والإشارات وأولوية المرور اللي هتحتاجها في الشارع وفي اختبار الرخصة.",
    },
    points: {
      en: ["Warning, regulatory & guidance signs", "Traffic lights & officer signals", "Right of way at junctions", "License theory test preparation"],
      ar: ["علامات التحذير والإلزام والإرشاد", "إشارات المرور وإشارات عسكري المرور", "أولوية المرور في التقاطعات", "التجهيز للاختبار النظري للرخصة"],
    },
  },
  {
    id: "control",
    title: { en: "Smooth control", ar: "تحكم ناعم في العربية" },
    summary: {
      en: "Starting, stopping, steering and hill starts — calm, smooth and without stalling.",
      ar: "تتحرك وتقف وتلف وتطلع المطالع بهدوء ونعومة ومن غير ما العربية تطفي منك.",
    },
    points: {
      en: ["Clutch & brake control", "Correct steering technique", "Hill starts without rolling back", "Smooth gear changes"],
      ar: ["التحكم في الدبرياج والفرامل", "مسكة الدريكسيون الصح", "الطلوع على مطلع من غير ما ترجع", "تغيير السرعات بنعومة"],
    },
  },
  {
    id: "parking",
    title: { en: "Parking mastery", ar: "الركن باحتراف" },
    summary: {
      en: "Parallel, perpendicular and angled parking with reference points you will never forget.",
      ar: "ركن طولي وعرضي ومايل بنقاط مرجعية سهلة مش هتنساها.",
    },
    points: {
      en: ["Parallel parking", "Perpendicular & angled parking", "Reversing with mirrors", "Tight spots between real cars"],
      ar: ["الركن الطولي (البارالل)", "الركن العرضي والمايل", "الرجوع لورا بالمرايات", "الركن في أماكن ضيقة بين عربيات حقيقية"],
    },
  },
  {
    id: "traffic",
    title: { en: "City traffic", ar: "زحمة المدينة" },
    summary: {
      en: "Real Cairo streets: roundabouts, U-turns, microbuses and narrow side streets.",
      ar: "شوارع القاهرة الحقيقية: الميادين والدورانات والميكروباصات والشوارع الجانبية الضيقة.",
    },
    points: {
      en: ["Lane discipline & road position", "Roundabouts & U-turns", "Heavy stop-and-go traffic", "Narrow streets & pedestrians"],
      ar: ["الالتزام بالحارة ومكانك في الطريق", "الميادين والدورانات", "الزحمة والوقوف المتكرر", "الشوارع الضيقة والمشاة"],
    },
  },
  {
    id: "highway",
    title: { en: "Highways & confidence", ar: "الطرق السريعة والثقة" },
    summary: {
      en: "Ring Road speeds, safe overtaking, night driving — and staying calm under pressure.",
      ar: "سرعات الطريق الدائري والتخطي الآمن والسواقة بالليل — وإزاي تفضل هادي تحت الضغط.",
    },
    points: {
      en: ["Merging & exiting at speed", "Safe overtaking & following distance", "Night and rain driving", "Handling fear, stress and emergencies"],
      ar: ["الدخول والخروج من الطرق السريعة", "التخطي الآمن ومسافة الأمان", "السواقة بالليل وفي المطر", "التعامل مع الخوف والتوتر والطوارئ"],
    },
  },
];

export function getModule(id: ModuleId) {
  return modules.find((module) => module.id === id)!;
}
