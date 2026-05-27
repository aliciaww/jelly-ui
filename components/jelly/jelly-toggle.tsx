"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red"

interface JellyToggleProps {
  color?: JellyColor
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

const onColorMap: Record<JellyColor, string> = {
  pink:   "bg-[oklch(0.88_0.1_350/90%)] shadow-[0_1px_8px_oklch(0.88_0.1_350/35%)]",
  blue:   "bg-[oklch(0.86_0.08_240/90%)] shadow-[0_1px_8px_oklch(0.86_0.08_240/35%)]",
  green:  "bg-[oklch(0.88_0.1_150/90%)] shadow-[0_1px_8px_oklch(0.88_0.1_150/35%)]",
  yellow: "bg-[oklch(0.94_0.1_95/95%)] shadow-[0_1px_8px_oklch(0.94_0.1_95/40%)]",
  orange: "bg-[oklch(0.88_0.1_55/90%)] shadow-[0_1px_8px_oklch(0.88_0.1_55/35%)]",
  red:    "bg-[oklch(0.8_0.12_20/90%)] shadow-[0_1px_8px_oklch(0.8_0.12_20/35%)]",
}

export function JellyToggle({
  color = "green",
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  label,
  disabled = false,
  className,
}: JellyToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const handleChange = () => {
    if (disabled) return
    const next = !checked
    if (!isControlled) setInternalChecked(next)
    onChange?.(next)
  }

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={handleChange}
        className={cn(
          "relative w-14 h-7 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          checked
            ? cn("border-transparent", onColorMap[color])
            : "bg-[oklch(0.92_0.02_290/70%)] border-[oklch(0.85_0.03_290/40%)]",
        )}
      >
        {/* track gloss */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-1 top-0.5 h-[30%] rounded-full bg-white/35 blur-[1px]"
        />
        {/* thumb */}
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]",
            "shadow-[0_1px_4px_rgba(0,0,0,0.15)]",
            "bg-white",
            checked ? "left-[calc(100%-1.375rem)]" : "left-0.5",
          )}
        >
          {/* thumb inner gloss dot */}
          <span
            aria-hidden
            className="absolute top-0.5 left-0.5 h-2 w-2 rounded-full bg-white/70 blur-[1px]"
          />
        </span>
      </button>
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
    </label>
  )
}
