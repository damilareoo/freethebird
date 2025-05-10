import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

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
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caged%20bird%201-vDDNMCFUUAoUVAXWwLhHfsE1BFOJEj.png",
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
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caged%20bird%201-vDDNMCFUUAoUVAXWwLhHfsE1BFOJEj.png",
    ],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Force absolute URLs for critical meta tags */}
        <meta
          property="og:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caged%20bird%201-vDDNMCFUUAoUVAXWwLhHfsE1BFOJEj.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caged%20bird%201-vDDNMCFUUAoUVAXWwLhHfsE1BFOJEj.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caged%20bird%201-vDDNMCFUUAoUVAXWwLhHfsE1BFOJEj.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Add canonical link to help with SEO and metadata */}
        <link rel="canonical" href="https://cagedbird.vercel.app" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
