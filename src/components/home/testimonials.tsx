import { Quote, Star } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCourse } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { format, revealDelay } from "@/lib/utils";

export function Testimonials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { testimonials: copy, a11y } = dict;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-glow-400/[.05] blur-[120px]"
      />
      <Carousel
        previousLabel={a11y.previous}
        nextLabel={a11y.next}
        heading={<SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />}
      >
        {testimonials.map((testimonial, index) => {
          const course = getCourse(testimonial.courseSlug);
          const name = testimonial.name[locale];
          return (
            <li
              key={testimonial.name.en}
              data-reveal
              style={revealDelay(Math.min(index, 3) * 90)}
              className="w-[85%] max-w-[420px] shrink-0 snap-start sm:w-[400px]"
            >
              <figure className="flex h-full flex-col rounded-[28px] border border-white/[.08] bg-ink-900 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span
                    className="flex gap-0.5 text-glow-400"
                    role="img"
                    aria-label={format(a11y.rating, { rating: testimonial.rating })}
                  >
                    {Array.from({ length: testimonial.rating }, (_, star) => (
                      <Star key={star} aria-hidden className="size-4 fill-current" />
                    ))}
                  </span>
                  <Quote aria-hidden className="size-8 text-white/10 rtl:-scale-x-100" />
                </div>
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-paper/90 rtl:leading-loose">
                  “{testimonial.quote[locale]}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-white/[.07] pt-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-glow-300 to-glow-600 font-display text-base font-bold text-ink-950">
                    {name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-paper">{name}</span>
                    {course && (
                      <span className="block text-sm text-smoke">
                        {copy.took}: {course.name[locale]}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </Carousel>
    </section>
  );
}
