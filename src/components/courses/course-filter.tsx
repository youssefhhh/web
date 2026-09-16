"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FilterValue = "all" | "start" | "skills" | "program";

interface CourseFilterProps {
  labels: Record<FilterValue, string>;
  counts: Record<FilterValue, number>;
  children: ReactNode;
}

/**
 * Filter chips for the server-rendered course grid. Cards stay in the HTML
 * (good for SEO and no-JS); non-matching ones are hidden with CSS.
 */
export function CourseFilter({ labels, counts, children }: CourseFilterProps) {
  const [active, setActive] = useState<FilterValue>("all");
  const options = Object.keys(labels) as FilterValue[];

  return (
    <div>
      <div role="group" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((option) => {
          const selected = option === active;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(option)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border ps-5 pe-2 text-sm font-semibold transition-colors duration-300",
                selected
                  ? "border-glow-400 bg-glow-400 text-ink-950"
                  : "border-white/10 text-fog hover:border-white/25 hover:text-paper",
              )}
            >
              {labels[option]}
              <span
                className={cn(
                  "grid h-7 min-w-7 place-items-center rounded-full px-2 font-brand text-[0.7rem]",
                  selected ? "bg-ink-950/15" : "bg-white/[.06]",
                )}
              >
                {counts[option]}
              </span>
            </button>
          );
        })}
      </div>
      <div data-course-filter={active} className="mt-10">
        {children}
      </div>
    </div>
  );
}
