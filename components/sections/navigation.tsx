import Image from "next/image"
import Link from "next/link"

interface NavigationProps {
  scrolled: boolean
  scrollToSection: (sectionId: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  currentTime: Date
}

export default function Navigation({
  scrolled,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentTime,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Image
              src="/images/skin-logo-red-silhouette.png"
              alt="Skin Cabaret"
              width={40}
              height={40}
              className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            />
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-red-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-white hover:text-red-400 transition-colors"
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection("bachelor")}
                className="text-white hover:text-red-400 transition-colors"
              >
                Bachelor Parties
              </button>
              <button
                onClick={() => scrollToSection("vip")}
                className="text-white hover:text-red-400 transition-colors"
              >
                VIP & Heritage
              </button>
              <button
                onClick={() => scrollToSection("hiring")}
                className="text-white hover:text-red-400 transition-colors"
              >
                Careers
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-red-400 transition-colors"
              >
                Contact
              </button>
              <Link href="/demos" className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold">
                Demos
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="text-white/80 text-sm">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                scrollToSection("home")
                setMobileMenuOpen(false)
              }}
              className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection("events")
                setMobileMenuOpen(false)
              }}
              className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              Events
            </button>
            <button
              onClick={() => {
                scrollToSection("bachelor")
                setMobileMenuOpen(false)
              }}
              className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              Bachelor Parties
            </button>
            <button
              onClick={() => {
                scrollToSection("vip")
                setMobileMenuOpen(false)
              }}
              className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              VIP & Heritage
            </button>
            <button
              onClick={() => {
                scrollToSection("hiring")
                setMobileMenuOpen(false)
              }}
              className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              Careers
            </button>
            <button
              onClick={() => {
                scrollToSection("contact")
                setMobileMenuOpen(false)
              }}
              className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </button>
            <Link
              href="/demos"
              className="text-yellow-400 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium font-semibold"
            >
              Demos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
