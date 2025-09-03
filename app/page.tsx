"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Navigation from "@/components/sections/navigation"
import HeroSection from "@/components/sections/hero-section"
import SpecialEventsSection from "@/components/sections/special-events-section"
import BachelorPartySection from "@/components/sections/bachelor-party-section"
import VipAndHeritageSection from "@/components/sections/vip-and-heritage-section"
import ReviewsSection from "@/components/sections/reviews-section"
import AwardsSection from "@/components/sections/awards-section"
import HiringSection from "@/components/sections/hiring-section"
import FaqSection from "@/components/sections/faq-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/sections/footer"

export default function SkinCabaretSite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [reservationPopup, setReservationPopup] = useState<{
    isOpen: boolean
    type: "bachelor" | "vip" | "table" | "champagne" | "wm" | "football"
  }>({
    isOpen: false,
    type: "bachelor",
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [ageVerificationOpen, setAgeVerificationOpen] = useState(false)
  const [showReservationPopup, setShowReservationPopup] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const hasVerified = localStorage.getItem("ageVerified")
    if (!hasVerified) {
      setAgeVerificationOpen(true)
    }
  }, [])

  const handleAgeVerification = () => {
    localStorage.setItem("ageVerified", "true")
    setAgeVerificationOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
      setShowBackToTop(scrollPosition > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
          entry.target.classList.remove("animate-on-scroll")
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    console.log("[v0] Attempting to scroll to section:", sectionId)
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log("[v0] Element found, scrolling to:", element)
      try {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      } catch (error) {
        console.log("[v0] Smooth scroll failed, using fallback:", error)
        element.scrollIntoView()
      }
    } else {
      console.log("[v0] Element not found for ID:", sectionId)
    }
  }

  const shareOnSocial = (platform: string, text: string, url: string) => {
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(url)

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case "instagram":
        navigator.clipboard.writeText(`${text} ${url}`)
        alert("Link copied to clipboard! Share on Instagram.")
        return
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        scrolled={scrolled}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentTime={currentTime}
      />

      <div className="relative z-20 pt-20 pb-4 flex justify-center animate-on-scroll">
        <Image
          src="/images/skin-logo-red-silhouette.png"
          alt="Skin Cabaret Logo"
          width={300}
          height={300}
          className="object-contain animate-logo-glow"
          quality={95}
        />
      </div>

      <HeroSection setShowReservationPopup={setShowReservationPopup} setAgeVerificationOpen={setAgeVerificationOpen} />
      <SpecialEventsSection setShowReservationPopup={setShowReservationPopup} />
      <BachelorPartySection setShowReservationPopup={setShowReservationPopup} />
      <VipAndHeritageSection />
      <ReviewsSection />
      <AwardsSection />
      <HiringSection />
      <FaqSection />
      <ContactSection shareOnSocial={shareOnSocial} />
      <Footer />

      {ageVerificationOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-black rounded-lg p-8 max-w-md text-center">
            <Image
              src="/images/skin-logo-red-silhouette.png"
              alt="Skin Cabaret Logo"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-4">21+ ONLY</h2>
            <p className="text-white/80 mb-6">
              You must be 21 years or older to enter this site. Please verify your age to proceed.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleAgeVerification} className="bg-red-600 hover:bg-red-700 text-white">
                I am 21+
              </Button>
              <Button
                onClick={() => (window.location.href = "https://google.com")}
                className="bg-gray-800 hover:bg-gray-900 text-white"
              >
                Exit
              </Button>
            </div>
          </div>
        </div>
      )}

      {showReservationPopup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-black rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">RESERVATION INQUIRY</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                  placeholder="Your Phone"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-white text-sm font-bold mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-white text-sm font-bold mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                  placeholder="Number of Guests"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white text-sm font-bold mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  type="button"
                  onClick={() => setShowReservationPopup(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors z-40"
        >
          ↑
        </button>
      )}
    </div>
  )
}
