import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="space-y-7 text-center">
        <svg aria-hidden className="mx-auto h-20 w-20" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="missing-jelly" x1="43" y1="29" x2="134" y2="151" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8C3E0" />
              <stop offset="0.33" stopColor="#F19BC8" />
              <stop offset="0.76" stopColor="#EC87B6" />
              <stop offset="1" stopColor="#DC709F" />
            </linearGradient>
          </defs>
          <path
            d="M92 22C115 22 137 31 148 49C159 67 158 91 153 111C148 130 134 148 114 154C94 160 70 158 52 148C33 137 23 117 22 96C20 75 26 53 42 39C55 27 73 22 92 22Z"
            fill="url(#missing-jelly)"
          />
          <path
            d="M48 68C51 49 66 37 83 35C93 34 98 39 95 45C92 52 84 53 76 56C68 59 65 65 61 71C57 78 46 77 48 68Z"
            fill="#fff"
            fillOpacity="0.6"
          />
        </svg>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">404</p>
          <h1 className="text-4xl font-bold tracking-tight">nothing squishy here</h1>
          <p className="text-base font-medium text-muted-foreground">
            This page does not exist, but the components are waiting back home.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex rounded-full bg-[var(--jelly-pink)] px-6 py-3 text-sm font-bold text-foreground shadow-sm transition hover:brightness-105"
        >
          back to jelly ui
        </Link>
      </div>
    </main>
  )
}
