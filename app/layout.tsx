import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Dynamically determine the base URL
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://cagedbird.vercel.app"
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
        url: "/opengraph-image.png",
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
    images: ["/twitter-image.png"],
    creator: "@damilare_oo",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
