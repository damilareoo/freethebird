"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import QuizQuestion from "@/components/quiz-question"
import { useGameStore } from "@/lib/game-state"

export default function PlayScreen() {
  const { availableQuestions, currentQuizIndex, correctAnswers, showFeedback, feedbackType, progress } = useGameStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="game-screen"
    >
      <Card className="game-card overflow-hidden">
        <div className="game-card-content">
          <div className="mb-5 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-indigo-600 mb-2">
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
            <AnimatePresence mode="wait">
              {!showFeedback ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <QuizQuestion question={availableQuestions[currentQuizIndex]} />
                </motion.div>
              ) : (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex items-center"
                >
                  <div className={`feedback-message w-full ${feedbackType === "correct" ? "correct" : "incorrect"}`}>
                    {feedbackType === "correct" ? (
                      <div className="font-bold text-lg sm:text-xl text-green-600">
                        Correct! The bird is one step closer to freedom!
                      </div>
                    ) : (
                      <div className="font-bold text-lg sm:text-xl text-red-500">Not quite right, but keep trying!</div>
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
