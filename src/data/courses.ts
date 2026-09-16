import type { Localized } from "@/i18n/config";
import type { ModuleId } from "@/data/curriculum";

export type CourseCategory = "start" | "skills" | "program";

export interface CoursePhase {
  from: number;
  to: number;
  title: Localized;
  details: Localized;
}

export interface Course {
  slug: string;
  category: CourseCategory;
  sessions: number;
  minutesPerSession: number;
  /** Price in EGP. */
  price: number;
  popular?: boolean;
  level: Localized;
  name: Localized;
  /** Search phrase used in the page title and H1 (e.g. "Beginner Driving Course in Cairo"). */
  seoKeyword: Localized;
  keywords: Localized<string[]>;
  tagline: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  idealFor: Localized<string[]>;
  modules: ModuleId[];
  plan: CoursePhase[];
}

/**
 * Courses & introductory prices (EGP).
 * ⚠️ Prices are temporary placeholders — edit `price` values here and the
 * whole site (cards, details, booking, WhatsApp messages) updates automatically.
 */
export const courses: Course[] = [
  {
    slug: "assessment",
    category: "start",
    sessions: 1,
    minutesPerSession: 60,
    price: 400,
    level: { en: "All levels", ar: "كل المستويات" },
    name: { en: "Assessment Session", ar: "حصة تحديد المستوى" },
    seoKeyword: { en: "Driving Assessment Lesson in Cairo", ar: "حصة تحديد مستوى السواقة" },
    keywords: {
      en: ["driving assessment lesson", "driving level test Cairo"],
      ar: ["حصة تحديد مستوى السواقة", "تقييم مستوى القيادة", "حصة تجريبية تعليم سواقة"],
    },
    tagline: { en: "Know exactly where you stand.", ar: "اعرف مستواك بالظبط." },
    description: {
      en: "A focused on-road session where a senior captain evaluates your control, parking and traffic skills — then recommends the exact plan you need, so you never pay for sessions you don't.",
      ar: "حصة على الطريق بيقيّم فيها كابتن خبرة تحكمك في العربية والركن والتعامل مع الزحمة — وبعدها يرشحلك الخطة المناسبة بالظبط، علشان متدفعش في حصص مش محتاجها.",
    },
    highlights: {
      en: ["Full on-road skills evaluation", "A clear level report after the session", "A personal course recommendation"],
      ar: ["تقييم كامل لمهاراتك على الطريق", "تقرير واضح بمستواك بعد الحصة", "ترشيح الكورس المناسب ليك"],
    },
    idealFor: {
      en: ["You drove before but feel rusty", "You're not sure which course fits you"],
      ar: ["سقت قبل كده بس محتاج ترجّع ثقتك", "مش متأكد أنهي كورس يناسبك"],
    },
    modules: ["control", "parking", "traffic"],
    plan: [
      {
        from: 1,
        to: 1,
        title: { en: "Evaluate & recommend", ar: "تقييم وترشيح" },
        details: {
          en: "A controls check, a parking attempt and a short city drive — followed by a clear recommendation.",
          ar: "اختبار للتحكم ومحاولة ركن ومشوار قصير في المدينة — وبعدها ترشيح واضح للخطوة الجاية.",
        },
      },
    ],
  },
  {
    slug: "single-session",
    category: "start",
    sessions: 1,
    minutesPerSession: 60,
    price: 500,
    level: { en: "All levels", ar: "كل المستويات" },
    name: { en: "Single Session", ar: "حصة منفردة" },
    seoKeyword: { en: "Single Driving Lesson in Cairo", ar: "حصة تعليم سواقة منفردة" },
    keywords: {
      en: ["single driving lesson Cairo", "pay per driving lesson"],
      ar: ["حصة تعليم سواقة", "سعر حصة السواقة", "حصة سواقة منفردة"],
    },
    tagline: { en: "Pay as you go. Focus on what you need.", ar: "ادفع بالحصة وركّز على اللي محتاجه." },
    description: {
      en: "One flexible session built around a single goal — parking, traffic, the highway or a warm-up before your license test.",
      ar: "حصة مرنة متصممة حوالين هدف واحد — ركن أو زحمة أو طريق سريع أو تسخين قبل اختبار الرخصة.",
    },
    highlights: {
      en: ["You choose the focus", "No package commitment", "Perfect for a quick refresh"],
      ar: ["أنت اللي بتحدد هدف الحصة", "من غير التزام بباقة", "مناسبة لو محتاج تنشيط سريع"],
    },
    idealFor: {
      en: ["Licensed drivers polishing one skill", "A warm-up right before the test"],
      ar: ["اللي معاه رخصة وعايز يحسّن مهارة معينة", "تسخين قبل اختبار الرخصة"],
    },
    modules: ["parking", "traffic", "highway"],
    plan: [
      {
        from: 1,
        to: 1,
        title: { en: "Your session, your goal", ar: "حصتك وهدفك" },
        details: {
          en: "Tell us your goal when booking and your captain prepares the route and drills in advance.",
          ar: "قولّنا هدفك وقت الحجز والكابتن هيجهز المسار والتمارين المناسبة قبلها.",
        },
      },
    ],
  },
  {
    slug: "parking-skills",
    category: "skills",
    sessions: 3,
    minutesPerSession: 60,
    price: 1400,
    level: { en: "Beginner – Intermediate", ar: "مبتدئ – متوسط" },
    name: { en: "Parking & Skills", ar: "كورس الركن والمهارات" },
    seoKeyword: { en: "Parking Lessons Course in Cairo", ar: "كورس تعليم ركن السيارة" },
    keywords: {
      en: ["parking lessons Cairo", "parallel parking lessons"],
      ar: ["تعليم ركن السيارة", "تعليم الركن الطولي", "كورس ركن العربية"],
    },
    tagline: { en: "Park anywhere. First try.", ar: "اركن في أي مكان من أول مرة." },
    description: {
      en: "Three sessions dedicated to the skill most drivers fear: parking. Learn a simple reference-point method for parallel, perpendicular and angled parking — then use it between real cars.",
      ar: "3 حصص مخصصة للمهارة اللي أغلب السواقين بيخافوا منها: الركن. هتتعلم طريقة النقاط المرجعية للركن الطولي والعرضي والمايل — وتطبقها بين عربيات حقيقية.",
    },
    highlights: {
      en: ["Parallel, perpendicular & angled parking", "Reversing with mirrors & reference points", "Practice between real parked cars"],
      ar: ["ركن طولي وعرضي ومايل", "الرجوع لورا بالمرايات والنقاط المرجعية", "تدريب بين عربيات راكنة حقيقية"],
    },
    idealFor: {
      en: ["You can drive, but parking stresses you", "You're preparing for the test maneuvers"],
      ar: ["بتعرف تسوق بس الركن بيوترك", "بتجهز لمناورات اختبار الرخصة"],
    },
    modules: ["control", "parking"],
    plan: [
      {
        from: 1,
        to: 1,
        title: { en: "Slow-speed control & reversing", ar: "التحكم في السرعات البطيئة والرجوع لورا" },
        details: {
          en: "Clutch and brake control at walking pace, reversing in a straight line and reading your mirrors.",
          ar: "التحكم في الدبرياج والفرامل على سرعة بطيئة، والرجوع لورا في خط مستقيم وقراءة المرايات.",
        },
      },
      {
        from: 2,
        to: 2,
        title: { en: "Parallel & perpendicular parking", ar: "الركن الطولي والعرضي" },
        details: {
          en: "A step-by-step reference-point method you can repeat anywhere.",
          ar: "طريقة النقاط المرجعية خطوة بخطوة، تقدر تكررها في أي مكان.",
        },
      },
      {
        from: 3,
        to: 3,
        title: { en: "Real streets, tight spots", ar: "شوارع حقيقية وأماكن ضيقة" },
        details: {
          en: "Parking between real cars, angled spots and exiting safely into traffic.",
          ar: "الركن بين عربيات حقيقية والأماكن المايلة والخروج بأمان للطريق.",
        },
      },
    ],
  },
  {
    slug: "city-traffic",
    category: "skills",
    sessions: 5,
    minutesPerSession: 60,
    price: 2250,
    level: { en: "Intermediate", ar: "متوسط" },
    name: { en: "City Traffic", ar: "كورس زحمة المدينة" },
    seoKeyword: { en: "City Traffic Driving Course in Cairo", ar: "كورس السواقة في زحمة القاهرة" },
    keywords: {
      en: ["city driving lessons Cairo", "driving in Cairo traffic course"],
      ar: ["تعليم السواقة في الزحمة", "كورس سواقة في شوارع القاهرة", "التغلب على خوف الزحمة"],
    },
    tagline: { en: "Cairo traffic, handled calmly.", ar: "زحمة القاهرة.. بهدوء وثقة." },
    description: {
      en: "Five sessions on real Cairo roads: lane discipline, roundabouts, U-turns, microbuses and narrow streets — until traffic stops feeling like chaos.",
      ar: "5 حصص في شوارع القاهرة الحقيقية: الالتزام بالحارة والميادين والدورانات والميكروباصات والشوارع الضيقة — لحد ما الزحمة متبقاش مصدر توتر.",
    },
    highlights: {
      en: ["Roundabouts, U-turns & junctions", "Lane changes and merging", "Routes that get harder every session"],
      ar: ["الميادين والدورانات والتقاطعات", "تغيير الحارة والاندماج في الطريق", "مسارات بتصعب تدريجيًا كل حصة"],
    },
    idealFor: {
      en: ["You know the basics but avoid busy roads", "You just got your license"],
      ar: ["عارف الأساسيات بس بتتجنب الشوارع الزحمة", "لسه طالع رخصة جديدة"],
    },
    modules: ["control", "rules", "traffic"],
    plan: [
      {
        from: 1,
        to: 1,
        title: { en: "Road position & speed control", ar: "مكانك في الطريق والتحكم في السرعة" },
        details: {
          en: "Lane position, safe gaps and smooth speed in moderate traffic.",
          ar: "مكانك في الحارة ومسافة الأمان والتحكم في السرعة في زحمة متوسطة.",
        },
      },
      {
        from: 2,
        to: 2,
        title: { en: "Junctions, roundabouts & U-turns", ar: "التقاطعات والميادين والدورانات" },
        details: {
          en: "Reading right of way and choosing the correct lane early.",
          ar: "تفهم أولوية المرور وتختار الحارة الصح بدري.",
        },
      },
      {
        from: 3,
        to: 3,
        title: { en: "Heavy traffic & narrow streets", ar: "الزحمة والشوارع الضيقة" },
        details: {
          en: "Stop-and-go traffic, microbuses, pedestrians and tight side streets.",
          ar: "الوقوف والتحرك المتكرر والميكروباصات والمشاة والشوارع الجانبية الضيقة.",
        },
      },
      {
        from: 4,
        to: 4,
        title: { en: "Lane changes & merging", ar: "تغيير الحارة والاندماج" },
        details: {
          en: "The mirror–signal–check routine until it becomes automatic.",
          ar: "روتين المراية – الإشارة – النظرة لحد ما يبقى تلقائي.",
        },
      },
      {
        from: 5,
        to: 5,
        title: { en: "Your independent route", ar: "مشوارك لوحدك" },
        details: {
          en: "You plan and drive a full city route while your captain only observes.",
          ar: "بتخطط وتسوق مشوار كامل في المدينة والكابتن بيتابع بس.",
        },
      },
    ],
  },
  {
    slug: "confident-driver",
    category: "program",
    sessions: 8,
    minutesPerSession: 60,
    price: 3400,
    popular: true,
    level: { en: "Beginner", ar: "مبتدئ" },
    name: { en: "Confident Driver", ar: "كورس السواق الواثق" },
    seoKeyword: { en: "Beginner Driving Course in Cairo", ar: "كورس تعليم السواقة للمبتدئين" },
    keywords: {
      en: ["beginner driving course Cairo", "learn to drive from zero Egypt"],
      ar: ["كورس تعليم السواقة للمبتدئين", "تعليم السواقة من الصفر", "كورس سواقة 8 حصص"],
    },
    tagline: { en: "From zero to driving on your own.", ar: "من الصفر لحد ما تسوق لوحدك." },
    description: {
      en: "Our most popular program for beginners. Eight sessions that take you from your first time behind the wheel to parking, city traffic and main roads — step by step, without pressure.",
      ar: "البرنامج الأكثر طلبًا للمبتدئين. 8 حصص بتاخدك من أول مرة تقعد ورا الدريكسيون لحد الركن وزحمة المدينة والطرق الرئيسية — خطوة بخطوة ومن غير ضغط.",
    },
    highlights: {
      en: ["A complete beginner-friendly path", "Parking, city traffic & main roads", "Progress report after every session", "A final independent drive"],
      ar: ["مسار كامل مناسب للمبتدئين", "ركن وزحمة مدينة وطرق رئيسية", "تقرير تقدم بعد كل حصة", "مشوار نهائي تسوقه لوحدك"],
    },
    idealFor: {
      en: ["You've never driven before", "You tried before and lost confidence"],
      ar: ["عمرك ما سقت قبل كده", "جربت قبل كده وفقدت ثقتك"],
    },
    modules: ["basics", "control", "parking", "traffic"],
    plan: [
      {
        from: 1,
        to: 2,
        title: { en: "Car basics & smooth control", ar: "أساسيات العربية والتحكم" },
        details: {
          en: "Seat, mirrors, pedals, first moves and smooth stops in a quiet area.",
          ar: "الكرسي والمرايات والدواسات، وأول تحرك ووقوف ناعم في مكان هادي.",
        },
      },
      {
        from: 3,
        to: 4,
        title: { en: "Parking methods", ar: "طرق الركن" },
        details: {
          en: "Parallel and perpendicular parking with reference points.",
          ar: "الركن الطولي والعرضي بالنقاط المرجعية.",
        },
      },
      {
        from: 5,
        to: 6,
        title: { en: "City traffic", ar: "زحمة المدينة" },
        details: {
          en: "Junctions, roundabouts, U-turns and lane discipline.",
          ar: "التقاطعات والميادين والدورانات والالتزام بالحارة.",
        },
      },
      {
        from: 7,
        to: 7,
        title: { en: "Main roads & merging", ar: "الطرق الرئيسية والاندماج" },
        details: {
          en: "Higher speeds, merging and a safe following distance.",
          ar: "سرعات أعلى والاندماج في الطريق ومسافة الأمان.",
        },
      },
      {
        from: 8,
        to: 8,
        title: { en: "Independent drive", ar: "مشوارك لوحدك" },
        details: {
          en: "A full route you drive on your own, plus a final review and next steps.",
          ar: "مشوار كامل تسوقه لوحدك، مع مراجعة نهائية وخطوات لبعد الكورس.",
        },
      },
    ],
  },
  {
    slug: "license-ready",
    category: "program",
    sessions: 10,
    minutesPerSession: 60,
    price: 4100,
    level: { en: "Beginner – Intermediate", ar: "مبتدئ – متوسط" },
    name: { en: "License Ready", ar: "كورس جاهز للرخصة" },
    seoKeyword: { en: "Driving License Test Course in Cairo", ar: "كورس التجهيز لاختبار رخصة القيادة" },
    keywords: {
      en: ["driving license test preparation Egypt", "driving test course Cairo"],
      ar: ["اختبار رخصة القيادة", "التجهيز لاختبار الرخصة", "كورس رخصة القيادة في مصر"],
    },
    tagline: { en: "Walk into your test prepared.", ar: "ادخل اختبار الرخصة وأنت جاهز." },
    description: {
      en: "Ten sessions that combine real driving skills with focused test preparation: traffic rules, test maneuvers and full mock tests — so test day feels familiar.",
      ar: "10 حصص بتجمع بين مهارات السواقة الحقيقية والتجهيز المركّز للاختبار: قواعد المرور ومناورات الاختبار واختبارات تجريبية كاملة — علشان يوم الاختبار يبقى مألوف ليك.",
    },
    highlights: {
      en: ["Traffic rules & signs review", "Test maneuver practice", "Two full mock tests", "Test-day readiness check"],
      ar: ["مراجعة قواعد وإشارات المرور", "تدريب على مناورات الاختبار", "اختبارين تجريبيين كاملين", "تقييم جاهزيتك قبل يوم الاختبار"],
    },
    idealFor: {
      en: ["You have a license test coming up", "You want structure and a clear goal"],
      ar: ["عندك اختبار رخصة قريب", "عايز خطة واضحة بهدف محدد"],
    },
    modules: ["rules", "control", "parking", "traffic"],
    plan: [
      {
        from: 1,
        to: 2,
        title: { en: "Controls & traffic rules", ar: "التحكم وقواعد المرور" },
        details: {
          en: "Smooth control, plus the signs and rules you'll be tested on.",
          ar: "تحكم ناعم في العربية، مع العلامات والقواعد اللي هتتسأل فيها.",
        },
      },
      {
        from: 3,
        to: 4,
        title: { en: "Test maneuvers", ar: "مناورات الاختبار" },
        details: {
          en: "Parking, reversing and the maneuvers examiners ask for.",
          ar: "الركن والرجوع لورا والمناورات اللي بتتطلب في الاختبار.",
        },
      },
      {
        from: 5,
        to: 7,
        title: { en: "City & main-road driving", ar: "السواقة في المدينة والطرق الرئيسية" },
        details: {
          en: "Real traffic situations until your decisions feel confident.",
          ar: "مواقف زحمة حقيقية لحد ما قراراتك تبقى واثقة.",
        },
      },
      {
        from: 8,
        to: 9,
        title: { en: "Mock tests", ar: "اختبارات تجريبية" },
        details: {
          en: "Full mock tests, then targeted practice on your weak points.",
          ar: "اختبارات تجريبية كاملة، وبعدها تدريب مركّز على نقاط الضعف.",
        },
      },
      {
        from: 10,
        to: 10,
        title: { en: "Test-day readiness", ar: "جاهزية يوم الاختبار" },
        details: {
          en: "A final check and a calm game plan for test day.",
          ar: "تقييم نهائي وخطة هادية ليوم الاختبار.",
        },
      },
    ],
  },
  {
    slug: "pro-driver",
    category: "program",
    sessions: 15,
    minutesPerSession: 60,
    price: 5900,
    level: { en: "All levels", ar: "كل المستويات" },
    name: { en: "Pro Driver", ar: "كورس الاحتراف" },
    seoKeyword: { en: "Advanced Driving Course in Cairo", ar: "كورس احتراف القيادة والطرق السريعة" },
    keywords: {
      en: ["advanced driving course Cairo", "highway and night driving lessons"],
      ar: ["كورس احتراف القيادة", "تعليم السواقة على الطريق الدائري", "تعليم السواقة بالليل"],
    },
    tagline: { en: "Beyond driving — real road mastery.", ar: "مش بس سواقة.. احتراف حقيقي للطريق." },
    description: {
      en: "Fifteen sessions for drivers who want the full picture: city traffic, the Ring Road, night driving, basic mechanics and handling emergencies with a clear head.",
      ar: "15 حصة للي عايز الصورة كاملة: زحمة المدينة والطريق الدائري والسواقة بالليل وأساسيات ميكانيكا العربية، وإزاي تتصرف في الطوارئ بهدوء.",
    },
    highlights: {
      en: ["Highways, Ring Road & night driving", "Basic mechanics & warning lights", "Emergency handling", "Personal progress tracking"],
      ar: ["الطرق السريعة والدائري والسواقة بالليل", "أساسيات الميكانيكا ولمبات التحذير", "التصرف في المواقف الطارئة", "متابعة شخصية لتقدمك"],
    },
    idealFor: {
      en: ["You want to drive anywhere, anytime", "You'll drive daily for work or family"],
      ar: ["عايز تسوق في أي مكان وأي وقت", "هتسوق يوميًا للشغل أو للعيلة"],
    },
    modules: ["basics", "control", "parking", "traffic", "highway"],
    plan: [
      {
        from: 1,
        to: 3,
        title: { en: "Foundations & control", ar: "الأساسيات والتحكم" },
        details: {
          en: "Car setup, smooth control and confident low-speed handling.",
          ar: "ضبط العربية وتحكم ناعم وثقة في السرعات البطيئة.",
        },
      },
      {
        from: 4,
        to: 6,
        title: { en: "Parking mastery", ar: "احتراف الركن" },
        details: {
          en: "Every parking type — in quiet areas first, then on real streets.",
          ar: "كل أنواع الركن — في أماكن هادية الأول وبعدين في شوارع حقيقية.",
        },
      },
      {
        from: 7,
        to: 10,
        title: { en: "Cairo traffic", ar: "زحمة القاهرة" },
        details: {
          en: "Roundabouts, U-turns, microbuses and narrow streets.",
          ar: "الميادين والدورانات والميكروباصات والشوارع الضيقة.",
        },
      },
      {
        from: 11,
        to: 13,
        title: { en: "Highways & night driving", ar: "الطرق السريعة والسواقة بالليل" },
        details: {
          en: "Ring Road speeds, overtaking and driving after dark.",
          ar: "سرعات الدائري والتخطي والسواقة بعد المغرب.",
        },
      },
      {
        from: 14,
        to: 15,
        title: { en: "Mechanics & emergencies", ar: "الميكانيكا والطوارئ" },
        details: {
          en: "Warning lights, a flat tyre, a breakdown — and a final independent route.",
          ar: "لمبات التحذير والكاوتش المفرقع والعطل المفاجئ — ومشوار نهائي لوحدك.",
        },
      },
    ],
  },
  {
    slug: "complete-mastery",
    category: "program",
    sessions: 20,
    minutesPerSession: 60,
    price: 7400,
    level: { en: "Beginner – Advanced", ar: "مبتدئ – متقدم" },
    name: { en: "Complete Mastery", ar: "الكورس الشامل" },
    seoKeyword: { en: "Complete Driving Course in Cairo", ar: "الكورس الشامل لتعليم القيادة" },
    keywords: {
      en: ["complete driving course Cairo", "full driving lessons package Egypt"],
      ar: ["الكورس الشامل لتعليم السواقة", "كورس تعليم قيادة كامل", "باقة تعليم سواقة شاملة"],
    },
    tagline: { en: "Everything — from first seat to full independence.", ar: "كل حاجة.. من أول قعدة لحد الاستقلال الكامل." },
    description: {
      en: "Our most complete program: twenty sessions covering every module, license preparation and long independent drives — the M Drive experience from start to finish.",
      ar: "أشمل برامجنا: 20 حصة بتغطي كل الموديولات والتجهيز للرخصة ومشاوير طويلة لوحدك — تجربة M Drive من الأول للآخر.",
    },
    highlights: {
      en: ["All six learning modules", "License test preparation included", "Long independent drives", "Priority scheduling"],
      ar: ["كل موديولات التعليم الستة", "التجهيز لاختبار الرخصة", "مشاوير طويلة لوحدك", "أولوية في اختيار المواعيد"],
    },
    idealFor: {
      en: ["Complete beginners who want it all", "Anyone who wants zero gaps in their skills"],
      ar: ["المبتدئ اللي عايز يتعلم كل حاجة", "أي حد عايز مهاراته تبقى كاملة من غير ثغرات"],
    },
    modules: ["basics", "rules", "control", "parking", "traffic", "highway"],
    plan: [
      {
        from: 1,
        to: 3,
        title: { en: "Foundations", ar: "الأساسيات" },
        details: {
          en: "Know your car and build smooth, calm control.",
          ar: "تعرف عربيتك وتبني تحكم ناعم وهادي.",
        },
      },
      {
        from: 4,
        to: 7,
        title: { en: "Parking mastery", ar: "احتراف الركن" },
        details: {
          en: "All parking types until they become automatic.",
          ar: "كل أنواع الركن لحد ما تبقى تلقائية.",
        },
      },
      {
        from: 8,
        to: 12,
        title: { en: "City traffic", ar: "زحمة المدينة" },
        details: {
          en: "Junctions, roundabouts, microbuses and narrow streets.",
          ar: "التقاطعات والميادين والميكروباصات والشوارع الضيقة.",
        },
      },
      {
        from: 13,
        to: 16,
        title: { en: "Highways & night", ar: "الطرق السريعة والليل" },
        details: {
          en: "Ring Road, overtaking, night and rain driving.",
          ar: "الدائري والتخطي والسواقة بالليل وفي المطر.",
        },
      },
      {
        from: 17,
        to: 18,
        title: { en: "Car care & emergencies", ar: "صيانة العربية والطوارئ" },
        details: {
          en: "Warning lights, basic checks and emergency handling.",
          ar: "لمبات التحذير والفحص الأساسي والتصرف في الطوارئ.",
        },
      },
      {
        from: 19,
        to: 20,
        title: { en: "License prep & long drive", ar: "تجهيز الرخصة ومشوار طويل" },
        details: {
          en: "A mock test plus a long independent drive to graduate.",
          ar: "اختبار تجريبي ومشوار طويل لوحدك علشان تتخرج.",
        },
      },
    ],
  },
];

export interface AddOn {
  id: string;
  price: number;
  name: Localized;
  unit: Localized;
  description: Localized;
}

export const addOns: AddOn[] = [
  {
    id: "pickup",
    price: 100,
    name: { en: "Home pickup", ar: "استلام من البيت" },
    unit: { en: "per session", ar: "للحصة" },
    description: {
      en: "Your captain picks you up from home in covered areas.",
      ar: "الكابتن بيستلمك من البيت في المناطق المتاحة.",
    },
  },
  {
    id: "extra-session",
    price: 450,
    name: { en: "Extra session", ar: "حصة إضافية" },
    unit: { en: "per session", ar: "للحصة" },
    description: {
      en: "Add sessions to any package at a reduced rate.",
      ar: "زوّد حصص على أي باقة بسعر مخفّض.",
    },
  },
  {
    id: "test-day-car",
    price: 700,
    name: { en: "Test-day car", ar: "عربية يوم الاختبار" },
    unit: { en: "one time", ar: "مرة واحدة" },
    description: {
      en: "A training car and a captain with you on license test day.",
      ar: "عربية تدريب وكابتن معاك يوم اختبار الرخصة.",
    },
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function perSession(course: Course) {
  return Math.round(course.price / course.sessions);
}
