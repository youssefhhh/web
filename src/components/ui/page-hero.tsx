import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { jsonLd } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./section-heading";

export interface Crumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  /** Keyword phrase shown above the title — part of the H1 for search engines. */
  eyebrow: string;
  title: string | string[];
  description?: ReactNode;
  breadcrumbs: Crumb[];
  breadcrumbLabel: string;
  children?: ReactNode;
  aside?: ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumbs, breadcrumbLabel, children, aside }: PageHeroProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="relative isolate overflow-hidden border-b border-white/[.06] pt-[72px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(breadcrumbs))} />
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_90%_80%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-48 left-1/3 size-[40rem] rounded-full bg-glow-400/[.08] blur-[130px]" />
        <LogoMark className="absolute -right-16 -bottom-24 w-[34rem] max-w-[70vw] text-white/[.025] [--mark-accent:rgb(255_178_56/.08)] rtl:-left-16 rtl:right-auto rtl:-scale-x-100" />
      </div>

      <div
        className={cn(
          "container-x relative pt-10 pb-16 sm:pt-14 sm:pb-20",
          aside ? "grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end" : undefined,
        )}
      >
        <div>
          <nav aria-label={breadcrumbLabel} className="animate-fade">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-smoke">
              {breadcrumbs.map((crumb, index) => {
                const last = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="inline-flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="text-fog">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link href={crumb.href} className="transition-colors hover:text-paper">
                          {crumb.label}
                        </Link>
                        <ChevronRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1 className="mt-10 max-w-4xl text-paper">
            <Eyebrow as="span" className="animate-rise">
              {eyebrow}
            </Eyebrow>{" "}
            <span className="mt-5 block font-display text-[clamp(2.5rem,7vw,4.9rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance rtl:leading-[1.3] rtl:tracking-normal">
              {lines.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    "block animate-rise",
                    lines.length > 1 && index === lines.length - 1 && "text-glow-400 text-backlit",
                  )}
                  style={{ animationDelay: `${80 + index * 90}ms` }}
                >
                  {line}{" "}
                </span>
              ))}
            </span>
          </h1>
          {description && (
            <p
              className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-pretty text-fog rtl:leading-loose"
              style={{ animationDelay: "300ms" }}
            >
              {description}
            </p>
          )}
          {children && (
            <div className="mt-9 animate-rise" style={{ animationDelay: "380ms" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="animate-rise" style={{ animationDelay: "300ms" }}>
            {aside}
          </div>
        )}
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] text-glow-400/25 lane-dashes" />
    </section>
  );
}
