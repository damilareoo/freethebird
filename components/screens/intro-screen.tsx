"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-state"
import DifficultySelector from "@/components/difficulty-selector"

export default function IntroScreen() {
  const { startGame, isLoading } = useGameStore()

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center game-screen"
    >
      <Card className="game-card overflow-hidden">
        <div className="game-card-content justify-between">
          <div className="space-y-4 sm:space-y-5">
            <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold text-indigo-700">
              Welcome to the Challenge!
            </motion.h2>

            <motion.p variants={itemVariants} className="text-indigo-600 text-sm sm:text-base">
              A beautiful bird has been trapped in a cage.
              <br />
              Solve brain teasers correctly to set it free!
            </motion.p>

            <motion.div variants={itemVariants} className="pt-1 sm:pt-2">
              <DifficultySelector />
            </motion.div>
          </div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="pt-4 sm:pt-5">
            <Button
              onClick={startGame}
              className="btn-game text-sm sm:text-base transition-bounce"
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
                  Preparing...
                </span>
              ) : (
                "Begin Adventure"
              )}
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
