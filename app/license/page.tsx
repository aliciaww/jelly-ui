import Link from "next/link"

const licenseParagraphs = [
  "Copyright 2025 Alicia Wong",
  `Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:`,
  "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
  `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
]

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">mit license</h1>
          <p className="text-muted-foreground font-medium text-base">
            jelly ui is free to use, modify, and ship.
          </p>
        </header>

        <article className="space-y-5 text-base font-medium leading-8 text-foreground/85">
          <h2 className="text-xl font-bold text-foreground">mit license</h2>
          {licenseParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
