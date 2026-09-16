import { cn } from "@/lib/utils";

/**
 * Perspective lane dashes — long near the viewer, shorter towards the horizon.
 * Tuned for the centre-line path length (~107 units).
 */
const LANE_DASHES = "0 5 11 7 9 6 7.5 5.5 6.5 5 5.5 4.5 4.5 4 3.8 3.5 3.2 3.2 2.6 3 2.2 20";

interface LogoMarkProps {
  className?: string;
  /** Accessible name. Omit when the mark is decorative. */
  title?: string;
}

/**
 * The M Drive mark: a bold "M" whose right stroke is a road running
 * to the horizon, outlined by the amber backlight of the academy's sign.
 */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 128 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" d="M4 96V6h28l36 52-12 18L28 40v56z" />
      <path fill="currentColor" d="M100 22 124 6v90h-24z" />
      <path
        fill="currentColor"
        stroke="var(--mark-accent, #ffb238)"
        strokeWidth="3.2"
        strokeLinejoin="round"
        paintOrder="stroke"
        d="M34 96C50 64 76 30 104 6h20C106 30 90 62 80 96z"
      />
      <path
        fill="none"
        stroke="var(--mark-accent, #ffb238)"
        strokeWidth="2.6"
        strokeDasharray={LANE_DASHES}
        d="M57 96C70 63 91 31 114 6"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  subtitle?: string;
}

/** Horizontal lockup: [M] DRIVE / ACADEMY — always laid out left-to-right. */
export function Logo({ className, markClassName, subtitle = "ACADEMY" }: LogoProps) {
  return (
    <span dir="ltr" className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-7 w-auto shrink-0 sm:h-8", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-brand text-[1.02rem] font-extrabold tracking-[0.03em] sm:text-[1.1rem]">DRIVE</span>
        <span className="font-brand mt-[5px] text-[0.5rem] font-medium tracking-[0.46em] text-fog">{subtitle}</span>
      </span>
    </span>
  );
}
