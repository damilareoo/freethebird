"use client"

// Define sound types for type safety, but functions do nothing
type SoundName = "BUTTON_CLICK" | "CORRECT_ANSWER" | "WRONG_ANSWER" | "BIRD_FREED"

// Empty implementation that does nothing
export function playSound(name: SoundName): void {
  // No-op function
  return
}

// Empty implementation that does nothing
export function preloadSounds(): void {
  // No-op function
  return
}
