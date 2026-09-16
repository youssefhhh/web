import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "outline" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,border-color,scale] duration-300 ease-out active:scale-[.98] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-glow-400 text-ink-950 shadow-[0_0_0_1px_rgb(255_178_56/.45),0_14px_40px_-14px_rgb(255_178_56/.7)] hover:bg-glow-300 hover:shadow-[0_0_0_1px_rgb(255_200_97/.7),0_18px_54px_-12px_rgb(255_178_56/.85)]",
  secondary: "border border-white/12 bg-white/[.04] text-paper backdrop-blur-md hover:border-white/25 hover:bg-white/[.09]",
  dark: "bg-ink-950 text-paper hover:bg-ink-700",
  outline: "border border-ink-950/15 text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-paper",
  light: "bg-paper text-ink-950 hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Direction-aware arrow that nudges forward on hover. */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      className={cn(
        "size-[1.1em] shrink-0 transition-transform duration-300 rtl:-scale-x-100 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1",
        className,
      )}
    />
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant, size, arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
      {arrow && <ButtonArrow />}
    </Link>
  );
}

interface ButtonAnchorProps extends Omit<ComponentProps<"a">, "className"> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}

export function ButtonAnchor({ variant, size, arrow, className, children, ...props }: ButtonAnchorProps) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
      {arrow && <ButtonArrow />}
    </a>
  );
}
