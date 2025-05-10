import Image from "next/image"

export default function SiteImage() {
  return (
    <div className="hidden">
      {/* This image is hidden but ensures the file is included in the build */}
      <Image src="/caged-bird.png" alt="Caged Bird" width={1200} height={630} priority />
    </div>
  )
}

