import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Plate } from "@/components/ui/plate";
import { perSession, type Course } from "@/data/courses";
import type { Locale } from "@/i18n/config";
import { plural, type Dictionary } from "@/i18n/get-dictionary";
import { cn, formatNumber, formatPrice, href, revealDelay } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  delay?: number;
}

export function CourseCard({ course, locale, dict, className, delay = 0 }: CourseCardProps) {
  const { common, courses: coursesDict } = dict;
  const detailHref = href(locale, `/courses/${course.slug}`);
  const bookHref = href(locale, `/book?course=${course.slug}`);

  return (
    <article
      data-reveal
      data-category={course.category}
      style={revealDelay(delay)}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-[30px] border p-6 transition-[border-color,box-shadow] duration-500 sm:p-8",
        course.popular
          ? "border-glow-400/45 bg-linear-to-b from-[#2a1f10] via-ink-900 to-ink-900 shadow-[0_40px_100px_-50px_rgb(255_178_56/.55)]"
          : "border-white/[.08] bg-ink-900 hover:border-white/[.18]",
        className,
      )}
    >
      {course.popular && (
        <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-glow-300 to-transparent" />
      )}

      <div className="flex items-start justify-between gap-4">
        <Plate
          value={course.sessions}
          label={plural(course.sessions, locale, common.sessions)}
          country={common.plateCountry}
          countryAlt={common.plateCountryAlt}
        />
        {course.popular ? (
          <span className="rounded-full bg-glow-400 px-3 py-1.5 text-xs font-bold text-ink-950">{common.popular}</span>
        ) : (
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-fog">
            {coursesDict.categories[course.category]}
          </span>
        )}
      </div>

      <h3 className="mt-8 font-display text-2xl leading-tight font-extrabold text-paper sm:text-[1.65rem] rtl:leading-snug">
        <Link href={detailHref} className="outline-none after:absolute after:inset-0 after:rounded-[30px] focus-visible:after:outline-2 focus-visible:after:outline-glow-400">
          {course.name[locale]}
        </Link>
      </h3>
      <p className="mt-2 text-fog">{course.tagline[locale]}</p>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="font-brand text-[2.6rem] leading-none font-extrabold tracking-tight text-paper">
          {formatNumber(course.price)}
        </span>
        <span className="text-sm font-semibold text-fog">{locale === "ar" ? "ج.م" : "EGP"}</span>
      </div>
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-smoke">
        <span>
          ≈ {formatPrice(perSession(course), locale)} {common.perSession}
        </span>
        <span aria-hidden className="size-1 rounded-full bg-smoke/60" />
        <span className="inline-flex items-center gap-1.5">
          <Clock aria-hidden className="size-3.5" />
          {course.minutesPerSession} {common.minutesShort}
        </span>
      </p>

      <div aria-hidden className="my-7 h-[3px] text-white/10 lane-dashes" />

      <ul className="space-y-3 text-[0.95rem]">
        {course.highlights[locale].map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-glow-400" strokeWidth={2.5} />
            <span className="leading-snug text-paper/85">{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-8">
        <ButtonLink href={bookHref} variant={course.popular ? "primary" : "secondary"} className="w-full" arrow>
          {common.bookCourse}
        </ButtonLink>
      </div>
    </article>
  );
}
