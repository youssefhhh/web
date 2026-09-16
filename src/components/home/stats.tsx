import { CountUp } from "@/components/ui/count-up";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { cn, revealDelay } from "@/lib/utils";

export function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-wall-100 text-ink-950">
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[.05]" />
      <div className="container-x relative">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat, index) => (
            <div
              key={stat.label.en}
              data-reveal
              style={revealDelay(index * 90)}
              className={cn(
                "flex flex-col-reverse gap-3 border-ink-950/10 px-3 py-10 sm:px-8 sm:py-14 lg:py-16",
                index % 2 === 1 && "border-s",
                index >= 2 && "border-t lg:border-t-0",
                index === 2 && "lg:border-s",
              )}
            >
              <dt className="text-sm leading-snug text-wall-500 sm:text-base">{stat.label[locale]}</dt>
              <dd dir="ltr" className="font-brand text-[2.35rem] leading-none font-extrabold tracking-tight text-sign sm:text-6xl rtl:text-end">
                <CountUp value={stat.value} decimals={stat.decimals} />
                <span className="text-glow-600">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
