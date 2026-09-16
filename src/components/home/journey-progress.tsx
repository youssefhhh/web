"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Exposes how far the reader has scrolled through its children as a
 * `--progress` custom property (0 → 1). No React state, no re-renders.
 */
export function JourneyProgress({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      element.style.setProperty("--progress", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--progress": 0 } as CSSProperties}>
      {children}
    </div>
  );
}
