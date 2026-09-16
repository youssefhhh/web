import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  /** Render as a span when the label sits inside a heading. */
  as?: "p" | "span";
}

/** Small label with a lane-dash marker. */
export function Eyebrow({ children, tone = "dark", className, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag className={cn("eyebrow", tone === "dark" ? "text-glow-300" : "text-glow-700", className)}>
      <span aria-hidden className="flex gap-1">
        <span className="h-[3px] w-4 rounded-full bg-current" />
        <span className="h-[3px] w-1.5 rounded-full bg-current opacity-60" />
      </span>
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "start",
  className,
  titleClassName,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn("flex max-w-3xl flex-col gap-5", align === "center" && "mx-auto items-center text-center", className)}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.4rem] rtl:leading-[1.3] rtl:tracking-normal",
          tone === "dark" ? "text-paper" : "text-ink-950",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty sm:text-lg rtl:leading-loose",
            tone === "dark" ? "text-fog" : "text-wall-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
