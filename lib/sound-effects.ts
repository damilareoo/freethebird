"use client"

// Define sound types for better type safety
export type SoundName = "BUTTON_CLICK" | "CORRECT_ANSWER" | "WRONG_ANSWER" | "BIRD_FREED"

// Sound effect URLs with multiple formats for better browser compatibility
const SOUNDS: Record<SoundName, string[]> = {
  BUTTON_CLICK: ["/sounds/button-click.mp3", "/sounds/button-click.wav"],
  CORRECT_ANSWER: ["/sounds/correct-answer.mp3", "/sounds/correct-answer.wav"],
  WRONG_ANSWER: ["/sounds/wrong-answer.mp3", "/sounds/wrong-answer.wav"],
  BIRD_FREED: ["/sounds/bird-freed.mp3", "/sounds/bird-freed.wav"],
}

// Add support for environment variables if available
if (typeof window !== "undefined") {
  if (process.env.NEXT_PUBLIC_SOUND_BUTTON_CLICK) {
    SOUNDS.BUTTON_CLICK = [process.env.NEXT_PUBLIC_SOUND_BUTTON_CLICK]
  }
  if (process.env.NEXT_PUBLIC_SOUND_CORRECT_ANSWER) {
    SOUNDS.CORRECT_ANSWER = [process.env.NEXT_PUBLIC_SOUND_CORRECT_ANSWER]
  }
  if (process.env.NEXT_PUBLIC_SOUND_WRONG_ANSWER) {
    SOUNDS.WRONG_ANSWER = [process.env.NEXT_PUBLIC_SOUND_WRONG_ANSWER]
  }
  if (process.env.NEXT_PUBLIC_SOUND_BIRD_FREED) {
    SOUNDS.BIRD_FREED = [process.env.NEXT_PUBLIC_SOUND_BIRD_FREED]
  }
}

// Cache audio objects to prevent recreating them
const audioCache: Record<SoundName, HTMLAudioElement[]> = {
  BUTTON_CLICK: [],
  CORRECT_ANSWER: [],
  WRONG_ANSWER: [],
  BIRD_FREED: [],
}

// Track if audio context is unlocked
let audioContextUnlocked = false

// Create audio context for better control
let audioContext: AudioContext | null = null

// Initialize audio context
const initAudioContext = () => {
  if (typeof window === "undefined") return null

  try {
    if (!audioContext) {
      // @ts-ignore - for older browsers
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContext = new AudioContext()
    }
    return audioContext
  } catch (error) {
    console.log("AudioContext not supported", error)
    return null
  }
}

// Unlock audio context on user interaction
export const unlockAudioContext = () => {
  if (audioContextUnlocked) return true

  const context = initAudioContext()
  if (!context) return false

  // Create and play a silent buffer to unlock the audio context
  const buffer = context.createBuffer(1, 1, 22050)
  const source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start(0)

  audioContextUnlocked = true
  return true
}

// Function to play a sound with improved reliability
export function playSound(soundName: SoundName): void {
  // Only run on client
  if (typeof window === "undefined") return

  // Try to unlock audio context if needed
  unlockAudioContext()

  try {
    // Try to use cached audio first
    if (audioCache[soundName].length > 0) {
      // Find an audio element that's not playing
      const availableAudio = audioCache[soundName].find((audio) => audio.paused || audio.ended)

      if (availableAudio) {
        availableAudio.currentTime = 0
        availableAudio.volume = 0.5
        availableAudio.play().catch((err) => {
          console.log(`Sound playback failed: ${err.message}`)
        })
        return
      }
    }

    // Create a new audio element if none are available
    for (const soundUrl of SOUNDS[soundName]) {
      try {
        const audio = new Audio(soundUrl)
        audio.volume = 0.5

        // Store in cache for future use
        audioCache[soundName].push(audio)

        // Play the sound
        audio.play().catch((err) => {
          console.log(`Sound playback failed: ${err.message}`)
        })

        // Successfully created and played audio, so return
        return
      } catch (err) {
        // Try next format if this one failed
        continue
      }
    }
  } catch (error) {
    // Fail silently
    console.log("Error playing sound", error)
  }
}

// Preload sounds for better performance
export function preloadSounds(): void {
  if (typeof window === "undefined") return

  // Try to unlock audio context
  unlockAudioContext()

  // Preload each sound in each format
  Object.entries(SOUNDS).forEach(([name, urls]) => {
    const soundName = name as SoundName

    urls.forEach((url) => {
      try {
        const audio = new Audio()
        audio.preload = "auto"

        // Add event listener to track when audio is loaded
        audio.addEventListener(
          "canplaythrough",
          () => {
            // Add to cache once loaded
            audioCache[soundName].push(audio)
          },
          { once: true },
        )

        // Set source and begin loading
        audio.src = url

        // Load the audio
        audio.load()
      } catch (error) {
        console.log(`Error preloading sound ${soundName}:`, error)
      }
    })
  })
}

// Setup audio on user interaction
export function setupAudio(): void {
  if (typeof window === "undefined") return

  const handleUserInteraction = () => {
    unlockAudioContext()
    preloadSounds()

    // Remove event listeners after first interaction
    document.removeEventListener("click", handleUserInteraction)
    document.removeEventListener("touchstart", handleUserInteraction)
    document.removeEventListener("keydown", handleUserInteraction)
  }

  // Add event listeners for user interaction
  document.addEventListener("click", handleUserInteraction)
  document.addEventListener("touchstart", handleUserInteraction)
  document.addEventListener("keydown", handleUserInteraction)
}
