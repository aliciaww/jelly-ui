"use client"

import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red"

interface JellyBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: JellyColor
  pulse?: boolean
}

const colorMap: Record<JellyColor, { bg: string; text: string; dot: string }> = {
  pink:   { bg: "bg-[oklch(0.92_0.06_350/50%)] border border-[oklch(0.85_0.1_350/30%)]", text: "text-[oklch(0.5_0.1_350)]", dot: "bg-[oklch(0.7_0.12_350)]" },
  blue:   { bg: "bg-[oklch(0.9_0.05_240/50%)] border border-[oklch(0.82_0.08_240/30%)]", text: "text-[oklch(0.45_0.1_240)]", dot: "bg-[oklch(0.65_0.1_240)]" },
  green:  { bg: "bg-[oklch(0.92_0.06_150/50%)] border border-[oklch(0.84_0.1_150/30%)]", text: "text-[oklch(0.45_0.1_150)]", dot: "bg-[oklch(0.65_0.12_150)]" },
  yellow: { bg: "bg-[oklch(0.96_0.06_95/55%)] border border-[oklch(0.9_0.1_95/35%)]", text: "text-[oklch(0.5_0.1_80)]", dot: "bg-[oklch(0.78_0.12_85)]" },
  orange: { bg: "bg-[oklch(0.92_0.06_55/50%)] border border-[oklch(0.84_0.1_55/30%)]", text: "text-[oklch(0.5_0.12_50)]", dot: "bg-[oklch(0.7_0.12_50)]" },
  red:    { bg: "bg-[oklch(0.9_0.06_20/45%)] border border-[oklch(0.75_0.12_20/30%)]", text: "text-[oklch(0.48_0.12_20)]", dot: "bg-[oklch(0.65_0.14_20)]" },
}

export function JellyBadge({
  color = "pink",
  pulse = false,
  children,
  className,
  ...props
}: JellyBadgeProps) {
  const c = colorMap[color]

  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
        "backdrop-blur-sm",
        "relative overflow-hidden",
        c.bg,
        c.text,
        className,
      )}
    >
      {/* gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-0.5 h-[40%] rounded-full bg-white/35 blur-[1px]"
      />
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-50", c.dot)} />
          <span className={cn("relative inline-flex rounded-full h-2 w-2", c.dot)} />
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </span>
  )
}
