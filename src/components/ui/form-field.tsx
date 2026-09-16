import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "block w-full rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3.5 text-base text-paper placeholder:text-smoke/80 transition-[border-color,background-color,box-shadow] duration-300 outline-none hover:border-white/20 focus:border-glow-400/70 focus:bg-white/[.05] focus:shadow-[0_0_0_4px_rgb(255_178_56/.12)] aria-[invalid=true]:border-red-400/70";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, hint, error, children, className }: FieldProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-fog">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-sm text-smoke">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
