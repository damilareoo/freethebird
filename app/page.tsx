import GameContainer from "@/components/game-container"
import BackgroundElements from "@/components/background-elements"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <BackgroundElements />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center w-full">
        <GameContainer />
      </div>
    </main>
  )
}
