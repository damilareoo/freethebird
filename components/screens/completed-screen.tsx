"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-state"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function CompletedScreen() {
  const { restartGame, isLoading, correctAnswers, availableQuestions, allCorrect } = useGameStore()

  // Trigger confetti if all answers are correct
  useEffect(() => {
    if (allCorrect) {
      setTimeout(() => {
        // First burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6, x: 0.3 },
          colors: ["#FFD700", "#FF8C00", "#32CD32"],
        })

        // Second burst (slightly delayed)
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6, x: 0.7 },
            colors: ["#87CEEB", "#9370DB", "#FF8C00"],
          })
        }, 250)
      }, 300)
    }
  }, [allCorrect])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        duration: 0.1,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="game-screen">
      <Card className="game-card text-center overflow-hidden">
        <div className="game-card-content justify-between">
          <div className="space-y-4 sm:space-y-5">
            <motion.h2
              variants={itemVariants}
              className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${allCorrect ? "text-teal-600" : "text-indigo-700"}`}
            >
              {allCorrect ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
                  }}
                >
                  Congratulations! The Bird is Free!
                </motion.span>
              ) : (
                "Challenge Complete!"
              )}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-indigo-600 text-sm sm:text-base">
              {allCorrect
                ? "You've successfully solved all the brain teasers and freed the bird!"
                : `You got ${correctAnswers} out of ${availableQuestions.length} correct. The bird is ${
                    correctAnswers === 0 ? "still trapped" : "partially free"
                  }.`}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center gap-3 pt-4 sm:pt-5">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={restartGame}
                className={`${allCorrect ? "bg-teal-500 hover:bg-teal-600" : "btn-game"} text-sm sm:text-base px-6 transition-bounce`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting...
                  </span>
                ) : (
                  "Play Again"
                )}
              </Button>
            </motion.div>

            {allCorrect && (
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => {
                    // Share results
                    if (navigator.share) {
                      navigator.share({
                        title: "Free the Bird - I freed the bird!",
                        text: "I solved all the brain teasers and freed the bird! Can you do it too?",
                        url: window.location.href,
                      })
                    }
                  }}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full transition-bounce text-sm sm:text-base"
                >
                  Share
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
