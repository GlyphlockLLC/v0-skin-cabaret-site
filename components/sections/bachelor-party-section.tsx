import Image from "next/image"

interface BachelorPartySectionProps {
  setShowReservationPopup: (show: boolean) => void
}

export default function BachelorPartySection({ setShowReservationPopup }: BachelorPartySectionProps) {
  return (
    <section id="bachelor" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
          BACHELOR PARTY HEADQUARTERS
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-100">
          Scottsdale's premier destination for unforgettable bachelor party experiences
        </p>

        <div className="mb-16 animate-on-scroll animate-delay-100">
          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 sm:h-80 object-cover"
              poster="/images/bachelor-party-group-formal.jpeg"
            >
              <source src="/videos/join-us-recruitment.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 right-4 bg-black/60 rounded px-2 py-1 backdrop-blur-sm">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={30}
                height={30}
                className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Experience the Ultimate Bachelor Party</h3>
              <p className="text-sm sm:text-base text-white/90">Exclusive entertainment and VIP treatment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-200 w-full max-w-sm">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/men-vip-table-entertainment.jpeg"
                alt="VIP Table Entertainment"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={20}
                  height={20}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-3">VIP TABLE EXPERIENCE</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sophisticated group experiences designed for the groom and his crew. Premium bottle service, exclusive
                seating, and personalized entertainment create the perfect celebration atmosphere.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-300 w-full max-w-sm">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/bachelor-party-floor-experience.jpeg"
                alt="Intimate Entertainment Experience"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={20}
                  height={20}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-3">INTIMATE ENTERTAINMENT</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Exclusive intimate entertainment experiences featuring our most talented performers providing
                personalized attention and unforgettable moments for the bachelor.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-400 w-full max-w-sm">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/bachelor-party-experience.jpeg"
                alt="Premium Bachelor Experience"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={20}
                  height={20}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-3">PREMIUM EXPERIENCE</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mind-blowing experiences with luxury amenities, top-shelf spirits, and exclusive access to our most
                sophisticated entertainment offerings.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-500 w-full max-w-sm">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/bachelor-party-business-text.jpeg"
                alt="Professional Party Planning"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded px-1 py-1 backdrop-blur-sm">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={20}
                  height={20}
                  className="object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-3">PROFESSIONAL PLANNING</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Dedicated event coordinators ensure every detail is perfect. From arrival to departure, we handle all
                arrangements for an unforgettable bachelor party celebration.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 animate-on-scroll animate-delay-600">
          <button
            onClick={() => setShowReservationPopup(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
          >
            BOOK YOUR BACHELOR PARTY
          </button>
        </div>
      </div>
    </section>
  )
}
