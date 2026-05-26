import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { CopyTextButton } from "@/components/docs/copy-text-button"

const colors = ["pink", "blue", "green", "yellow", "orange", "red"] as const

const codeFont = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500", "600", "700"],
})

export type ComponentProp = {
  name: string
  type: string
  defaultValue: string
  description: string
}

type ComponentPageProps = {
  title: string
  preview: ReactNode
  usageText: ReactNode
  usageCode: string
  setupText: ReactNode
  setupCode?: string
  props: readonly ComponentProp[]
}

export function createComponentMetadata({
  name,
  slug,
  description,
}: {
  name: string
  slug: string
  description: string
}): Metadata {
  const title = `${name} - React and Tailwind CSS Component`
  const url = `/components/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | Jelly UI`,
      description,
      siteName: "Jelly UI",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Jelly UI`,
      description,
    },
  }
}

export function ComponentPage({
  title,
  preview,
  usageText,
  usageCode,
  setupText,
  setupCode,
  props,
}: ComponentPageProps) {
  return (
    <main className={`${codeFont.variable} min-h-screen bg-background px-4 py-12 text-foreground`}>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-[oklch(0.88_0.1_350/10%)] blur-3xl" />
        <div className="absolute top-1/4 -right-28 h-[430px] w-[430px] rounded-full bg-[oklch(0.86_0.08_240/9%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl space-y-12">
        <header className="mx-auto max-w-3xl space-y-5 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <div className="flex justify-center gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="h-4 w-4 rounded-full ring-2 ring-white shadow-sm"
                style={{ background: `var(--jelly-${color})` }}
              />
            ))}
          </div>
        </header>

        <section className="space-y-5" aria-labelledby="preview-title">
          <SectionHeader title="preview" id="preview-title" />
          <div className="rounded-[2rem] border border-border/70 bg-white/45 p-6 shadow-sm sm:p-8">
            {preview}
          </div>
        </section>

        <section className="space-y-5" aria-labelledby="usage-title">
          <SectionHeader title="usage" id="usage-title" />
          <p className="text-base font-medium leading-8 text-foreground/85">{usageText}</p>
          <CodePanel code={usageCode} />
        </section>

        <section className="space-y-5" aria-labelledby="setup-title">
          <SectionHeader title="setup notes" id="setup-title" />
          <div className="space-y-4 text-base font-medium leading-8 text-foreground/85">{setupText}</div>
          {setupCode && <CodePanel code={setupCode} />}
        </section>

        <section className="space-y-5" aria-labelledby="props-title">
          <SectionHeader title="props" id="props-title" />
          <div className="overflow-x-auto rounded-3xl border border-border/70 bg-white/45">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border/70 text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-bold">prop</th>
                  <th className="px-5 py-4 font-bold">type</th>
                  <th className="px-5 py-4 font-bold">default</th>
                  <th className="px-5 py-4 font-bold">purpose</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop) => (
                  <tr key={prop.name} className="border-b border-border/45 last:border-b-0">
                    <td className="px-5 py-4 font-code font-semibold">{prop.name}</td>
                    <td className="px-5 py-4 font-code text-xs font-semibold text-muted-foreground">{prop.type}</td>
                    <td className="px-5 py-4 font-code text-xs font-semibold text-muted-foreground">{prop.defaultValue}</td>
                    <td className="px-5 py-4 font-medium text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="pb-4 text-center text-sm font-medium text-muted-foreground">
          <Link href="/" aria-label="back to jelly ui" className="text-2xl leading-none transition-colors hover:text-foreground">
            <ArrowLeft className="mx-auto" size={24} />
          </Link>
        </footer>
      </div>
    </main>
  )
}

function SectionHeader({ title, id }: { title: string; id: string }) {
  return (
    <div className="flex items-center gap-2">
      <Star size={14} className="text-muted-foreground" />
      <h2 id={id} className="text-lg font-bold text-foreground">
        {title}
      </h2>
      <div className="ml-2 h-px flex-1 bg-border/50" />
    </div>
  )
}

function CodePanel({ code }: { code: string }) {
  return (
    <div className="relative rounded-3xl border border-[oklch(0.86_0.06_240/25%)] bg-[oklch(0.96_0.025_240/65%)] p-5 pt-12 shadow-[0_4px_24px_oklch(0.86_0.08_240/15%)]">
      <div className="absolute right-5 top-4">
        <CopyTextButton text={code} />
      </div>
      <pre className="overflow-x-auto text-xs leading-6 text-foreground/85 sm:text-sm">
        <code className="font-code font-semibold">{code}</code>
      </pre>
    </div>
  )
}
