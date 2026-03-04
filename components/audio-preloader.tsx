"use client"

import { useEffect } from "react"
import { preloadSounds } from "@/lib/sound-effects"

export default function AudioPreloader() {
  useEffect(() => {
    // Preload sounds when the component mounts
    preloadSounds()

    // Resume AudioContext on first user gesture (required by browsers)
    const enableAudio = () => {
      const ctx = (window as any).__audioCtx
      if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {})
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }

    document.addEventListener("click", enableAudio)
    document.addEventListener("touchstart", enableAudio)

    return () => {
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }
  }, [])

  return null // This component doesn't render anything
}
