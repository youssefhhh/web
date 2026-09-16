import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/utils";
import { ButtonArrow, buttonClass } from "./button";

/** "Wrong turn" 404 content, reused by the localized and the global not-found pages. */
export function NotFoundView({ locale }: { locale: Locale }) {
  const { notFound } = getDictionary(locale);

  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden pt-[72px]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 size-[38rem] -translate-1/2 rounded-full bg-glow-400/[.09] blur-[120px]" />
      </div>
      <div className="container-x grid items-center gap-14 py-16 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div aria-hidden className="relative mx-auto size-56 sm:size-72">
          <div className="absolute inset-0 rounded-full bg-glow-400 shadow-[0_0_0_10px_rgb(8_8_10),0_0_0_12px_rgb(255_178_56/.5),0_0_120px_rgb(255_178_56/.45)]" />
          <div className="absolute inset-x-[16%] top-1/2 h-[18%] -translate-y-1/2 rounded-lg bg-ink-950" />
          <span dir="ltr" className="absolute inset-x-0 -bottom-16 text-center font-brand text-5xl font-extrabold text-outline">
            404
          </span>
        </div>
        <div className="text-center lg:text-start">
          <p className="eyebrow text-glow-300">{notFound.eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-tight font-extrabold text-balance text-paper sm:text-6xl rtl:leading-snug">
            {notFound.title}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-fog lg:mx-0">{notFound.description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href={href(locale)} className={buttonClass("primary", "lg")}>
              {notFound.home}
              <ButtonArrow />
            </Link>
            <Link href={href(locale, "/courses")} className={buttonClass("secondary", "lg")}>
              {notFound.courses}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
