"use client"

import { useEffect } from "react"
import { preloadSounds } from "@/lib/sound-effects"

export default function AudioPreloader() {
  useEffect(() => {
    // Preload sounds when the component mounts
    preloadSounds()

    // Add a click event listener to the document to enable audio
    // This helps with browsers that require user interaction before playing audio
    const enableAudio = () => {
      const audio = new Audio()
      audio.play().catch(() => {})
      document.removeEventListener("click", enableAudio)
    }

    document.addEventListener("click", enableAudio)

    return () => {
      document.removeEventListener("click", enableAudio)
    }
  }, [])

  return null // This component doesn't render anything
}

