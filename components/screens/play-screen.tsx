"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import QuizQuestion from "@/components/quiz-question"
import { useGameStore } from "@/lib/game-state"

export default function PlayScreen() {
  const { availableQuestions, currentQuizIndex, correctAnswers, showFeedback, feedbackType, progress } = useGameStore()

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

  const feedbackVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="game-screen">
      <Card className="game-card overflow-hidden">
        <div className="game-card-content">
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between text-xs text-indigo-600 mb-1 sm:mb-2">
              <span>Progress</span>
              <span className="font-medium">
                {correctAnswers} of {availableQuestions.length} correct
              </span>
            </div>
            <Progress
              value={progress}
              className="h-1.5 bg-indigo-100"
              indicatorClassName={`${
                correctAnswers === 0
                  ? "bg-indigo-400"
                  : correctAnswers === availableQuestions.length
                    ? "bg-gradient-to-r from-teal-400 to-teal-500"
                    : "bg-gradient-to-r from-indigo-500 to-sky-500"
              }`}
            />
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
              {!showFeedback ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="h-full"
                >
                  <QuizQuestion question={availableQuestions[currentQuizIndex]} />
                </motion.div>
              ) : (
                <motion.div
                  key="feedback"
                  variants={feedbackVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full flex items-center"
                >
                  <div
                    className={`feedback-message w-full ${feedbackType === "correct" ? "correct" : "incorrect"}`}
                    style={{
                      boxShadow:
                        feedbackType === "correct"
                          ? "0 0 15px rgba(34, 197, 94, 0.2)"
                          : "0 0 15px rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    {feedbackType === "correct" ? (
                      <div className="font-bold text-base sm:text-lg text-green-600">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                        >
                          Correct! The bird is one step closer to freedom!
                        </motion.div>
                      </div>
                    ) : (
                      <div className="font-bold text-base sm:text-lg text-red-500">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                        >
                          Not quite right, but keep trying!
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
