"use client"

import { useState, type ReactNode } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red"

interface JellyChipProps {
  color?: JellyColor
  removable?: boolean
  selected?: boolean
  onRemove?: () => void
  onClick?: () => void
  removeLabel?: string
  children: ReactNode
  className?: string
}

const colorMap: Record<JellyColor, { idle: string; selected: string; text: string; selectedText: string }> = {
  pink:   { idle: "bg-[oklch(0.92_0.06_350/40%)] border-[oklch(0.88_0.08_350/25%)]",  selected: "bg-[oklch(0.88_0.1_350/80%)] border-[oklch(0.82_0.1_350/35%)]",  text: "text-[oklch(0.5_0.1_350)]", selectedText: "text-[oklch(0.35_0.08_350)]" },
  blue:   { idle: "bg-[oklch(0.9_0.05_240/40%)] border-[oklch(0.86_0.06_240/25%)]",   selected: "bg-[oklch(0.86_0.08_240/80%)] border-[oklch(0.78_0.08_240/35%)]", text: "text-[oklch(0.45_0.08_240)]", selectedText: "text-[oklch(0.3_0.06_240)]" },
  green:  { idle: "bg-[oklch(0.92_0.06_150/40%)] border-[oklch(0.88_0.08_150/25%)]",  selected: "bg-[oklch(0.88_0.1_150/80%)] border-[oklch(0.8_0.1_150/35%)]",   text: "text-[oklch(0.45_0.1_150)]", selectedText: "text-[oklch(0.32_0.08_150)]" },
  yellow: { idle: "bg-[oklch(0.96_0.06_95/45%)] border-[oklch(0.92_0.08_95/30%)]",    selected: "bg-[oklch(0.94_0.1_95/85%)] border-[oklch(0.88_0.1_90/40%)]",    text: "text-[oklch(0.5_0.1_80)]",  selectedText: "text-[oklch(0.38_0.08_80)]" },
  orange: { idle: "bg-[oklch(0.92_0.06_55/40%)] border-[oklch(0.88_0.08_55/25%)]",    selected: "bg-[oklch(0.88_0.1_55/80%)] border-[oklch(0.8_0.1_50/35%)]",     text: "text-[oklch(0.5_0.1_50)]",  selectedText: "text-[oklch(0.35_0.08_50)]" },
  red:    { idle: "bg-[oklch(0.9_0.06_20/35%)] border-[oklch(0.8_0.08_20/25%)]",      selected: "bg-[oklch(0.8_0.12_20/80%)] border-[oklch(0.7_0.12_20/35%)]",    text: "text-[oklch(0.48_0.1_20)]", selectedText: "text-[oklch(0.35_0.08_20)]" },
}

export function JellyChip({
  color = "blue",
  removable = false,
  selected = false,
  onRemove,
  onClick,
  removeLabel,
  children,
  className,
}: JellyChipProps) {
  const [wiggling, setWiggling] = useState(false)
  const c = colorMap[color]

  const handleClick = () => {
    setWiggling(true)
    setTimeout(() => setWiggling(false), 600)
    onClick?.()
  }

  const label = typeof children === "string" ? children : "chip"
  const chipClasses = cn(
    "relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border",
    "text-xs font-semibold select-none overflow-hidden",
    "transition-all duration-200 backdrop-blur-sm",
    selected ? cn(c.selected, c.selectedText) : cn(c.idle, c.text),
    onClick && "cursor-pointer active:scale-95",
    wiggling && "[animation:jelly-wiggle_0.6s_ease-out]",
    className,
  )
  const content = (
    <>
      {/* gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-0.5 h-[35%] rounded-full bg-white/35 blur-[1px]"
      />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (onClick && !removable) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={selected}
        className={chipClasses}
      >
        {content}
      </button>
    )
  }

  return (
    <span
      className={chipClasses}
    >
      {onClick ? (
        <button
          type="button"
          onClick={handleClick}
          aria-pressed={selected}
          className="relative z-10 -my-1 -ml-1 rounded-full px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {children}
        </button>
      ) : (
        content
      )}
      {removable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove?.() }}
          aria-label={removeLabel ?? `Remove ${label}`}
          className="relative z-10 ml-0.5 rounded-full hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X size={12} strokeWidth={3} />
        </button>
      )}
    </span>
  )
}
