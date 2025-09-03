import Image from "next/image"

export default function VipAndHeritageSection() {
  return (
    <section id="vip" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
          VIP & HERITAGE
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-100">
          Experience the ultimate in luxury and sophistication
        </p>

        {/* Added VIP section cards with proper responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-200">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/pole-dancer-floor-red-lighting.jpeg"
                alt="VIP Sensual Experience"
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
              <h3 className="text-lg font-bold text-white mb-3">VIP SENSUAL EXPERIENCE</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Exclusive intimate experiences with our most sophisticated entertainers, featuring personalized
                attention and premium service in our private VIP areas.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-300">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/vip-blonde-martini.jpeg"
                alt="VIP Martini Service"
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
              <h3 className="text-lg font-bold text-white mb-3">VIP MARTINI SERVICE</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sophisticated martini service with our most elegant entertainers in an atmosphere of refined luxury
                and complete discretion.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-600">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/luxury-black-leather-seating.jpeg"
                alt="VIP Luxury Seating"
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
              <h3 className="text-lg font-bold text-white mb-3">VIP LUXURY SEATING</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Experience ultimate comfort in our luxury leather seating areas with premium bottle service and
                exclusive entertainment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
