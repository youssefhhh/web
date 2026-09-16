import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck, CalendarClock, Compass, Plus, Wallet } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { CourseCard } from "@/components/courses/course-card";
import { CourseFilter, type FilterValue } from "@/components/courses/course-filter";
import { FinalCta } from "@/components/home/final-cta";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { addOns, courses, getCourse, perSession } from "@/data/courses";
import { faqs } from "@/data/faqs";
import { isLocale } from "@/i18n/config";
import { getDictionary, plural } from "@/i18n/get-dictionary";
import { fillMeta, jsonLd, pageMetadata } from "@/lib/seo";
import { courseListSchema } from "@/lib/structured-data";
import { cn, formatNumber, formatPrice, href, padNumber, revealDelay, whatsappUrl } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/courses">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({
    locale,
    page: "courses",
    path: "/courses",
    title: meta.courses.title,
    description: fillMeta(meta.courses.description, locale),
  });
}

const policyIcons = [Wallet, CalendarClock, BadgeCheck];

export default async function CoursesPage({ params }: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { courses: copy, coursesPage, common, nav } = dict;

  const counts: Record<FilterValue, number> = {
    all: courses.length,
    start: courses.filter((course) => course.category === "start").length,
    skills: courses.filter((course) => course.category === "skills").length,
    program: courses.filter((course) => course.category === "program").length,
  };

  const pricingFaqs = faqs.filter((faq) => faq.category !== "start");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(courseListSchema(locale))} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={coursesPage.title}
        description={coursesPage.description}
        breadcrumbLabel={dict.a11y.breadcrumb}
        breadcrumbs={[
          { label: nav.home, href: href(locale) },
          { label: nav.courses, href: href(locale, "/courses") },
        ]}
      />

      {/* Catalogue */}
      <section className="relative bg-ink-950 py-16 sm:py-24">
        <div className="container-x">
          <CourseFilter labels={copy.filters} counts={counts}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course, index) => (
                <CourseCard key={course.slug} course={course} locale={locale} dict={dict} delay={(index % 3) * 80} />
              ))}
              <div
                data-reveal
                className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[30px] border border-dashed border-white/[.14] bg-ink-900/40 p-6 sm:p-8"
              >
                <LogoMark className="absolute -right-10 -bottom-10 w-56 text-white/[.03] [--mark-accent:rgb(255_178_56/.12)] rtl:-left-10 rtl:right-auto" />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-glow-400/10 text-glow-400">
                    <Compass aria-hidden className="size-6" />
                  </span>
                  <h3 className="mt-8 font-display text-2xl leading-tight font-extrabold text-paper">
                    {copy.assessmentBanner.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-fog">{copy.assessmentBanner.body}</p>
                </div>
                <div className="relative grid gap-2.5">
                  <ButtonLink href={href(locale, "/book?course=assessment")} className="w-full" arrow>
                    {copy.assessmentBanner.cta}
                  </ButtonLink>
                  <ButtonAnchor
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="w-full"
                  >
                    <WhatsAppIcon className="size-4 text-glow-400" />
                    {common.whatsappUs}
                  </ButtonAnchor>
                </div>
              </div>
            </div>
          </CourseFilter>
          <p className="mt-8 text-center text-sm text-smoke">{common.pricesNote}</p>
        </div>
      </section>

      {/* Course finder */}
      <section className="relative overflow-hidden bg-wall-100 py-24 text-ink-950 sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[.05]" />
        <div className="container-x relative">
          <SectionHeading tone="light" eyebrow={copy.guide.eyebrow} title={copy.guide.title} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.guide.items.map((item, index) => {
              const course = getCourse(item.slug)!;
              return (
                <Link
                  key={item.slug}
                  href={href(locale, `/courses/${course.slug}`)}
                  data-reveal
                  style={revealDelay(index * 80)}
                  className="group flex flex-col rounded-[26px] border border-ink-950/[.08] bg-wall-50 p-6 shadow-[0_24px_60px_-40px_rgb(8_8_10/.4)] transition-[border-color,translate] duration-500 hover:-translate-y-1 hover:border-ink-950/25"
                >
                  <span className="font-brand text-xs font-bold text-wall-400">{padNumber(index + 1)}</span>
                  <p className="mt-4 font-display text-xl leading-snug font-bold">“{item.situation}”</p>
                  <div aria-hidden className="my-6 h-[3px] text-ink-950/15 lane-dashes" />
                  <p className="text-sm text-wall-500">{copy.guide.recommended}</p>
                  <p className="mt-1 flex items-center justify-between gap-3 font-display text-lg font-bold text-glow-700">
                    {course.name[locale]}
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </p>
                  <p className="mt-1 text-sm text-wall-500">
                    {course.sessions} {plural(course.sessions, locale, common.sessions)} · {formatPrice(course.price, locale)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="relative bg-ink-950 py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={copy.eyebrow} title={coursesPage.compareTitle} />
          <div data-reveal className="mt-12 overflow-x-auto rounded-[28px] border border-white/[.08] bg-ink-900">
            <table className="w-full min-w-[640px] text-start">
              <thead>
                <tr className="border-b border-white/[.08] text-sm text-smoke">
                  <th scope="col" className="px-6 py-5 text-start font-medium">
                    {coursesPage.compareHeaders.course}
                  </th>
                  <th scope="col" className="px-6 py-5 text-start font-medium">
                    {coursesPage.compareHeaders.sessions}
                  </th>
                  <th scope="col" className="px-6 py-5 text-start font-medium">
                    {coursesPage.compareHeaders.perSession}
                  </th>
                  <th scope="col" className="px-6 py-5 text-end font-medium">
                    {coursesPage.compareHeaders.total}
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => {
                  const barWidth = Math.max(8, (course.sessions / 20) * 100);
                  return (
                    <tr
                      key={course.slug}
                      className={cn(
                        "border-b border-white/[.05] transition-colors last:border-0 hover:bg-white/[.02]",
                        course.popular && "bg-glow-400/[.05]",
                      )}
                    >
                      <th scope="row" className="px-6 py-5 text-start font-normal">
                        <Link
                          href={href(locale, `/courses/${course.slug}`)}
                          className="font-display font-bold text-paper transition-colors hover:text-glow-300"
                        >
                          {course.name[locale]}
                        </Link>
                        {course.popular && (
                          <span className="ms-3 rounded-full bg-glow-400 px-2 py-0.5 text-[0.65rem] font-bold text-ink-950">
                            {common.popular}
                          </span>
                        )}
                      </th>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="w-6 font-brand text-sm font-bold text-paper">{course.sessions}</span>
                          <span className="h-1.5 w-28 overflow-hidden rounded-full bg-white/[.06]">
                            <span
                              className="block h-full rounded-full bg-linear-to-r from-glow-600 to-glow-300 rtl:bg-linear-to-l"
                              style={{ width: `${barWidth}%` }}
                            />
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-fog">{formatPrice(perSession(course), locale)}</td>
                      <td className="px-6 py-5 text-end font-brand font-bold text-paper">
                        {formatNumber(course.price)}{" "}
                        <span className="font-sans text-xs font-medium text-smoke">{locale === "ar" ? "ج.م" : "EGP"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons & policies */}
      <section className="relative border-t border-white/[.05] bg-ink-900 py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={copy.addOns.eyebrow} title={copy.addOns.title} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {addOns.map((addOn, index) => (
              <article
                key={addOn.id}
                data-reveal
                style={revealDelay(index * 80)}
                className="relative flex flex-col rounded-[26px] border border-white/[.08] bg-ink-950 p-7"
              >
                <span className="grid size-11 place-items-center rounded-2xl border border-dashed border-glow-400/40 text-glow-400">
                  <Plus aria-hidden className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-paper">{addOn.name[locale]}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-fog">{addOn.description[locale]}</p>
                <p className="mt-6 flex items-baseline gap-2 border-t border-white/[.07] pt-5">
                  <span className="font-brand text-2xl font-extrabold text-paper">+{formatNumber(addOn.price)}</span>
                  <span className="text-sm text-smoke">
                    {locale === "ar" ? "ج.م" : "EGP"} · {addOn.unit[locale]}
                  </span>
                </p>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-5 rounded-[26px] border border-white/[.08] bg-linear-to-br from-glow-400/[.07] to-transparent p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold text-paper">{copy.policies.title}</h3>
            <ul className="mt-7 grid gap-6 md:grid-cols-3">
              {copy.policies.items.map((policy, index) => {
                const Icon = policyIcons[index];
                return (
                  <li key={policy.title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-glow-400 text-ink-950">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-paper">{policy.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fog">{policy.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-950 py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.faq.title} description={dict.faq.description} />
          </div>
          <FaqList items={pricingFaqs} locale={locale} name="pricing-faq" />
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
