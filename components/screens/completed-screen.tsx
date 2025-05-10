"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-state"
import { useEffect } from "react"

// Make sure confetti is only imported and used on the client side
import dynamic from "next/dynamic"
const confetti = dynamic(() => import("canvas-confetti"), { ssr: false })

export default function CompletedScreen() {
  const { restartGame, isLoading, correctAnswers, availableQuestions, allCorrect } = useGameStore()

  // Trigger confetti if all answers are correct
  useEffect(() => {
    if (allCorrect && typeof window !== "undefined") {
      setTimeout(() => {
        // Check if confetti exists before calling it
        if (typeof confetti === "function") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FF8C00", "#32CD32", "#87CEEB", "#9370DB"],
          })
        }
      }, 300)
    }
  }, [allCorrect])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="game-screen"
    >
      <Card className="game-card text-center overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="game-card-content justify-between"
        >
          <div className="space-y-6">
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`text-2xl sm:text-3xl font-bold mb-2 ${allCorrect ? "text-teal-600" : "text-indigo-700"}`}
            >
              {allCorrect ? "Congratulations! The Bird is Free!" : "Challenge Complete!"}
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-indigo-600 text-base"
            >
              {allCorrect
                ? "You've successfully solved all the brain teasers and freed the bird!"
                : `You got ${correctAnswers} out of ${availableQuestions.length} correct. The bird is ${
                    correctAnswers === 0 ? "still trapped" : "partially free"
                  }.`}
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex justify-center gap-4 pt-6"
          >
            <Button
              onClick={restartGame}
              className={`${allCorrect ? "bg-teal-500 hover:bg-teal-600" : "btn-game"} text-base px-8`}
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

            {allCorrect && (
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
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full"
              >
                Share
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
