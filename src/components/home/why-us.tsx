import type { ReactNode } from "react";
import { BadgeCheck, CalendarDays, Check, Gauge, MapPin, Route, TrendingUp, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn, revealDelay } from "@/lib/utils";

type LucideIcon = typeof Gauge;

interface TileProps {
  icon: LucideIcon;
  title: string;
  body: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  layout?: "stack" | "row";
}

function Tile({ icon: Icon, title, body, children, className, delay = 0, layout = "stack" }: TileProps) {
  return (
    <article
      data-reveal
      style={revealDelay(delay)}
      className={cn(
        "group relative isolate flex overflow-hidden rounded-[28px] border border-white/[.07] bg-ink-900 p-6 transition-colors duration-500 hover:border-white/[.15] sm:p-8",
        layout === "row" ? "flex-col gap-8 md:flex-row md:items-center md:gap-12" : "flex-col",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-24 -z-10 size-72 rounded-full bg-glow-400/0 blur-3xl transition-colors duration-700 group-hover:bg-glow-400/[.12] rtl:right-auto rtl:-left-24"
      />
      <div className={cn(layout === "row" && "md:order-2 md:flex-1")}>{children}</div>
      <div className={cn(layout === "row" ? "md:order-1 md:max-w-sm" : "mt-auto pt-8")}>
        <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[.03] text-glow-400">
          <Icon aria-hidden className="size-5" />
        </span>
        <h3 className="mt-5 font-display text-xl leading-snug font-bold text-paper sm:text-2xl">{title}</h3>
        <p className="mt-2.5 leading-relaxed text-fog rtl:leading-loose">{body}</p>
      </div>
    </article>
  );
}

const waveform = Array.from({ length: 46 }, (_, index) => {
  const progress = index / 45;
  const noise = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1;
  return Math.round(12 + Math.pow(1 - progress, 1.6) * (26 + noise * 62));
});

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { why, booking } = dict;

  return (
    <section className="relative bg-ink-950 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} description={why.description} />

        <div className="mt-14 grid gap-4 md:grid-cols-6 lg:mt-20">
          {/* Calm captains */}
          <Tile icon={BadgeCheck} title={why.captains.title} body={why.captains.body} className="md:col-span-4">
            <div className="rounded-2xl border border-white/[.06] bg-ink-950/50 p-5 sm:p-6">
              <div className="flex items-center justify-between text-xs font-medium text-smoke">
                <span>{why.captains.meterFrom}</span>
                <span className="text-glow-300">{why.captains.meterTo}</span>
              </div>
              <div aria-hidden className="mt-4 flex h-24 items-center gap-[3px] sm:gap-1">
                {waveform.map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-full transition-[height] duration-700"
                    style={{
                      height: `${height}%`,
                      backgroundColor:
                        index < 18 ? "rgb(127 122 114 / .55)" : `rgb(255 178 56 / ${0.35 + (index / 45) * 0.65})`,
                    }}
                  />
                ))}
              </div>
              <div aria-hidden className="mt-4 h-1 rounded-full bg-linear-to-r from-ink-600 via-glow-700 to-glow-400 rtl:bg-linear-to-l" />
            </div>
          </Tile>

          {/* Real roads */}
          <Tile icon={Route} title={why.roads.title} body={why.roads.body} className="md:col-span-2" delay={80}>
            <svg viewBox="0 0 280 150" aria-hidden className="w-full rtl:-scale-x-100">
              <g stroke="rgb(255 255 255 / .06)" strokeWidth="12" strokeLinecap="round">
                <path d="M16 30h248M16 75h248M16 120h248M50 12v126M120 12v126M190 12v126M250 12v126" />
              </g>
              <path
                d="M30 120H120V75H190V30H250"
                fill="none"
                stroke="#ffb238"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="10 8"
                className="animate-dash"
              />
              <circle cx="30" cy="120" r="7" fill="#08080a" stroke="#ffb238" strokeWidth="3" />
              <circle cx="250" cy="30" r="12" fill="#ffb238" fillOpacity=".18" />
              <circle cx="250" cy="30" r="6" fill="#ffb238" />
            </svg>
          </Tile>

          {/* Female captains */}
          <Tile icon={UserRound} title={why.female.title} body={why.female.body} className="md:col-span-2" delay={0}>
            <div className="rounded-2xl border border-white/[.06] bg-ink-950/50 p-4">
              <p className="px-1 text-xs font-medium text-smoke">{booking.location.captain}</p>
              <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-xl bg-white/[.03] p-1.5 text-sm">
                <span className="rounded-lg px-2 py-2.5 text-center text-smoke">{booking.location.captainAny}</span>
                <span className="flex items-center justify-center gap-1.5 rounded-lg bg-glow-400 px-2 py-2.5 text-center font-semibold text-ink-950 shadow-[0_8px_24px_-10px_rgb(255_178_56/.8)]">
                  <Check aria-hidden className="size-4" strokeWidth={3} />
                  {booking.location.captainFemale}
                </span>
              </div>
            </div>
          </Tile>

          {/* Follow-up */}
          <Tile icon={TrendingUp} title={why.progress.title} body={why.progress.body} className="md:col-span-2" delay={80}>
            <ul className="space-y-4 rounded-2xl border border-white/[.06] bg-ink-950/50 p-5">
              {why.progress.labels.map((label, index) => {
                const value = [86, 64, 38][index];
                return (
                  <li key={label}>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-fog">{label}</span>
                      <span dir="ltr" className="font-brand text-paper">
                        {value}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                      <div
                        className="reveal-bar h-full rounded-full bg-linear-to-r from-glow-600 to-glow-300 rtl:bg-linear-to-l"
                        style={{ width: `${value}%`, transitionDelay: `${300 + index * 150}ms` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Tile>

          {/* Automatic & manual */}
          <Tile icon={Gauge} title={why.transmission.title} body={why.transmission.body} className="md:col-span-2" delay={160}>
            <div className="rounded-2xl border border-white/[.06] bg-ink-950/50 p-5">
              <div className="relative grid grid-cols-2 rounded-full border border-white/[.08] bg-white/[.02] p-1.5 text-sm font-semibold">
                <span
                  aria-hidden
                  className="absolute inset-y-1.5 start-1.5 w-[calc(50%-6px)] rounded-full bg-glow-400 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-full rtl:group-hover:-translate-x-full"
                />
                <span className="relative py-2.5 text-center text-ink-950 transition-colors duration-500 group-hover:text-fog">
                  {why.transmission.auto}
                </span>
                <span className="relative py-2.5 text-center text-fog transition-colors duration-500 group-hover:text-ink-950">
                  {why.transmission.manual}
                </span>
              </div>
              <p dir="ltr" aria-hidden className="mt-5 flex justify-center gap-5 font-brand text-sm font-bold text-smoke">
                <span>P</span>
                <span>R</span>
                <span>N</span>
                <span className="text-glow-400 text-backlit">D</span>
                <span className="text-ink-500">|</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </p>
            </div>
          </Tile>

          {/* Schedule & area */}
          <Tile
            icon={CalendarDays}
            title={why.schedule.title}
            body={why.schedule.body}
            className="md:col-span-6"
            layout="row"
          >
            <div className="grid gap-4 rounded-2xl border border-white/[.06] bg-ink-950/50 p-5 sm:p-6">
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {why.schedule.days.map((day, index) => {
                  const selected = [0, 2, 4].includes(index);
                  return (
                    <span
                      key={day}
                      className={cn(
                        "grid h-14 place-items-center rounded-xl border text-[0.7rem] font-semibold sm:h-16 sm:text-xs",
                        selected
                          ? "border-glow-400/50 bg-glow-400/[.12] text-glow-200"
                          : "border-white/[.06] text-smoke",
                      )}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {why.schedule.slots.map((slot, index) => (
                  <span
                    key={slot}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium",
                      index === 2 ? "border-glow-400 bg-glow-400 text-ink-950" : "border-white/[.08] text-fog",
                    )}
                  >
                    {slot}
                  </span>
                ))}
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-glow-400/40 px-4 py-2 text-sm font-medium text-glow-300">
                  <MapPin aria-hidden className="size-4" />
                  {dict.booking.location.pickupOption}
                </span>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
