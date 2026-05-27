"use client"

import { useState, type ButtonHTMLAttributes, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

type JellyColor = "pink" | "blue" | "green" | "yellow" | "orange" | "red"
type JellySize  = "sm" | "md" | "lg"

interface JellyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: JellyColor
  size?:  JellySize
  outlined?: boolean
}

const colorMap: Record<JellyColor, { base: string; bottomShadow: string }> = {
  pink:   { base: "bg-[oklch(0.88_0.1_350/85%)]",  bottomShadow: "shadow-[0_3px_0_oklch(0.75_0.12_350/60%)]" },
  blue:   { base: "bg-[oklch(0.86_0.08_240/85%)]", bottomShadow: "shadow-[0_3px_0_oklch(0.72_0.1_240/60%)]" },
  green:  { base: "bg-[oklch(0.88_0.1_150/85%)]",  bottomShadow: "shadow-[0_3px_0_oklch(0.74_0.12_150/60%)]" },
  yellow: { base: "bg-[oklch(0.94_0.1_95/90%)]",   bottomShadow: "shadow-[0_3px_0_oklch(0.82_0.12_90/60%)]" },
  orange: { base: "bg-[oklch(0.88_0.1_55/85%)]",   bottomShadow: "shadow-[0_3px_0_oklch(0.74_0.12_50/60%)]" },
  red:    { base: "bg-[oklch(0.8_0.12_20/85%)]",   bottomShadow: "shadow-[0_3px_0_oklch(0.65_0.14_20/60%)]" },
}

const textColorMap: Record<JellyColor, string> = {
  pink:   "text-[oklch(0.4_0.08_350)]",
  blue:   "text-[oklch(0.35_0.06_240)]",
  green:  "text-[oklch(0.35_0.06_150)]",
  yellow: "text-[oklch(0.4_0.08_80)]",
  orange: "text-[oklch(0.4_0.08_40)]",
  red:    "text-[oklch(0.35_0.08_20)]",
}

const outlineColorMap: Record<JellyColor, string> = {
  pink:   "border-[oklch(0.85_0.1_350/50%)] text-[oklch(0.55_0.12_350)] hover:bg-[oklch(0.88_0.1_350/15%)]",
  blue:   "border-[oklch(0.82_0.08_240/50%)] text-[oklch(0.5_0.1_240)] hover:bg-[oklch(0.86_0.08_240/15%)]",
  green:  "border-[oklch(0.84_0.1_150/50%)] text-[oklch(0.5_0.1_150)] hover:bg-[oklch(0.88_0.1_150/15%)]",
  yellow: "border-[oklch(0.9_0.1_95/55%)] text-[oklch(0.55_0.12_80)] hover:bg-[oklch(0.94_0.1_95/20%)]",
  orange: "border-[oklch(0.84_0.1_55/50%)] text-[oklch(0.55_0.12_50)] hover:bg-[oklch(0.88_0.1_55/15%)]",
  red:    "border-[oklch(0.75_0.12_20/50%)] text-[oklch(0.5_0.12_20)] hover:bg-[oklch(0.8_0.12_20/15%)]",
}

const sizeMap: Record<JellySize, string> = {
  sm: "px-4 py-1.5 text-sm rounded-2xl",
  md: "px-6 py-2.5 text-base rounded-3xl",
  lg: "px-8 py-3.5 text-lg rounded-[2rem]",
}

export function JellyButton({
  color = "pink",
  size  = "md",
  outlined = false,
  children,
  className,
  disabled,
  type = "button",
  onClick,
  ...props
}: JellyButtonProps) {
  const [animating, setAnimating] = useState(false)
  const c = colorMap[color]

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    setAnimating(true)
    setTimeout(() => setAnimating(false), 500)
    onClick?.(e)
  }

  if (outlined) {
    return (
      <button
        {...props}
        type={type}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center justify-center gap-1.5 font-semibold border select-none whitespace-nowrap",
          "transition-[transform,filter] duration-150 ease-out",
          "hover:scale-[1.03]",
          "active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          sizeMap[size],
          outlineColorMap[color],
          animating && "[animation:jelly-bounce_0.5s_cubic-bezier(0.34,1.56,0.64,1)]",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className,
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 font-semibold select-none whitespace-nowrap",
        "transition-[transform,filter] duration-150 ease-out",
        "hover:scale-[1.03] hover:brightness-[1.02]",
        "active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        c.base,
        c.bottomShadow,
        textColorMap[color],
        sizeMap[size],
        animating && "[animation:jelly-bounce_0.5s_cubic-bezier(0.34,1.56,0.64,1)]",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
    >
      {/* glossy top-highlight */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-3 top-1 h-[35%] rounded-full",
          "bg-gradient-to-b from-white/50 to-transparent blur-[2px]",
        )}
      />
      {children}
    </button>
  )
}
