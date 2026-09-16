import { branches, type Branch } from "@/data/branches";
import { courses, type Course } from "@/data/courses";
import { getModule } from "@/data/curriculum";
import { faqAnswer, type Faq } from "@/data/faqs";
import { site } from "@/data/site";
import { hreflang, type Locale } from "@/i18n/config";
import { absoluteUrl, pagePath } from "@/lib/seo";

/** schema.org JSON-LD builders, following Google's structured data guidelines. */

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** Derived from the course prices, so it never goes stale. */
const priceRange = `EGP ${Math.min(...courses.map((course) => course.price))} – EGP ${Math.max(...courses.map((course) => course.price))}`;

const brandNames = ["M Drive", "M Drive Academy", "Mena Drive Academy", "إم درايف", "ام درايف", "أكاديمية مينا درايف"];

const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: site.openingHours.opens,
  closes: site.openingHours.closes,
};

/** Only real profile URLs (not the bare placeholder domains) belong in `sameAs`. */
function socialProfiles() {
  return site.social
    .map((profile) => profile.url)
    .filter((url) => {
      try {
        return new URL(url).pathname.replace(/\/+$/, "").length > 0;
      } catch {
        return false;
      }
    });
}

function postalAddress(branch: Branch) {
  return {
    "@type": "PostalAddress",
    streetAddress: branch.address.street,
    addressLocality: branch.address.locality,
    addressRegion: branch.address.region,
    postalCode: branch.address.postalCode,
    addressCountry: "EG",
  };
}

function geo(branch: Branch) {
  return { "@type": "GeoCoordinates", latitude: branch.geo.latitude, longitude: branch.geo.longitude };
}

/** The academy as a local business (DrivingSchool), with every branch as a department. */
export function organizationSchema(locale: Locale, description: string) {
  const [main] = branches;
  const sameAs = socialProfiles();
  const image = absoluteUrl(`/og/og-${locale}.jpg`);

  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: brandNames.filter((name) => name !== site.name),
    description,
    url: absoluteUrl(pagePath(locale)),
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/icon-512.png"), width: 512, height: 512 },
    image,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange,
    currenciesAccepted: "EGP",
    paymentAccepted: "Cash, InstaPay, Mobile wallet",
    knowsLanguage: ["ar", "en"],
    address: postalAddress(main),
    geo: geo(main),
    openingHoursSpecification: [openingHours],
    areaServed: [
      { "@type": "City", name: "Cairo" },
      { "@type": "City", name: "Giza" },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    department: branches.map((branch) => ({
      "@type": "DrivingSchool",
      "@id": `${site.url}/#branch-${branch.slug}`,
      name: `${site.name} — ${branch.name[locale]}`,
      url: `${absoluteUrl(pagePath(locale, "/locations"))}#${branch.slug}`,
      image,
      telephone: site.contact.phone,
      priceRange,
      address: postalAddress(branch),
      geo: geo(branch),
      openingHoursSpecification: [openingHours],
      parentOrganization: { "@id": ORGANIZATION_ID },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "ar" ? "كورسات تعليم السواقة" : "Driving courses",
      itemListElement: courses.map((course) => ({
        "@type": "Offer",
        price: course.price,
        priceCurrency: "EGP",
        url: absoluteUrl(pagePath(locale, `/courses/${course.slug}`)),
        itemOffered: { "@type": "Service", name: course.name[locale], description: course.tagline[locale] },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    alternateName: brandNames.filter((name) => name !== site.name),
    url: `${site.url}/`,
    inLanguage: [hreflang.ar, hreflang.en],
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function courseSchema(course: Course, locale: Locale) {
  const url = absoluteUrl(pagePath(locale, `/courses/${course.slug}`));
  const hours = (course.sessions * course.minutesPerSession) / 60;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: course.name[locale],
    description: course.description[locale],
    url,
    image: absoluteUrl(`/og/og-${locale}.jpg`),
    inLanguage: hreflang[locale],
    availableLanguage: ["ar", "en"],
    educationalLevel: course.level[locale],
    teaches: course.modules.map((id) => getModule(id).title[locale]),
    provider: { "@type": "DrivingSchool", "@id": ORGANIZATION_ID, name: site.name, url: `${site.url}/` },
    offers: [
      {
        "@type": "Offer",
        category: "Paid",
        price: course.price,
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
        url,
      },
    ],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: `PT${hours}H`,
        location: {
          "@type": "Place",
          name: locale === "ar" ? "القاهرة الكبرى" : "Greater Cairo",
          address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
        },
      },
    ],
  };
}

/** Summary-page list pointing at every course detail page. */
export function courseListSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(pagePath(locale, `/courses/${course.slug}`)),
    })),
  };
}

export function faqSchema(items: Faq[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question[locale],
      acceptedAnswer: { "@type": "Answer", text: faqAnswer(faq, locale) },
    })),
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(`${item.href.replace(/\/+$/, "")}/`),
    })),
  };
}
