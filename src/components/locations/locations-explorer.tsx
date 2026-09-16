"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { ButtonArrow, buttonClass } from "@/components/ui/button";
import { cn, padNumber } from "@/lib/utils";
import { CairoMap } from "./cairo-map";

export interface ExplorerBranch {
  slug: string;
  name: string;
  district: string;
  meetingPoint: string;
  directionsUrl: string;
  bookUrl: string;
  pin: { x: number; y: number };
}

export interface ExplorerLabels {
  mapLabel: string;
  meetingPoint: string;
  hours: string;
  hoursValue: string;
  directions: string;
  bookHere: string;
  legend: { nile: string; ringRoad: string; pyramids: string; downtown: string };
}

interface LocationsExplorerProps {
  branches: ExplorerBranch[];
  labels: ExplorerLabels;
}

export function LocationsExplorer({ branches, labels }: LocationsExplorerProps) {
  const [active, setActive] = useState(branches[0]?.slug);

  return (
    <div className="grid gap-3 rounded-[36px] border border-white/[.07] bg-ink-950 p-3 shadow-[0_50px_120px_-60px_rgb(8_8_10/.9)] sm:p-4 lg:grid-cols-[1.3fr_1fr] lg:gap-4">
      <figure className="relative flex items-center overflow-hidden rounded-[26px] border border-white/[.06] bg-[#0c0d10] bg-grid">
        <figcaption className="sr-only">{labels.mapLabel}</figcaption>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(8_8_10/.65))]"
        />
        <div dir="ltr" className="relative aspect-[600/420] w-full">
          <CairoMap legend={labels.legend} />
          {branches.map((branch) => {
            const selected = branch.slug === active;
            const labelOnLeft = branch.pin.x > 450;
            return (
              <button
                key={branch.slug}
                type="button"
                onClick={() => setActive(branch.slug)}
                aria-pressed={selected}
                aria-label={branch.name}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-glow-400"
                style={{ left: `${(branch.pin.x / 600) * 100}%`, top: `${(branch.pin.y / 420) * 100}%` }}
              >
                <span className="relative grid size-4 place-items-center sm:size-5">
                  <span
                    className={cn("absolute inset-0 rounded-full bg-glow-400/50", selected ? "animate-ping-soft" : "opacity-0")}
                  />
                  <span
                    className={cn(
                      "rounded-full border-2 border-ink-950 bg-glow-400 transition-[width,height,box-shadow] duration-500",
                      selected
                        ? "size-4 shadow-[0_0_0_4px_rgb(255_178_56/.25),0_0_24px_rgb(255_178_56/.9)] sm:size-5"
                        : "size-3 shadow-[0_0_14px_rgb(255_178_56/.6)] group-hover:size-3.5 sm:size-3.5",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold whitespace-nowrap backdrop-blur-md transition-colors duration-300 sm:text-xs",
                    labelOnLeft ? "right-full mr-0.5" : "left-full ml-0.5",
                    selected
                      ? "border-glow-400/60 bg-glow-400 text-ink-950"
                      : "border-white/10 bg-ink-900/80 text-paper/80 group-hover:text-paper",
                  )}
                >
                  {branch.name}
                </span>
              </button>
            );
          })}
        </div>
      </figure>

      <ul className="flex flex-col gap-2.5">
        {branches.map((branch, index) => {
          const expanded = branch.slug === active;
          const panelId = `branch-panel-${branch.slug}`;
          return (
            <li
              key={branch.slug}
              className={cn(
                "rounded-[22px] border transition-[background-color,border-color] duration-300",
                expanded ? "border-glow-400/35 bg-ink-800" : "border-white/[.06] bg-ink-900 hover:border-white/15",
              )}
            >
              <button
                type="button"
                onClick={() => setActive(branch.slug)}
                aria-expanded={expanded}
                aria-controls={panelId}
                className="flex w-full items-center gap-4 rounded-[22px] p-4 text-start sm:p-5"
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full font-brand text-xs font-bold transition-colors",
                    expanded ? "bg-glow-400 text-ink-950" : "border border-white/10 text-smoke",
                  )}
                >
                  {padNumber(index + 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg leading-tight font-bold text-paper">{branch.name}</span>
                  <span className="mt-0.5 block text-sm text-smoke">{branch.district}</span>
                </span>
                <MapPin
                  aria-hidden
                  className={cn("size-5 shrink-0 transition-colors", expanded ? "text-glow-400" : "text-ink-400")}
                />
              </button>

              <div
                id={panelId}
                inert={!expanded}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 sm:px-5">
                    <dl className="grid gap-3 border-t border-white/[.07] pt-4 text-sm">
                      <div className="flex gap-3">
                        <Navigation aria-hidden className="mt-0.5 size-4 shrink-0 text-glow-400" />
                        <div>
                          <dt className="text-smoke">{labels.meetingPoint}</dt>
                          <dd className="mt-0.5 text-paper">{branch.meetingPoint}</dd>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-glow-400" />
                        <div>
                          <dt className="text-smoke">{labels.hours}</dt>
                          <dd className="mt-0.5 text-paper">{labels.hoursValue}</dd>
                        </div>
                      </div>
                    </dl>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={branch.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClass("secondary", "sm")}
                      >
                        <Navigation aria-hidden className="size-4" />
                        {labels.directions}
                      </a>
                      <Link href={branch.bookUrl} className={buttonClass("primary", "sm")}>
                        {labels.bookHere}
                        <ButtonArrow />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
