import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

// Load GT America font with correct paths
// The paths should be relative to the public directory, not including "public" in the path
const gtAmerica = localFont({
  src: [
    {
      path: "/fonts/GT-America-Standard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/GT-America-Standard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/GT-America-Standard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gt-america",
})

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
      <body className={`${gtAmerica.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
