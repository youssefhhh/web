"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn, padNumber } from "@/lib/utils";

export interface CurriculumItem {
  id: string;
  title: string;
  summary: string;
  points: string[];
  courses: { name: string; href: string }[];
}

interface CurriculumTabsProps {
  items: CurriculumItem[];
  moduleLabel: string;
  includedIn: string;
}

export function CurriculumTabs({ items, moduleLabel, includedIn }: CurriculumTabsProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const current = items[active];

  const select = (index: number) => {
    setActive(index);
    tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = document.documentElement.dir === "rtl";
    const last = items.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      ArrowRight: rtl ? index - 1 : index + 1,
      ArrowLeft: rtl ? index + 1 : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select((moves[event.key] + items.length) % items.length);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group relative flex shrink-0 snap-start items-center gap-4 rounded-2xl border px-4 py-3 text-start transition-[background-color,border-color] duration-300 lg:px-6 lg:py-5",
                selected
                  ? "border-glow-400/40 bg-glow-400/[.08]"
                  : "border-white/[.07] bg-ink-900/40 hover:border-white/15 hover:bg-white/[.03]",
              )}
            >
              <span className={cn("font-brand text-xs font-bold", selected ? "text-glow-400" : "text-smoke")}>
                {padNumber(index + 1)}
              </span>
              <span
                className={cn(
                  "font-display text-[0.95rem] font-bold whitespace-nowrap lg:text-xl",
                  selected ? "text-paper" : "text-fog group-hover:text-paper",
                )}
              >
                {item.title}
              </span>
              <ArrowRight
                aria-hidden
                className={cn(
                  "ms-auto hidden size-5 transition-[opacity,translate] duration-300 rtl:-scale-x-100 lg:block",
                  selected ? "text-glow-400 opacity-100" : "-translate-x-2 opacity-0 rtl:translate-x-2",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        key={current.id}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="relative isolate animate-rise overflow-hidden rounded-[32px] border border-white/[.08] bg-ink-900 p-6 [animation-duration:.7s] sm:p-10"
      >
        <span
          aria-hidden
          dir="ltr"
          className="pointer-events-none absolute -top-6 -z-10 font-brand text-[11rem] leading-none font-extrabold text-outline opacity-25 ltr:right-4 rtl:left-4 sm:text-[14rem]"
        >
          {padNumber(active + 1)}
        </span>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-96 rounded-full bg-glow-400/[.07] blur-3xl rtl:-right-32 rtl:left-auto"
        />

        <p className="eyebrow text-glow-300">
          {moduleLabel} {padNumber(active + 1)}
        </p>
        <h3 className="mt-4 font-display text-3xl leading-tight font-extrabold text-paper sm:text-4xl rtl:leading-snug">
          {current.title}
        </h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-fog rtl:leading-loose">{current.summary}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {current.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-white/[.06] bg-white/[.02] p-4 text-paper/90"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-glow-400/15 text-glow-400">
                <Check aria-hidden className="size-3.5" strokeWidth={3} />
              </span>
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>

        {current.courses.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/[.07] pt-6">
            <span className="me-2 text-sm text-smoke">{includedIn}</span>
            {current.courses.map((course) => (
              <Link
                key={course.href}
                href={course.href}
                className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-fog transition-colors hover:border-glow-400/50 hover:text-glow-200"
              >
                {course.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
