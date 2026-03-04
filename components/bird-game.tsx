"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizQuestion from "@/components/quiz-question"
import BirdCage from "@/components/bird-cage"
import { expandedQuizData } from "@/lib/expanded-quiz-data"
import { playSound, preloadSounds } from "@/lib/sound-effects"

// Celebration burst — 28 particles centered over the entire game area
const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2
  const dist  = 80 + (i % 4) * 28
  return {
    x:     Math.cos(angle) * dist,
    y:     Math.sin(angle) * dist - 40,
    delay: (i % 7) * 0.055,
    size:  1.5 + (i % 3),
  }
})

export default function BirdGame() {
  const [gameState, setGameState]               = useState<"intro" | "playing" | "completed">("intro")
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers]     = useState(0)
  const [showFeedback, setShowFeedback]         = useState(false)
  const [feedbackType, setFeedbackType]         = useState<"correct" | "incorrect" | null>(null)
  const [availableQuestions, setAvailableQuestions] = useState<any[]>([])
  const [showParticles, setShowParticles]       = useState(false)

  useEffect(() => { setAvailableQuestions([...expandedQuizData]) }, [])
  useEffect(() => { preloadSounds() }, [])

  const getRandomQuestions = useCallback(() => {
    const pool = [...expandedQuizData]
    const out: typeof pool = []
    for (let i = 0; i < 3; i++) {
      if (!pool.length) break
      const idx = Math.floor(Math.random() * pool.length)
      out.push(pool.splice(idx, 1)[0])
    }
    return out
  }, [])

  const handleStartGame = () => {
    playSound("BUTTON_CLICK")
    setAvailableQuestions(getRandomQuestions())
    setGameState("playing")
  }

  const handleAnswer = (isCorrect: boolean) => {
    playSound(isCorrect ? "CORRECT_ANSWER" : "WRONG_ANSWER")
    setFeedbackType(isCorrect ? "correct" : "incorrect")
    setShowFeedback(true)
    const nextCorrect = isCorrect ? correctAnswers + 1 : correctAnswers
    if (isCorrect) setCorrectAnswers(nextCorrect)

    setTimeout(() => {
      setShowFeedback(false)
      const nextIdx = currentQuizIndex + 1
      setCurrentQuizIndex(nextIdx)

      if (currentQuizIndex === availableQuestions.length - 1) {
        setGameState("completed")
        if (nextCorrect === availableQuestions.length) {
          setTimeout(() => {
            playSound("BIRD_FREED")
            setShowParticles(true)
            setTimeout(() => setShowParticles(false), 2200)
          }, 500)
        }
      }
    }, 1700)
  }

  const handleRestart = () => {
    playSound("BUTTON_CLICK")
    setAvailableQuestions(getRandomQuestions())
    setGameState("intro")
    setCurrentQuizIndex(0)
    setCorrectAnswers(0)
    setShowParticles(false)
  }

  const isBirdFree = gameState === "completed" && correctAnswers === availableQuestions.length

  return (
    <div className="w-full max-w-4xl mx-auto relative">

      {/* Celebration particles — centered over the full game area (cage + panel) */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-10">
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? "bg-primary" : "bg-accent"}`}
              style={{ width: `${p.size * 3}px`, height: `${p.size * 3}px` }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.1 }}
              transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* ── Title ── */}
      <motion.div
        className="text-center md:text-left mb-10 sm:mb-12 md:mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1
          className="font-fraunces text-5xl sm:text-6xl md:text-7xl font-black leading-[0.92] mb-3 text-balance italic"
          style={{ fontVariationSettings: '"opsz" 72, "SOFT" 20, "WONK" 0' }}
        >
          <span className="text-foreground">Free </span>
          <span className="text-primary">the Bird</span>
        </h1>
        <p className="text-muted-foreground text-xs uppercase">
          Brain Teaser · Puzzle Game
        </p>
      </motion.div>

      {/* ── Main layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 md:items-center">

        {/* Game panel */}
        <div className="order-2 md:order-1 md:min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">

            {/* ── INTRO ── */}
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <h2
                    className="font-fraunces text-2xl sm:text-3xl font-black text-foreground leading-snug text-balance italic"
                    style={{ fontVariationSettings: '"opsz" 36, "SOFT" 20, "WONK" 0' }}
                  >
                    A bird is trapped.<br />Can you set it free?
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xs text-pretty">
                    Three riddles stand between this bird and open sky.
                  </p>
                </div>

                <motion.button
                  onClick={handleStartGame}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground font-semibold px-8 py-2.5 rounded-sm text-sm cursor-pointer"
                >
                  Begin the Challenge
                </motion.button>
              </motion.div>
            )}

            {/* ── PLAYING ── */}
            {gameState === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                {/* Question counter + progress dots */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-fraunces text-4xl font-black text-foreground/25 leading-none tabular-nums italic">
                    {String(currentQuizIndex + 1).padStart(2, "0")}
                    <span className="text-2xl font-bold"> / {availableQuestions.length}</span>
                  </span>
                  <div className="flex gap-2 items-center">
                    {availableQuestions.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`rounded-full ${
                          i < currentQuizIndex
                            ? "size-2 bg-primary"
                            : i === currentQuizIndex
                            ? "size-3 bg-primary"
                            : "size-2 bg-border"
                        }`}
                        animate={i === currentQuizIndex ? { opacity: [1, 0.35, 1] } : {}}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>

                {/* Question card — top accent border signals active state */}
                <div className="bg-card border border-border/50 border-t-2 border-t-primary rounded-sm shadow-md overflow-hidden">
                  <AnimatePresence mode="wait">
                    {!showFeedback ? (
                      <motion.div
                        key={`q-${currentQuizIndex}`}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="p-5 sm:p-7"
                      >
                        <QuizQuestion
                          question={availableQuestions[currentQuizIndex]}
                          onAnswer={handleAnswer}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="feedback"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className={`p-10 sm:p-12 text-center border-l-4 ${
                          feedbackType === "correct"
                            ? "border-primary bg-primary/5"
                            : "border-destructive bg-destructive/5"
                        }`}
                      >
                        {feedbackType === "correct" ? (
                          <>
                            <motion.p
                              className="font-fraunces text-2xl sm:text-3xl font-black text-primary mb-2 italic"
                              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 20' }}
                              initial={{ scale: 0.88, y: 8 }}
                              animate={{ scale: 1, y: 0 }}
                              transition={{ type: "spring", stiffness: 280, damping: 20 }}
                            >
                              Correct.
                            </motion.p>
                            <p className="text-muted-foreground text-sm text-pretty">
                              A bar dissolves. The bird stirs.
                            </p>
                          </>
                        ) : (
                          <>
                            <motion.p
                              className="font-fraunces text-2xl sm:text-3xl font-black text-foreground mb-2 italic"
                              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 20' }}
                              initial={{ scale: 0.88, x: 0 }}
                              animate={{ scale: 1, x: [0, -5, 5, -4, 4, -2, 0] }}
                              transition={{
                                scale: { type: "spring", stiffness: 280, damping: 20 },
                                x:     { duration: 0.38, delay: 0.12, ease: "easeInOut" },
                              }}
                            >
                              Not quite.
                            </motion.p>
                            <p className="text-muted-foreground text-sm text-pretty">
                              The cage holds firm. Keep going.
                            </p>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ── COMPLETED ── */}
            {gameState === "completed" && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="space-y-7"
              >
                <div className="space-y-3">
                  <motion.h2
                    className="font-fraunces text-2xl sm:text-3xl font-black text-foreground leading-snug text-balance italic"
                    style={{ fontVariationSettings: '"opsz" 36, "SOFT" 20' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {isBirdFree ? "The bird is free." : "Challenge complete."}
                  </motion.h2>
                  <motion.p
                    className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm text-pretty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    {isBirdFree
                      ? "Every riddle solved. The cage fell open and the bird soared into the open sky."
                      : `${correctAnswers} of ${availableQuestions.length} answered correctly. ${
                          correctAnswers === 0
                            ? "The bird remains caged — try again?"
                            : "So close. One more attempt."
                        }`
                    }
                  </motion.p>
                </div>

                {isBirdFree && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="flex items-center gap-3 text-primary text-xs font-semibold uppercase"
                  >
                    <span className="w-8 border-t border-primary/50" />
                    Perfect score
                    <span className="w-8 border-t border-primary/50" />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35, ease: "easeOut" }}
                >
                  <motion.button
                    onClick={handleRestart}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground font-semibold px-8 py-2.5 rounded-sm text-sm cursor-pointer"
                  >
                    {isBirdFree ? "Play Again" : "Try Again"}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Cage ── */}
        <div className="order-1 md:order-2 flex items-center justify-center">
          <BirdCage
            freedomLevel={correctAnswers}
            maxLevel={availableQuestions.length}
            gameState={gameState}
          />
        </div>
      </div>
    </div>
  )
}
