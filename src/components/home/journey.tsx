import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn, padNumber } from "@/lib/utils";
import { JourneyProgress } from "./journey-progress";

/** Top-down car with headlights pointing down the road. */
function CarMarker() {
  return (
    <svg viewBox="0 0 40 72" aria-hidden className="h-[58px] w-8 drop-shadow-[0_10px_18px_rgb(0_0_0/.5)]">
      <defs>
        <radialGradient id="journey-beam" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#ffd48a" stopOpacity=".85" />
          <stop offset="100%" stopColor="#ffb238" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M8 52 2 72h36l-6-20z" fill="url(#journey-beam)" />
      <rect x="7" y="4" width="26" height="50" rx="10" fill="#f4efe7" />
      <rect x="10" y="30" width="20" height="11" rx="3.5" fill="#16161b" />
      <rect x="10.5" y="12" width="19" height="8" rx="3" fill="#16161b" opacity=".85" />
      <rect x="9" y="48" width="6" height="3" rx="1.5" fill="#ffb238" />
      <rect x="25" y="48" width="6" height="3" rx="1.5" fill="#ffb238" />
    </svg>
  );
}

export function Journey({ dict }: { dict: Dictionary }) {
  const { journey } = dict;

  return (
    <section className="relative overflow-hidden bg-wall-100 py-24 text-ink-950 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-dark [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
      />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[.05]" />

      <div className="container-x relative">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={journey.eyebrow}
          title={journey.title}
          description={journey.description}
        />

        <JourneyProgress className="relative mx-auto mt-16 max-w-5xl lg:mt-24">
          {/* The road */}
          <div aria-hidden className="absolute inset-y-0 start-0 w-14 lg:start-1/2 lg:-ms-7">
            <div className="absolute inset-0 rounded-full bg-ink-950 shadow-[inset_0_0_0_1px_rgb(255_255_255/.06),0_30px_60px_-30px_rgb(8_8_10/.6)]" />
            <div className="absolute inset-y-6 left-1/2 w-[3px] -translate-x-1/2 text-paper/20 lane-dashes-y" />
            <div
              className="absolute top-6 left-1/2 w-[3px] -translate-x-1/2 text-glow-400 lane-dashes-y drop-shadow-[0_0_6px_rgb(255_178_56/.9)]"
              style={{ height: "calc((100% - 48px) * var(--progress))" }}
            />
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "calc((100% - 58px) * var(--progress))" }}>
              <CarMarker />
            </div>
          </div>

          <ol className="relative grid gap-8 lg:gap-0">
            {journey.steps.map((step, index) => {
              const onStart = index % 2 === 0;
              return (
                <li key={step.title} className="relative lg:grid lg:grid-cols-2 lg:gap-32 lg:py-8">
                  <span
                    aria-hidden
                    className="absolute top-6 start-0 z-10 flex w-14 justify-center lg:top-1/2 lg:start-1/2 lg:-ms-7 lg:-translate-y-1/2"
                  >
                    <span className="grid size-10 place-items-center rounded-full border-[3px] border-ink-950 bg-glow-400 font-brand text-xs font-extrabold text-ink-950 shadow-[0_0_0_6px_rgb(242_237_228),0_0_24px_rgb(255_178_56/.6)]">
                      {padNumber(index + 1)}
                    </span>
                  </span>

                  <div
                    data-reveal
                    className={cn(
                      "ps-20 lg:ps-0",
                      onStart ? "lg:col-start-1 lg:text-end" : "lg:col-start-2",
                    )}
                  >
                    <article className="rounded-[26px] border border-ink-950/[.07] bg-wall-50 p-6 shadow-[0_24px_60px_-36px_rgb(8_8_10/.35)] sm:p-8">
                      <p className="eyebrow text-glow-700">{step.tag}</p>
                      <h3 className="mt-3 font-display text-xl leading-snug font-bold sm:text-2xl">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-wall-500 rtl:leading-loose">{step.body}</p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </JourneyProgress>
      </div>
    </section>
  );
}
