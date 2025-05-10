import BirdGame from "@/components/bird-game"
import Footer from "@/components/footer"
import SiteImage from "@/components/site-image"
import FloatingElements from "@/components/floating-elements"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 sm:py-8 sm:px-6 relative overflow-hidden">
      {/* Background gradient - matching the image */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-light to-sky-medium -z-10" />

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-freedom-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-freedom-secondary/5 rounded-full blur-3xl" />
      </div>

      <FloatingElements />
      <SiteImage />
      <BirdGame />
      <Footer />
    </main>
  )
}
