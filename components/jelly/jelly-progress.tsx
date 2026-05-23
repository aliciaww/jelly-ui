"use client"

import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red"

interface JellyProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  color?: JellyColor
  label?: string
  showPercent?: boolean
  animated?: boolean
}

const fillMap: Record<JellyColor, string> = {
  pink:   "bg-[oklch(0.88_0.1_350/90%)]   shadow-[inset_0_-1px_3px_oklch(0.75_0.12_350/25%),0_1px_8px_oklch(0.88_0.1_350/25%)]",
  blue:   "bg-[oklch(0.86_0.08_240/90%)]  shadow-[inset_0_-1px_3px_oklch(0.72_0.1_240/25%),0_1px_8px_oklch(0.86_0.08_240/25%)]",
  green:  "bg-[oklch(0.88_0.1_150/90%)]   shadow-[inset_0_-1px_3px_oklch(0.74_0.12_150/25%),0_1px_8px_oklch(0.88_0.1_150/25%)]",
  yellow: "bg-[oklch(0.94_0.1_95/95%)]    shadow-[inset_0_-1px_3px_oklch(0.82_0.12_90/25%),0_1px_8px_oklch(0.94_0.1_95/30%)]",
  orange: "bg-[oklch(0.88_0.1_55/90%)]    shadow-[inset_0_-1px_3px_oklch(0.74_0.12_50/25%),0_1px_8px_oklch(0.88_0.1_55/25%)]",
  red:    "bg-[oklch(0.8_0.12_20/90%)]    shadow-[inset_0_-1px_3px_oklch(0.65_0.14_20/25%),0_1px_8px_oklch(0.8_0.12_20/25%)]",
}

const trackMap: Record<JellyColor, string> = {
  pink:   "bg-[oklch(0.95_0.03_350/45%)]",
  blue:   "bg-[oklch(0.95_0.025_240/45%)]",
  green:  "bg-[oklch(0.95_0.03_150/45%)]",
  yellow: "bg-[oklch(0.97_0.03_95/50%)]",
  orange: "bg-[oklch(0.95_0.03_55/45%)]",
  red:    "bg-[oklch(0.94_0.03_20/40%)]",
}

export function JellyProgress({
  value,
  max = 100,
  color = "pink",
  label,
  showPercent = true,
  animated = false,
  className,
  ...props
}: JellyProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div {...props} className={cn("flex flex-col gap-1.5", className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showPercent && (
            <span className="text-xs font-semibold text-muted-foreground tabular-nums">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("relative h-4 w-full rounded-full overflow-hidden border border-white/30", trackMap[color])}
      >
        {/* track gloss */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-0.5 h-[30%] rounded-full bg-white/40 blur-[1px] z-10"
        />
        {/* fill */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden",
            fillMap[color],
            animated && "after:absolute after:inset-0 after:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(255,255,255,0.12)_6px,rgba(255,255,255,0.12)_12px)] after:animate-[slide_1s_linear_infinite]",
          )}
          style={{ width: `${pct}%` }}
        >
          {/* fill top gloss */}
          <span
            aria-hidden
            className="absolute inset-x-1 top-0.5 h-[30%] rounded-full bg-white/45 blur-[1px]"
          />
        </div>
      </div>
    </div>
  )
}
