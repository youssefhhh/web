"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
  heading?: ReactNode;
}

/** Native scroll-snap carousel with direction-aware controls. */
export function Carousel({ children, previousLabel, nextLabel, heading }: CarouselProps) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const element = track.current;
    if (!element) return;
    const rtl = getComputedStyle(element).direction === "rtl";
    const card = element.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : element.clientWidth * 0.8;
    element.scrollBy({ left: direction * step * (rtl ? -1 : 1), behavior: "smooth" });
  };

  const buttonClass =
    "grid size-12 place-items-center rounded-full border border-white/12 text-paper transition-colors hover:border-glow-400/60 hover:bg-glow-400 hover:text-ink-950";

  return (
    <div>
      <div className="container-x flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        {heading}
        <div data-reveal className="flex shrink-0 gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label={previousLabel} className={buttonClass}>
            <ArrowRight aria-hidden className="size-5 -scale-x-100 rtl:scale-x-100" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={nextLabel} className={buttonClass}>
            <ArrowRight aria-hidden className="size-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-8 lg:mt-16 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] scroll-px-5 sm:scroll-px-8"
      >
        {children}
      </ul>
    </div>
  );
}
