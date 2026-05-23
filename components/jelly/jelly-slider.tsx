"use client"

import { useState, useCallback, useId, type ChangeEvent } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red"

interface JellySliderProps {
  color?: JellyColor
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  label?: string
  ariaLabel?: string
  showValue?: boolean
  className?: string
}

const colorMap: Record<JellyColor, { track: string; thumb: string; fill: string }> = {
  pink:   { track: "bg-[oklch(0.94_0.04_350/45%)]", fill: "bg-[oklch(0.88_0.1_350/90%)]",  thumb: "bg-[oklch(0.88_0.1_350)] shadow-[0_0_10px_oklch(0.88_0.1_350/40%)]" },
  blue:   { track: "bg-[oklch(0.93_0.03_240/45%)]", fill: "bg-[oklch(0.86_0.08_240/90%)]", thumb: "bg-[oklch(0.86_0.08_240)] shadow-[0_0_10px_oklch(0.86_0.08_240/40%)]" },
  green:  { track: "bg-[oklch(0.94_0.04_150/45%)]", fill: "bg-[oklch(0.88_0.1_150/90%)]",  thumb: "bg-[oklch(0.88_0.1_150)] shadow-[0_0_10px_oklch(0.88_0.1_150/40%)]" },
  yellow: { track: "bg-[oklch(0.96_0.04_95/50%)]",  fill: "bg-[oklch(0.94_0.1_95/95%)]",  thumb: "bg-[oklch(0.94_0.1_95)] shadow-[0_0_10px_oklch(0.94_0.1_95/45%)]" },
  orange: { track: "bg-[oklch(0.94_0.04_55/45%)]",  fill: "bg-[oklch(0.88_0.1_55/90%)]",   thumb: "bg-[oklch(0.88_0.1_55)] shadow-[0_0_10px_oklch(0.88_0.1_55/40%)]" },
  red:    { track: "bg-[oklch(0.92_0.04_20/40%)]",  fill: "bg-[oklch(0.8_0.12_20/90%)]",  thumb: "bg-[oklch(0.8_0.12_20)] shadow-[0_0_10px_oklch(0.8_0.12_20/35%)]" },
}

export function JellySlider({
  color = "blue",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value: controlledValue,
  onChange,
  label,
  ariaLabel,
  showValue = true,
  className,
}: JellySliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const sliderId = useId()
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const c = colorMap[color]

  const pct = ((value - min) / (max - min)) * 100

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    if (!isControlled) setInternalValue(v)
    onChange?.(v)
  }, [isControlled, onChange])

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <label htmlFor={sliderId} className="text-sm font-medium text-foreground">{label}</label>}
          {showValue && (
            <span className={cn("text-sm font-semibold px-2 py-0.5 rounded-xl", c.fill, "text-[oklch(0.35_0.05_0)] tabular-nums")}>
              {value}
            </span>
          )}
        </div>
      )}
      <div className="relative h-6 flex items-center">
        {/* track */}
        <div className={cn("absolute inset-x-0 h-2.5 rounded-full overflow-hidden border border-white/30", c.track)}>
          {/* fill — no transition so it matches thumb instantly */}
          <div
            className={cn("h-full rounded-full", c.fill)}
            style={{ width: `${pct}%` }}
          />
          {/* track gloss */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-1 top-0.5 h-[35%] rounded-full bg-white/35 blur-[1px]"
          />
        </div>
        {/* native range input (invisible but functional) */}
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          aria-label={label ? undefined : ariaLabel ?? `${color} slider`}
        />
        {/* custom thumb — no transition */}
        <div
          aria-hidden
          className={cn(
            "absolute w-6 h-6 rounded-full pointer-events-none",
            "border-3 border-white",
            c.thumb,
          )}
          style={{ left: `calc(${pct}% - 12px)` }}
        >
          {/* thumb gloss */}
          <span className="absolute top-0.5 left-0.5 h-1.5 w-1.5 rounded-full bg-white/60 blur-[1px]" />
        </div>
      </div>
    </div>
  )
}
