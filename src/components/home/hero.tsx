import { Check, Star } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn, format, formatNumber, href } from "@/lib/utils";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const { hero } = dict;

  return (
    <section className="relative isolate overflow-hidden pt-[72px]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 -right-40 size-[48rem] rounded-full bg-glow-400/[.08] blur-[130px] rtl:right-auto rtl:-left-40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-x grid items-center gap-16 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:pt-20 lg:pb-28">
        <div>
          {/* The keyword label is part of the H1 ("M Drive · Driving school in Cairo — Learn it right…") */}
          <h1 className="text-paper">
            <span className="eyebrow animate-rise rounded-full border border-white/10 bg-white/[.03] py-2 ps-3 pe-4 text-fog">
              <span aria-hidden className="relative grid size-2.5 place-items-center">
                <span className="absolute inset-0 rounded-full bg-glow-400 animate-ping-soft" />
                <span className="size-2.5 rounded-full bg-glow-400" />
              </span>
              {hero.eyebrow}
            </span>{" "}
            <span className="mt-8 block font-display text-[clamp(2.6rem,8.2vw,5.4rem)] leading-[0.98] ltr:max-[359px]:text-[2.2rem] font-extrabold tracking-[-0.035em] rtl:text-[clamp(3.2rem,11vw,6.4rem)] rtl:leading-[1.25] rtl:tracking-normal">
              {hero.title.map((line, index) => (
                <span
                  key={line}
                  className={cn("block animate-rise", index === hero.title.length - 1 && "text-glow-400 text-backlit")}
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  {line}{" "}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-pretty text-fog rtl:leading-loose"
            style={{ animationDelay: "420ms" }}
          >
            {hero.description}
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row" style={{ animationDelay: "520ms" }}>
            <ButtonLink href={href(locale, "/book")} size="lg" arrow>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={href(locale, "/courses")} size="lg" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <div
            className="mt-10 flex animate-rise flex-col gap-5 border-t border-white/[.07] pt-7 sm:flex-row sm:items-center sm:gap-8"
            style={{ animationDelay: "640ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="flex gap-0.5 text-glow-400" aria-label={format(dict.a11y.rating, { rating: site.rating.value })}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} aria-hidden className="size-4 fill-current" />
                ))}
              </span>
              <span className="text-sm whitespace-nowrap text-fog">
                {format(hero.ratingLabel, { rating: site.rating.value, students: formatNumber(site.rating.students) })}
              </span>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fog">
              {hero.features.slice(0, 2).map((feature) => (
                <li key={feature} className="inline-flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-glow-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroSign features={hero.features} />
      </div>
    </section>
  );
}

const SIGN_INK = "#0b0b0d";

function HeroSign({ features }: { features: string[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] animate-fade" style={{ animationDelay: "150ms" }}>
      <div aria-hidden className="absolute inset-[6%] rounded-full bg-glow-400/25 blur-[90px] animate-glow" />

      <div
        dir="ltr"
        className="@container relative aspect-square overflow-hidden rounded-[36px] border border-white/[.09] shadow-[0_50px_120px_-40px_rgb(0_0_0/.95)]"
      >
        {/* Lit wall */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_45%,#4a4640_0%,#2c2b2c_42%,#18181b_75%,#111113_100%)]"
        />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[.07]" />
        <div aria-hidden className="absolute -top-20 left-1/2 h-56 w-2/3 -translate-x-1/2 rounded-full bg-[#ffe2b5]/10 blur-3xl" />

        {/* Side lettering, as on the physical sign */}
        <div className="absolute top-[7cqw] left-[7cqw] font-brand text-[2cqw] leading-[2] font-medium tracking-[0.34em] text-paper/45">
          <p>CAIRO</p>
          <p>EGYPT</p>
          <span aria-hidden className="mt-[2cqw] block h-px w-[5cqw] bg-paper/30" />
        </div>
        <ul className="absolute top-[7cqw] right-[7cqw] text-right font-brand text-[2cqw] leading-[2] font-medium tracking-[0.34em] text-paper/45">
          <li>SKILLS</li>
          <li>SAFETY</li>
          <li>CONFIDENCE</li>
          <li>FREEDOM</li>
        </ul>

        {/* Backlit logo */}
        <div className="absolute inset-x-0 top-[25cqw] flex flex-col items-center" style={{ color: SIGN_INK }}>
          <LogoMark
            className="w-[46cqw] [filter:drop-shadow(0_0_1.5px_rgb(255_205_130/.95))_drop-shadow(0_0_14px_rgb(255_170_60/.65))_drop-shadow(0_0_46px_rgb(255_150_40/.35))]"
            title="M Drive"
          />
          <span className="mt-[4cqw] font-brand text-[10.5cqw] leading-none font-extrabold tracking-[0.02em] text-sign">
            DRIVE
          </span>
          <span className="mt-[2.6cqw] flex items-center gap-[2.4cqw] font-brand text-[2.6cqw] leading-none font-bold tracking-[0.55em] text-sign">
            <span aria-hidden className="h-[0.4cqw] w-[6cqw] bg-current" />
            ACADEMY
            <span aria-hidden className="h-[0.4cqw] w-[6cqw] bg-current" />
          </span>
          <span dir="rtl" lang="ar" className="mt-[2.2cqw] font-arabic text-[3.4cqw] leading-[1.6] font-bold text-sign">
            أكاديمية القيادة
          </span>
        </div>

        {/* Marble ledge */}
        <div className="absolute inset-x-0 bottom-0 h-[10cqw] border-t border-white/[.07] bg-linear-to-b from-[#121214] to-[#070708]">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-glow-300/60 to-transparent" />
          <p className="grid h-full place-items-center font-brand text-[1.8cqw] tracking-[0.5em] text-paper/40">
            PEOPLE DRIVE BETTER WITH US
          </p>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute top-[16%] -left-3 hidden animate-float items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-900/80 py-2.5 ps-2.5 pe-4 text-sm font-medium text-paper shadow-2xl backdrop-blur-md sm:flex lg:-left-10">
        <span className="grid size-8 place-items-center rounded-xl bg-glow-400 text-ink-950">
          <Check aria-hidden className="size-4" strokeWidth={3} />
        </span>
        {features[0]}
      </div>
      <div
        className="absolute -right-3 bottom-[20%] hidden animate-float items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-900/80 py-2.5 ps-2.5 pe-4 text-sm font-medium text-paper shadow-2xl backdrop-blur-md [animation-delay:-4s] sm:flex lg:-right-8"
      >
        <span className="grid size-8 place-items-center rounded-xl border border-glow-400/40 text-glow-400">
          <Check aria-hidden className="size-4" strokeWidth={3} />
        </span>
        {features[2]}
      </div>
    </div>
  );
}
