"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element as it scrolls into view.
 * Elements are only hidden once this observer is running, so the page
 * stays fully readable without JavaScript.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const observed = new WeakSet<Element>();

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = (initial = false) => {
      const viewport = window.innerHeight;
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        // Anything already on screen at first paint is shown immediately — no flash.
        if (initial && element.getBoundingClientRect().top < viewport * 0.94) {
          element.setAttribute("data-revealed", "");
          return;
        }
        intersection.observe(element);
      });
    };

    scan(true);
    root.setAttribute("data-reveal-ready", "");

    const mutations = new MutationObserver(() => scan());
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
