import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, CircleCheck, Clock, Gauge, Layers, Timer } from "lucide-react";
import { CourseCard } from "@/components/courses/course-card";
import { FinalCta } from "@/components/home/final-cta";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Plate } from "@/components/ui/plate";
import { Eyebrow } from "@/components/ui/section-heading";
import { courses, getCourse, perSession } from "@/data/courses";
import { getModule } from "@/data/curriculum";
import { isLocale } from "@/i18n/config";
import { getDictionary, plural } from "@/i18n/get-dictionary";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { courseSchema } from "@/lib/structured-data";
import { format, formatNumber, formatPrice, href, padNumber, revealDelay, whatsappUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/courses/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = getCourse(slug);
  if (!isLocale(locale) || !course) return {};
  const { meta, common } = getDictionary(locale);
  const sessions = `${course.sessions} ${plural(course.sessions, locale, common.sessions)}`;
  const keyword = course.seoKeyword[locale];

  return pageMetadata({
    locale,
    page: "course",
    path: `/courses/${course.slug}`,
    title: course.sessions > 1 ? format(meta.course.title, { keyword, sessions }) : keyword,
    description: format(meta.course.description, {
      keyword,
      sessions,
      price: formatPrice(course.price, locale),
      details: course.description[locale],
    }),
    extraKeywords: course.keywords[locale],
  });
}

export default async function CoursePage({ params }: PageProps<"/[locale]/courses/[slug]">) {
  const { locale, slug } = await params;
  const course = getCourse(slug);
  if (!isLocale(locale) || !course) notFound();

  const dict = getDictionary(locale);
  const { coursePage: copy, common, nav } = dict;
  const totalHours = (course.sessions * course.minutesPerSession) / 60;
  const bookHref = href(locale, `/book?course=${course.slug}`);
  const askHref = whatsappUrl(format(copy.whatsappMessage, { course: course.name[locale] }));

  const related = courses
    .filter((other) => other.slug !== course.slug && other.category !== "start")
    .sort((a, b) => Math.abs(a.sessions - course.sessions) - Math.abs(b.sessions - course.sessions))
    .slice(0, 3);

  const facts = [
    { icon: Layers, label: copy.facts.sessions, value: `${course.sessions} ${plural(course.sessions, locale, common.sessions)}` },
    { icon: Timer, label: copy.facts.duration, value: `${course.minutesPerSession} ${plural(course.minutesPerSession, locale, common.minutes)}` },
    { icon: Clock, label: copy.facts.total, value: `${formatNumber(totalHours)} ${plural(totalHours, locale, common.hours)}` },
    { icon: Gauge, label: copy.facts.level, value: course.level[locale] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(courseSchema(course, locale))} />
      <PageHero
        eyebrow={course.seoKeyword[locale]}
        title={course.name[locale]}
        description={
          <>
            <span className="block font-display text-xl font-semibold text-paper sm:text-2xl">{course.tagline[locale]}</span>
            <span className="mt-4 block">{course.description[locale]}</span>
          </>
        }
        breadcrumbLabel={dict.a11y.breadcrumb}
        breadcrumbs={[
          { label: nav.home, href: href(locale) },
          { label: nav.courses, href: href(locale, "/courses") },
          { label: course.name[locale], href: href(locale, `/courses/${course.slug}`) },
        ]}
        aside={
          <Plate
            size="lg"
            value={course.sessions}
            label={plural(course.sessions, locale, common.sessions)}
            country={common.plateCountry}
            countryAlt={common.plateCountryAlt}
            className="rotate-[-4deg] shadow-[0_30px_60px_-20px_rgb(0_0_0/.8)] lg:mb-4"
          />
        }
      />

      <section className="relative bg-ink-950 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div className="min-w-0">
            {/* Facts */}
            <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  data-reveal
                  style={revealDelay(index * 60)}
                  className="rounded-[22px] border border-white/[.08] bg-ink-900 p-5"
                >
                  <fact.icon aria-hidden className="size-5 text-glow-400" />
                  <dt className="mt-4 text-sm text-smoke">{fact.label}</dt>
                  <dd className="mt-1 font-display text-lg leading-snug font-bold text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>

            {/* What you'll learn */}
            <div className="mt-16">
              <Eyebrow>{copy.learn}</Eyebrow>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.modules.map((moduleId, index) => {
                  const learningModule = getModule(moduleId);
                  return (
                    <li
                      key={moduleId}
                      data-reveal
                      style={revealDelay(index * 60)}
                      className="rounded-[22px] border border-white/[.08] bg-ink-900 p-6"
                    >
                      <p className="font-display text-lg font-bold text-paper">{learningModule.title[locale]}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fog">{learningModule.summary[locale]}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Session plan */}
            <div className="mt-16">
              <Eyebrow>{copy.plan}</Eyebrow>
              <ol className="relative mt-8">
                <span aria-hidden className="absolute inset-y-3 start-[19px] w-[3px] text-white/10 lane-dashes-y" />
                {course.plan.map((phase, index) => {
                  const range = phase.from === phase.to ? `${phase.from}` : `${phase.from}–${phase.to}`;
                  const label = phase.from === phase.to ? copy.sessionLabel : copy.sessionsLabel;
                  return (
                    <li key={`${phase.from}-${phase.to}`} data-reveal className="relative flex gap-5 pb-8 last:pb-0">
                      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-glow-400/40 bg-ink-950 font-brand text-xs font-bold text-glow-300">
                        {padNumber(index + 1)}
                      </span>
                      <div className="flex-1 rounded-[22px] border border-white/[.07] bg-ink-900 p-5 sm:p-6">
                        <p className="text-sm font-medium text-glow-300">
                          {label} <span dir="ltr">{range}</span>
                        </p>
                        <p className="mt-1.5 font-display text-lg font-bold text-paper">{phase.title[locale]}</p>
                        <p className="mt-1.5 leading-relaxed text-fog">{phase.details[locale]}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Ideal for */}
            <div className="mt-16 grid gap-3 sm:grid-cols-2">
              <div data-reveal className="rounded-[26px] border border-white/[.08] bg-ink-900 p-7">
                <Eyebrow>{copy.idealFor}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {course.idealFor[locale].map((item) => (
                    <li key={item} className="flex gap-3 text-paper/90">
                      <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-glow-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal className="rounded-[26px] border border-white/[.08] bg-ink-900 p-7">
                <Eyebrow>{copy.included}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {copy.includedItems.map((item) => (
                    <li key={item} className="flex gap-3 text-paper/90">
                      <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-glow-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Price card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-[30px] border border-glow-400/35 bg-linear-to-b from-[#2a1f10] to-ink-900 p-7 shadow-[0_40px_100px_-50px_rgb(255_178_56/.5)] sm:p-8">
              <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-glow-300 to-transparent" />
              {course.popular && (
                <span className="mb-5 inline-block rounded-full bg-glow-400 px-3 py-1 text-xs font-bold text-ink-950">
                  {common.popular}
                </span>
              )}
              <p className="text-sm text-fog">{copy.priceTotal}</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-brand text-5xl font-extrabold tracking-tight text-paper">{formatNumber(course.price)}</span>
                <span className="font-semibold text-fog">{locale === "ar" ? "ج.م" : "EGP"}</span>
              </p>
              <p className="mt-2 text-sm text-smoke">
                {format(copy.perSessionApprox, { price: formatPrice(perSession(course), locale) })}
              </p>
              <div aria-hidden className="my-7 h-[3px] text-white/10 lane-dashes" />
              <div className="grid gap-2.5">
                <ButtonLink href={bookHref} size="lg" className="w-full" arrow>
                  {common.bookCourse}
                </ButtonLink>
                <ButtonAnchor
                  href={askHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  <WhatsAppIcon className="size-5 text-glow-400" />
                  {copy.askWhatsapp}
                </ButtonAnchor>
              </div>
              <p className="mt-6 text-center text-xs text-smoke">{common.pricesNote}</p>
            </div>
            <Link
              href={href(locale, "/courses")}
              className="mt-4 block text-center text-sm text-fog underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {copy.backToCourses}
            </Link>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="relative border-t border-white/[.05] bg-ink-900 py-24 sm:py-28">
        <div className="container-x">
          <h2 data-reveal className="font-display text-3xl font-extrabold text-paper sm:text-4xl">
            {copy.related}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((other, index) => (
              <CourseCard key={other.slug} course={other} locale={locale} dict={dict} delay={index * 80} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />

      {/* Mobile action bar */}
      <div
        data-mobile-bar
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[.08] bg-ink-950/90 px-4 py-3 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs text-smoke">{course.name[locale]}</p>
            <p className="font-brand text-xl font-extrabold text-paper">
              {formatNumber(course.price)} <span className="font-sans text-xs font-medium text-fog">{locale === "ar" ? "ج.م" : "EGP"}</span>
            </p>
          </div>
          <ButtonLink href={bookHref} size="md" className="shrink-0" arrow>
            {common.bookNow}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
