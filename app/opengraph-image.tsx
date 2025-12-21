import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Free the Bird - A Brain Teaser Game"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #fffbeb, #ffedd5)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <svg width="180" height="220" viewBox="0 0 200 240">
          {/* Cage top */}
          <path d="M40,40 C40,20 160,20 160,40" stroke="#8B4513" strokeWidth="4" fill="none" />
          {/* Cage hook */}
          <path d="M100,20 L100,5" stroke="#8B4513" strokeWidth="3" fill="none" />
          <circle cx="100" cy="5" r="3" fill="#8B4513" />
          {/* Cage bars */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = 40 + i * 20
            return <line key={i} x1={x} y1="40" x2={x} y2="200" stroke="#8B4513" strokeWidth="3" />
          })}
          {/* Cage bottom */}
          <path d="M40,200 C40,220 160,220 160,200" stroke="#8B4513" strokeWidth="4" fill="none" />
          {/* Bird */}
          <ellipse cx="50" cy="50" rx="25" ry="20" fill="#FFD700" />
          <circle cx="75" cy="40" r="12" fill="#FFD700" />
          <circle cx="80" cy="37" r="2" fill="#000" />
          <path d="M85,40 L95,38 L85,43" fill="#FF6B00" />
          <path d="M50,40 Q60,25 40,30 Q50,40 50,40" fill="#FFC700" />
          <path d="M25,50 L10,40 L10,60 Z" fill="#FFC700" />
        </svg>
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: "#92400e",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Free the Bird
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#b45309",
          textAlign: "center",
        }}
      >
        Solve brain teasers to free the caged bird!
      </div>
    </div>,
    { ...size },
  )
}
