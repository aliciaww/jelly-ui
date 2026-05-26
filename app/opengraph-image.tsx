import { ImageResponse } from "next/og"

export const alt = "Jelly UI - squishy React and Tailwind components"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f7f3fe",
          color: "#2f2841",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "76px 88px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 670 }}>
          <div style={{ alignItems: "center", display: "flex", gap: 14 }}>
            {["#efa7ce", "#91d1ee", "#9ce2b4", "#f8dc78", "#f4c18e", "#e99a98"].map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  border: "3px solid #fff",
                  borderRadius: 999,
                  height: 24,
                  width: 24,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 700, letterSpacing: "-3px" }}>
            jelly ui
          </div>
          <div style={{ color: "#615a76", display: "flex", fontSize: 33, lineHeight: 1.35 }}>
            Squishy copy-paste components for React and Tailwind CSS
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            {["React 19", "Tailwind CSS 4", "TypeScript"].map((label, index) => (
              <div
                key={label}
                style={{
                  background: ["#f9d6e8", "#d6f2e0", "#d9ecfb"][index],
                  borderRadius: 999,
                  color: "#48405d",
                  display: "flex",
                  fontSize: 19,
                  fontWeight: 600,
                  padding: "12px 22px",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.52)",
            border: "2px solid rgba(226,216,238,0.8)",
            borderRadius: 80,
            display: "flex",
            height: 360,
            justifyContent: "center",
            width: 360,
          }}
        >
          <svg height="248" viewBox="0 0 180 180" width="248">
            <defs>
              <linearGradient id="jelly-og" x1="43" y1="29" x2="134" y2="151" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F8C3E0" />
                <stop offset="0.33" stopColor="#F19BC8" />
                <stop offset="0.76" stopColor="#EC87B6" />
                <stop offset="1" stopColor="#DC709F" />
              </linearGradient>
              <linearGradient id="shine-og" x1="61" y1="47" x2="84" y2="74" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.86" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.16" />
              </linearGradient>
            </defs>
            <path
              d="M92 22C115 22 137 31 148 49C159 67 158 91 153 111C148 130 134 148 114 154C94 160 70 158 52 148C33 137 23 117 22 96C20 75 26 53 42 39C55 27 73 22 92 22Z"
              fill="url(#jelly-og)"
            />
            <path
              d="M48 68C51 49 66 37 83 35C93 34 98 39 95 45C92 52 84 53 76 56C68 59 65 65 61 71C57 78 46 77 48 68Z"
              fill="url(#shine-og)"
            />
          </svg>
        </div>
      </div>
    ),
    size,
  )
}
