import { readFile } from "fs/promises"
import Link from "next/link"
import { join } from "path"

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

        <article className="whitespace-pre-wrap rounded-3xl border border-border/70 bg-white/60 p-5 font-mono text-sm leading-7 text-foreground/85 shadow-sm backdrop-blur-sm">
          {readme}
        </article>

        <footer className="text-center text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            back to jelly ui
          </Link>
        </footer>
      </div>
    </main>
  )
}
