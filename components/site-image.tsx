import Image from "next/image"
import Link from "next/link"

export default function SiteImage() {
  return (
    <div className="absolute top-4 left-4 z-10">
      <Link href="https://github.com/yourusername/free-the-bird" target="_blank" rel="noopener noreferrer">
        <Image
          src="/github.png"
          alt="GitHub Repository"
          width={32}
          height={32}
          className="opacity-60 hover:opacity-100 transition-opacity"
        />
      </Link>
    </div>
  )
}
