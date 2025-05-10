import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Simplified base URL function that doesn't rely on VERCEL_URL
const getBaseUrl = () => {
  // For production deployments on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // For local development or when VERCEL_URL is not available
  return process.env.NEXT_PUBLIC_SITE_URL || "https://cagedbird.vercel.app"
}

export const metadata: Metadata = {
  title: "Free the Bird - A Brain Teaser Game",
  description: "Help free the caged bird by solving brain teasers! A fun and challenging puzzle game.",
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: "Free the Bird - A Brain Teaser Game",
    description: "Help free the caged bird by solving brain teasers! A fun and challenging puzzle game.",
    images: [
      {
        url: "/caged-bird-social.png",
        width: 1200,
        height: 630,
        alt: "Caged Bird Game",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Free the Bird",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free the Bird - A Brain Teaser Game",
    description: "Help free the caged bird by solving brain teasers! A fun and challenging puzzle game.",
    images: ["/caged-bird-social.png"],
    creator: "@damilare_oo",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
