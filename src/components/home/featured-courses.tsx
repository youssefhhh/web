import { Compass } from "lucide-react";
import { CourseCard } from "@/components/courses/course-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { courses, getCourse } from "@/data/courses";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatPrice, href } from "@/lib/utils";

const featured = ["parking-skills", "confident-driver", "license-ready"];

export function FeaturedCourses({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { courses: coursesDict, common } = dict;
  const assessment = getCourse("assessment")!;
  const cards = featured.map((slug) => courses.find((course) => course.slug === slug)!);

  return (
    <section className="relative overflow-hidden border-t border-white/[.05] bg-ink-900 py-24 sm:py-32">
      <div aria-hidden className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-glow-400/40 to-transparent" />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-glow-400/[.05] blur-[120px]"
      />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={coursesDict.eyebrow} title={coursesDict.title} description={coursesDict.description} />
          <div data-reveal className="shrink-0">
            <ButtonLink href={href(locale, "/courses")} variant="secondary" arrow>
              {coursesDict.viewAll}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:items-stretch">
          {cards.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              locale={locale}
              dict={dict}
              delay={index * 90}
              className={index === 2 ? "md:col-span-2 lg:col-span-1" : undefined}
            />
          ))}
        </div>

        <div
          data-reveal
          className="mt-5 flex flex-col gap-6 rounded-[30px] border border-dashed border-white/[.12] bg-ink-950/40 p-6 sm:p-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start gap-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-glow-400/10 text-glow-400">
              <Compass aria-hidden className="size-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-paper">{coursesDict.assessmentBanner.title}</h3>
              <p className="mt-1.5 text-fog">
                {coursesDict.assessmentBanner.body}{" "}
                <span className="font-semibold whitespace-nowrap text-glow-300">{formatPrice(assessment.price, locale)}</span>
              </p>
            </div>
          </div>
          <ButtonLink href={href(locale, "/book?course=assessment")} variant="primary" className="shrink-0" arrow>
            {coursesDict.assessmentBanner.cta}
          </ButtonLink>
        </div>

        <p className="mt-6 text-center text-sm text-smoke">{common.pricesNote}</p>
      </div>
    </section>
  );
}
