"use client"
import { AnimatePresence } from "framer-motion"
import GameHeader from "@/components/game-header"
import IntroScreen from "@/components/screens/intro-screen"
import PlayScreen from "@/components/screens/play-screen"
import CompletedScreen from "@/components/screens/completed-screen"
import BirdCage from "@/components/bird-cage"
import { useGameStore } from "@/lib/game-state"
import Footer from "@/components/footer"

export default function GameContainer() {
  const gameState = useGameStore((state) => state.gameState)
  const correctAnswers = useGameStore((state) => state.correctAnswers)
  const availableQuestions = useGameStore((state) => state.availableQuestions)

  return (
    <div className="game-container flex flex-col min-h-[calc(100vh-2rem)] py-4 sm:py-6 md:py-8">
      <GameHeader />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
        <div className="order-2 md:order-1 compact-game">
          <AnimatePresence mode="wait" initial={false}>
            {gameState === "intro" && <IntroScreen key="intro" />}
            {gameState === "playing" && <PlayScreen key="playing" />}
            {gameState === "completed" && <CompletedScreen key="completed" />}
          </AnimatePresence>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <BirdCage freedomLevel={correctAnswers} maxLevel={availableQuestions.length} gameState={gameState} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
