"use client"

import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red" | "clear"

interface JellyCardProps extends HTMLAttributes<HTMLDivElement> {
  color?: JellyColor
  hoverable?: boolean
}

const colorMap: Record<JellyColor, string> = {
  pink:   "bg-[oklch(0.97_0.03_350/65%)] border-[oklch(0.88_0.08_350/25%)] shadow-[0_4px_24px_oklch(0.88_0.1_350/15%)]",
  blue:   "bg-[oklch(0.96_0.025_240/65%)] border-[oklch(0.86_0.06_240/25%)] shadow-[0_4px_24px_oklch(0.86_0.08_240/15%)]",
  green:  "bg-[oklch(0.97_0.03_150/65%)] border-[oklch(0.88_0.08_150/25%)] shadow-[0_4px_24px_oklch(0.88_0.1_150/15%)]",
  yellow: "bg-[oklch(0.98_0.03_95/70%)] border-[oklch(0.92_0.08_95/30%)] shadow-[0_4px_24px_oklch(0.92_0.1_95/18%)]",
  orange: "bg-[oklch(0.97_0.03_55/65%)] border-[oklch(0.88_0.08_55/25%)] shadow-[0_4px_24px_oklch(0.88_0.1_55/15%)]",
  red:    "bg-[oklch(0.96_0.03_20/60%)] border-[oklch(0.8_0.1_20/25%)] shadow-[0_4px_24px_oklch(0.8_0.12_20/12%)]",
  clear:  "bg-white/55 border-white/50 shadow-[0_4px_24px_oklch(0.7_0.02_280/10%)]",
}

const hoverMap: Record<JellyColor, string> = {
  pink:   "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.88_0.1_350/22%)]",
  blue:   "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.86_0.08_240/22%)]",
  green:  "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.88_0.1_150/22%)]",
  yellow: "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.92_0.1_95/25%)]",
  orange: "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.88_0.1_55/22%)]",
  red:    "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.8_0.12_20/18%)]",
  clear:  "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_oklch(0.7_0.02_280/15%)]",
}

export function JellyCard({
  color = "clear",
  hoverable = false,
  children,
  className,
  ...props
}: JellyCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative rounded-3xl border p-6 backdrop-blur-md overflow-hidden",
        "transition-all duration-300",
        colorMap[color],
        hoverable && hoverMap[color],
        className,
      )}
    >
      {/* inner gloss at top */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-2 h-6 rounded-full bg-white/30 blur-md"
      />
      {/* inner gloss streak */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-4 h-12 w-0.5 rounded-full bg-white/40 blur-sm rotate-12"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function JellyCardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 {...props} className={cn("font-bold text-lg text-foreground mb-1", className)}>
      {children}
    </h3>
  )
}

export function JellyCardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn("text-sm text-muted-foreground leading-relaxed", className)}>
      {children}
    </p>
  )
}
