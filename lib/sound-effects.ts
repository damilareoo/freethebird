"use client"

// Default sound effect URLs
const SOUNDS = {
  BUTTON_CLICK: "/sounds/button-click.wav",
  CORRECT_ANSWER: "/sounds/correct-answer.wav",
  WRONG_ANSWER: "/sounds/wrong-answer.wav",
  BIRD_FREED: "/sounds/bird-freed.wav",
}

// Add support for environment variables if available
if (typeof window !== "undefined") {
  // Override with environment variables if available
  if (process.env.NEXT_PUBLIC_SOUND_BUTTON_CLICK) {
    SOUNDS.BUTTON_CLICK = process.env.NEXT_PUBLIC_SOUND_BUTTON_CLICK
  }
  if (process.env.NEXT_PUBLIC_SOUND_CORRECT_ANSWER) {
    SOUNDS.CORRECT_ANSWER = process.env.NEXT_PUBLIC_SOUND_CORRECT_ANSWER
  }
  if (process.env.NEXT_PUBLIC_SOUND_WRONG_ANSWER) {
    SOUNDS.WRONG_ANSWER = process.env.NEXT_PUBLIC_SOUND_WRONG_ANSWER
  }
  if (process.env.NEXT_PUBLIC_SOUND_BIRD_FREED) {
    SOUNDS.BIRD_FREED = process.env.NEXT_PUBLIC_SOUND_BIRD_FREED
  }
}

// Cache audio objects to prevent recreating them
const audioCache: Record<string, HTMLAudioElement> = {}

// Function to play a sound
export function playSound(soundName: keyof typeof SOUNDS) {
  // Only run on client
  if (typeof window === "undefined") return

  try {
    // Create or get cached audio
    if (!audioCache[soundName]) {
      audioCache[soundName] = new Audio(SOUNDS[soundName])
      // Set volume
      audioCache[soundName].volume = 0.5
    }

    // Reset and play
    const audio = audioCache[soundName]
    audio.currentTime = 0
    audio.play().catch((err) => {
      // Silently fail - this prevents console errors if user hasn't interacted with page yet
      console.log(`Sound playback failed: ${err.message}`)
    })
  } catch (error) {
    // Fail silently
    console.log("Error playing sound", error)
  }
}

// Preload sounds for better performance
export function preloadSounds() {
  if (typeof window === "undefined") return

  Object.keys(SOUNDS).forEach((key) => {
    const soundName = key as keyof typeof SOUNDS
    try {
      const audio = new Audio()
      audio.preload = "auto"
      audio.src = SOUNDS[soundName]
      audioCache[soundName] = audio
    } catch (error) {
      console.log(`Error preloading sound ${soundName}:`, error)
    }
  })
}

// Add a function to check if audio is enabled in the browser
export function isAudioEnabled(): boolean {
  return typeof window !== "undefined" && typeof Audio !== "undefined"
}
