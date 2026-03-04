import BirdGame from "@/components/bird-game"
import Footer from "@/components/footer"
import AudioPreloader from "@/components/audio-preloader"
import SiteImage from "@/components/site-image"

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 relative">
      <AudioPreloader />
      <SiteImage />
      <BirdGame />
      <Footer />
    </main>
  )
}
