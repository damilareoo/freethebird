"use client"

import { useEffect, useState } from "react"
import { setupAudio, unlockAudioContext } from "@/lib/sound-effects"

export default function AudioInitializer() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Setup audio on component mount
    setupAudio()

    // Mark as initialized
    setInitialized(true)

    // Add a click event listener to the document to enable audio
    const enableAudio = () => {
      unlockAudioContext()
      document.removeEventListener("click", enableAudio)
    }

    document.addEventListener("click", enableAudio)

    return () => {
      document.removeEventListener("click", enableAudio)
    }
  }, [])

  // This component doesn't render anything visible
  return null
}
