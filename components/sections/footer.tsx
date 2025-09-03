import Image from "next/image"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-600/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <div>
                <div className="text-white font-bold text-lg">SKIN CABARET</div>
                <div className="text-white/60 text-sm">Scottsdale's Premier Adult Entertainment</div>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              For over 15 years, Skin Cabaret has been Scottsdale's premier destination for sophisticated adult
              entertainment. We are committed to providing a safe, professional, and luxurious environment for our
              guests and performers.
            </p>
            <div className="text-white/60 text-sm">
              <p className="mb-1">21+ Only • Valid ID Required</p>
              <p>Dress Code Enforced</p>
            </div>

            <div className="mt-6">
              <h5 className="text-white font-semibold mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/skincabaret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/skincabaret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/skincabaret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gray-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Contact</h5>
            <div className="text-white/70 text-sm space-y-2">
              <p>1137 N Scottsdale Rd.</p>
              <p>Scottsdale, AZ 85257</p>
              <p>Phone: (480) 946-7546</p>
              <p>Email: info@skincabaret.com</p>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Hours & Info</h5>
            <div className="text-white/70 text-sm space-y-2">
              <p>Daily: 8:00 PM - 6:00 AM</p>
              <p className="pt-2 border-t border-white/10">
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </p>
              <p>
                <a href="/careers" className="hover:text-white transition-colors">
                  Careers
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
            <div className="mb-2 md:mb-0">© 2025-2026 Skin Cabaret. All rights reserved.</div>
            <div className="text-white/40">
              Website design by <span className="text-white/60">Glyphlock LLC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
