import { create } from "zustand"
import { expandedQuizData } from "./expanded-quiz-data"
import type { QuizQuestion } from "./quiz-data"

// Game difficulty levels
export type Difficulty = "easy" | "medium" | "hard"

// Game states
export type GameState = "intro" | "playing" | "completed"

// Interface for the game store
interface GameStore {
  // Game state
  gameState: GameState
  setGameState: (state: GameState) => void

  // Questions
  availableQuestions: QuizQuestion[]
  currentQuizIndex: number
  correctAnswers: number

  // UI state
  showFeedback: boolean
  feedbackType: "correct" | "incorrect" | null
  isLoading: boolean

  // Game actions
  startGame: () => void
  answerQuestion: (isCorrect: boolean) => void
  restartGame: () => void

  // Game settings
  difficulty: Difficulty
  setDifficulty: (difficulty: Difficulty) => void

  // Derived values
  progress: number
  isComplete: boolean
  allCorrect: boolean
}

// Create the game store
export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: "intro",
  availableQuestions: [],
  currentQuizIndex: 0,
  correctAnswers: 0,
  showFeedback: false,
  feedbackType: null,
  isLoading: false,
  difficulty: "medium",

  // Setters
  setGameState: (state) => set({ gameState: state }),
  setDifficulty: (difficulty) => set({ difficulty }),

  // Game actions
  startGame: () => {
    set({ isLoading: true })

    // Get random questions based on difficulty
    const questions = getRandomQuestions(get().difficulty)

    // Short delay for better UX
    setTimeout(() => {
      set({
        gameState: "playing",
        availableQuestions: questions,
        currentQuizIndex: 0,
        correctAnswers: 0,
        isLoading: false,
      })
    }, 300)
  },

  answerQuestion: (isCorrect) => {
    set({
      showFeedback: true,
      feedbackType: isCorrect ? "correct" : "incorrect",
    })

    if (isCorrect) {
      set((state) => ({ correctAnswers: state.correctAnswers + 1 }))
    }

    // Show feedback for a moment
    setTimeout(() => {
      const state = get()
      const isLastQuestion = state.currentQuizIndex === state.availableQuestions.length - 1

      if (isLastQuestion) {
        set({
          gameState: "completed",
          showFeedback: false,
        })
      } else {
        set((state) => ({
          currentQuizIndex: state.currentQuizIndex + 1,
          showFeedback: false,
        }))
      }
    }, 1200)
  },

  restartGame: () => {
    set({ isLoading: true })

    setTimeout(() => {
      set({
        gameState: "intro",
        currentQuizIndex: 0,
        correctAnswers: 0,
        isLoading: false,
      })
    }, 300)
  },

  // Derived values
  get progress() {
    const { correctAnswers, availableQuestions } = get()
    return (correctAnswers / (availableQuestions.length || 1)) * 100
  },

  get isComplete() {
    return get().gameState === "completed"
  },

  get allCorrect() {
    const { correctAnswers, availableQuestions } = get()
    return correctAnswers === availableQuestions.length && availableQuestions.length > 0
  },
}))

// Helper function to get random questions based on difficulty
function getRandomQuestions(difficulty: Difficulty): QuizQuestion[] {
  // Create a copy of all questions
  const allQuestions = [...expandedQuizData]
  const selectedQuestions = []

  // Number of questions based on difficulty
  const questionCount = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5

  // Select random questions
  for (let i = 0; i < questionCount; i++) {
    if (allQuestions.length === 0) break

    const randomIndex = Math.floor(Math.random() * allQuestions.length)
    selectedQuestions.push(allQuestions[randomIndex])
    allQuestions.splice(randomIndex, 1)
  }

  return selectedQuestions
}
