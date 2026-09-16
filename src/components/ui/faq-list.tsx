import { Plus } from "lucide-react";
import { faqAnswer, type Faq } from "@/data/faqs";
import type { Locale } from "@/i18n/config";
import { cn, padNumber } from "@/lib/utils";

interface FaqListProps {
  items: Faq[];
  locale: Locale;
  tone?: "dark" | "light";
  name?: string;
}

/** Exclusive accordion built on native <details> — works without JavaScript. */
export function FaqList({ items, locale, tone = "dark", name = "faq" }: FaqListProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("border-t", dark ? "border-white/[.08]" : "border-ink-950/10")}>
      {items.map((faq, index) => (
        <details
          key={faq.id}
          name={name}
          data-reveal
          className={cn("faq-item group border-b", dark ? "border-white/[.08]" : "border-ink-950/10")}
        >
          <summary
            className={cn(
              "flex cursor-pointer items-center gap-5 py-6 text-start transition-colors sm:gap-8 sm:py-7",
              dark ? "hover:text-glow-200" : "hover:text-glow-700",
            )}
          >
            <span className={cn("hidden font-brand text-xs font-bold sm:block", dark ? "text-smoke" : "text-wall-400")}>
              {padNumber(index + 1)}
            </span>
            <h3 className="flex-1 font-display text-lg leading-snug font-bold sm:text-xl">{faq.question[locale]}</h3>
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full border transition-[rotate,background-color,border-color,color] duration-500 group-open:rotate-45",
                dark
                  ? "border-white/12 group-open:border-glow-400 group-open:bg-glow-400 group-open:text-ink-950"
                  : "border-ink-950/15 group-open:border-ink-950 group-open:bg-ink-950 group-open:text-paper",
              )}
            >
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p
            className={cn(
              "max-w-3xl pb-7 leading-relaxed sm:ps-[3.25rem] rtl:leading-loose",
              dark ? "text-fog" : "text-wall-500",
            )}
          >
            {faqAnswer(faq, locale)}
          </p>
        </details>
      ))}
    </div>
  );
}
