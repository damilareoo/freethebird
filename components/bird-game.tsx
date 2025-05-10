"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import QuizQuestion from "@/components/quiz-question"
import BirdCage from "@/components/bird-cage"
import { expandedQuizData } from "@/lib/expanded-quiz-data"
import { playSound } from "@/lib/sound-effects"
import confetti from "canvas-confetti"

export default function BirdGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "completed">("intro")
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | null>(null)
  const [availableQuestions, setAvailableQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const progress = (correctAnswers / (availableQuestions.length || 1)) * 100

  // Initialize available questions on first render
  useEffect(() => {
    setAvailableQuestions([...expandedQuizData])
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
    setIsLoading(true)
    playSound("BUTTON_CLICK")

    // Slight delay for better UX
    setTimeout(() => {
      setAvailableQuestions(getRandomQuestions())
      setGameState("playing")
      setIsLoading(false)
    }, 300)
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
        // If all answers are correct, play the bird freed sound and trigger confetti
        if (isCorrect && correctAnswers + 1 === availableQuestions.length) {
          setTimeout(() => {
            playSound("BIRD_FREED")
            // Trigger confetti
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 },
              colors: ["#FFD700", "#FF8C00", "#32CD32", "#87CEEB", "#9370DB"],
            })
          }, 500)
        }
      }
    }, 1500)
  }

  const handleRestart = () => {
    setIsLoading(true)
    playSound("BUTTON_CLICK")

    // Slight delay for better UX
    setTimeout(() => {
      setAvailableQuestions(getRandomQuestions())
      setGameState("intro")
      setCurrentQuizIndex(0)
      setCorrectAnswers(0)
      setIsLoading(false)
    }, 300)
  }

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="game-container">
      <motion.div
        className="text-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-2 sm:mb-3 text-shadow-lg">
          Free the Bird
        </h1>
        <p className="text-indigo-700 text-base sm:text-lg max-w-xl mx-auto">
          Solve brain teasers to free the caged bird!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
        <div className="order-2 md:order-1">
          <AnimatePresence mode="wait">
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="game-card overflow-hidden">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2
                      variants={itemVariants}
                      className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4 sm:mb-6"
                    >
                      Welcome to the Challenge!
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mb-6 sm:mb-8 text-indigo-600 text-base sm:text-lg">
                      A beautiful bird has been trapped in a cage.
                      <br />
                      Solve three brain teasers correctly to set it free!
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button
                        onClick={handleStartGame}
                        className="btn-primary text-base sm:text-lg px-8 py-3"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                            Preparing...
                          </span>
                        ) : (
                          "Begin Adventure"
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="game-card overflow-hidden">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm text-indigo-600 mb-2">
                      <span>Progress</span>
                      <span className="font-medium">
                        {correctAnswers} of {availableQuestions.length} correct
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2 bg-indigo-100"
                      indicatorClassName={`${
                        correctAnswers === 0
                          ? "bg-indigo-400"
                          : correctAnswers === availableQuestions.length
                            ? "bg-gradient-to-r from-teal-400 to-teal-500"
                            : "bg-gradient-to-r from-indigo-500 to-sky-500"
                      }`}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {!showFeedback ? (
                      <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        <QuizQuestion question={availableQuestions[currentQuizIndex]} onAnswer={handleAnswer} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`feedback-message ${feedbackType === "correct" ? "correct" : "incorrect"}`}>
                          {feedbackType === "correct" ? (
                            <div className="font-bold text-xl text-green-600">
                              Correct! The bird is one step closer to freedom!
                            </div>
                          ) : (
                            <div className="font-bold text-xl text-red-500">Not quite right, but keep trying!</div>
                          )}
                        </div>
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
                transition={{ duration: 0.5 }}
              >
                <Card className="game-card text-center overflow-hidden">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2
                      variants={itemVariants}
                      className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
                        correctAnswers === availableQuestions.length ? "text-teal-600" : "text-indigo-700"
                      }`}
                    >
                      {correctAnswers === availableQuestions.length
                        ? "Congratulations! The Bird is Free!"
                        : "Challenge Complete!"}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mb-6 sm:mb-8 text-indigo-600 text-base sm:text-lg">
                      {correctAnswers === availableQuestions.length
                        ? "You've successfully solved all the brain teasers and freed the bird!"
                        : `You got ${correctAnswers} out of ${availableQuestions.length} correct. The bird is ${
                            correctAnswers === 0 ? "still trapped" : "partially free"
                          }.`}
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button
                        onClick={handleRestart}
                        className={`${
                          correctAnswers === availableQuestions.length ? "btn-secondary" : "btn-primary"
                        } text-base sm:text-lg px-8 py-3`}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  </motion.div>
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
