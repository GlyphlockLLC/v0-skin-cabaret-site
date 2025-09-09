"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"

export default function SkinCabaretSite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [reservationPopup, setReservationPopup] = useState({ isOpen: false, type: "bachelor" })
  const [currentTime, setCurrentTime] = useState(new Date())
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
  const [showRideForm, setShowRideForm] = useState(false)
  const [showHiringForm, setShowHiringForm] = useState(false)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [showPickupPopup, setShowPickupPopup] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState([
    {
      name: "Marcus T.",
      location: "Phoenix, AZ",
      rating: 5,
      review: "Incredible atmosphere and top-notch entertainment. The VIP experience exceeded all expectations.",
      timestamp: new Date().toISOString(),
    },
    {
      name: "David R.",
      location: "Tempe, AZ",
      rating: 5,
      review: "Perfect venue for our bachelor party. Professional staff and unforgettable night.",
      timestamp: new Date().toISOString(),
    },
  ])

  const [pickupForm, setPickupForm] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    desiredTime: "",
    message: "",
  })

  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
  })

  const [allReviews, setAllReviews] = useState([
    {
      name: "Marcus T.",
      location: "Phoenix, AZ",
      rating: 5,
      review: "Incredible atmosphere and top-notch entertainment. The VIP experience exceeded all expectations.",
      timestamp: new Date().toISOString(),
    },
    {
      name: "David R.",
      location: "Tempe, AZ",
      rating: 5,
      review: "Perfect venue for our bachelor party. Professional staff and unforgettable night.",
      timestamp: new Date().toISOString(),
    },
  ])

  const testAllFunctionality = async () => {
    console.log("[v0] Starting comprehensive site functionality test...")

    // Test email functionality
    try {
      const testEmailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Test Email",
          name: "Test User",
          phone: "555-0123",
          message: "Site functionality test",
          website: "", // honeypot field
        }),
      })
      console.log("[v0] Email API test:", testEmailResponse.ok ? "PASSED" : "FAILED")
    } catch (error) {
      console.log("[v0] Email API test: FAILED -", error)
    }

    // Test popup functionality
    console.log("[v0] Testing popup functionality...")
    setShowPickupPopup(true)
    setTimeout(() => {
      setShowPickupPopup(false)
      console.log("[v0] Pickup popup test: PASSED")
    }, 1000)

    // Test navigation
    console.log("[v0] Testing navigation...")
    const sections = ["home", "sports", "hiring", "contact"]
    sections.forEach((section) => {
      const element = document.getElementById(section)
      console.log(`[v0] Section ${section}:`, element ? "FOUND" : "MISSING")
    })

    // Test form validation
    console.log("[v0] Testing form validation...")
    const forms = document.querySelectorAll("form")
    console.log(`[v0] Found ${forms.length} forms on page`)

    // Test video backgrounds
    console.log("[v0] Testing video backgrounds...")
    const videos = document.querySelectorAll("video")
    console.log(`[v0] Found ${videos.length} video elements`)
    videos.forEach((video, index) => {
      console.log(`[v0] Video ${index + 1}:`, video.readyState >= 2 ? "LOADED" : "LOADING")
    })

    // Test responsive design
    console.log("[v0] Testing responsive design...")
    const isMobile = window.innerWidth <= 768
    console.log(
      `[v0] Current viewport: ${window.innerWidth}x${window.innerHeight} (${isMobile ? "Mobile" : "Desktop"})`,
    )

    console.log("[v0] Site functionality test completed!")
  }

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Pickup Service Request",
          name: pickupForm.name,
          phone: pickupForm.phone,
          pickupLocation: pickupForm.pickupLocation,
          dropoffLocation: pickupForm.dropoffLocation,
          desiredTime: pickupForm.desiredTime,
          message: pickupForm.message,
          website: "", // honeypot field
        }),
      })

      const result = await response.json()
      if (response.ok && result.success) {
        alert("Pickup request submitted successfully!")
        setShowPickupPopup(false)
        setPickupForm({ name: "", phone: "", pickupLocation: "", dropoffLocation: "", desiredTime: "", message: "" })
      } else {
        throw new Error(result.error || "Failed to submit")
      }
    } catch (error) {
      alert("Error submitting request. Please try again.")
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "cash2dayaz@gmail.com",
          replyTo: `${newReview.name} <noreply@skincabaret.com>`,
          subject: "New Customer Review",
          html: `
            <h2>New Customer Review</h2>
            <p><strong>Name:</strong> ${newReview.name}</p>
            <p><strong>Location:</strong> ${newReview.location}</p>
            <p><strong>Rating:</strong> ${newReview.rating}/5 stars</p>
            <p><strong>Review:</strong> ${newReview.review}</p>
          `,
        }),
      })
      if (response.ok) {
        alert("Review submitted successfully!")
        setShowReviewForm(false)
        setNewReview({ name: "", location: "", rating: 5, review: "" })
      }
    } catch (error) {
      alert("Error submitting review. Please try again.")
    }
  }

  const handleHiringSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    try {
      console.log("[v0] Submitting hiring form")
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Job Application",
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          email: formData.get("email") as string,
          message: `Position: ${formData.get("position")}\nExperience: ${formData.get("experience")}\nAvailability: ${formData.get("availability")}`,
          website: "", // honeypot field
        }),
      })

      const result = await response.json()
      console.log("[v0] Hiring form response:", result)

      if (response.ok && result.success) {
        alert("Application submitted successfully!")
        setShowHiringForm(false)
        // Reset form
        const form = e.target as HTMLFormElement
        form.reset()
      } else {
        throw new Error(result.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("[v0] Hiring form error:", error)
      alert("Error submitting application. Please try again.")
    }
  }

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
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const shareOnSocial = (platform: string) => {
    const url = window.location.href
    const text = "Check out Skin Cabaret - Premium Entertainment Experience"
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(text)

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
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
        botResponse = "We're open 7 days a week from 8 PM to 5 AM."
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

  const scrollToSectionOld = (sectionId: string) => {
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

  useEffect(() => {
    // Run comprehensive test after component mounts
    const timer = setTimeout(() => {
      testAllFunctionality()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearInterval(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isLowPower = (navigator as any).connection?.saveData || false

    if (prefersReducedMotion || isLowPower) {
      const videos = document.querySelectorAll("video")
      videos.forEach((video) => {
        video.pause()
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Skin Cabaret - Scottsdale's Premier Adult Entertainment</title>
        <meta
          name="description"
          content="Scottsdale's premier adult entertainment venue featuring luxury VIP experiences, sports viewing, and professional entertainment."
        />
        <link rel="canonical" href="https://www.skincabaret.com" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            name: "Skin Cabaret",
            url: "https://www.skincabaret.com",
            sameAs: [
              "https://www.facebook.com/skincabaret",
              "https://www.instagram.com/skincabaret",
              "https://www.twitter.com/skincabaret",
            ],
            telephone: "+1-480-555-0123",
            address: {
              "@type": "PostalAddress",
              streetAddress: "7330 E Indian Plaza",
              addressLocality: "Scottsdale",
              addressRegion: "AZ",
              postalCode: "85251",
              addressCountry: "US",
            },
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <style jsx global>{`
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
        }
        
        @supports (padding: max(0px)) {
          .safe-area-inset {
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.8)); }
          50% { filter: drop-shadow(0 0 40px rgba(220, 38, 38, 1)); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.8); }
          50% { text-shadow: 0 0 40px rgba(220, 38, 38, 1)); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-logo-glow { animation: logo-glow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        .text-shimmer {
          background: linear-gradient(90deg, #dc2626, #ffffff, #c0c0c0, #dc2626);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        
        .card-glow {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
          transition: box-shadow 0.3s ease;
        }
        .card-glow:hover {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
        }
      `}</style>

        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            style={{ filter: "brightness(0.9) contrast(1.2)" }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%284%29-QN8ZJnIEQwXWGV3kk4mOCkaXihiIyD.mp4" type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
            style={{ filter: "brightness(1.1) contrast(1.1)", animationDelay: "2s" }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%282%29-KyeJHi0XeR1fSa5wnLq9iykX0s8sy4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30 transition-all duration-300 safe-area-inset">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret"
                  width={40}
                  height={40}
                  className="drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] animate-float"
                />
                <div className="hidden md:flex space-x-6">
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded px-2 py-1"
                    aria-label="Navigate to home section"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("sports")}
                    className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded px-2 py-1"
                    aria-label="Navigate to sports events section"
                  >
                    Sports Events
                  </button>
                  <button
                    onClick={() => scrollToSection("hiring")}
                    className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded px-2 py-1"
                    aria-label="Navigate to careers section"
                  >
                    Careers
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded px-2 py-1"
                    aria-label="Navigate to contact section"
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <div className="text-white/80 text-sm animate-pulse">
                  {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded p-2"
                  aria-label="Toggle mobile menu"
                >
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
                  className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    scrollToSection("sports")
                    setMobileMenuOpen(false)
                  }}
                  className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Sports Events
                </button>
                <button
                  onClick={() => {
                    scrollToSection("hiring")
                    setMobileMenuOpen(false)
                  }}
                  className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Careers
                </button>
                <button
                  onClick={() => {
                    scrollToSection("contact")
                    setMobileMenuOpen(false)
                  }}
                  className="text-white hover:bg-red-500/20 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{
              filter: "brightness(1.25) contrast(1.05)",
              minHeight: "100vh",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%204-qQA5J32Xs8vmZNT2wm97AOezvBTPbB.webm" type="video/webm" />
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-jqRqb6rf8i9YFjT6RFomZi1aAjNVSA.webm" type="video/webm" />
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%203-RTTz79kdeCoRBdybhGCX7ut3ABz3ow.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="animate-float">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret Logo"
                width={400}
                height={400}
                className="object-contain animate-logo-glow hover:scale-110 transition-all duration-500"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(220, 38, 38, 0.8)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))",
                  maxWidth: "min(400px, 80vw)",
                  height: "auto",
                }}
                quality={95}
                sizes="(max-width: 768px) 80vw, 400px"
              />
            </div>
          </div>

          <div className="absolute bottom-20 left-0 right-0 z-20 text-center px-4 safe-area-inset">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-pulse-glow mb-3">
                Scottsdale's Premier Adult Entertainment Experience
              </h2>
              <p className="text-sm sm:text-base text-white/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
                Luxury • Sophistication • Unforgettable Nights
              </p>
              <div className="mt-4 text-red-400 font-bold text-lg animate-pulse">21+ ONLY • VALID ID REQUIRED</div>
            </div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 safe-area-inset">
            <button
              onClick={() => setShowCallPopup(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(220,38,38,0.8)] hover:scale-105 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[44px] min-w-[44px]"
              style={{
                boxShadow: "0 0 20px rgba(220, 38, 38, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
              aria-label="Call the club for reservations"
            >
              📞 CALL THE CLUB
            </button>
          </div>
        </section>

        {/* Sports Events Section */}
        <section id="sports" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 text-center relative z-10 safe-area-inset">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4">SPORTS EVENTS</h2>
            <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Watch your favorite teams while enjoying premium entertainment and VIP service
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  title: "Sunday Night Football",
                  image: "/images/nbc-sunday-night-football.jpeg",
                  description:
                    "Premium viewing experience with exclusive entertainment during every Sunday Night Football game.",
                },
                {
                  title: "Championship Boxing",
                  image: "/images/hbo-boxing-ppv.jpeg",
                  description:
                    "Watch major boxing events on our big screens with VIP table service and live entertainment.",
                },
                {
                  title: "NBA Playoffs",
                  image: "/images/nba-playoffs.png",
                  description:
                    "Experience playoff intensity with our sophisticated entertainment and premium atmosphere.",
                },
                {
                  title: "Golf Tournaments",
                  image: "/images/waste-management-phoenix-open.jpeg",
                  description: "Celebrate major golf events including the Waste Management Phoenix Open with style.",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-gray-900/40 to-black/40 hover:from-gray-900/80 hover:to-black/80 rounded-lg overflow-hidden border border-red-500/30 hover-lift card-glow backdrop-blur-sm transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Experiences Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/50" />

          <div className="container mx-auto px-4 relative z-10 safe-area-inset">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4">CUSTOMER EXPERIENCES</h2>
              <p className="text-lg sm:text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
                Hear what our guests have to say about their unforgettable nights at Skin Cabaret
              </p>
            </div>

            {/* Scrolling Reviews */}
            <div className="relative mb-12">
              <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                {allReviews.map((review, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-gradient-to-b from-gray-900/40 to-black/40 hover:from-gray-900/80 hover:to-black/80 rounded-lg p-6 border border-red-500/30 hover-lift card-glow backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black border-2 border-red-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">SKIN</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{review.name}</h4>
                        <p className="text-sm text-white/60">{review.location}</p>
                        <p className="text-xs text-white/40">Skin Website</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? "text-red-500" : "text-gray-600"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Review Button */}
            <div className="text-center">
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[44px]"
                aria-label={showReviewForm ? "Cancel review form" : "Share your experience"}
              >
                {showReviewForm ? "Cancel" : "Share Your Experience"}
              </button>

              {/* Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="mt-8 max-w-2xl mx-auto bg-gradient-to-b from-gray-900/80 to-black/80 rounded-lg p-8 border border-red-500/30 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 min-h-[44px]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Your Location"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 min-h-[44px]"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-white mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`w-8 h-8 ${star <= newReview.rating ? "text-red-500" : "text-gray-600"} hover:text-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded`}
                          aria-label={`Rate ${star} stars`}
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Share your experience..."
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    rows={4}
                    className="w-full bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 mb-6"
                    required
                  ></textarea>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[44px]"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500/50 min-h-[44px]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Hiring Section */}
        <section id="hiring" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 text-center relative z-10 safe-area-inset">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4">JOIN OUR TEAM</h2>
            <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Be part of Scottsdale's premier adult entertainment venue. We're looking for professional, confident
              individuals to join our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              {[
                {
                  title: "Bartenders",
                  icon: (
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 14c0 1.3.84 2.4 2 2.82V20H4v2h16v-2h-1v-3.18c1.16-.42 2-1.52 2-2.82V9H3v5zm2-3h14v3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-3zM12 2C9.79 2 8 3.79 8 6h8c0-2.21-1.79-4-4-4z" />
                    </svg>
                  ),
                  description: "Experience in high-volume cocktail preparation and customer service required.",
                  requirements: "21+ to work",
                },
                {
                  title: "Hostess",
                  icon: (
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  ),
                  description:
                    "Welcoming guests and providing exceptional customer service in our upscale environment.",
                  requirements: "19+ to work",
                },
                {
                  title: "Cocktail Servers",
                  icon: (
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm0 15V14l2.5-1.5L11 14v5H6zm12 0h-5V14l2.5-1.5L18 14v5zm0-7l-2.5-1.5L13 12V4h5v8z" />
                    </svg>
                  ),
                  description: "Providing table service and maintaining our high standards of hospitality.",
                  requirements: "21+ to work (except entertainers: 19+)",
                },
                {
                  title: "Security",
                  icon: (
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
                    </svg>
                  ),
                  description: "Maintaining a safe and secure environment for all guests and staff.",
                  requirements: "21+ to work",
                },
                {
                  title: "Door Girl",
                  icon: (
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  ),
                  description: "Greeting guests and managing entry to our exclusive venue.",
                  requirements: "19+ to work",
                },
                {
                  title: "Entertainers",
                  icon: (
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  ),
                  description:
                    "Professional entertainers providing world-class performances in our upscale environment.",
                  requirements: "19+ to work",
                },
              ].map((position, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-gray-900/40 to-black/40 hover:from-gray-900/80 hover:to-black/80 rounded-lg p-6 border border-red-500/30 hover-lift card-glow backdrop-blur-sm transition-all duration-300"
                >
                  {position.icon}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {position.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{position.description}</p>
                  <p className="text-red-400 text-sm font-semibold mb-4">{position.requirements}</p>
                  <button
                    onClick={() => setShowHiringForm(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[44px]"
                    aria-label={`Apply for ${position.title} position`}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-b from-gray-900/80 to-black/80 rounded-lg p-8 border border-red-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Entertainer Application Process</h3>
              <div className="space-y-4 text-white/80">
                <div className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold">1.</span>
                  <p>Submit your application through our online form</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold">2.</span>
                  <p>Visit Scottsdale City Hall to acquire your entertainment license before acceptance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold">3.</span>
                  <p>Schedule an in-person audition at our facility</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-400 font-bold">4.</span>
                  <p>Complete orientation and training upon acceptance</p>
                </div>
              </div>
              <p className="text-red-400 text-sm mt-6 text-center font-semibold">
                Entertainment license required before employment • Must be 19+ to work as entertainer
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 text-center relative z-10 safe-area-inset">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4">CONTACT US</h2>
            <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Ready to experience Scottsdale's premier adult entertainment venue? Get in touch with us today.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-b from-gray-900/40 to-black/40 hover:from-gray-900/80 hover:to-black/80 rounded-lg p-6 border border-red-500/30 card-glow backdrop-blur-sm transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <a
                  href="tel:+14804257546"
                  className="text-red-400 hover:text-red-300 transition-colors duration-300 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded px-2 py-1"
                  aria-label="Call Skin Cabaret"
                >
                  (480) 425-7546
                </a>
                <p className="text-white/60 text-sm mt-2">Open 7 days a week • 8 PM - 5 AM</p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/40 to-black/40 hover:from-gray-900/80 hover:to-black/80 rounded-lg p-6 border border-red-500/30 card-glow backdrop-blur-sm transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-white/80">Scottsdale, Arizona</p>
                <p className="text-white/60 text-sm mt-2">Premium Entertainment District</p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/40 to-black/40 hover:from-gray-900/80 hover:to-black/80 rounded-lg p-6 border border-red-500/30 card-glow backdrop-blur-sm transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
                <p className="text-white/80">Premium Adult Entertainment</p>
                <p className="text-white/60 text-sm mt-2">21+ Only • Valid ID Required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 text-center relative z-10 safe-area-inset">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4">FOLLOW US</h2>
            <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Stay connected with Skin Cabaret for exclusive content, events, and behind-the-scenes moments
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Facebook Card */}
              <div
                className="group relative bg-gradient-to-b from-gray-900/80 to-black/80 rounded-lg p-8 backdrop-blur-sm overflow-hidden hover-lift transition-all duration-500"
                style={{
                  border: "2px solid transparent",
                  background:
                    "linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.8)) padding-box, linear-gradient(135deg, #dc2626, #b91c1c, #991b1b, #dc2626) border-box",
                  boxShadow: "0 0 30px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    Facebook
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Follow us for exclusive content, behind-the-scenes moments, and special event announcements.
                  </p>
                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[44px]"
                  >
                    Follow Us
                  </button>
                </div>
              </div>

              {/* Instagram Card */}
              <div
                className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-xl p-8 border-2 border-transparent bg-clip-padding hover-lift transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 min-h-[280px] flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
                  borderImage: "linear-gradient(135deg, #ec4899, #9333ea) 1",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full mb-6 mx-auto group-hover:from-pink-400 group-hover:to-pink-500 transition-all duration-300 shadow-lg shadow-pink-500/50">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
                  Instagram
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Discover our visual stories, exclusive photos, and connect with our community.
                </p>
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 min-h-[44px]"
                >
                  Follow Us
                </button>
              </div>

              {/* X (Twitter) Card */}
              <div
                className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-xl p-8 border-2 border-transparent bg-clip-padding hover-lift transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 min-h-[280px] flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
                  borderImage: "linear-gradient(135deg, #3b82f6, #9333ea) 1",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 mx-auto group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/50">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  X (Twitter)
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">Latest updates and special events</p>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[44px]"
                  aria-label="Share on X (Twitter)"
                >
                  Share on X
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative bg-black/90 border-t border-red-500/30 py-8 z-10">
          <div className="container mx-auto px-4 text-center safe-area-inset">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={40}
                height={40}
                className="drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
              />
            </div>
            <p className="text-white/60 text-sm">© 2025-2026 Skin Cabaret. All rights reserved. Must be 21+ to enter</p>
          </div>
        </footer>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-full shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(220,38,38,0.8)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}

        {/* Pickup Popup */}
        {showPickupPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative bg-black/90 rounded-lg max-w-xs sm:max-w-sm w-full max-h-[95vh] overflow-y-auto border border-red-500/30">
              <button
                onClick={() => setShowPickupPopup(false)}
                className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label="Close popup"
              >
                ×
              </button>

              <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-t-lg">
                <iframe
                  src="https://www.youtube.com/embed/10tGk0u93qQ?autoplay=1&mute=1&loop=1&playlist=10tGk0u93qQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&start=45"
                  className="absolute inset-0 w-full h-full object-cover"
                  allow="autoplay; encrypted-media"
                  allowFullScreen={false}
                  style={{ pointerEvents: "none" }}
                />
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-3 text-center">Schedule Free Pickup</h3>

                <form onSubmit={handlePickupSubmit} className="space-y-3">
                  <input type="text" name="website" style={{ display: "none" }} />

                  <input
                    type="text"
                    placeholder="Name"
                    value={pickupForm.name}
                    onChange={(e) => setPickupForm({ ...pickupForm, name: e.target.value })}
                    className="w-full p-2 bg-black/50 border border-red-500/30 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone"
                    value={pickupForm.phone}
                    onChange={(e) => setPickupForm({ ...pickupForm, phone: e.target.value })}
                    className="w-full p-2 bg-black/50 border border-red-500/30 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickupForm.pickupLocation}
                    onChange={(e) => setPickupForm({ ...pickupForm, pickupLocation: e.target.value })}
                    className="w-full p-2 bg-black/50 border border-red-500/30 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />

                  <input
                    type="text"
                    placeholder="Drop-off Location"
                    value={pickupForm.dropoffLocation}
                    onChange={(e) => setPickupForm({ ...pickupForm, dropoffLocation: e.target.value })}
                    className="w-full p-2 bg-black/50 border border-red-500/30 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />

                  <input
                    type="text"
                    placeholder="Desired Time"
                    value={pickupForm.desiredTime}
                    onChange={(e) => setPickupForm({ ...pickupForm, desiredTime: e.target.value })}
                    className="w-full p-2 bg-black/50 border border-red-500/30 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />

                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-3 rounded font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      aria-label="Schedule ride pickup service"
                    >
                      Schedule Ride
                    </button>

                    <a
                      href="tel:+14805550123"
                      className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-2 px-3 rounded font-semibold text-sm transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                      aria-label="Call now for immediate assistance"
                    >
                      Call Now
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Call Popup */}
        {showCallPopup && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 max-w-md w-full border border-red-500/30 text-center">
              <div className="relative h-32 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/customer-chicago.png"
                  alt="Girls Girls Girls Neon Sign"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Call Skin Cabaret</h3>
              <p className="text-white/80 mb-6">
                Ready to experience Scottsdale's premier adult entertainment? Call us now for reservations and
                information.
              </p>
              <div className="text-3xl font-bold text-red-400 mb-6">(480) 425-7546</div>
              <p className="text-white/60 text-sm mb-6">Open 7 days a week • 8 PM - 5 AM</p>
              <div className="flex gap-4">
                <a
                  href="tel:+14804257546"
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[44px] flex items-center justify-center"
                  aria-label="Call Skin Cabaret now"
                >
                  Call Now
                </a>
                <button
                  onClick={() => setShowCallPopup(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500/50 min-h-[44px]"
                  aria-label="Close call popup"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showHiringForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 max-w-md w-full border border-red-500/30 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowHiringForm(false)}
                className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded"
                aria-label="Close hiring form"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Join Our Team</h3>
              <form onSubmit={handleHiringSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 min-h-[44px]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 min-h-[44px]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 min-h-[44px]"
                  required
                />
                <select
                  name="position"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 min-h-[44px]"
                  required
                >
                  <option value="">Select Position</option>
                  <option value="bartender">Bartender</option>
                  <option value="hostess">Hostess</option>
                  <option value="server">Cocktail Server</option>
                  <option value="security">Security</option>
                </select>
                <textarea
                  name="experience"
                  placeholder="Previous Experience"
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  required
                ></textarea>
                <textarea
                  name="availability"
                  placeholder="Availability"
                  rows={2}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  required
                ></textarea>
                <p className="text-red-400 text-sm text-center">
                  Must be 19+ to work as entertainer, 21+ for all other positions
                </p>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[44px]"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHiringForm(false)}
                    className="px-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500/50 min-h-[44px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {chatbotOpen && (
          <div className="fixed bottom-20 right-4 w-80 h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-red-500/30 flex flex-col z-40">
            <div className="flex justify-between items-center p-4 border-b border-red-500/30">
              <h3 className="text-white font-bold">Skin Cabaret Assistant</h3>
              <button
                onClick={() => setChatbotOpen(false)}
                className="text-white hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded"
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-2 rounded-lg text-sm ${
                      msg.type === "user" ? "bg-red-600 text-white" : "bg-gray-700 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-red-500/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask about our services..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm min-h-[36px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleChatSubmit(e)
                    }
                  }}
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 min-w-[44px] min-h-[36px]"
                  aria-label="Send message"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          aria-label="Open chat support"
        >
          💬
        </button>

        <button
          onClick={testAllFunctionality}
          className="fixed top-20 left-4 z-50 bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-4 py-2 rounded text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
          style={{ display: process.env.NODE_ENV === "development" ? "block" : "none" }}
        >
          🧪 Test Site
        </button>
      </div>
    </>
  )
}
