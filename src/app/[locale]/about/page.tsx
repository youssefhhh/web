import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarFront, Check, ClipboardCheck, UserRound } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { FinalCta } from "@/components/home/final-cta";
import { Stats } from "@/components/home/stats";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { isLocale } from "@/i18n/config";
import arDictionary from "@/i18n/dictionaries/ar";
import enDictionary from "@/i18n/dictionaries/en";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { href, padNumber, revealDelay } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, page: "about", path: "/about", title: meta.about.title, description: meta.about.description });
}

const standardIcons = [UserRound, CarFront, ClipboardCheck];

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { about, nav } = dict;
  const otherValues = locale === "ar" ? enDictionary.values : arDictionary.values;

  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
        breadcrumbLabel={dict.a11y.breadcrumb}
        breadcrumbs={[
          { label: nav.home, href: href(locale) },
          { label: nav.about, href: href(locale, "/about") },
        ]}
      />

      {/* Story */}
      <section className="relative bg-ink-950 py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
          </div>
          <div className="space-y-7">
            {about.story.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-reveal
                style={revealDelay(index * 80)}
                className={
                  index === 0
                    ? "font-display text-2xl leading-snug font-semibold text-paper sm:text-[1.75rem] rtl:leading-normal"
                    : "text-lg leading-relaxed text-fog rtl:leading-loose"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Stats locale={locale} />

      {/* Values — lettered like the sign on our wall */}
      <section className="relative overflow-hidden bg-wall-100 py-24 text-ink-950 sm:py-32">
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[.05]" />
        <div aria-hidden className="absolute top-1/2 left-1/2 h-[40rem] w-[50rem] -translate-1/2 rounded-full bg-glow-300/20 blur-[140px]" />
        <div className="container-x relative">
          <SectionHeading tone="light" eyebrow={about.values.eyebrow} title={about.values.title} />
          <ol className="mt-14 border-t border-ink-950/10">
            {about.values.items.map((value, index) => (
              <li
                key={value.title}
                data-reveal
                className="grid gap-4 border-b border-ink-950/10 py-9 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-8 lg:py-11"
              >
                <span className="font-brand text-sm font-bold text-wall-400">{padNumber(index + 1)}</span>
                <p className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="font-display text-5xl leading-none font-extrabold text-sign sm:text-6xl lg:text-7xl rtl:leading-tight">
                    {value.title}
                  </span>
                  <span
                    lang={locale === "ar" ? "en" : "ar"}
                    className={
                      locale === "ar"
                        ? "font-brand text-sm font-semibold tracking-[0.3em] text-wall-400 uppercase"
                        : "font-arabic text-2xl font-bold text-wall-400"
                    }
                  >
                    {otherValues[index]}
                  </span>
                </p>
                <p className="max-w-md text-lg leading-relaxed text-wall-500 rtl:leading-loose">{value.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Standard */}
      <section className="relative bg-ink-950 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={about.standard.eyebrow} title={about.standard.title} />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {about.standard.columns.map((column, index) => {
              const Icon = standardIcons[index];
              return (
                <article
                  key={column.title}
                  data-reveal
                  style={revealDelay(index * 90)}
                  className="rounded-[28px] border border-white/[.08] bg-ink-900 p-7 sm:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-glow-400 text-ink-950">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-paper">{column.title}</h3>
                  <ul className="mt-6 space-y-3.5">
                    {column.points.map((point) => (
                      <li key={point} className="flex gap-3 text-fog">
                        <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-glow-400" strokeWidth={2.5} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative overflow-hidden border-t border-white/[.05] bg-ink-900 py-24 sm:py-32">
        <div className="container-x text-center">
          <LogoMark className="mx-auto w-20 text-ink-950 [filter:drop-shadow(0_0_1px_rgb(255_205_130/.9))_drop-shadow(0_0_14px_rgb(255_170_60/.6))]" />
          <Eyebrow className="mt-10 justify-center">{about.eyebrow}</Eyebrow>
          <blockquote
            data-reveal
            className="mx-auto mt-6 max-w-4xl font-display text-3xl leading-tight font-extrabold text-balance text-paper sm:text-5xl rtl:leading-snug"
          >
            “{about.quote}”
          </blockquote>
          <p data-reveal className="mt-6 text-fog">
            — {about.quoteAuthor}
          </p>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
