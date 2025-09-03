"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export default function SkinCabaretSite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [reservationPopup, setReservationPopup] = useState<{
    isOpen: boolean
    type: "bachelor" | "vip" | "table" | "champagne"
  }>({
    isOpen: false,
    type: "bachelor",
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [ageVerificationOpen, setAgeVerificationOpen] = useState(false)
  const [showReservationPopup, setShowReservationPopup] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [reservationType, setReservationType] = useState("")
  const [eventCalendarOpen, setEventCalendarOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventBookingOpen, setEventBookingOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [showBackToTop, setShowBackToTop] = useState(false)

  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Welcome to Skin Cabaret! How can I help you today?" },
  ])
  const [currentMessage, setCurrentMessage] = useState("")

  const openImageGallery = (images: string[], startIndex = 0) => {
    setGalleryImages(images)
    setCurrentImageIndex(startIndex)
    setGalleryOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const bachelorImages = [
    "/images/bachelor-party-group-formal.jpeg",
    "/images/bachelor-party-floor-experience.jpeg",
    "/images/bachelor-party-experience.jpeg",
    "/images/bachelor-party-business-text.jpeg",
    "/images/strip-club-neon-floor.jpeg",
  ]

  const vipImages = [
    "/images/luxury-black-leather-interior.jpeg",
    "/images/vip-blonde-martini.jpeg",
    "/images/curly-hair-red-lingerie.jpeg",
    "/images/vip-brunette-bar.jpeg",
    "/images/vip-neon-sign-broadway.jpeg",
    "/images/skin-choker.jpeg",
    "/images/club-atmosphere.jpeg",
    "/images/vip-booth.jpeg",
    "/images/cabaret-neon.jpeg",
  ]

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

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const openReservation = (type: "bachelor" | "vip" | "table" | "champagne") => {
    setReservationPopup({ isOpen: true, type })
  }

  const openEventCalendar = () => {
    setEventCalendarOpen(true)
  }

  const openEventBooking = (event: any) => {
    setSelectedEvent(event)
    setEventBookingOpen(true)
  }

  const upcomingEvents = [
    {
      id: 1,
      title: "New Year's Eve Gala",
      date: "2025-12-31",
      time: "9:00 PM",
      type: "Special Event",
      price: "$150",
      description: "Ring in the New Year with champagne, premium entertainment, and exclusive VIP packages.",
      image: "/images/silver-champagne-bucket.jpeg",
      capacity: 200,
      booked: 85,
    },
    {
      id: 2,
      title: "Valentine's Day Romance",
      date: "2025-02-14",
      time: "8:00 PM",
      type: "Couples Event",
      price: "$120",
      description: "Sophisticated couples entertainment with romantic atmosphere and premium service.",
      image: "/images/vip-blonde-martini.jpeg",
      capacity: 150,
      booked: 62,
    },
    {
      id: 3,
      title: "March Madness Party",
      date: "2025-03-15",
      time: "7:00 PM",
      type: "Sports Event",
      price: "$80",
      description: "Watch March Madness games on big screens with drink specials and entertainment.",
      image: "/images/nbc-sunday-night-football.jpeg",
      capacity: 300,
      booked: 145,
    },
    {
      id: 4,
      title: "Spring Break Celebration",
      date: "2025-03-22",
      time: "9:00 PM",
      type: "Party Event",
      price: "$100",
      description: "Ultimate spring break party with DJ, special performances, and VIP packages.",
      image: "/images/bachelor-party-celebration.jpeg",
      capacity: 250,
      booked: 98,
    },
  ]

  const scrollToSection = (sectionId: string) => {
    console.log("[v0] Attempting to scroll to section:", sectionId)
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log("[v0] Element found, scrolling to:", element)
      // Try multiple scroll methods for better compatibility
      try {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      } catch (error) {
        console.log("[v0] Smooth scroll failed, using fallback:", error)
        // Fallback for environments that don't support smooth scrolling
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
        // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
        navigator.clipboard.writeText(`${text} ${url}`)
        alert("Link copied to clipboard! Share on Instagram.")
        return
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    setChatMessages((prev) => [...prev, { type: "user", message: currentMessage }])

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = "I'd be happy to help! For specific inquiries, please call us at (480) 425-7546."

      if (currentMessage.toLowerCase().includes("bachelor")) {
        botResponse =
          "Our bachelor party packages include VIP arrival, single file lap dances, interactive entertainment, and DJ services. Would you like to make a reservation?"
      } else if (currentMessage.toLowerCase().includes("vip")) {
        botResponse =
          "We offer exclusive VIP experiences with luxury seating, premium bottle service, and private entertainment. Shall I help you book a VIP table?"
      } else if (currentMessage.toLowerCase().includes("price") || currentMessage.toLowerCase().includes("cost")) {
        botResponse =
          "Pricing varies by package and group size. Please call (480) 425-7546 for current rates and availability."
      } else if (currentMessage.toLowerCase().includes("hours") || currentMessage.toLowerCase().includes("open")) {
        botResponse = "We're open Tuesday-Saturday from 7 PM to 2 AM. Closed Sunday and Monday."
      } else if (
        currentMessage.toLowerCase().includes("location") ||
        currentMessage.toLowerCase().includes("address")
      ) {
        botResponse =
          "We're located in Scottsdale, Arizona. Call (480) 425-7546 for exact directions and parking information."
      }

      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
    }, 1000)

    setCurrentMessage("")
  }

  const quickResponses = ["Bachelor Party Info", "VIP Reservations", "Hours & Location", "Pricing Information"]

  const handleQuickResponse = (response: string) => {
    setCurrentMessage(response)
    handleChatSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
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

      {/* Logo Section - Above Hero */}
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

      {/* Hero Section */}
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

      {/* Special Events Section */}
      <section id="events" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
            SPECIAL EVENTS
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-100">
            Exclusive events and premium entertainment experiences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="text-center space-y-4 animate-on-scroll animate-delay-100">
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

            <div className="text-center space-y-4 animate-on-scroll animate-delay-200">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/red-carpet-entrance.jpeg"
                  alt="VIP Treatment"
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
                      VIP
                      <br />
                      Treatment
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Experience the ultimate VIP treatment with red carpet service, exclusive access, and personalized
                attention from arrival to departure.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-300">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/silver-champagne-bucket.jpeg"
                  alt="Champagne Saturdays"
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
                      Champagne
                      <br />
                      Saturdays
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Celebrate Saturday nights with premium champagne service, featuring top-shelf bottles and elegant
                presentation in our luxury atmosphere.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-400">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/heritage-intimate-artistry.jpeg"
                  alt="Private Experiences"
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
                settings with personalized attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="bachelor" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/30 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
            BACHELOR PARTY EXPERIENCE
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-4xl mx-auto animate-on-scroll animate-delay-100">
            The ultimate bachelor party destination featuring exclusive entertainment, custom DJ experiences, and
            unforgettable group activities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="text-center space-y-4 animate-on-scroll animate-delay-100">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/bachelor-party-business-text.jpeg"
                  alt="VIP Transportation Experience"
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
                      VIP Arrival
                      <br />
                      Experience
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Premium transportation and VIP arrival experience with red carpet treatment and exclusive entrance to
                set the tone for an unforgettable night.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-200">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/bachelor-party-experience.jpeg"
                  alt="Single File Lap Dance Experience"
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
                      Single File
                      <br />
                      Experience
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Exclusive single file lap dance experience where the groom and party enjoy personalized entertainment
                from our most captivating performers in sequence.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-300">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/bachelor-party-floor-experience.jpeg"
                  alt="Interactive Group Activities"
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
                      Interactive
                      <br />
                      Activities
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Hilarious interactive group activities including playful challenges and entertainment games that create
                unforgettable memories for the entire party.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-400">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/men-vip-table-entertainment.jpeg"
                  alt="DJ Entertainment & Groom Spotlight"
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
                      DJ & Groom
                      <br />
                      Spotlight
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Custom DJ entertainment with hilarious commentary and jokes, plus the groom's special spotlight moment
                with fully clothed dancing and celebration.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 rounded-lg p-8 max-w-4xl mx-auto animate-on-scroll animate-delay-500">
            <h3 className="text-2xl font-bold text-white mb-6">Complete Bachelor Party Package</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-lg font-bold text-red-400 mb-3">What's Included:</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• VIP arrival and red carpet treatment</li>
                  <li>• Premium bottle service and reserved seating</li>
                  <li>• Single file lap dance experience</li>
                  <li>• Interactive group entertainment activities</li>
                  <li>• Custom DJ with personalized music and comedy</li>
                  <li>• Groom's special spotlight celebration</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-red-400 mb-3">The Experience:</h4>
                <p className="text-gray-300 leading-relaxed">
                  From the moment you arrive with VIP transportation to the final toast, our bachelor party experience
                  is designed to create legendary memories. Our professional entertainers and DJ work together to ensure
                  every moment is filled with laughter, excitement, and unforgettable entertainment that the groom and
                  entire party will remember forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Events Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
            SPORTS EVENTS
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-100">
            Watch the biggest games with premium entertainment, VIP service, and exclusive viewing experiences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="text-center space-y-4 animate-on-scroll animate-delay-100">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/nbc-sunday-night-football.jpeg"
                  alt="Sunday Night Football"
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
                      Sunday Night
                      <br />
                      Football
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Experience Sunday Night Football with premium seating, VIP service, and exclusive entertainment during
                every game.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-200">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/waste-management-phoenix-open.jpeg"
                  alt="Waste Management Phoenix Open"
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
                      Phoenix Open
                      <br />
                      Weekend
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Join us for the legendary Waste Management Phoenix Open weekend with special events and exclusive
                parties.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-300">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/nba-playoffs.png"
                  alt="NBA Playoffs"
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
                      NBA
                      <br />
                      Playoffs
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Experience the intensity of NBA Playoffs with premium viewing, VIP table service, and exclusive
                entertainment.
              </p>
            </div>

            <div className="text-center space-y-4 animate-on-scroll animate-delay-400">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/hbo-boxing-ppv.jpeg"
                  alt="HBO Boxing Pay-Per-View"
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
                      Boxing
                      <br />
                      Pay-Per-View
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm px-2 max-w-xs mx-auto">
                Watch the biggest boxing matches and UFC events with premium seating, VIP service, and exclusive
                entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP & Heritage Section */}
      <section id="vip" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-on-scroll">
            VIP & HERITAGE
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-100">
            Experience the ultimate in luxury and sophisticated entertainment
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                  Exclusive intimate experiences with our most sophisticated entertainers in luxurious private settings.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/heritage-refined-aesthetic.jpeg"
                  alt="Heritage Refined Aesthetic"
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
                <h3 className="text-lg font-bold text-white mb-3">HERITAGE REFINED AESTHETIC</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sophisticated aesthetic experiences showcasing the refined artistry that defines our heritage of
                  excellence.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-400">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/entertainer-flowing-hair.jpeg"
                  alt="Artistic Performance"
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
                <h3 className="text-lg font-bold text-white mb-3">ARTISTIC PERFORMANCE</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Witness breathtaking artistic performances featuring flowing movement and dramatic lighting effects.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-black/90 backdrop-blur-sm border border-red-500/40 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-on-scroll animate-delay-500">
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

      {/* Reviews Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-on-scroll">
            GUEST REVIEWS
          </h2>

          <div className="text-center mb-8 animate-on-scroll animate-delay-100">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={30}
                height={30}
                className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white text-xl font-bold">5.0 Stars</span>
            </div>
            <p className="text-white/80 text-lg">Phoenix New Times "Best Of" Winner • 15 Years of Excellence</p>
          </div>

          <div className="overflow-hidden relative">
            <div className="flex animate-scroll-reviews gap-8 mb-8">
              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Michael R. - Phoenix</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Best bachelor party venue in Scottsdale! Professional staff, amazing atmosphere, and the
                  entertainment was top-notch. Highly recommend for special occasions."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">James K. - Chicago</h4>
                    <div className="flex text-red-400 text-sm">★★★★☆ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Solid establishment with beautiful performers. Parking was a bit challenging but the valet service
                  helped. The VIP packages are worth it if you're celebrating something special."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Robert M. - Atlanta</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Business trip to Phoenix and colleagues recommended this place. Outstanding venue! Professional
                  atmosphere, talented entertainers, and excellent service. Perfect for corporate entertainment."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Tyler B. - Flagstaff</h4>
                    <div className="flex text-red-400 text-sm">★★★★☆ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Drove down from Flagstaff for my 30th birthday. Great experience overall! The DJ was hilarious and
                  kept the energy up all night. Only complaint is the drinks are a bit pricey, but expected for the
                  quality."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Carlos M. - Las Vegas</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "I've been to clubs all over Vegas and this place holds its own! The bachelor party package was
                  incredible and the performers were absolutely stunning. Worth the trip from Nevada!"
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">David L. - San Diego</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "VIP treatment from start to finish. Clean facility, professional dancers, and excellent customer
                  service. The champagne service was a nice touch. Worth every penny for a special night out."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Alex P. - Mesa</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Local here and this is my go-to spot for special occasions. The staff knows how to treat regulars
                  right. Always clean, always professional, always a good time. Highly recommend the table service!"
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Marcus T. - Tempe</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Brought my business partners here for a client dinner. Impressed everyone! The service was impeccable
                  and the atmosphere was exactly what we needed for a successful evening."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Kevin R. - Glendale</h4>
                    <div className="flex text-red-400 text-sm">★★★★☆ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Great spot for a guys night out. The entertainment is top-notch and the staff is very professional.
                  Security makes you feel safe and the drinks are strong. Will definitely be back!"
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4 border border-red-500/40">
                    <Image
                      src="/images/skin-logo-red-silhouette.png"
                      alt="Skin"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Brandon M. - Chandler</h4>
                    <div className="flex text-red-400 text-sm">★★★★★ • Skin Website</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Celebrated my promotion here with coworkers. The VIP experience was incredible and the performers
                  were absolutely stunning. Professional atmosphere with world-class entertainment. Highly recommend!"
                </p>
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="mt-12 bg-gradient-to-br from-red-900/20 to-black border border-red-500/40 p-8 rounded-lg max-w-2xl mx-auto animate-on-scroll animate-delay-300">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Share Your Experience</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
                />
                <select className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white focus:border-red-400 focus:outline-none">
                  <option value="">Rating</option>
                  <option value="5">★★★★★ (5 stars)</option>
                  <option value="4">★★★★☆ (4 stars)</option>
                  <option value="3">★★★☆☆ (3 stars)</option>
                </select>
              </div>
              <textarea
                placeholder="Tell us about your experience..."
                rows={4}
                className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Awards Section - Above Footer */}
      <section className="py-16 bg-gradient-to-b from-black to-red-900/20 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Awards & Recognition</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
              <h3 className="text-white font-bold">Phoenix New Times</h3>
              <p className="text-red-400">Best Of Winner - 5 Years Running</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <div className="text-red-400 text-3xl mb-2">15</div>
              <h3 className="text-white font-bold">Years</h3>
              <p className="text-red-400">Premier Entertainment Service</p>
            </div>
          </div>
        </div>
      </section>

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
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-rNIZvRIi8EsuVWIjfHu1stPEMTFy6F.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Hiring Section */}
      <section id="hiring" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
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

      <section className="py-20 bg-gradient-to-b from-red-900/10 to-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-on-scroll">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-100">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">What is the dress code?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    We maintain an upscale dress code. Men: collared shirts, dress pants, and dress shoes required. No
                    athletic wear, shorts, sandals, or hats. Women: upscale casual to formal attire. Management reserves
                    the right to refuse entry for inappropriate attire.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-200">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">Do I need reservations?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    Reservations are not required but highly recommended, especially for VIP seating, bachelor parties,
                    and weekend visits. Call (480) 425-7546 to secure your preferred seating and avoid wait times.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-300">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">What payment methods do you accept?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and debit
                    cards. ATM is available on-site for your convenience.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-400">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">Are cameras and phones allowed?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    No photography, video recording, or phone use is permitted inside the club. This policy protects the
                    privacy of our performers and guests. Phones must be stored away during your visit.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-500">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">What VIP services are available?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    Our VIP packages include private seating areas, bottle service, dedicated waitstaff, and exclusive
                    access to our most talented performers. Bachelor party packages feature custom DJ entertainment and
                    group activities.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-600">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">Is there parking available?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    Yes, we offer complimentary parking for all guests. Our secure parking area is well-lit and
                    monitored for your safety and convenience.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-700">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">What are your policies on conduct?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    We maintain a zero-tolerance policy for inappropriate behavior, harassment, or disrespect toward
                    performers or staff. All interactions must be consensual and professional. Violation of our policies
                    results in immediate removal without refund.
                  </p>
                </div>
              </details>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-800">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                  <h3 className="text-xl font-bold text-white">Do you offer group packages?</h3>
                  <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/90 leading-relaxed">
                    Yes! We specialize in bachelor parties, corporate events, and group celebrations. Our packages
                    include reserved seating, bottle service, and customized entertainment. Contact us at (480) 425-7546
                    to discuss your group's needs.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-b from-black via-red-900/10 to-black">
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
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <p>Phone: (480) 425-7546</p>
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

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={() => setChatbotOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          title="Need Help? Chat with us!"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-6 bg-red-600/80 hover:bg-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        title="Back to Top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

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

      {reservationPopup.isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-black rounded-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {reservationPopup.type === "bachelor"
                ? "BACHELOR PARTY INQUIRY"
                : reservationPopup.type === "vip"
                  ? "VIP RESERVATION"
                  : reservationPopup.type === "table"
                    ? "TABLE RESERVATION"
                    : reservationPopup.type === "champagne"
                      ? "CHAMPAGNE SATURDAYS"
                      : "RESERVATION INQUIRY"}
            </h2>
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
                  onClick={() => setReservationPopup({ isOpen: false, type: "bachelor" })}
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

      {eventCalendarOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-black rounded-lg p-8 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Event Calendar</h2>
            {/* Calendar Component Here */}
            <div className="text-white">Calendar Component Placeholder</div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setEventCalendarOpen(false)} className="bg-red-600 hover:bg-red-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {eventBookingOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-black rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{selectedEvent.title}</h2>
            <div className="mb-4">
              <Image
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
            <div className="text-white/80 mb-4">
              <div>
                <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Time:</strong> {selectedEvent.time}
              </div>
              <div>
                <strong>Price:</strong> {selectedEvent.price}
              </div>
              <div>
                <strong>Description:</strong> {selectedEvent.description}
              </div>
            </div>
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
                <label htmlFor="tickets" className="block text-white text-sm font-bold mb-2">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  id="tickets"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black/50 border-red-500/50 text-white"
                  placeholder="Number of Tickets"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  type="button"
                  onClick={() => setEventBookingOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                  Book Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {galleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-screen">
            <Image
              src={galleryImages[currentImageIndex] || "/placeholder.svg"}
              alt={`Gallery Image ${currentImageIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <button
                onClick={prevImage}
                className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
              >
                &lt;
              </button>
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <button
                onClick={nextImage}
                className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
              >
                &gt;
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button onClick={() => setGalleryOpen(false)} className="bg-red-600 hover:bg-red-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600/80 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors z-40"
        >
          ↑
        </button>
      )}

      {chatbotOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-black border border-red-500/50 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">SKIN</span>
              </div>
              <span className="font-bold">Skin Cabaret Assistant</span>
            </div>
            <button onClick={() => setChatbotOpen(false)} className="text-white hover:text-red-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.type === "user" ? "bg-red-600 text-white" : "bg-gray-800 text-white border border-red-500/30"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          <div className="p-2 border-t border-red-500/30">
            <div className="grid grid-cols-2 gap-1 mb-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="text-xs bg-red-600/20 text-red-400 hover:bg-red-600/40 hover:text-white p-2 rounded transition-colors"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-red-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white border border-red-500/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
