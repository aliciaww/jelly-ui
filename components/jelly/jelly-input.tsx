"use client"

import { InputHTMLAttributes, forwardRef, useId } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red" | "clear"

interface JellyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: JellyColor
  label?: string
}

const colorMap: Record<JellyColor, { base: string; focus: string }> = {
  pink:   { base: "bg-[oklch(0.98_0.02_350/60%)] border-[oklch(0.88_0.06_350/25%)]",  focus: "focus:border-[oklch(0.88_0.1_350/50%)] focus:ring-[oklch(0.88_0.1_350/15%)]" },
  blue:   { base: "bg-[oklch(0.98_0.015_240/60%)] border-[oklch(0.86_0.05_240/25%)]", focus: "focus:border-[oklch(0.86_0.08_240/50%)] focus:ring-[oklch(0.86_0.08_240/15%)]" },
  green:  { base: "bg-[oklch(0.98_0.02_150/60%)] border-[oklch(0.88_0.06_150/25%)]",  focus: "focus:border-[oklch(0.88_0.1_150/50%)] focus:ring-[oklch(0.88_0.1_150/15%)]" },
  yellow: { base: "bg-[oklch(0.99_0.02_95/65%)] border-[oklch(0.92_0.06_95/30%)]",    focus: "focus:border-[oklch(0.92_0.1_95/55%)] focus:ring-[oklch(0.94_0.1_95/18%)]" },
  orange: { base: "bg-[oklch(0.98_0.02_55/60%)] border-[oklch(0.88_0.06_55/25%)]",    focus: "focus:border-[oklch(0.88_0.1_55/50%)] focus:ring-[oklch(0.88_0.1_55/15%)]" },
  red:    { base: "bg-[oklch(0.98_0.02_20/60%)] border-[oklch(0.8_0.08_20/25%)]",     focus: "focus:border-[oklch(0.8_0.12_20/50%)] focus:ring-[oklch(0.8_0.12_20/15%)]" },
  clear:  { base: "bg-white/50 border-white/40",                                       focus: "focus:border-[oklch(0.86_0.08_240/50%)] focus:ring-[oklch(0.86_0.08_240/12%)]" },
}

export const JellyInput = forwardRef<HTMLInputElement, JellyInputProps>(
  ({ color = "clear", label, className, id, ...props }, ref) => {
    const c = colorMap[color]
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>
        )}
        <div className="relative">
          {/* top gloss */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-3 top-1.5 h-1.5 rounded-full bg-white/45 blur-[2px] z-10"
          />
          <input
            ref={ref}
            id={inputId}
            {...props}
            className={cn(
              "w-full px-4 py-2.5 rounded-2xl border backdrop-blur-sm",
              "text-foreground font-medium text-sm",
              "transition-all duration-200 outline-none",
              "focus:ring-4",
              "placeholder:text-muted-foreground/50",
              c.base,
              c.focus,
              className,
            )}
          />
        </div>
      </div>
    )
  }
)

JellyInput.displayName = "JellyInput"
