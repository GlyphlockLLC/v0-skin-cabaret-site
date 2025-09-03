import { Users, Phone, Mail, Instagram, Facebook, Twitter, Share2, ExternalLink } from "lucide-react"

interface ContactSectionProps {
  shareOnSocial: (platform: string, text: string, url: string) => void
}

export default function ContactSection({ shareOnSocial }: ContactSectionProps) {
  return (
    <>
      <section id="contact" className="py-20 bg-gradient-to-b from-black via-red-900/10 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-on-scroll">
            CONTACT & LOCATION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-8 rounded-lg animate-on-scroll animate-delay-100">
              <h3 className="text-2xl font-bold text-white mb-4">Visit Us</h3>
              <div className="text-white/90 space-y-2">
                <p className="text-lg font-semibold">Skin Cabaret</p>
                <p>1137 N Scottsdale Rd.</p>
                <p>Scottsdale, AZ 85251</p>
                <p className="mt-4 text-red-400">Open 7 Days a Week</p>
                <p className="text-white/80">Mon-Sun: 8:00 PM - 6:00 AM</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-8 rounded-lg animate-on-scroll animate-delay-200">
              <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
              <div className="text-white/90 space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <a href="tel:4804257546" className="text-lg hover:text-red-400 transition-colors">
                    (480) 425-7546
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5 text-red-400" />
                  <a href="mailto:info@skincabaret.com" className="hover:text-red-400 transition-colors">
                    info@skincabaret.com
                  </a>
                </div>
                <p className="text-white/80 mt-4">Call ahead for VIP reservations and bachelor party packages</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 rounded-lg p-8 animate-on-scroll animate-delay-300">
            <h3 className="text-2xl font-bold text-white mb-6">Follow & Share</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://instagram.com/skincabaret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://facebook.com/skincabaret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com/skincabaret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(75,85,99,0.5)]"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-white/70 text-sm mt-4">
                  Stay updated with exclusive events, performer spotlights, and VIP offers
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Share Your Experience</h4>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() =>
                      shareOnSocial(
                        "facebook",
                        "Amazing night at Skin Cabaret - Scottsdale's premier adult entertainment!",
                        "https://skincabaret.com",
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() =>
                      shareOnSocial(
                        "twitter",
                        "Incredible VIP experience at @SkinCabaret! #ScottsdaleNightlife #VIPExperience",
                        "https://skincabaret.com",
                      )
                    }
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Tweet
                  </button>
                  <button
                    onClick={() =>
                      shareOnSocial(
                        "instagram",
                        "Check out Skin Cabaret - Scottsdale's most sophisticated entertainment venue!",
                        "https://skincabaret.com",
                      )
                    }
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
                <p className="text-white/70 text-sm mt-4">Share your VIP experience and tag us for exclusive perks</p>
              </div>
            </div>

            {/* Instagram Feed Placeholder */}
            <div className="mt-8 pt-8 border-t border-red-600/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                Latest from Instagram
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square bg-gradient-to-br from-red-900/30 to-black border border-red-500/30 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Instagram className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">Follow us for exclusive content</p>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-red-900/30 to-black border border-red-500/30 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Share2 className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">Behind the scenes</p>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-red-900/30 to-black border border-red-500/30 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">VIP experiences</p>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-red-900/30 to-black border border-red-500/30 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">Special events</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <a
                  href="https://instagram.com/skincabaret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  View All Posts
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
