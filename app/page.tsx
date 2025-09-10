"use client"

import { Button } from "@/components/ui/button"

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
      name: "Marcus Johnson",
      location: "Phoenix, AZ",
      rating: 5,
      review: "Incredible atmosphere and top-notch entertainment. The staff made our bachelor party unforgettable!",
    },
    {
      name: "Jessica Martinez",
      location: "Las Vegas, NV",
      rating: 4,
      review: "Great venue for a girls' night out. Professional dancers and excellent service throughout the evening.",
    },
    {
      name: "David Thompson",
      location: "Denver, CO",
      rating: 5,
      review: "Best gentleman's club in Arizona! Amazing performers and the VIP experience was worth every penny.",
    },
    {
      name: "Amanda Rodriguez",
      location: "San Diego, CA",
      rating: 5,
      review: "Classy establishment with beautiful entertainers. Perfect for celebrating special occasions.",
    },
    {
      name: "Carlos Williams",
      location: "Austin, TX",
      rating: 4,
      review: "Professional atmosphere and talented performers. The champagne service was exceptional.",
    },
    {
      name: "Brittany Davis",
      location: "Miami, FL",
      rating: 5,
      review: "Elegant venue with stunning entertainment. The private rooms offer an intimate experience.",
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      review: "Upscale club with world-class performers. The bottle service and VIP treatment exceeded expectations.",
    },
    {
      name: "Sophia Anderson",
      location: "Chicago, IL",
      rating: 4,
      review: "Beautiful venue with professional staff. The entertainment quality is consistently excellent.",
    },
    {
      name: "Ryan O'Connor",
      location: "Boston, MA",
      rating: 5,
      review: "Outstanding entertainment and premium service. The atmosphere is sophisticated and welcoming.",
    },
    {
      name: "Isabella Garcia",
      location: "Houston, TX",
      rating: 5,
      review: "World-class entertainment and exceptional hospitality. This place sets the standard for luxury clubs.",
    },
    {
      name: "James Wilson",
      location: "Seattle, WA",
      rating: 4,
      review: "Professional staff and incredible performers. The VIP experience was absolutely worth it.",
    },
    {
      name: "Natalie Brown",
      location: "Atlanta, GA",
      rating: 5,
      review: "Stunning venue with top-tier entertainment. Perfect for special celebrations and memorable nights.",
    },
    {
      name: "Alexander Lee",
      location: "New York, NY",
      rating: 5,
      review: "Exceptional service and world-renowned performers. This club truly lives up to its reputation.",
    },
    {
      name: "Victoria Taylor",
      location: "Portland, OR",
      rating: 4,
      review: "Elegant atmosphere with professional entertainment. The staff attention to detail is impressive.",
    },
    {
      name: "Christopher Moore",
      location: "Dallas, TX",
      rating: 5,
      review: "Premium experience from start to finish. The entertainment quality is unmatched anywhere else.",
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

  const [pickupLoading, setPickupLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const testAllFunctionality = async () => {
    console.log("[v0] Starting comprehensive site functionality test...")

    // Test email API
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Test Email",
          name: "Test User",
          phone: "(480) 425-7546",
          email: "test@example.com",
          message: "API functionality test",
          website: "", // honeypot field
        }),
      })
      const result = await response.json()
      if (result.success) {
        console.log("[v0] Email API test: PASSED")
      } else {
        console.log("[v0] Email API test: FAILED -", result.error)
      }
    } catch (error) {
      console.log("[v0] Email API test: FAILED -", error)
    }

    // Test popup functionality - removed auto-close
    console.log("[v0] Testing popup functionality...")
    if (showPickupPopup) {
      console.log("[v0] Pickup popup test: PASSED")
    }

    // Test navigation
    console.log("[v0] Testing navigation...")
    const sections = ["home", "sports", "hiring", "contact"]
    sections.forEach((section) => {
      const element = document.getElementById(section)
      console.log(`[v0] Section ${section}:`, element ? "FOUND" : "MISSING")
    })

    // Test form validation
    setTimeout(() => {
      console.log("[v0] Testing form validation...")
      const forms = document.querySelectorAll("form")
      console.log(`[v0] Found ${forms.length} forms on page`)

      // Test each form individually
      forms.forEach((form, index) => {
        const formType = form.getAttribute("data-form-type") || `Form ${index + 1}`
        console.log(`[v0] ${formType}: FOUND`)
      })
    }, 1000)

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
    setIsSubmitting(true)
    setNotification(null)

    try {
      console.log("[v0] Submitting pickup form with data:", pickupForm)

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
      console.log("[v0] Pickup form response:", result)

      if (response.ok && result.success) {
        setNotification({
          type: "success",
          message:
            "✅ Pickup request sent successfully! We'll contact you within 30 minutes. You can close this popup now.",
        })
        setPickupForm({ name: "", phone: "", pickupLocation: "", dropoffLocation: "", desiredTime: "", message: "" })

        // Extended time for user to read confirmation - 5 seconds instead of 2
        setTimeout(() => {
          setNotification({
            type: "success",
            message: "✅ Request confirmed! Click X to close or submit another request.",
          })
        }, 5000)
      } else {
        throw new Error(result.error || result.details || "Failed to submit")
      }
    } catch (error) {
      console.error("[v0] Pickup form error:", error)
      setNotification({
        type: "error",
        message:
          error instanceof Error ? error.message : "Error submitting request. Please try again or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newReview.rating < 4) {
      setNotification({
        type: "error",
        message:
          "We appreciate all feedback! For ratings below 4 stars, please contact us directly at (480) 949-1119 so we can address your concerns personally.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "cash2dayaz@gmail.com",
          subject: "New Customer Review",
          name: newReview.name,
          message: `New Review Submitted:
          
Name: ${newReview.name}
Location: ${newReview.location}
Rating: ${newReview.rating}/5 stars
Review: ${newReview.review}`,
        }),
      })

      if (response.ok) {
        const newReviewItem = {
          name: newReview.name,
          location: newReview.location,
          rating: newReview.rating,
          date: new Date().toLocaleDateString(),
        }
        setReviews((prev) => [newReviewItem, ...prev])

        setNotification({
          type: "success",
          message: "Thank you! Your review has been submitted successfully and will appear on our site.",
        })

        setNewReview({ name: "", location: "", rating: 5, review: "" })

        setTimeout(() => {
          setShowReviewForm(false)
          setNotification(null)
        }, 3000)
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error submitting review. Please try again or call us at (480) 949-1119.",
      })
    } finally {
      setIsSubmitting(false)
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
    let socialUrl = ""
    switch (platform) {
      case "facebook":
        socialUrl = "https://www.facebook.com/skincabaret"
        break
      case "twitter":
        socialUrl = "https://www.twitter.com/skincabaret"
        break
      case "instagram":
        socialUrl = "https://www.instagram.com/skincabaret"
        break
      default:
        return
    }

    window.open(socialUrl, "_blank")
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

  const hiringPositions = [
    { title: "Bartenders", icon: "🍸", age: "21+" },
    { title: "Hostess", icon: "👋", age: "21+" },
    { title: "Cocktail Servers", icon: "🍷", age: "21+" },
    { title: "Security", icon: "🛡️", age: "21+" },
  ]

  return (
    <>
      <Head>
        <title>Skin Cabaret - Scottsdale's Premier Adult Entertainment</title>
        <meta
          name="description"
          content="Scottsdale's premier adult entertainment venue featuring luxury VIP experiences, sports viewing, and professional entertainment."
        />
        <link rel="canonical" href="https://www.skincabaret.com/home" />
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
            url: "https://www.skincabaret.com/home",
            sameAs: [
              "https://www.facebook.com/skincabaret",
              "https://www.instagram.com/skincabaret",
              "https://www.twitter.com/skincabaret",
            ],
            telephone: "+1-480-425-7546",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1137 N Scottsdale Road",
              addressLocality: "Scottsdale",
              addressRegion: "AZ",
              postalCode: "85257",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 20:00-05:00",
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

        {/* Fixed Background Videos - Blended */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110 mix-blend-overlay"
            style={{
              opacity: 0.5,
              filter: "brightness(1.1) contrast(1.3)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%284%29-1RtX4V4IQh45VsD38xmi5zh6VkQEmD.mp4" type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110 mix-blend-multiply"
            style={{
              opacity: 0.4,
              filter: "brightness(1.0) contrast(1.2)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%282%29-KyeJHi0XeR1fSa5wnLq9iykX0s8sy4.mp4" type="video/mp4" />
          </video>
        </div>

        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"}`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="text-xl font-bold text-red-400">SKIN CABARET</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {["home", "sports", "hiring", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab ? "bg-red-600 text-white" : "text-white/80 hover:text-red-400 hover:bg-white/10"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setShowCallPopup(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              CALL NOW
            </button>
          </div>
        </header>

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
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%204-LXxHbyjDaZ5Hfa2hzLSCeq5LLZpKjM.webm" type="video/webm" />
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
              📞 CALL (480) 949-1119
            </button>
          </div>
        </section>

        {/* Barrett-Jackson Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">BARRETT-JACKSON</h2>

            <div className="max-w-4xl mx-auto bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left p-8">
                  <h3 className="text-3xl font-bold text-red-400 mb-6">Luxury Automotive Excellence</h3>
                  <p className="text-white/90 text-xl mb-8 leading-relaxed">
                    Experience the pinnacle of automotive luxury at Skin Cabaret during Barrett-Jackson week. Witness
                    million-dollar classics, exotic supercars, and rare collectibles while enjoying world-class
                    entertainment in Scottsdale's most prestigious venue.
                  </p>
                  <div className="space-y-4 text-white/80 text-lg">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Premium Collector Car Showcases
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      High-End Networking Events
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="/luxury-barrett-jackson-classic-car-auction-superca.jpg"
                      alt="Barrett-Jackson Luxury Vehicle"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => setShowCallPopup(true)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                      >
                        RESERVE BARRETT-JACKSON VIP
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Girls Girls Girls Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-black/80 rounded-lg p-8 border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-80 hover:opacity-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/customer-chicago-qxlT5ZNpfEBVWDikg2KMXPIxhCDGzk.png"
                      alt="Girls Girls Girls Neon Sign"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 text-white animate-glow">GIRLS GIRLS GIRLS</h2>
                  <h3 className="text-3xl font-bold text-red-400 mb-6">World-Renowned Excellence</h3>
                  <p className="text-white/90 text-xl mb-8 leading-relaxed">
                    Skin Cabaret has always been home to the hottest girls in the world. As a world-renowned club, we're
                    getting back to our roots with the most beautiful and talented entertainers from around the globe.
                    Experience the legendary atmosphere that has made Skin Cabaret an international destination for
                    premium adult entertainment.
                  </p>
                  <div className="space-y-4 text-white/80 text-lg">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      International Talent Showcase
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      World-Class Entertainment
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Legendary Scottsdale Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home of the 2 Dollar Bills Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">HOME OF THE 2 DOLLAR BILLS</h2>

            <div className="max-w-6xl mx-auto bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left p-8">
                  <h3 className="text-3xl font-bold text-red-400 mb-6">A Legendary Tradition</h3>
                  <p className="text-white/90 text-xl mb-8 leading-relaxed">
                    Skin Cabaret is famous for being the home of the $2 bill tradition in Scottsdale. These rare and
                    collectible bills have become part of our mystique, creating unforgettable experiences for both
                    guests and entertainers. The $2 bill represents the unique, premium experience that only Skin
                    Cabaret can provide - rare, valuable, and always memorable.
                  </p>
                  <div className="space-y-4 text-white/80 text-lg">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Rare Collectible Currency
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Exclusive Skin Cabaret Tradition
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Unforgettable Premium Experience
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%20dollar%20titties.jpg-TVibYRJHVvh11DAielBvPOcEYbSSGd.jpeg"
                      alt="Home of the 2 Dollar Bills"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => setShowCallPopup(true)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                      >
                        EXPERIENCE THE TRADITION
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sports" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">SPORTS EVENTS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* NFL Sunday */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image src="/images/nbc-sunday-night-football.jpeg" alt="NFL Sunday" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">NFL Sunday</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Watch every game on multiple big screens with drink specials and premium entertainment.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* NBA Finals */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/nba-playoffs-basketball-championship-game.jpg"
                    alt="NBA Finals"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">NBA Finals</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Experience championship basketball with premium viewing and VIP packages.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* HBO Boxing */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/hbo-boxing-championship-fight-night.jpg"
                    alt="HBO Pay Per View Boxing"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">HBO Boxing</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Watch championship boxing matches with VIP fight night packages.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Waste Management */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/golf-tournament-waste-management-phoenix-open.jpg"
                    alt="Waste Management Phoenix Open"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">WM Phoenix Open</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Arizona's most exciting golf tournament with VIP viewing packages.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Super Bowl */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/super-bowl-championship-game-with-trophy-and-confe.jpg"
                    alt="Super Bowl"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">Super Bowl</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    The biggest game of the year with championship viewing parties.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Kentucky Derby */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/kentucky-derby-horse-racing-with-jockeys-and-churc.jpg"
                    alt="Kentucky Derby"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">Kentucky Derby</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    The most exciting two minutes in sports with mint juleps and betting.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Stanley Cup */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/stanley-cup-hockey-championship-with-trophy-and-ic.jpg"
                    alt="Stanley Cup"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">Stanley Cup</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Hockey's ultimate championship with playoff intensity and celebrations.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* World Series */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/world-series-baseball-championship-with-stadium-an.jpg"
                    alt="World Series"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2">World Series</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Baseball's championship series with classic American entertainment.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">FOLLOW US</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-black/80 rounded-lg p-8 text-center border-2 border-blue-500/50 hover:border-blue-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">Facebook</h3>
                <p className="text-white/80 mb-4">Get updates on events and exclusive offers</p>
                <Button onClick={() => shareOnSocial("facebook")} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Visit Our Page
                </Button>
              </div>

              <div className="bg-black/80 rounded-lg p-8 text-center border-2 border-pink-500/50 hover:border-pink-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">Instagram</h3>
                <p className="text-white/80 mb-4">Behind the scenes and exclusive content</p>
                <Button onClick={() => shareOnSocial("instagram")} className="bg-pink-600 hover:bg-pink-700 text-white">
                  Visit Our Page
                </Button>
              </div>

              <div className="bg-black/80 rounded-lg p-8 text-center border-2 border-gray-500/50 hover:border-gray-400 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">X (Twitter)</h3>
                <p className="text-white/80 mb-4">Latest news and announcements</p>
                <Button
                  onClick={() => shareOnSocial("twitter")}
                  className="bg-black hover:bg-gray-800 text-white border border-white"
                >
                  Visit Our Page
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-6">CUSTOMER REVIEWS</h2>
              <Button
                onClick={() => setShowReviewForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold opacity-70 hover:opacity-100 transition-all duration-300"
              >
                Leave a Review
              </Button>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 pb-4 animate-scroll" style={{ width: "max-content" }}>
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-black/40 rounded-lg p-6 border border-red-500/20 min-w-[300px] max-w-[350px] opacity-70 hover:opacity-100 hover:bg-black/80 hover:border-red-500/60 transition-all duration-500 transform hover:scale-105"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center border-2 border-red-500/40 mr-4 hover:border-red-500 transition-all duration-300">
                        <Image
                          src="/images/skin-logo-red-silhouette.png"
                          alt="Skin Logo"
                          width={24}
                          height={24}
                          className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white/90 hover:text-white transition-colors duration-300">
                          {review.name}
                        </h4>
                        <p className="text-white/40 hover:text-white/80 text-sm transition-colors duration-300">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg transition-colors duration-300 ${i < review.rating ? "text-yellow-400/70 hover:text-yellow-400" : "text-gray-600/50 hover:text-gray-600"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-white/60 hover:text-white/90 transition-colors duration-300">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="hiring" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">NOW HIRING</h2>

            {/* Hiring Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {hiringPositions.map((job, index) => (
                <div
                  key={index}
                  className="bg-black/80 rounded-lg p-6 text-center border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-40 hover:opacity-100 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">{job.icon}</div>
                  <h3 className="text-xl font-bold text-red-400 mb-2">{job.title}</h3>
                  <p className="text-white/80 mb-4">{job.age} Required</p>
                  <Button onClick={() => setShowHiringForm(true)} className="bg-red-600 hover:bg-red-700 text-white">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-black/80 rounded-lg p-8 border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Entertainer Applications</h3>
              <p className="text-white/80 mb-4">
                Join Scottsdale's premier adult entertainment venue. We're seeking professional entertainers (19+) to
                join our world-class team.
              </p>
              <div className="space-y-3 text-white/70 mb-6">
                <div>• Must be 19+ years old for entertainer positions</div>
                <div>• Professional attitude and appearance required</div>
                <div>• Must obtain entertainment license from Scottsdale City Hall before acceptance</div>
                <div>• In-person auditions required</div>
                <div>• Flexible scheduling available</div>
              </div>
              <Button
                onClick={() => setShowHiringForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
              >
                Apply for Entertainer Position
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">CONTACT US</h2>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-black/80 rounded-lg p-8 text-center border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-40 hover:opacity-100 transform hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Phone</h3>
                <p className="text-white/80 mb-4">Call for reservations</p>
                <a
                  href="tel:+14804257546"
                  className="text-white font-bold text-lg hover:text-red-400 transition-colors"
                >
                  (480) 425-7546
                </a>
              </div>

              <div className="bg-black/80 rounded-lg p-8 text-center border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-40 hover:opacity-100 transform hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Location</h3>
                <p className="text-white/80 mb-4">
                  1137 N Scottsdale Road
                  <br />
                  Scottsdale, AZ 85257
                </p>
                <Button
                  onClick={() =>
                    window.open("https://maps.google.com/?q=1137+N+Scottsdale+Road+Scottsdale+AZ+85257", "_blank")
                  }
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Get Directions
                </Button>
              </div>

              <div className="bg-black/80 rounded-lg p-8 text-center border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-40 hover:opacity-100 transform hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🕐</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Hours</h3>
                <p className="text-white/80 mb-4">Open 7 Days a Week</p>
                <p className="text-white font-bold text-lg">8:00 PM - 5:00 AM</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative bg-black/90 py-12 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div>
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/skin-logo-red-silhouette.png"
                    alt="Skin Cabaret"
                    width={40}
                    height={40}
                    className="object-contain mr-3"
                  />
                  <span className="text-xl font-bold text-red-400">SKIN CABARET</span>
                </div>
                <p className="text-white/70 text-sm">
                  Scottsdale's premier adult entertainment venue offering luxury experiences and world-class
                  entertainment.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <div className="space-y-2 text-white/70 text-sm">
                  <div>
                    📞{" "}
                    <a href="tel:+14804257546" className="hover:text-red-400 transition-colors">
                      (480) 425-7546
                    </a>
                  </div>
                  <div>
                    📧{" "}
                    <a href="mailto:cash2dayaz@gmail.com" className="hover:text-red-400 transition-colors">
                      cash2dayaz@gmail.com
                    </a>
                  </div>
                  <div>
                    📍 1137 N Scottsdale Road
                    <br />
                    Scottsdale, AZ 85257
                  </div>
                  <div>🕐 8:00 PM - 5:00 AM</div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <div className="space-y-2 text-white/70 text-sm">
                  <div>
                    <a href="#" className="hover:text-red-400 transition-colors">
                      Privacy Policy
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-red-400 transition-colors">
                      Terms of Service
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-red-400 transition-colors">
                      Age Verification
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-red-400 transition-colors">
                      Responsible Gaming
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Website Design</h4>
                <div className="text-white/70 text-sm">
                  <a
                    href="https://glyphlock.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors"
                  >
                    Website design by Glyphlock LLC
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/60 text-sm">
                © 2025-2026 Skin Cabaret. All rights reserved. Must be 21+ to enter.
              </p>
            </div>
          </div>
        </footer>

        {showPickupPopup && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black border-2 border-red-500 rounded-lg w-full max-w-md relative">
              <button
                onClick={() => setShowPickupPopup(false)}
                className="absolute top-2 right-2 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 shadow-lg z-10"
                aria-label="Close popup"
              >
                ×
              </button>

              <div className="relative h-40 rounded-t-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/10tGk0u93qQ?autoplay=1&mute=1&loop=1&playlist=10tGk0u93qQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&start=45"
                  className="w-full h-full object-cover"
                  allow="autoplay; encrypted-media"
                  allowFullScreen={false}
                  style={{ pointerEvents: "none" }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-red-400 mb-2 text-center">Schedule Ride & Reservations</h3>
                <p className="text-white/70 text-sm text-center mb-4">Call now for VIP service</p>

                <div className="space-y-3">
                  <Button
                    onClick={() => window.open("tel:+14804257546", "_self")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold rounded-lg transition-all duration-300"
                  >
                    📞 CALL (480) 425-7546
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => window.open("tel:+14804257546", "_self")}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-sm font-bold rounded-lg"
                    >
                      🚗 Schedule Ride
                    </Button>
                    <Button
                      onClick={() => window.open("tel:+14804257546", "_self")}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-sm font-bold rounded-lg"
                    >
                      🍾 Reservations
                    </Button>
                  </div>

                  <p className="text-white/70 text-xs text-center">
                    Hours: 8:00 PM - 5:00 AM • Open 7 Days
                    <br />
                    <span className="text-red-400">1137 N Scottsdale Road, Scottsdale, AZ</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showReviewForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black border-2 border-red-500 rounded-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-lg font-bold"
              >
                ×
              </button>

              <h3 className="text-xl font-bold text-red-400 mb-4">Leave a Review</h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4" data-form-type="Review Form">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300"
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">City, State</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Phoenix, AZ"
                    required
                    autoComplete="address-level2"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number.parseInt(e.target.value) })}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500"
                    required
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                  </select>
                  <p className="text-white/60 text-xs mt-1">
                    We only accept 4-5 star reviews. For concerns, please call us directly.
                  </p>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Review</label>
                  <textarea
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300 h-24 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>

              {notification && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    notification.type === "success" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {notification.message}
                </div>
              )}
            </div>
          </div>
        )}

        {showHiringForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black border-2 border-red-500 rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowHiringForm(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-lg font-bold"
              >
                ×
              </button>

              <h3 className="text-xl font-bold text-red-400 mb-4">Job Application</h3>

              <form onSubmit={handleHiringSubmit} className="space-y-4" data-form-type="Hiring Form">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300"
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300"
                    required
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Position</label>
                  <select
                    name="position"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500"
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="bartender">Bartender (21+)</option>
                    <option value="hostess">Hostess (21+)</option>
                    <option value="server">Cocktail Server (21+)</option>
                    <option value="security">Security (21+)</option>
                    <option value="entertainer">Entertainer (19+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Experience</label>
                  <textarea
                    name="experience"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-red-500 focus:bg-white/20 transition-all duration-300 h-20 resize-none"
                    placeholder="Describe your relevant experience..."
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold">
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        )}

        {showCallPopup && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black border-2 border-red-500 rounded-lg p-8 text-center relative">
              <button
                onClick={() => setShowCallPopup(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-lg font-bold"
              >
                ×
              </button>

              <h3 className="text-2xl font-bold text-red-400 mb-4">Call The Club</h3>
              <p className="text-white/80 mb-6">Ready to make a reservation?</p>

              <Button
                onClick={() => window.open("tel:+14804257546", "_self")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-bold rounded-lg"
              >
                📞 (480) 425-7546
              </Button>

              <p className="text-white/60 text-sm mt-4">Hours: 8:00 PM - 5:00 AM • Open 7 Days</p>
            </div>
          </div>
        )}

        {chatbotOpen && (
          <div className="fixed bottom-20 right-4 w-80 bg-black border-2 border-red-500 rounded-lg shadow-2xl z-50">
            <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h4 className="font-bold">Skin Cabaret Chat</h4>
              <button onClick={() => setChatbotOpen(false)} className="text-white hover:text-red-200 text-xl font-bold">
                ×
              </button>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.type === "user" ? "bg-red-600 text-white" : "bg-white/10 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/20">
              <form onSubmit={handleChatSubmit} className="flex space-x-2" data-form-type="Chat Form">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask about reservations..."
                  className="flex-1 p-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:border-red-500"
                />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm">
                  Send
                </Button>
              </form>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="fixed bottom-4 right-4 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-40 transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          💬
        </button>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 left-4 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center text-xl z-40 transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            ↑
          </button>
        )}
      </div>
    </>
  )
}
