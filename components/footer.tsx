"use client"

import Link from "next/link"
import { motion } from "framer-motion"

function SpotifyLogo({ size = 16 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    </div>
  )
}

export default function Footer() {
  return (
    <motion.footer
      className="w-full max-w-3xl mx-auto py-3 text-center text-cage-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="flex items-center justify-center gap-2 text-xs">
        <span>Built with love, pain and music by</span>
        <Link
          href="https://x.com/damilare_oo"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-freedom-primary hover:text-freedom-primary/90 transition-all hover:-translate-y-0.5"
        >
          Damilare
        </Link>
        <Link
          href="https://open.spotify.com/track/2GnE8rMDgfWBwGmwrUbCsQ?si=2b324574a4274089"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-600 transition-all hover:-translate-y-0.5"
          aria-label="Listen on Spotify"
        >
          <SpotifyLogo />
        </Link>
      </div>
    </motion.footer>
  )
}
