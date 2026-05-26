"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Embedded browsers may expose Clipboard API but reject writes.
    }
  }

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.setAttribute("aria-hidden", "true")
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  document.body.appendChild(textarea)
  textarea.select()

  try {
    if (!document.execCommand("copy")) throw new Error("copy failed")
  } finally {
    document.body.removeChild(textarea)
  }
}

export function CopyTextButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  const copyValue = async () => {
    try {
      await writeToClipboard(text)
      setStatus("copied")
    } catch {
      setStatus("error")
    }

    window.setTimeout(() => setStatus("idle"), 2000)
  }

  const label = status === "copied" ? "copied" : status === "error" ? "unavailable" : "copy code"

  return (
    <button
      type="button"
      onClick={copyValue}
      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={label}
      aria-live="polite"
    >
      {status === "copied" ? <Check size={12} /> : <Copy size={12} />}
      {label}
    </button>
  )
}
