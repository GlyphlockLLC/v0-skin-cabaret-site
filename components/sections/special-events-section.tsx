import Image from "next/image"

interface SpecialEventsSectionProps {
  setShowReservationPopup: (show: boolean) => void
}

export default function SpecialEventsSection({ setShowReservationPopup }: SpecialEventsSectionProps) {
  return (
    <section id="events" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
          SPECIAL EVENTS
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-100">
          Exclusive events and premium entertainment experiences
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 animate-on-scroll animate-delay-100 w-full sm:w-auto">
            <div className="relative mb-4 flex justify-center">
              <Image
                src="/images/reserved-table-sign.jpeg"
                alt="Premium Table Service"
                width={280}
                height={180}
                className="rounded-lg object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                quality={95}
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={25}
                  height={25}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="relative group cursor-pointer mx-auto" onClick={() => setShowReservationPopup(true)}>
              <div className="relative w-72 h-44 overflow-hidden mx-auto">
                <Image
                  src="/images/ornate-red-gold-frame.jpeg"
                  alt="Elegant Frame"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                    Premium Table
                    <br />
                    Service
                  </h3>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
              Exclusive table service with our most sophisticated entertainers, featuring personalized attention and
              premium service in our private VIP areas.
            </p>
          </div>

          <div className="text-center space-y-4 animate-on-scroll animate-delay-200 w-full sm:w-auto">
            <div className="relative mb-4 flex justify-center">
              <Image
                src="/images/men-vip-table-entertainment.jpeg"
                alt="VIP Table Entertainment"
                width={280}
                height={180}
                className="rounded-lg object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                quality={95}
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={25}
                  height={25}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="relative group cursor-pointer mx-auto" onClick={() => setShowReservationPopup(true)}>
              <div className="relative w-72 h-44 overflow-hidden mx-auto">
                <Image
                  src="/images/ornate-red-gold-frame.jpeg"
                  alt="Elegant Frame"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                    VIP Table
                    <br />
                    Entertainment
                  </h3>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
              Exclusive VIP table entertainment with premium bottle service and personalized attention from our most
              captivating performers.
            </p>
          </div>

          <div className="text-center space-y-4 animate-on-scroll animate-delay-300 w-full sm:w-auto">
            <div className="relative mb-4 flex justify-center">
              <Image
                src="/images/bdsm-red-lighting-scene.jpeg"
                alt="Exclusive Private Experiences"
                width={280}
                height={180}
                className="rounded-lg object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                quality={95}
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={25}
                  height={25}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="relative group cursor-pointer mx-auto" onClick={() => setShowReservationPopup(true)}>
              <div className="relative w-72 h-44 overflow-hidden mx-auto">
                <Image
                  src="/images/ornate-red-gold-frame.jpeg"
                  alt="Elegant Frame"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                    Private
                    <br />
                    Experiences
                  </h3>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
              Exclusive private experiences with sophisticated entertainment in our most intimate and luxurious
              settings.
            </p>
          </div>

          <div className="text-center space-y-4 animate-on-scroll animate-delay-400 w-full sm:w-auto">
            <div className="relative mb-4 flex justify-center">
              <Image
                src="/images/intimate-blonde-experience.jpeg"
                alt="Intimate VIP Experiences"
                width={280}
                height={180}
                className="rounded-lg object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                quality={95}
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={25}
                  height={25}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="relative group cursor-pointer mx-auto" onClick={() => setShowReservationPopup(true)}>
              <div className="relative w-72 h-44 overflow-hidden mx-auto">
                <Image
                  src="/images/ornate-red-gold-frame.jpeg"
                  alt="Elegant Frame"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <h3 className="text-base font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                    Intimate VIP
                    <br />
                    Experiences
                  </h3>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
              Ultimate intimate VIP experiences featuring exclusive entertainment and personalized attention in our
              most private areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
