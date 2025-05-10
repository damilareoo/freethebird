import GameContainer from "@/components/game-container"
import Footer from "@/components/footer"
import BackgroundElements from "@/components/background-elements"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-4 sm:py-6 md:py-8 relative overflow-hidden">
      {/* Background elements */}
      <BackgroundElements />

      {/* Main content */}
      <div className="flex-1 flex items-center w-full">
        <GameContainer />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
