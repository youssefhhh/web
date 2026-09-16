import { cn, padNumber } from "@/lib/utils";

interface PlateProps {
  value: number;
  label: string;
  country: string;
  countryAlt: string;
  className?: string;
  size?: "sm" | "lg";
}

/** Session count styled as an Egyptian licence plate. */
export function Plate({ value, label, country, countryAlt, className, size = "sm" }: PlateProps) {
  const large = size === "lg";

  return (
    <span
      dir="ltr"
      className={cn(
        "inline-flex flex-col overflow-hidden rounded-[7px] border border-ink-950/80 bg-paper text-ink-950 shadow-[0_1px_0_rgb(255_255_255/.35)_inset,0_6px_18px_-8px_rgb(0_0_0/.6)]",
        large ? "min-w-[140px]" : "min-w-[100px]",
        className,
      )}
    >
      <span
        className={cn(
          "flex items-center justify-between gap-3 bg-glow-400 px-2 font-semibold leading-none",
          large ? "py-1.5 text-[0.62rem]" : "py-1 text-[0.5rem]",
        )}
      >
        <span className="font-brand tracking-[0.18em]">{country}</span>
        <span className="font-arabic">{countryAlt}</span>
      </span>
      <span className={cn("flex items-center justify-center gap-2 px-2.5", large ? "py-2" : "py-1.5")}>
        <span className={cn("font-brand font-extrabold leading-none", large ? "text-3xl" : "text-xl")}>
          {padNumber(value)}
        </span>
        <span aria-hidden className="w-px self-stretch bg-ink-950/25" />
        <span className={cn("font-sans font-semibold leading-none uppercase", large ? "text-xs" : "text-[0.62rem]")}>
          {label}
        </span>
      </span>
    </span>
  );
}
