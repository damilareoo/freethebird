import Head from "next/head"

export default function SiteImage() {
  return (
    <Head>
      {/* These meta tags provide fallback for platforms that might not fully support Next.js metadata */}
      <meta property="og:image" content="/caged-bird-social.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:image" content="/caged-bird-social.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
