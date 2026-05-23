import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

const componentFiles = new Set([
  "jelly-badge",
  "jelly-button",
  "jelly-card",
  "jelly-chip",
  "jelly-input",
  "jelly-progress",
  "jelly-slider",
  "jelly-toggle",
])

const cnHelper = `type JellyClassValue = string | false | null | undefined

function cn(...classes: JellyClassValue[]) {
  return classes.filter(Boolean).join(" ")
}`

const animationCss: Partial<Record<string, string>> = {
  "jelly-button": `@keyframes jelly-bounce {
  0% { transform: scale(1, 1); opacity: 1; }
  20% { transform: scale(0.92, 1.08); }
  40% { transform: scale(1.05, 0.95); }
  60% { transform: scale(0.98, 1.02); }
  80% { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); opacity: 1; }
}`,
  "jelly-chip": `@keyframes jelly-wiggle {
  0% { transform: rotate(0deg) scale(1); }
  15% { transform: rotate(-4deg) scale(1.04); }
  30% { transform: rotate(3deg) scale(0.97); }
  45% { transform: rotate(-2deg) scale(1.02); }
  60% { transform: rotate(1deg) scale(0.99); }
  75% { transform: rotate(-1deg) scale(1.01); }
  100% { transform: rotate(0deg) scale(1); }
}`,
  "jelly-progress": `@keyframes slide {
  0% { background-position: 0 0; }
  100% { background-position: 32px 0; }
}`,
}

function insertAfterImports(source: string, code: string) {
  const imports = [...source.matchAll(/^import .*$/gm)]
  const lastImport = imports.at(-1)

  if (!lastImport || lastImport.index === undefined) {
    return `${code}\n\n${source}`
  }

  const insertAt = lastImport.index + lastImport[0].length
  return `${source.slice(0, insertAt)}\n\n${code}${source.slice(insertAt)}`
}

function createPasteReadySource(name: string, source: string) {
  let nextSource = source.replace(/^import \{ cn \} from ["']@\/lib\/utils["']\n/m, "")
  nextSource = insertAfterImports(nextSource, cnHelper)

  const css = animationCss[name]
  if (!css) return nextSource

  return `${nextSource.trimEnd()}

/*
Add this CSS to your global stylesheet to enable the jelly animation:

${css}
*/
`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")

  if (!name || !componentFiles.has(name)) {
    return new NextResponse("invalid component name", { status: 400 })
  }

  try {
    const filePath = join(process.cwd(), "components", "jelly", `${name}.tsx`)
    const content = await readFile(filePath, "utf-8")
    return new NextResponse(createPasteReadySource(name, content), {
      headers: { "Content-Type": "text/plain" },
    })
  } catch {
    return new NextResponse("component not found", { status: 404 })
  }
}
