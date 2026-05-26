"use client"

import { useState } from "react"
import { Heart, RotateCcw, Zap } from "lucide-react"
import { JellyBadge } from "@/components/jelly/jelly-badge"
import { JellyButton } from "@/components/jelly/jelly-button"
import { JellyCard, JellyCardDescription, JellyCardTitle } from "@/components/jelly/jelly-card"
import { JellyChip } from "@/components/jelly/jelly-chip"
import { JellyInput } from "@/components/jelly/jelly-input"
import { JellyProgress } from "@/components/jelly/jelly-progress"
import { JellySlider } from "@/components/jelly/jelly-slider"
import { JellyToggle } from "@/components/jelly/jelly-toggle"

const colors = ["pink", "blue", "green", "yellow", "orange", "red"] as const
const defaultChips = ["react", "typescript", "tailwind", "next.js", "jelly ui"]

export function ButtonPreview() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground">filled colors</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => <JellyButton key={color} color={color} size="sm">{color}</JellyButton>)}
        </div>
        <p className="pt-2 text-xs font-bold text-muted-foreground">outlined colors</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => <JellyButton key={color} color={color} size="sm" outlined>{color}</JellyButton>)}
        </div>
      </div>
      <div className="space-y-4 lg:border-l lg:border-border/60 lg:pl-8">
        <p className="text-xs font-bold text-muted-foreground">sizes and states</p>
        <div className="flex flex-wrap items-center gap-3">
          <JellyButton color="green" size="sm">small</JellyButton>
          <JellyButton color="blue">medium</JellyButton>
          <JellyButton color="pink" size="lg">large</JellyButton>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <JellyButton color="pink" size="sm"><Heart size={14} /> like</JellyButton>
          <JellyButton color="blue" size="sm"><Zap size={14} /> boost</JellyButton>
          <JellyButton color="yellow" size="sm" disabled>disabled</JellyButton>
        </div>
      </div>
    </div>
  )
}

export function BadgePreview() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => <JellyBadge key={color} color={color}>{color}</JellyBadge>)}
      </div>
      <div className="flex flex-wrap gap-3">
        <JellyBadge color="green" pulse>online</JellyBadge>
        <JellyBadge color="red" pulse>live</JellyBadge>
        <JellyBadge color="blue" pulse>streaming</JellyBadge>
        <JellyBadge color="yellow">beta</JellyBadge>
        <JellyBadge color="pink">new</JellyBadge>
      </div>
    </div>
  )
}

export function TogglePreview() {
  return (
    <div className="grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-3">
      {colors.map((color, index) => (
        <JellyToggle key={color} color={color} defaultChecked={index % 2 === 0} label={color} />
      ))}
    </div>
  )
}

export function SliderPreview() {
  return (
    <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      {colors.map((color, index) => (
        <JellySlider key={color} color={color} defaultValue={24 + index * 12} label={color} showValue />
      ))}
    </div>
  )
}

export function ProgressPreview() {
  return (
    <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      {colors.map((color, index) => (
        <JellyProgress key={color} color={color} value={20 + index * 13} label={color} animated />
      ))}
    </div>
  )
}

export function ChipPreview() {
  const [chips, setChips] = useState(defaultChips)
  const [selected, setSelected] = useState("design")

  return (
    <div className="space-y-5">
      <p className="text-xs font-bold text-muted-foreground">removable</p>
      <div className="flex flex-wrap items-center gap-3">
        {chips.map((chip, index) => (
          <JellyChip key={chip} color={colors[index % colors.length]} removable onRemove={() => setChips((items) => items.filter((item) => item !== chip))}>
            {chip}
          </JellyChip>
        ))}
        {chips.length < defaultChips.length && (
          <button type="button" onClick={() => setChips(defaultChips)} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
            <RotateCcw size={12} /> reset
          </button>
        )}
      </div>
      <p className="text-xs font-bold text-muted-foreground">selectable</p>
      <div className="flex flex-wrap gap-3">
        {["design", "code", "ship", "iterate"].map((tag, index) => (
          <JellyChip key={tag} color={colors[index]} selected={selected === tag} onClick={() => setSelected(tag)}>
            {tag}
          </JellyChip>
        ))}
      </div>
    </div>
  )
}

export function InputPreview() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <JellyInput color="pink" label="name" placeholder="enter your name..." />
      <JellyInput color="blue" label="email" placeholder="hello@jelly.ui" type="email" />
      <JellyInput color="green" label="username" placeholder="@jellybean" />
      <JellyInput color="yellow" label="search" placeholder="search..." />
    </div>
  )
}

export function CardPreview() {
  const labels = ["strawberry", "blueberry", "lime", "lemon"]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(["pink", "blue", "green", "yellow"] as const).map((color, index) => (
        <JellyCard key={color} color={color} hoverable className="p-5">
          <JellyCardTitle>{labels[index]}</JellyCardTitle>
          <JellyCardDescription>sweet and delicious</JellyCardDescription>
          <div className="mt-4">
            <JellyButton color={color} size="sm">try it</JellyButton>
          </div>
        </JellyCard>
      ))}
    </div>
  )
}
