"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { JellyButton } from "@/components/jelly/jelly-button"
import { JellyBadge } from "@/components/jelly/jelly-badge"
import { JellyCard, JellyCardTitle, JellyCardDescription } from "@/components/jelly/jelly-card"
import { JellyToggle } from "@/components/jelly/jelly-toggle"
import { JellySlider } from "@/components/jelly/jelly-slider"
import { JellyInput } from "@/components/jelly/jelly-input"
import { JellyChip } from "@/components/jelly/jelly-chip"
import { JellyProgress } from "@/components/jelly/jelly-progress"
import { Heart, Zap, Star, RotateCcw, Copy, Check } from "lucide-react"

const COLORS = ["pink", "blue", "green", "yellow", "orange", "red"] as const
type C = (typeof COLORS)[number]

const DEFAULT_CHIPS = ["react", "typescript", "tailwind", "next.js", "jelly ui"]
type CopyState = { component: string; status: "copied" | "manual" | "error" } | null
type ManualCopyState = { component: string; code: string } | null

const COMPONENT_FILES: Record<string, string> = {
  JellyButton: "jelly-button",
  JellyBadge: "jelly-badge",
  JellyCard: "jelly-card",
  JellyToggle: "jelly-toggle",
  JellySlider: "jelly-slider",
  JellyProgress: "jelly-progress",
  JellyChip: "jelly-chip",
  JellyInput: "jelly-input",
}

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Some embedded browsers expose Clipboard API but reject writes.
    }
  }

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.setAttribute("aria-hidden", "true")
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  textarea.style.top = "0"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, text.length)

  try {
    if (!document.execCommand("copy")) {
      throw new Error("copy command failed")
    }
  } finally {
    document.body.removeChild(textarea)
  }
}

export default function JellyShowcase() {
  const [toggles, setToggles] = useState<Record<C, boolean>>({
    pink: true, blue: false, green: true, yellow: false, orange: true, red: false,
  })
  const [sliderValues, setSliderValues] = useState<Record<C, number>>({
    pink: 75, blue: 45, green: 60, yellow: 30, orange: 80, red: 50,
  })
  const [chips, setChips] = useState(DEFAULT_CHIPS)
  const [selectedChip, setSelectedChip] = useState("design")
  const [copyState, setCopyState] = useState<CopyState>(null)
  const [componentCode, setComponentCode] = useState<Record<string, string>>({})
  const [manualCopy, setManualCopy] = useState<ManualCopyState>(null)

  useEffect(() => {
    let cancelled = false

    async function loadComponentCode() {
      const entries = await Promise.all(
        Object.entries(COMPONENT_FILES).map(async ([component, fileName]) => {
          const res = await fetch(`/api/component?name=${fileName}`)
          if (!res.ok) return [component, ""] as const

          return [component, await res.text()] as const
        }),
      )

      if (!cancelled) {
        setComponentCode(Object.fromEntries(entries.filter(([, code]) => code)))
      }
    }

    loadComponentCode().catch(() => {
      if (!cancelled) setComponentCode({})
    })

    return () => {
      cancelled = true
    }
  }, [])

  const copyCode = async (component: string) => {
    const fileName = COMPONENT_FILES[component]
    if (!fileName) return

    try {
      setManualCopy(null)
      let code = componentCode[component]

      if (!code) {
        const res = await fetch(`/api/component?name=${fileName}`)
        if (!res.ok) throw new Error("component source unavailable")
        code = await res.text()
      }

      try {
        await writeToClipboard(code)
        setCopyState({ component, status: "copied" })
      } catch {
        setManualCopy({ component, code })
        setCopyState({ component, status: "manual" })
        return
      }
    } catch {
      setCopyState({ component, status: "error" })
    }

    window.setTimeout(() => setCopyState(null), 2000)
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      {/* decorative blobs */}
      <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[oklch(0.88_0.1_350/10%)] blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-[oklch(0.86_0.08_240/10%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[oklch(0.88_0.1_150/8%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">

        {/* header */}
        <header className="text-center space-y-3">
          <div className="flex justify-center gap-2 mb-4">
            {COLORS.map((c) => (
              <span
                key={c}
                className="inline-block w-4 h-4 rounded-full ring-2 ring-white shadow-sm"
                style={{ background: `var(--jelly-${c})` }}
              />
            ))}
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            jelly ui
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground font-medium text-base">
            a copy-paste set of react/tailwind components.
          </p>
        </header>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* buttons */}
          <Section title="buttons" onCopy={() => copyCode("JellyButton")} copyStatus={copyState?.component === "JellyButton" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyButton" ? manualCopy.code : undefined}>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <JellyButton key={c} color={c} size="sm">
                    {c}
                  </JellyButton>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <JellyButton key={c} color={c} size="sm" outlined>
                    {c}
                  </JellyButton>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center pt-1">
                <JellyButton color="pink" size="sm">
                  <Heart size={14} /> like
                </JellyButton>
                <JellyButton color="blue" size="sm">
                  <Zap size={14} /> boost
                </JellyButton>
                <JellyButton color="yellow" size="sm" disabled>
                  disabled
                </JellyButton>
              </div>
            </div>
          </Section>

          {/* badges */}
          <Section title="badges" onCopy={() => copyCode("JellyBadge")} copyStatus={copyState?.component === "JellyBadge" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyBadge" ? manualCopy.code : undefined}>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <JellyBadge key={c} color={c}>
                    {c}
                  </JellyBadge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <JellyBadge color="green" pulse>online</JellyBadge>
                <JellyBadge color="red" pulse>live</JellyBadge>
                <JellyBadge color="blue" pulse>streaming</JellyBadge>
                <JellyBadge color="yellow">beta</JellyBadge>
                <JellyBadge color="pink">new</JellyBadge>
              </div>
            </div>
          </Section>

          {/* toggles */}
          <Section title="toggles" onCopy={() => copyCode("JellyToggle")} copyStatus={copyState?.component === "JellyToggle" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyToggle" ? manualCopy.code : undefined}>
            <div className="grid grid-cols-2 gap-3">
              {COLORS.map((c) => (
                <JellyToggle
                  key={c}
                  color={c}
                  checked={toggles[c]}
                  onChange={(v) => setToggles((prev) => ({ ...prev, [c]: v }))}
                  label={c}
                />
              ))}
            </div>
          </Section>

          {/* sliders */}
          <Section title="sliders" onCopy={() => copyCode("JellySlider")} copyStatus={copyState?.component === "JellySlider" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellySlider" ? manualCopy.code : undefined}>
            <div className="space-y-4">
              {COLORS.slice(0, 4).map((c) => (
                <JellySlider
                  key={c}
                  color={c}
                  value={sliderValues[c]}
                  showValue
                  onChange={(v) => setSliderValues((prev) => ({ ...prev, [c]: v }))}
                />
              ))}
            </div>
          </Section>

          {/* progress */}
          <Section title="progress" onCopy={() => copyCode("JellyProgress")} copyStatus={copyState?.component === "JellyProgress" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyProgress" ? manualCopy.code : undefined}>
            <div className="space-y-3">
              {COLORS.map((c, i) => (
                <JellyProgress
                  key={c}
                  color={c}
                  value={20 + i * 13}
                  animated
                />
              ))}
            </div>
          </Section>

          {/* chips */}
          <Section title="chips" onCopy={() => copyCode("JellyChip")} copyStatus={copyState?.component === "JellyChip" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyChip" ? manualCopy.code : undefined}>
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">removable</p>
              <div className="flex flex-wrap gap-2 items-center">
                {chips.map((chip, i) => (
                  <JellyChip
                    key={chip}
                    color={COLORS[i % COLORS.length]}
                    removable
                    onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
                  >
                    {chip}
                  </JellyChip>
                ))}
                {chips.length < DEFAULT_CHIPS.length && (
                  <button
                    onClick={() => setChips(DEFAULT_CHIPS)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw size={12} /> reset
                  </button>
                )}
              </div>
              <p className="text-xs font-medium text-muted-foreground pt-2">selectable</p>
              <div className="flex flex-wrap gap-2">
                {["design", "code", "ship", "iterate"].map((tag, i) => (
                  <JellyChip
                    key={tag}
                    color={COLORS[i % COLORS.length]}
                    selected={selectedChip === tag}
                    onClick={() => setSelectedChip(tag)}
                  >
                    {tag}
                  </JellyChip>
                ))}
              </div>
            </div>
          </Section>

          {/* inputs */}
          <Section title="inputs" onCopy={() => copyCode("JellyInput")} copyStatus={copyState?.component === "JellyInput" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyInput" ? manualCopy.code : undefined}>
            <div className="grid grid-cols-2 gap-3">
              <JellyInput color="pink"   label="name"     placeholder="enter your name…" />
              <JellyInput color="blue"   label="email"    placeholder="hello@jelly.ui"   type="email" />
              <JellyInput color="green"  label="username" placeholder="@jellybean" />
              <JellyInput color="yellow" label="search"   placeholder="search…" />
            </div>
          </Section>

          {/* cards */}
          <Section title="cards" onCopy={() => copyCode("JellyCard")} copyStatus={copyState?.component === "JellyCard" ? copyState.status : undefined} manualCode={manualCopy?.component === "JellyCard" ? manualCopy.code : undefined}>
            <div className="grid grid-cols-2 gap-3">
              {(["pink", "blue", "green", "yellow"] as const).map((c, i) => {
                const labels = ["strawberry", "blueberry", "lime", "lemon"]
                return (
                  <JellyCard key={c} color={c} hoverable className="p-4">
                    <JellyCardTitle className="text-base">{labels[i]}</JellyCardTitle>
                    <JellyCardDescription className="text-xs">sweet and delicious</JellyCardDescription>
                    <div className="mt-3">
                      <JellyButton color={c} size="sm">try it</JellyButton>
                    </div>
                  </JellyCard>
                )
              })}
            </div>
          </Section>

        </div>

        <footer className="flex flex-wrap items-center justify-center gap-2 text-center text-muted-foreground text-sm font-medium pb-4">
          <span>made by alicia</span>
          <span aria-hidden>|</span>
          <a href="/jelly-ui.tar" className="hover:text-foreground transition-colors">
            download
          </a>
          <span aria-hidden>|</span>
          <a href="/readme" className="hover:text-foreground transition-colors">
            readme
          </a>
          <span aria-hidden>|</span>
          <a href="https://github.com/aliciaww/jelly-ui" className="hover:text-foreground transition-colors">
            github
          </a>
          <span aria-hidden>|</span>
          <a href="/license" className="hover:text-foreground transition-colors">
            mit license
          </a>
        </footer>
      </div>
    </main>
  )
}

function Section({
  title,
  children,
  onCopy,
  copyStatus,
  manualCode,
}: {
  title: string
  children: ReactNode
  onCopy?: () => void
  copyStatus?: "copied" | "manual" | "error"
  manualCode?: string
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const copyLabel = copyStatus === "copied" ? "copied" : copyStatus === "manual" ? "select code" : copyStatus === "error" ? "unavailable" : "copy code"

  useEffect(() => {
    if (!manualCode) return

    textareaRef.current?.focus()
    textareaRef.current?.select()
  }, [manualCode])

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Star size={14} className="text-muted-foreground" />
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <div className="flex-1 h-px bg-border/50 ml-2" />
        {onCopy && (
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`${copyLabel}: ${title}`}
          >
            {copyStatus === "copied" ? <Check size={12} /> : <Copy size={12} />}
            {copyLabel}
          </button>
        )}
      </div>
      {manualCode && (
        <textarea
          ref={textareaRef}
          readOnly
          value={manualCode}
          aria-label={`${title} component code`}
          onFocus={(event) => event.currentTarget.select()}
          onClick={(event) => event.currentTarget.select()}
          className="h-44 w-full resize-y rounded-2xl border border-border/70 bg-white/70 p-3 font-mono text-xs leading-relaxed text-foreground shadow-sm outline-none transition focus:border-[oklch(0.86_0.08_240/50%)] focus:ring-4 focus:ring-[oklch(0.86_0.08_240/12%)]"
        />
      )}
      {children}
    </section>
  )
}
