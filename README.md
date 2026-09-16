# M Drive — Mena Drive Academy

موقع أكاديمية **M Drive** لتعليم السواقة في القاهرة — عربي (RTL) وإنجليزي، متجاوب مع الموبايل والكمبيوتر، ومجهّز للنشر على **GitHub Pages**.

**التقنيات:** Next.js 16 (Static Export) · TypeScript · Tailwind CSS v4 · lucide-react

---

## التشغيل على جهازك

```bash
npm install
npm run dev
```

افتح `http://localhost:3000` (بيفتح الصفحة الرئيسية بالعربي).

| الأمر               | الوظيفة                                        |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | تشغيل وضع التطوير                              |
| `npm run build`     | بناء نسخة static في فولدر `out/`               |
| `npm run start`     | معاينة فولدر `out/` محليًا                      |
| `npm run lint`      | فحص الكود (ESLint)                             |
| `npm run typecheck` | فحص الأنواع (TypeScript)                       |

---

## 🚀 النشر على GitHub Pages (مرة واحدة بس)

الريبو: `https://github.com/youssefhhh/web` ← الموقع هيبقى على **https://youssefhhh.github.io/web/**

1. في الريبو على GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. ارفع المشروع على فرع `main`:

   ```bash
   git init
   git add .
   git commit -m "M Drive website"
   git branch -M main
   git remote add origin https://github.com/youssefhhh/web.git
   git push -u origin main
   ```

3. افتح تبويب **Actions** — الـ workflow (`.github/workflows/deploy.yml`) بيعمل build وينشر الموقع لوحده خلال دقيقتين تقريبًا.

بعد كده أي `git push` على `main` بيحدّث الموقع تلقائيًا.
لو أول تشغيل فشل لأن Pages ماكانتش متفعلة، فعّلها وبعدين من **Actions** اعمل **Re-run jobs**.

> مسار الموقع (`/web`) ورابطه بيتحددوا تلقائيًا في الـ workflow. لو ربطت دومين خاص بعدين، هيتظبطوا لوحدهم برضه.

---

## 🔎 الـ SEO

- عنوان ووصف وكلمات مفتاحية مختلفة لكل صفحة باللغتين (`src/data/seo.ts` + `meta` في ملفات الترجمة).
- H1 واحد في كل صفحة فيه الكلمة المفتاحية الأساسية.
- `canonical` و `hreflang` (ar-EG / en-EG / x-default) لكل صفحة.
- `sitemap.xml` و `robots.txt` و `manifest.webmanifest`.
- صور مشاركة (Open Graph) بالعربي والإنجليزي: `public/og/`.
- Structured Data لجوجل: `DrivingSchool` (بالفروع والعناوين والمواعيد)، `WebSite`، `Course` لكل كورس، `ItemList`، `FAQPage`، `BreadcrumbList`.
- صفحة 404 عليها `noindex`، وبتحوّل الروابط القديمة اللي من غير لغة (زي `/web/courses/`) للصفحة الصح.

### بعد النشر (مهم علشان الترتيب في جوجل)

1. **Google Search Console:** ضيف `https://youssefhhh.github.io/web/` كـ URL prefix property.
   - اختار التحقق بـ HTML tag، وخد قيمة `content` بس، وحطها في الريبو: **Settings → Secrets and variables → Actions → Variables → `GOOGLE_SITE_VERIFICATION`**، وبعدين اعمل Re-run للـ workflow.
   - ابعت الـ sitemap: `https://youssefhhh.github.io/web/sitemap.xml`
2. **Google Business Profile** لكل فرع — أهم خطوة لظهورك في بحث "تعليم سواقة قريب مني" وعلى الخريطة.
3. **دومين خاص** (زي `mdrive-academy.com`) — جوجل بيعرض اسم الموقع والأيقونة بتوعك بدل github.io، وده أقوى للبراند والترتيب.
4. آراء حقيقية من المتدربين على Google Maps، وروابط للموقع من صفحات فيسبوك وإنستجرام.

---

## ⚠️ قبل الإطلاق — عدّل البيانات دي

كل المحتوى في ملفات بيانات بسيطة، تعديلها بيحدّث الموقع كله (والـ SEO) تلقائيًا:

| الملف                                   | المحتوى                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/data/site.ts`                      | **التليفون، الواتساب، الإيميل، روابط السوشيال، المواعيد، الإحصائيات** (كلها مؤقتة)          |
| `src/data/courses.ts`                   | **الكورسات والأسعار** (`price`) والكلمات المفتاحية لكل كورس — الأسعار مبدئية                |
| `src/data/branches.ts`                  | الفروع والعناوين والإحداثيات ومكانها على الخريطة ومناطق الاستلام                            |
| `src/data/testimonials.ts`              | **آراء المتدربين — محتوى تجريبي، لازم يتبدل بآراء حقيقية**                                  |
| `src/data/faqs.ts`                      | الأسئلة الشائعة                                                                             |
| `src/data/seo.ts`                       | الكلمات المفتاحية لكل صفحة                                                                  |
| `src/i18n/dictionaries/ar.ts` / `en.ts` | كل نصوص الواجهة وعناوين ووصف الصفحات                                                        |
| `public/og/`                            | صور المشاركة على السوشيال (1200×630)                                                        |

- **رقم الواتساب** بالصيغة الدولية من غير `+` (مثال: `201012345678`).
- **روابط السوشيال** حط رابط صفحتك الحقيقية (مش الدومين بس) علشان تظهر في بيانات جوجل.

---

## هيكل المشروع

```
.github/workflows/deploy.yml   ← النشر التلقائي على GitHub Pages
public/                        ← صور المشاركة والأيقونات و .nojekyll
src/
  app/
    (entry)/                   ← الصفحة الرئيسية على "/" (عربي)
    [locale]/                  ← كل الصفحات (ar / en)
    global-not-found.tsx       ← صفحة 404
    sitemap.ts · robots.ts · manifest.ts · icon.svg · apple-icon.png
  components/                  ← الأقسام والمكونات
  data/                        ← بيانات الأكاديمية (أسعار، فروع، SEO، ...)
  i18n/                        ← اللغات والترجمة
  lib/                         ← SEO و Structured Data وأدوات مساعدة
```
