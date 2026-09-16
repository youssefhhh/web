"use client";

import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/utils";

interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
}

/** Renders the final value on the server, then counts up once it scrolls into view. */
export function CountUp({ value, decimals = 0, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          element.textContent = formatNumber(value * eased, decimals);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals, duration]);

  return <span ref={ref}>{formatNumber(value, decimals)}</span>;
}
