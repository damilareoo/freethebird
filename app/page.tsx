import BirdGame from "@/components/bird-game"
import Footer from "@/components/footer"
import AudioPreloader from "@/components/audio-preloader"
import SiteImage from "@/components/site-image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <AudioPreloader />
      <SiteImage />
      <BirdGame />
      <Footer />
    </main>
  )
}

