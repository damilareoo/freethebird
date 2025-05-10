"use client"

import Head from "next/head"
import { useEffect, useState } from "react"

export default function SiteImage() {
  const [baseUrl, setBaseUrl] = useState("")

  useEffect(() => {
    // Get the base URL on the client side
    setBaseUrl(window.location.origin)
  }, [])

  return (
    <Head>
      {/* These meta tags provide fallback for platforms that might not fully support Next.js metadata */}
      <meta property="og:image" content={`${baseUrl}/caged-bird-social.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:image" content={`${baseUrl}/caged-bird-social.png`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
