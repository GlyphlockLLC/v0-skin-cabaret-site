"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function SkinCabaretSite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [reservationPopup, setReservationPopup] = useState({ isOpen: false, type: "bachelor" })
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

  const [showRideForm, setShowRideForm] = useState(false)
  const [showHiringForm, setShowHiringForm] = useState(false)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [showPickupPopup, setShowPickupPopup] = useState(false)
  const [showAgeVerification, setShowAgeVerification] = useState(true)

  const [pickupForm, setPickupForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    passengers: "",
    requests: "",
  })
  const [rideFormData, setRideFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupAddress: "",
    pickupTime: "",
    groupSize: "",
    specialRequests: "",
  })
  const [hiringForm, setHiringForm] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    position: "",
    experience: "",
    ageConfirm: false,
  })
  const [chatInput, setChatInput] = useState("")

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
    const timer = setTimeout(() => {
      setShowPickupPopup(true)
    }, 100) // Show pickup popup immediately when site loads
    return () => clearTimeout(timer)
  }, [])

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
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax")

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })

      setShowBackToTop(scrolled > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  const [reviews, setReviews] = useState([
    {
      name: "Marcus T.",
      location: "Phoenix, AZ",
      rating: 5,
      text: "Incredible night out! The entertainment was top-notch and the VIP service exceeded expectations. Definitely coming back.",
      date: "2024-01-15",
      avatar: "/images/customer-chicago.png",
    },
    {
      name: "Jessica L.",
      location: "Scottsdale, AZ",
      rating: 4,
      text: "Great atmosphere and friendly staff. The drinks were delicious and the music was on point. Will visit again!",
      date: "2023-12-28",
      avatar: "/images/customer-blonde.jpeg",
    },
    {
      name: "David K.",
      location: "Tempe, AZ",
      rating: 5,
      text: "Best adult entertainment venue in the valley! The performers are talented and the service is impeccable.",
      date: "2023-12-15",
      avatar: "/images/customer-suit.jpeg",
    },
    {
      name: "Ashley M.",
      location: "Chandler, AZ",
      rating: 4,
      text: "Had a fun night with my friends. The VIP package was worth it for the private seating and bottle service.",
      date: "2023-11-30",
      avatar: "/images/customer-dress.jpeg",
    },
    {
      name: "Robert B.",
      location: "Glendale, AZ",
      rating: 5,
      text: "Excellent venue for a bachelor party. The staff was accommodating and the entertainment was unforgettable.",
      date: "2023-11-15",
      avatar: "/images/customer-beard.jpeg",
    },
    {
      name: "Tiffany S.",
      location: "Mesa, AZ",
      rating: 4,
      text: "Enjoyed the sophisticated atmosphere and the professional dancers. A great place for a night out.",
      date: "2023-10-31",
      avatar: "/images/customer-hair.jpeg",
    },
    {
      name: "Michael R.",
      location: "Phoenix, AZ",
      rating: 5,
      text: "Top-notch entertainment and service. The staff is friendly and the venue is clean and well-maintained.",
      date: "2023-10-15",
      avatar: "/images/customer-glasses.jpeg",
    },
    {
      name: "Samantha J.",
      location: "Scottsdale, AZ",
      rating: 4,
      text: "Had a memorable night with my girlfriends. The VIP experience was exceptional and the performers were stunning.",
      date: "2023-09-30",
      avatar: "/images/customer-hat.jpeg",
    },
    {
      name: "Kevin L.",
      location: "Tempe, AZ",
      rating: 5,
      text: "The best adult entertainment venue in Scottsdale. The staff is professional and the atmosphere is electric.",
      date: "2023-09-15",
      avatar: "/images/customer-jacket.jpeg",
    },
    {
      name: "Brittany P.",
      location: "Chandler, AZ",
      rating: 4,
      text: "A great place to celebrate a special occasion. The VIP service was outstanding and the entertainment was top-notch.",
      date: "2023-08-31",
      avatar: "/images/customer-lipstick.jpeg",
    },
  ])

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: "",
    text: "",
  })

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.name && newReview.location && newReview.rating && newReview.text) {
      const review = {
        ...newReview,
        rating: Number.parseInt(newReview.rating),
        date: new Date().toISOString().split("T")[0],
        avatar: "/images/customer-chicago.png",
      }
      setReviews([review, ...reviews])
      setNewReview({ name: "", location: "", rating: "", text: "" })
      setShowReviewForm(false)
      // Add success animation
      const successMsg = document.createElement("div")
      successMsg.className = "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg z-50 animate-bounce"
      successMsg.textContent = "Review posted successfully!"
      document.body.appendChild(successMsg)
      setTimeout(() => document.body.removeChild(successMsg), 3000)
    }
  }

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle pickup submission logic here
    console.log("Pickup form submitted:", pickupForm)
    setShowPickupPopup(false)
  }

  const handleHiringSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle hiring submission logic here
    console.log("Hiring form submitted:", hiringForm)
    setShowHiringForm(false)
  }

  const allReviews = [
    {
      name: "Marcus T.",
      location: "Phoenix, AZ",
      rating: 5,
      review:
        "Incredible night out! The entertainment was top-notch and the VIP service exceeded expectations. Definitely coming back.",
    },
    {
      name: "Jessica L.",
      location: "Scottsdale, AZ",
      rating: 4,
      review:
        "Great atmosphere and friendly staff. The drinks were delicious and the music was on point. Will visit again!",
    },
    {
      name: "David K.",
      location: "Tempe, AZ",
      rating: 5,
      review:
        "Best adult entertainment venue in the valley! The performers are talented and the service is impeccable.",
    },
    {
      name: "Ashley M.",
      location: "Chandler, AZ",
      rating: 4,
      review:
        "Had a fun night with my friends. The VIP package was worth it for the private seating and bottle service.",
    },
    {
      name: "Robert B.",
      location: "Glendale, AZ",
      rating: 5,
      review:
        "Excellent venue for a bachelor party. The staff was accommodating and the entertainment was unforgettable.",
    },
    {
      name: "Tiffany S.",
      location: "Mesa, AZ",
      rating: 4,
      review: "Enjoyed the sophisticated atmosphere and the professional dancers. A great place for a night out.",
    },
    {
      name: "Michael R.",
      location: "Phoenix, AZ",
      rating: 5,
      review: "Top-notch entertainment and service. The staff is friendly and the venue is clean and well-maintained.",
    },
    {
      name: "Samantha J.",
      location: "Scottsdale, AZ",
      rating: 4,
      review:
        "Had a memorable night with my girlfriends. The VIP experience was exceptional and the performers were stunning.",
    },
    {
      name: "Kevin L.",
      location: "Tempe, AZ",
      rating: 5,
      review:
        "The best adult entertainment venue in Scottsdale. The staff is professional and the atmosphere is electric.",
    },
    {
      name: "Brittany P.",
      location: "Chandler, AZ",
      rating: 4,
      review:
        "A great place to celebrate a special occasion. The VIP service was outstanding and the entertainment was top-notch.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(239, 68, 68, 1));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-delay-200 {
          transition-delay: 0.2s;
        }

        .animate-delay-400 {
          transition-delay: 0.4s;
        }

        .animate-delay-600 {
          transition-delay: 0.6s;
        }

        .animate-logo-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-background {
          background: linear-gradient(45deg, rgba(0,0,0,0.8), rgba(239,68,68,0.1), rgba(0,0,0,0.8));
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
        }

        .card-glow {
          position: relative;
          overflow: hidden;
        }

        .card-glow::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c, #ef4444);
          background-size: 400% 400%;
          border-radius: inherit;
          z-index: -1;
          animation: shimmer 4s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card-glow:hover::before {
          opacity: 1;
        }

        .text-shimmer {
          background: linear-gradient(90deg, #ffffff, #ff6b6b, #ffffff);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.6));
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(239, 68, 68, 0.9));
          }
        }

        .neon-border {
          border: 2px solid #ef4444;
          box-shadow: 
            0 0 10px #ef4444,
            inset 0 0 10px rgba(239, 68, 68, 0.1);
          transition: all 0.3s ease;
        }

        .neon-border:hover {
          box-shadow: 
            0 0 20px #ef4444,
            0 0 40px #ef4444,
            inset 0 0 20px rgba(239, 68, 68, 0.2);
        }

        .stagger-animation > * {
          animation-delay: calc(var(--stagger) * 0.1s);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={40}
                height={40}
                className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-float"
              />
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("events")}
                  className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                >
                  Sports Events
                </button>
                <button
                  onClick={() => scrollToSection("hiring")}
                  className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                >
                  Careers
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-screen h-full object-cover scale-110"
          style={{ playbackRate: 0.7, opacity: 0.6 }}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%204-qQA5J32Xs8vmZNT2wm97AOezvBTPbB.webm" type="video/webm" />
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-jqRqb6rf8i9YFjT6RFomZi1aAjNVSA.webm" type="video/webm" />
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%203-RTTz79kdeCoRBdybhGCX7ut3ABz3ow.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="animate-float">
            <Image
              src="/images/skin-logo-red-silhouette.png"
              alt="Skin Cabaret Logo"
              width={400}
              height={400}
              className="object-contain animate-logo-glow drop-shadow-[0_0_40px_rgba(239,68,68,0.8)] hover:scale-110 transition-all duration-500"
              quality={95}
            />
          </div>
        </div>

        <div className="absolute bottom-20 left-0 right-0 z-20 text-center px-4 animate-on-scroll animate-delay-400">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-pulse-glow mb-3">
              Scottsdale's Premier Adult Entertainment Experience
            </h2>
            <p className="text-sm sm:text-base text-white/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] animate-fade-in-up">
              Luxury • Sophistication • Unforgettable Nights
            </p>
            <div className="mt-4 text-red-400 font-bold text-lg animate-pulse">21+ ONLY • VALID ID REQUIRED</div>
          </div>
        </div>

        {/* Updated schedule ride button to call club popup and changed age requirement to 19+ */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 animate-on-scroll animate-delay-600">
          <button
            onClick={() => setShowCallPopup(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] hover:scale-105 hover:-translate-y-2 animate-pulse-border"
          >
            CALL THE CLUB
          </button>
        </div>
      </section>

      {/* Sports Events Section */}
      <section id="sports" className="relative py-20 overflow-hidden">
        <iframe
          className="absolute inset-0 w-screen h-full object-cover scale-110"
          src="https://www.youtube.com/embed/a63-JQocRsc?autoplay=1&mute=1&loop=1&playlist=a63-JQocRsc&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1&playsinline=1"
          style={{ opacity: 0.2 }}
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4 animate-on-scroll">
            SPORTS EVENTS
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-200">
            Watch your favorite teams while enjoying premium entertainment and VIP service
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-animation">
            {[
              {
                title: "Sunday Night Football",
                image: "/images/nbc-sunday-night-football.jpeg",
                description:
                  "Premium viewing experience with exclusive entertainment during every Sunday Night Football game.",
                delay: 0,
              },
              {
                title: "Championship Boxing",
                image: "/images/hbo-boxing-ppv.jpeg",
                description:
                  "Watch major boxing events on our big screens with VIP table service and live entertainment.",
                delay: 1,
              },
              {
                title: "NBA Playoffs",
                image: "/images/nba-playoffs.png",
                description:
                  "Experience playoff intensity with our sophisticated entertainment and premium atmosphere.",
                delay: 2,
              },
              {
                title: "Golf Tournaments",
                image: "/images/waste-management-phoenix-open.jpeg",
                description: "Celebrate major golf events including the Waste Management Phoenix Open with style.",
                delay: 3,
              },
            ].map((event, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-red-500/30 hover-lift card-glow animate-on-scroll"
                style={{ "--stagger": event.delay }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Experiences Section */}
      <section className="relative py-20 overflow-hidden">
        <iframe
          className="absolute inset-0 w-screen h-full object-cover scale-110"
          src="https://www.youtube.com/embed/pMTC0djh5BA?autoplay=1&mute=1&loop=1&playlist=pMTC0djh5BA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1&playsinline=1"
          style={{ opacity: 0.15 }}
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4 animate-on-scroll text-center">
              CUSTOMER EXPERIENCES
            </h2>
            <p className="text-lg sm:text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-200">
              Hear what our guests have to say about their unforgettable nights at Skin Cabaret
            </p>
          </div>

          {/* Scrolling Reviews */}
          <div className="relative mb-12 animate-on-scroll animate-delay-400">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {allReviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-gradient-to-b from-gray-900 to-black rounded-lg p-6 border border-red-500/30 hover-lift card-glow"
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
          <div className="text-center animate-on-scroll animate-delay-600">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
            >
              {showReviewForm ? "Cancel" : "Share Your Experience"}
            </button>

            {/* Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="mt-8 max-w-2xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 border border-red-500/30"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your Location"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
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
                        className={`w-8 h-8 ${star <= newReview.rating ? "text-red-500" : "text-gray-600"} hover:text-red-400 transition-colors duration-200`}
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
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 mb-6"
                  required
                ></textarea>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
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
      <section id="careers" className="relative py-20 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/a63-JQocRsc?autoplay=1&mute=1&loop=1&playlist=a63-JQocRsc&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1&playsinline=1"
          className="absolute inset-0 w-screen h-full object-cover scale-110 opacity-15"
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4 animate-on-scroll">
            JOIN OUR TEAM
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-200">
            Be part of Scottsdale's premier adult entertainment experience. We're looking for professional, dedicated
            individuals to join our elite team.
          </p>
          <div className="text-center mb-12 animate-on-scroll animate-delay-400">
            <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
              Must be 19+ to work • Open 7 days a week
            </div>
          </div>

          {/* Hiring Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Bartenders",
                icon: (
                  <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.5 7L10.5 4h3l3 3v2l-7 7-7-7V7h5zm4.5-2a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                ),
                description:
                  "Create exceptional cocktails and provide outstanding customer service in our upscale environment.",
                delay: 0,
              },
              {
                title: "Hostess",
                icon: (
                  <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 9.8 15.2 10.6 15.7 11.3L17.5 14H19L21 9ZM9 13.5V22H11V16H13V22H15V13.5L12 8L9 13.5Z" />
                  </svg>
                ),
                description: "Welcome guests and ensure they have an exceptional experience from arrival to departure.",
                delay: 1,
              },
              {
                title: "Cocktail Servers",
                icon: (
                  <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 14H6V12H18M19 10H5C4.45 10 4 10.45 4 11V15C4 15.55 4.45 16 5 16H19C19.55 16 20 15.55 20 15V11C20 10.45 19.55 10 19 10M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2M8 7H16V9H8V7Z" />
                  </svg>
                ),
                description: "Provide premium beverage service to our VIP clientele with professionalism and charm.",
                delay: 2,
              },
              {
                title: "Security",
                icon: (
                  <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                  </svg>
                ),
                description: "Maintain a safe and secure environment while providing excellent customer service.",
                delay: 3,
              },
            ].map((position, index) => (
              <div
                key={index}
                className="group bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 border border-red-500/30 hover-lift card-glow animate-on-scroll"
                style={{ "--stagger": position.delay }}
              >
                {position.icon}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                  {position.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{position.description}</p>
                <button
                  onClick={() => setShowHiringForm(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/pMTC0djh5BA?autoplay=1&mute=1&loop=1&playlist=pMTC0djh5BA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1&playsinline=1"
          className="absolute inset-0 w-screen h-full object-cover scale-110 opacity-15"
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4 animate-on-scroll">CONTACT US</h2>
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-200">
            Ready to experience Scottsdale's premier adult entertainment? Get in touch with us today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 rounded-lg p-8 border border-red-500/30 hover-lift animate-on-scroll backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-white/80">(480) 425-7546</p>
            </div>

            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 rounded-lg p-8 border border-red-500/30 hover-lift animate-on-scroll animate-delay-200 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
              <p className="text-white/80">
                7 Days a Week
                <br />8 PM - 5 AM
              </p>
            </div>

            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 rounded-lg p-8 border border-red-500/30 hover-lift animate-on-scroll animate-delay-400 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-white/80">Scottsdale, Arizona</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative py-20 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/pMTC0djh5BA?autoplay=1&mute=1&loop=1&playlist=pMTC0djh5BA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1&playsinline=1&start=30"
          className="absolute inset-0 w-screen h-full object-cover scale-110 opacity-12"
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shimmer mb-4 animate-on-scroll">FOLLOW US</h2>
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-on-scroll animate-delay-200">
            Stay connected with Skin Cabaret for exclusive content, events, and behind-the-scenes moments
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 border border-red-500/30 hover-lift card-glow animate-on-scroll hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Facebook</h3>
              <p className="text-white/70 mb-6">Follow us for exclusive content and updates</p>
              <button
                onClick={() =>
                  shareOnSocial(
                    "facebook",
                    "Check out Skin Cabaret - Scottsdale's Premier Adult Entertainment",
                    window.location.href,
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Follow Us
              </button>
            </div>

            <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 border border-red-500/30 hover-lift card-glow animate-on-scroll animate-delay-200 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Twitter</h3>
              <p className="text-white/70 mb-6">Get the latest news and behind-the-scenes content</p>
              <button
                onClick={() =>
                  shareOnSocial(
                    "twitter",
                    "Check out Skin Cabaret - Scottsdale's Premier Adult Entertainment",
                    window.location.href,
                  )
                }
                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Follow Us
              </button>
            </div>

            <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 border border-red-500/30 hover-lift card-glow animate-on-scroll animate-delay-400 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Instagram</h3>
              <p className="text-white/70 mb-6">VIP experiences and special events</p>
              <button
                onClick={() =>
                  shareOnSocial(
                    "instagram",
                    "Check out Skin Cabaret - Scottsdale's Premier Adult Entertainment",
                    window.location.href,
                  )
                }
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Follow Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={60}
                height={60}
                className="mx-auto md:mx-0 mb-4 animate-float"
              />
              <p className="text-white/60 text-sm">
                Scottsdale's premier adult entertainment venue offering sophisticated experiences and VIP service.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <p className="text-white/80 text-sm mb-2">Phone: (480) 425-7546</p>
              <p className="text-white/80 text-sm mb-2">Hours: 7 Days a Week</p>
              <p className="text-white/80 text-sm">8 PM - 5 AM</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Requirements</h4>
              <p className="text-white/80 text-sm mb-2">21+ to enter</p>
              <p className="text-white/80 text-sm mb-2">Valid ID required</p>
              <p className="text-white/80 text-sm">Professional attire preferred</p>
            </div>
          </div>

          <div className="border-t border-red-500/30 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025-2026 Skin Cabaret. All rights reserved. Must be 21+ to enter.
            </p>
          </div>
        </div>
      </footer>

      {/* Pickup Service Popup */}
      {showPickupPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 max-w-md w-full border border-red-500/30 relative">
            <div className="relative h-32 mb-6 rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full object-cover"
                src="https://www.youtube.com/embed/10tGk0u93qQ?autoplay=1&mute=1&loop=1&playlist=10tGk0u93qQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1&playsinline=1&title=0&byline=0&portrait=0&color=ffffff&autopause=0&annotations=0&branding=0"
                allow="autoplay; encrypted-media"
              />
            </div>

            <form onSubmit={handlePickupSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={pickupForm.name}
                  onChange={(e) => setPickupForm({ ...pickupForm, name: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={pickupForm.phone}
                  onChange={(e) => setPickupForm({ ...pickupForm, phone: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Pickup Address"
                value={pickupForm.address}
                onChange={(e) => setPickupForm({ ...pickupForm, address: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={pickupForm.date}
                  onChange={(e) => setPickupForm({ ...pickupForm, date: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  required
                />
                <input
                  type="time"
                  value={pickupForm.time}
                  onChange={(e) => setPickupForm({ ...pickupForm, time: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  required
                />
              </div>
              <input
                type="number"
                placeholder="Number of Passengers"
                value={pickupForm.passengers}
                onChange={(e) => setPickupForm({ ...pickupForm, passengers: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              />
              <textarea
                placeholder="Special Requests"
                value={pickupForm.requests}
                onChange={(e) => setPickupForm({ ...pickupForm, requests: e.target.value })}
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              ></textarea>

              <div className="text-center text-white/80 text-sm mb-4">
                Or call us after 8pm: <span className="text-red-400 font-bold">(480) 425-7546</span>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
                >
                  Schedule Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setShowPickupPopup(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Call Club Popup */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 max-w-md w-full border border-red-500/30 text-center">
            <div className="relative h-32 mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/customer-chicago.png"
                alt="Girls Girls Girls Neon Sign"
                fill
                className="object-cover"
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
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                Call Now
              </a>
              <button
                onClick={() => setShowCallPopup(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hiring Form Popup */}
      {showHiringForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-8 max-w-md w-full border border-red-500/30 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Join Our Team</h3>
            <form onSubmit={handleHiringSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={hiringForm.name}
                onChange={(e) => setHiringForm({ ...hiringForm, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={hiringForm.phone}
                onChange={(e) => setHiringForm({ ...hiringForm, phone: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={hiringForm.email}
                onChange={(e) => setHiringForm({ ...hiringForm, email: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={hiringForm.age}
                onChange={(e) => setHiringForm({ ...hiringForm, age: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              />
              <select
                value={hiringForm.position}
                onChange={(e) => setHiringForm({ ...hiringForm, position: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              >
                <option value="">Select Position</option>
                <option value="bartender">Bartender</option>
                <option value="hostess">Hostess</option>
                <option value="server">Cocktail Server</option>
                <option value="security">Security</option>
              </select>
              <textarea
                placeholder="Previous Experience"
                value={hiringForm.experience}
                onChange={(e) => setHiringForm({ ...hiringForm, experience: e.target.value })}
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                required
              ></textarea>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ageConfirm"
                  checked={hiringForm.ageConfirm}
                  onChange={(e) => setHiringForm({ ...hiringForm, ageConfirm: e.target.checked })}
                  className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
                  required
                />
                <label htmlFor="ageConfirm" className="text-white/80 text-sm">
                  I confirm I am 19+ years old and eligible to work
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowHiringForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot */}
      {chatbotOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-red-500/30 shadow-2xl z-40 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-red-500/30">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={24}
                height={24}
                className="animate-pulse"
              />
              <span className="text-white font-bold">Skin Assistant</span>
            </div>
            <button onClick={() => setChatbotOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.type === "user" ? "bg-red-600 text-white" : "bg-gray-700 text-white border border-red-500/30"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-red-500/30">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="text-xs bg-gray-700 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
                >
                  {response}
                </button>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-red-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30 animate-pulse-glow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30 animate-bounce"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}
