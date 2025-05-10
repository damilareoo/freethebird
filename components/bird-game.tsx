"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import QuizQuestion from "@/components/quiz-question"
import BirdCage from "@/components/bird-cage"
import { expandedQuizData } from "@/lib/expanded-quiz-data"
import confetti from "canvas-confetti"
import TypingText from "@/components/typing-text"

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

    // Slight delay for better UX
    setTimeout(() => {
      setAvailableQuestions(getRandomQuestions())
      setGameState("playing")
      setIsLoading(false)
    }, 300)
  }

  // Update the handleAnswer function to work without confirmation
  const handleAnswer = (isCorrect: boolean) => {
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
        // If all answers are correct, trigger confetti
        if (isCorrect && correctAnswers + 1 === availableQuestions.length) {
          setTimeout(() => {
            // Trigger confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          }, 500)
        }
      }
    }, 1500)
  }

  const handleRestart = () => {
    setIsLoading(true)

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
    <div className="w-full max-w-3xl mx-auto flex-grow flex flex-col">
      <motion.div
        className="text-center mb-3 sm:mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-medium text-freedom-primary mb-1">Free the Bird</h1>
        <p className="text-cage-medium max-w-xl mx-auto text-sm">Solve brain teasers to free the caged bird!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-center flex-grow">
        <div className="order-2 md:order-1">
          <AnimatePresence mode="wait">
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="card-glass p-3 sm:p-4 overflow-hidden">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2 variants={itemVariants} className="text-cage-dark mb-2 text-xl font-medium">
                      <TypingText text="Welcome to the Challenge!" speed={40} />
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mb-4 text-cage-medium">
                      A beautiful bird has been trapped in a cage.
                      <br />
                      Solve three brain teasers correctly to set it free!
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button onClick={handleStartGame} className="btn-accent" disabled={isLoading}>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="card-glass p-3 sm:p-4 overflow-hidden">
                  <div className="mb-2 sm:mb-3">
                    <div className="flex justify-between text-cage-medium mb-0.5 sm:mb-1 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {correctAnswers} of {availableQuestions.length} correct
                      </span>
                    </div>
                    <div className="progress-container">
                      <div
                        className={`progress-bar ${
                          correctAnswers === 0
                            ? "bg-cage-medium"
                            : correctAnswers === availableQuestions.length
                              ? "bg-freedom-secondary"
                              : "bg-freedom-primary"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
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
                            <div className="font-medium">Correct! The bird is one step closer to freedom!</div>
                          ) : (
                            <div className="font-medium">Not quite right, but keep trying!</div>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="card-glass p-3 sm:p-4 text-center overflow-hidden">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2
                      variants={itemVariants}
                      className={`mb-2 text-xl font-medium ${
                        correctAnswers === availableQuestions.length ? "text-freedom-secondary" : "text-cage-dark"
                      }`}
                    >
                      {correctAnswers === availableQuestions.length ? (
                        <TypingText text="Congratulations! The Bird is Free!" speed={30} />
                      ) : (
                        "Challenge Complete!"
                      )}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mb-4 text-cage-medium">
                      {correctAnswers === availableQuestions.length
                        ? "You've successfully solved all the brain teasers and freed the bird!"
                        : `You got ${correctAnswers} out of ${availableQuestions.length} correct. The bird is ${
                            correctAnswers === 0 ? "still trapped" : "partially free"
                          }.`}
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button onClick={handleRestart} className="btn-accent" disabled={isLoading}>
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
