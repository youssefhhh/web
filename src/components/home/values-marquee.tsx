import en from "@/i18n/dictionaries/en";
import ar from "@/i18n/dictionaries/ar";

/** Bilingual ticker of the four words on the academy's sign. */
export function ValuesMarquee() {
  const words = en.values.flatMap((word, index) => [
    { text: word.toUpperCase(), latin: true },
    { text: ar.values[index], latin: false },
  ]);

  const renderTrack = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((word, index) => (
        <li key={`${word.text}-${index}`} className="flex items-center">
          <span
            className={
              word.latin
                ? "font-brand text-[2rem] leading-none font-extrabold text-outline sm:text-5xl"
                : "font-arabic text-[1.9rem] leading-none font-bold text-glow-400 text-backlit sm:text-[2.8rem]"
            }
          >
            {word.text}
          </span>
          <span aria-hidden className="mx-6 flex gap-1.5 sm:mx-10">
            <span className="h-[3px] w-5 rounded-full bg-glow-400/70" />
            <span className="h-[3px] w-2 rounded-full bg-glow-400/35" />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={en.values.join(" · ")} className="relative overflow-hidden border-y border-white/[.06] bg-ink-900 py-7 sm:py-9">
      <div dir="ltr" className="mask-fade-x flex">
        <div className="flex animate-marquee">
          {renderTrack(false)}
          {renderTrack(true)}
        </div>
      </div>
    </section>
  );
}
