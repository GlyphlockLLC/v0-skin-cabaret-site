import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HiringSection() {
  return (
    <>
      <div className="mb-16 animate-on-scroll animate-delay-150">
        <div className="text-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-4xl mx-auto rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            poster="/images/recruitment-poster.jpeg"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-rNIZvRIi8EsuVWIjfHu1stPEMTFy6F.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <section id="hiring" className="py-20 bg-gradient-to-b from-black to-red-900/20 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-black text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              BE PART OF THE EXPERIENCE
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              Join Scottsdale's premier adult entertainment destination. We're seeking professional, licensed
              entertainers and experienced hospitality staff.
            </p>
          </div>

          {/* Staff Positions */}
          <div className="mb-16 animate-on-scroll animate-delay-200">
            <h3 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
              ENTERTAINER POSITIONS
            </h3>
            <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 p-8 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    Requirements
                  </h4>
                  <ul className="text-white space-y-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                    <li>• Must be 21+ with valid government-issued ID</li>
                    <li>• Arizona adult entertainment license required</li>
                    <li>• Professional dance or performance experience preferred</li>
                    <li>• Excellent physical fitness and flexibility</li>
                    <li>• Reliable transportation and flexible schedule</li>
                    <li>• Professional attitude and appearance standards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    What We Offer
                  </h4>
                  <ul className="text-white space-y-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                    <li>• Competitive compensation and tips</li>
                    <li>• Flexible scheduling options</li>
                    <li>• Professional, safe working environment</li>
                    <li>• Ongoing training and development</li>
                    <li>• Health and wellness support</li>
                    <li>• Career advancement opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Positions */}
          <div className="mb-16 animate-on-scroll animate-delay-200">
            <h3 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
              STAFF POSITIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 p-6 rounded-lg text-center">
                <div className="relative mb-4">
                  <Image
                    src="/images/vip-brunette-bar.jpeg"
                    alt="Female Bartender Position"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover w-full h-32"
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
                <h4 className="text-lg font-bold text-white mb-2">FEMALE BARTENDERS</h4>
                <p className="text-white/80 text-sm">Professional female bartenders for VIP service</p>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 p-6 rounded-lg text-center">
                <div className="relative mb-4">
                  <Image
                    src="/images/staff-hostess-red.jpeg"
                    alt="Hostess Position"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover w-full h-32"
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
                <h4 className="text-lg font-bold text-white mb-2">HOSTESS</h4>
                <p className="text-white/80 text-sm">VIP guest relations and premium customer service</p>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 p-6 rounded-lg text-center">
                <div className="relative mb-4">
                  <Image
                    src="/images/staff-cocktail-server.jpeg"
                    alt="Cocktail Server Position"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover w-full h-32"
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
                <h4 className="text-lg font-bold text-white mb-2">COCKTAIL SERVERS</h4>
                <p className="text-white/80 text-sm">High-energy service staff for floor and VIP areas</p>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 p-6 rounded-lg text-center">
                <div className="relative mb-4">
                  <Image
                    src="/images/staff-security-guard.jpeg"
                    alt="Security Position"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover w-full h-32"
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
                <h4 className="text-lg font-bold text-white mb-2">SECURITY</h4>
                <p className="text-white/80 text-sm">Professional security personnel with hospitality focus</p>
              </div>
            </div>
          </div>

          <div className="text-center animate-on-scroll animate-delay-300">
            <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                Ready to Join Our Team?
              </h3>
              <p className="text-white mb-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                Submit your application today and become part of Scottsdale's premier adult entertainment experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3">
                  <a href="mailto:careers@skincabaret.com" className="text-white">
                    Apply Now
                  </a>
                </Button>
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3">
                  <a href="tel:+14804257546" className="text-white">
                    Call (480) 425-7546
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
