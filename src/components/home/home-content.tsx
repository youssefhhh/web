import type { Metadata } from "next";
import { Curriculum } from "@/components/home/curriculum";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Journey } from "@/components/home/journey";
import { LocationsTeaser } from "@/components/home/locations-teaser";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { ValuesMarquee } from "@/components/home/values-marquee";
import { WhyUs } from "@/components/home/why-us";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fillMeta, jsonLd, pageMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export function homeMetadata(locale: Locale, canonicalPath?: string): Metadata {
  const { meta } = getDictionary(locale);
  return pageMetadata({
    locale,
    page: "home",
    path: "/",
    title: meta.home.title,
    absoluteTitle: true,
    description: fillMeta(meta.home.description, locale),
    canonicalPath,
  });
}

export function HomeContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const description = fillMeta(dict.meta.home.description, locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema(locale, description))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />
      <Hero locale={locale} dict={dict} />
      <ValuesMarquee />
      <Stats locale={locale} />
      <WhyUs dict={dict} />
      <Journey dict={dict} />
      <Curriculum locale={locale} dict={dict} />
      <FeaturedCourses locale={locale} dict={dict} />
      <LocationsTeaser locale={locale} dict={dict} />
      <Testimonials locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
