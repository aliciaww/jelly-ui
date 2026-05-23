import { readFile } from "fs/promises"
import Link from "next/link"
import { join } from "path"

function parseInline(text: string) {
  return text.replaceAll("`", "")
}

function renderReadme(readme: string) {
  const lines = readme.split("\n")
  const blocks: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!line.trim()) continue
    if (line.startsWith("# ")) continue

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="text-xl font-bold text-foreground">
          {parseInline(line.replace(/^##\s+/, "").toLowerCase())}
        </h2>,
      )
      continue
    }

    if (line.startsWith("- ")) {
      const items = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace(/^-\s+/, ""))
        i++
      }
      i--
      blocks.push(
        <ul key={i} className="list-disc space-y-1 pl-5">
          {items.map((item) => (
            <li key={item}>{parseInline(item)}</li>
          ))}
        </ul>,
      )
      continue
    }

    if (line.startsWith("```")) {
      const code = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i])
        i++
      }
      blocks.push(
        <pre key={i} className="overflow-x-auto rounded-2xl border border-border/70 bg-white/60 p-4 font-mono text-sm leading-6 text-foreground/80">
          <code>{code.join("\n")}</code>
        </pre>,
      )
      continue
    }

    blocks.push(<p key={i}>{parseInline(line)}</p>)
  }

  return blocks
}

export default async function ReadmePage() {
  const readme = await readFile(join(process.cwd(), "README.md"), "utf-8")

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">readme</h1>
          <p className="text-muted-foreground font-medium text-base">
            setup notes for jelly ui.
          </p>
        </header>

        <article className="space-y-5 text-base font-medium leading-8 text-foreground/85">
          {renderReadme(readme)}
        </article>

        <footer className="text-center text-sm font-medium text-muted-foreground">
          <Link href="/" aria-label="back to jelly ui" className="text-2xl leading-none hover:text-foreground transition-colors">
            ←
          </Link>
        </footer>
      </div>
    </main>
  )
}
