"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import QuizQuestion from "@/components/quiz-question"
import BirdCage from "@/components/bird-cage"
import { expandedQuizData } from "@/lib/expanded-quiz-data"
import { playSound, preloadSounds } from "@/lib/sound-effects"

export default function BirdGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "completed">("intro")
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | null>(null)
  const [availableQuestions, setAvailableQuestions] = useState([])

  const progress = (correctAnswers / (availableQuestions.length || 1)) * 100

  // Initialize available questions on first render
  useEffect(() => {
    setAvailableQuestions([...expandedQuizData])
  }, [])

  useEffect(() => {
    preloadSounds()
  }, [])

  // Function to get random questions for each game session
  const getRandomQuestions = useCallback(() => {
    // Create a copy of all questions
    const allQuestions = [...expandedQuizData]
    const selectedQuestions = []

    // Select 3 random questions
    for (let i = 0; i < 3; i++) {
      if (allQuestions.length === 0) break

      const randomIndex = Math.floor(Math.random() * allQuestions.length)
      selectedQuestions.push(allQuestions[randomIndex])
      allQuestions.splice(randomIndex, 1)
    }

    return selectedQuestions
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

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)
      setCurrentQuizIndex((prev) => prev + 1)

      if (currentQuizIndex === availableQuestions.length - 1) {
        setGameState("completed")
        // If all answers are correct, play the bird freed sound
        if (isCorrect && correctAnswers + 1 === availableQuestions.length) {
          setTimeout(() => playSound("BIRD_FREED"), 500)
        }
      }
    }, 1500)
  }

  const handleRestart = () => {
    playSound("BUTTON_CLICK")
    setAvailableQuestions(getRandomQuestions())
    setGameState("intro")
    setCurrentQuizIndex(0)
    setCorrectAnswers(0)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-1 sm:mb-2">Free the Bird</h1>
        <p className="text-amber-700 text-base sm:text-lg">Solve brain teasers to free the caged bird!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
        <div className="order-2 md:order-1">
          <AnimatePresence mode="wait">
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3 sm:mb-4">
                    Welcome to the Challenge!
                  </h2>
                  <p className="mb-4 sm:mb-6 text-amber-700 text-sm sm:text-base">
                    A beautiful bird has been trapped in a cage. Solve three brain teasers correctly to set it free!
                  </p>
                  <Button
                    onClick={handleStartGame}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 sm:px-8 py-1.5 sm:py-2 rounded-full"
                  >
                    Begin Adventure
                  </Button>
                </Card>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-3 sm:p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="mb-3 sm:mb-4">
                    <div className="flex justify-between text-xs sm:text-sm text-amber-700 mb-1">
                      <span>Progress</span>
                      <span>
                        {correctAnswers} of {availableQuestions.length} correct
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-1.5 sm:h-2 bg-amber-200"
                      indicatorClassName="bg-amber-600"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {!showFeedback ? (
                      <motion.div
                        key="question"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <QuizQuestion question={availableQuestions[currentQuizIndex]} onAnswer={handleAnswer} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="feedback"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8"
                      >
                        {feedbackType === "correct" ? (
                          <div className="text-green-600 text-xl font-bold">
                            Correct! The bird is one step closer to freedom!
                          </div>
                        ) : (
                          <div className="text-red-600 text-xl font-bold">Not quite right, but keep trying!</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )}

            {gameState === "completed" && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm shadow-lg text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3 sm:mb-4">
                    {correctAnswers === availableQuestions.length
                      ? "Congratulations! The bird is free!"
                      : "Challenge Complete!"}
                  </h2>
                  <p className="mb-4 sm:mb-6 text-amber-700 text-sm sm:text-base">
                    {correctAnswers === availableQuestions.length
                      ? "You've successfully solved all the brain teasers and freed the bird!"
                      : `You got ${correctAnswers} out of ${availableQuestions.length} correct. The bird is ${correctAnswers === 0 ? "still trapped" : "partially free"}.`}
                  </p>
                  <Button
                    onClick={handleRestart}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 sm:px-8 py-1.5 sm:py-2 rounded-full"
                  >
                    Play Again
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <BirdCage freedomLevel={correctAnswers} maxLevel={availableQuestions.length} gameState={gameState} />
        </div>
      </div>
    </div>
  )
}

