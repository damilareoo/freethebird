"use client"

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

async function ensureRunning(): Promise<AudioContext | null> {
  const ctx = getCtx()
  if (!ctx) return null
  if (ctx.state === "suspended") {
    await ctx.resume()
  }
  return ctx
}

function note(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.25,
  endFreq?: number
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.type = type
  osc.frequency.setValueAtTime(freq, startTime)
  if (endFreq) {
    osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration)
  }

  gain.gain.setValueAtTime(0.001, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

  osc.start(startTime)
  osc.stop(startTime + duration + 0.02)
}

function vibrate(pattern: number | number[]) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(pattern) } catch (_) {}
  }
}

export async function playSound(soundName: string) {
  const ctx = await ensureRunning()
  if (!ctx) return
  const t = ctx.currentTime

  switch (soundName) {
    case "OPTION_SELECT":
      note(ctx, 880, t, 0.05, "sine", 0.1)
      note(ctx, 1100, t + 0.03, 0.07, "sine", 0.07)
      vibrate(6)
      break

    case "BUTTON_CLICK":
      note(ctx, 660, t, 0.04, "square", 0.1)
      note(ctx, 880, t + 0.025, 0.06, "square", 0.07)
      vibrate(10)
      break

    case "CORRECT_ANSWER":
      // C-E-G-C major arpeggio — musical and satisfying
      note(ctx, 523,  t,        0.20, "sine", 0.20)
      note(ctx, 659,  t + 0.10, 0.20, "sine", 0.18)
      note(ctx, 784,  t + 0.20, 0.22, "sine", 0.20)
      note(ctx, 1047, t + 0.32, 0.42, "sine", 0.17)
      vibrate([18, 12, 38])
      break

    case "WRONG_ANSWER":
      note(ctx, 260, t,        0.18, "sawtooth", 0.18, 200)
      note(ctx, 196, t + 0.14, 0.28, "sawtooth", 0.13, 155)
      vibrate([70, 18, 60])
      break

    case "BIRD_FREED": {
      // Triumphant ascending fanfare + held chord
      const fanfare = [392, 523, 659, 784, 1047, 1319]
      fanfare.forEach((freq, i) => {
        note(ctx, freq, t + i * 0.1, 0.48 - i * 0.02, "sine", 0.18)
      })
      note(ctx, 523, t + 0.65, 1.3, "sine", 0.11)
      note(ctx, 659, t + 0.65, 1.3, "sine", 0.09)
      note(ctx, 784, t + 0.65, 1.3, "sine", 0.09)
      vibrate([35, 18, 35, 18, 90])
      break
    }
  }
}

export function preloadSounds() {
  // Warm up the AudioContext early so first interaction has no latency
  if (typeof window !== "undefined") {
    getCtx()
  }
}
