import Image from "next/image"

interface HeroSectionProps {
  setShowReservationPopup: (show: boolean) => void
  setAgeVerificationOpen: (open: boolean) => void
}

export default function HeroSection({ setShowReservationPopup, setAgeVerificationOpen }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bdsm-red-lighting.jpeg"
          alt="Skin Cabaret Hero"
          fill
          className="object-cover md:object-cover object-contain"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 mt-16 animate-on-scroll animate-delay-200 max-w-4xl mx-auto">
        <div className="animate-pulse-background rounded-lg px-8 py-6 border border-red-500/30 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-4">
            Where Sophistication Meets Seduction
          </h1>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] max-w-2xl mx-auto">
            Experience Scottsdale's most exclusive adult entertainment venue featuring world-class performers, luxury
            VIP experiences, and sophisticated atmosphere.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button
            onClick={() => setShowReservationPopup(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
          >
            SCHEDULE FREE RIDE
          </button>
          <button
            onClick={() => setAgeVerificationOpen(true)}
            className="bg-black/80 hover:bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 border border-red-500/50"
          >
            21+ ONLY • NO ID NO ENTRY
          </button>
        </div>
      </div>
    </section>
  )
}
