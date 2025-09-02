"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, Phone, Mail } from "lucide-react"
import Image from "next/image"

export default function SkinCabaretPage() {
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
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const openReservation = (type: "bachelor" | "vip" | "table" | "champagne" | "wm" | "football") => {
    setReservationPopup({ isOpen: true, type })
  }

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

  return (
    <div className="min-h-screen bg-black text-white">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            : "bg-black/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex justify-between items-center">
            <Image
              src="/images/skin-logo-red-silhouette.png"
              alt="Skin Cabaret Logo"
              width={60}
              height={60}
              className="hover:scale-110 transition-transform duration-300 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]"
            />

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === "home" ? "bg-red-600 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === "events" ? "bg-red-600 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                EVENTS
              </button>
              <button
                onClick={() => scrollToSection("bachelor")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === "bachelor" ? "bg-red-600 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                BACHELOR PARTY
              </button>
              <button
                onClick={() => scrollToSection("vip")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === "vip" ? "bg-red-600 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                VIP
              </button>
              <button
                onClick={() => scrollToSection("hiring")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === "hiring" ? "bg-red-600 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                HIRING
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === "contact" ? "bg-red-600 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                CONTACT
              </button>

              <div className="text-white/80 text-sm">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Logo Section - Above Hero */}
      <div className="relative z-20 pt-20 pb-4 flex justify-center">
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
          <Image src="/images/hero-bdsm-red-lighting.jpeg" alt="Skin Cabaret Hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-4 mt-16">
          <div className="animate-pulse-background rounded-lg px-8 py-4 border border-red-500/30">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              Where Sophistication Meets Seduction
            </h1>
          </div>
        </div>
      </section>

      {/* Buttons Section - Below Hero */}
      <div className="relative z-20 py-8 flex justify-center gap-6">
        <button
          onClick={() => setShowReservationPopup(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
        >
          SCHEDULE FREE RIDE
        </button>
        <button
          onClick={() => setAgeVerificationOpen(true)}
          className="bg-black/80 hover:bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-red-500/50"
        >
          21+ ONLY • NO ID NO ENTRY
        </button>
      </div>

      <section id="events" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            SPECIAL EVENTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
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
              <div
                className="relative group cursor-pointer hover:scale-105 transition-transform duration-300 flex justify-center"
                onClick={() => openReservation("champagne")}
              >
                <div className="relative w-72 h-44 overflow-hidden">
                  <Image src="/images/ornate-red-gold-frame.jpeg" alt="Ornate Frame" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                      CHAMPAGNE
                      <br />
                      SATURDAYS
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm px-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Premium champagne service with exclusive Saturday night entertainment
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/waste-management-phoenix-open.jpeg"
                  alt="WM Phoenix Open Week"
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
              <div
                className="relative group cursor-pointer hover:scale-105 transition-transform duration-300 flex justify-center"
                onClick={() => openReservation("wm")}
              >
                <div className="relative w-72 h-44 overflow-hidden">
                  <Image src="/images/ornate-red-gold-frame.jpeg" alt="Ornate Frame" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                      WM PHOENIX
                      <br />
                      OPEN WEEK
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm px-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Special events and entertainment during golf tournament week
              </p>
            </div>

            <div className="text-center space-y-4">
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
              <div
                className="relative group cursor-pointer hover:scale-105 transition-transform duration-300 flex justify-center"
                onClick={() => openReservation("football")}
              >
                <div className="relative w-72 h-44 overflow-hidden">
                  <Image src="/images/ornate-red-gold-frame.jpeg" alt="Ornate Frame" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                      SUNDAY NIGHT
                      <br />
                      FOOTBALL
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm px-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Watch the game with premium entertainment and drink specials
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="relative mb-4 flex justify-center">
                <Image
                  src="/images/bachelor-party-business-text.jpeg"
                  alt="Bachelor Party Celebration"
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
              <div
                className="relative group cursor-pointer hover:scale-105 transition-transform duration-300 flex justify-center"
                onClick={() => setAgeVerificationOpen(true)}
              >
                <div className="relative w-72 h-44 overflow-hidden">
                  <Image src="/images/ornate-red-gold-frame.jpeg" alt="Ornate Frame" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <h3 className="text-base font-black text-white uppercase tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10 leading-tight">
                      BACHELOR
                      <br />
                      PARTIES
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm px-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Complete bachelor party packages available 7 days a week
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="bachelor" className="py-20 bg-gradient-to-b from-black via-red-900/10 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            BACHELOR PARTY HEADQUARTERS
          </h2>

          <div className="text-center mb-12">
            <p className="text-xl text-white max-w-4xl mx-auto mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              We specialize in creating unforgettable bachelor party experiences that the groom and his crew will talk
              about for years. Our DJ works with your group to create custom entertainment that puts the bachelor in the
              spotlight.
            </p>
            <div className="text-white font-bold text-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              One of only 2 licensed strip clubs in Scottsdale (Skin Cabaret & sister club Bones Cabaret)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="relative group">
              <Image
                src="/images/bachelor-party-celebration.jpeg"
                alt="Bachelor Party Celebration"
                width={300}
                height={250}
                className="rounded-lg object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
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

            <div className="relative group">
              <Image
                src="/images/bachelor-party-table-entertainment.jpeg"
                alt="Bachelor Party Table Entertainment"
                width={300}
                height={250}
                className="rounded-lg object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
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

            <div className="relative group">
              <Image
                src="/images/bachelor-party-group-formal.jpeg"
                alt="Bachelor Party Group"
                width={300}
                height={250}
                className="rounded-lg object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
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
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              SIGNATURE BACHELOR EXPERIENCES
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  Custom DJ Entertainment
                </h4>
                <ul className="text-white space-y-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                  <li>• DJ calls performers to stage for single-file line of dances around the bachelor</li>
                  <li>• Bachelor gets center stage treatment with spotlight and music</li>
                  <li>• Group participation activities and games</li>
                  <li>• Bachelor can show off his own dance moves (fully clothed)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  Interactive Fun
                </h4>
                <ul className="text-white space-y-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                  <li>• Hilarious bachelor challenges and dares</li>
                  <li>• Photo opportunities and memorable moments</li>
                  <li>• Professional lap dances (only by licensed entertainers)</li>
                  <li>• Customized experiences based on group preferences</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative group">
              <Image
                src="/images/bachelor-party-experience.jpeg"
                alt="Bachelor Party Experience"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
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
            <div className="relative group">
              <Image
                src="/images/bachelor-party-performance.jpeg"
                alt="Bachelor Party Performance"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
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
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              BACHELOR PARTY PACKAGES
            </h3>
            <p className="text-white text-lg mb-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              Available 7 days a week with advance booking. Each package includes VIP seating, bottle service options,
              and personalized entertainment that makes the bachelor the star of the show.
            </p>
            <div className="text-white mb-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              <strong>Important:</strong> All lap dances and intimate entertainment are provided exclusively by licensed
              performers as required by Scottsdale city regulations. We maintain the highest professional standards.
            </div>
            <Button
              onClick={() => openReservation("bachelor")}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl px-12 py-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] border border-silver-400/30 hover:border-silver-300/50"
            >
              <Users className="w-6 h-6 mr-3 text-white" />
              <span className="text-white font-bold">BOOK BACHELOR PARTY</span>
            </Button>
          </div>
        </div>
      </section>

      {/* VIP Services Section */}
      <section id="vip" className="py-16 sm:py-24 bg-gradient-to-b from-background to-card/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 text-secondary animate-glow hover:scale-105 transition-transform duration-300">
            VIP & HERITAGE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/heritage-intimate-artistry.jpeg"
                  alt="VIP Sensual Experience"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">VIP SENSUAL EXPERIENCE</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Exclusive intimate experiences with our most sophisticated entertainers, featuring personalized
                  attention and premium service in our private VIP areas. Our professional staff ensures complete
                  discretion and an unforgettable experience tailored to your desires. Each session includes premium
                  beverages, private seating, and access to our most exclusive entertainment offerings.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/vip-blonde-martini.jpeg"
                  alt="VIP Martini Service"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">VIP MARTINI SERVICE</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Sophisticated martini service with our most elegant entertainers in an atmosphere of refined luxury
                  and complete discretion. Our premium bar service features top-shelf spirits, expertly crafted
                  cocktails, and personalized attention from our professional staff. Experience the perfect blend of
                  classic sophistication and modern allure in our exclusive VIP lounge areas.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/heritage-pole-performance.jpeg"
                  alt="Heritage Performance Art"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">HERITAGE PERFORMANCE ART</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Witness the artistry and skill of our heritage performers, showcasing the sophisticated entertainment
                  that has made Skin Cabaret legendary for over 15 years. Our performers combine athletic prowess with
                  artistic expression, creating mesmerizing displays of grace, strength, and sensuality. Each
                  performance is a celebration of the human form and the power of dance to captivate and inspire.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/vip-brunette-bar.jpeg"
                  alt="VIP Bar Experience"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">VIP BAR EXPERIENCE</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Intimate bar experiences with our most captivating entertainers in an upscale, sophisticated setting.
                  Our VIP bar area features premium spirits, craft cocktails, and personalized service from our
                  professional bartending staff. Enjoy exclusive access to our most alluring performers while savoring
                  expertly prepared drinks in an atmosphere of luxury and discretion.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/vip-neon-sign-broadway.jpeg"
                  alt="VIP Exclusivity"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">VIP EXCLUSIVITY</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Experience the ultimate in VIP treatment with exclusive access to our most premium entertainment
                  offerings and private areas. Our VIP exclusivity package includes priority seating, dedicated service
                  staff, premium beverage service, and access to special events and performances. Enjoy the highest
                  level of luxury and personalized attention in Scottsdale's most sophisticated adult entertainment
                  venue.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/skin-choker.jpeg"
                  alt="Heritage Sophistication"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">HERITAGE SOPHISTICATION</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Classic sophistication meets modern allure in our heritage entertainment experiences, representing the
                  timeless elegance that has defined Skin Cabaret since our founding. Our heritage performers embody the
                  perfect balance of classic beauty and contemporary sensuality, delivering performances that honor our
                  rich tradition while embracing modern artistic expression. Experience the legacy of excellence that
                  has made us Scottsdale's premier destination.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/club-atmosphere.jpeg"
                  alt="VIP Atmosphere"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">VIP ATMOSPHERE</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Immerse yourself in the sophisticated atmosphere that defines Skin Cabaret's VIP experience. Our
                  carefully curated environment combines luxurious furnishings, ambient lighting, and premium sound
                  systems to create the perfect backdrop for an unforgettable evening. Every detail has been designed to
                  enhance your comfort and enjoyment while maintaining the highest standards of elegance and discretion.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/vip-booth.jpeg"
                  alt="Private VIP Booths"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">PRIVATE VIP BOOTHS</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Enjoy complete privacy and luxury in our exclusive VIP booth areas, featuring plush seating, premium
                  bottle service, and dedicated staff attention. Each booth is designed for intimate gatherings and
                  special celebrations, offering the perfect balance of privacy and entertainment. Our VIP booths
                  provide an elevated experience with unobstructed views of our main stage and access to our most
                  exclusive performers.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/cabaret-neon.jpeg"
                  alt="Heritage Legacy"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">HERITAGE LEGACY</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Experience the rich heritage and legacy that has made Skin Cabaret a cornerstone of Scottsdale's
                  entertainment scene for over 15 years. Our commitment to excellence, professional standards, and
                  sophisticated entertainment has earned us recognition as Phoenix New Times "Best Of" winner for five
                  consecutive years. We continue to honor our heritage while evolving to meet the highest expectations
                  of our discerning clientele.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN US Video Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 glow-text">JOIN US</h2>
          <div className="max-w-4xl mx-auto">
            <video autoPlay muted loop playsInline className="w-full h-96 object-cover rounded-lg shadow-2xl">
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-vrq6EtaamtB0pXnvvEcPAzrUOPYEvP.mp4" type="video/mp4" />
            </video>
            <div className="mt-6 text-white">
              <p className="text-xl mb-4">Be Part of Scottsdale's Premier Adult Entertainment Experience</p>
              <p className="text-lg opacity-90">
                Join our team of professional entertainers and hospitality staff in creating unforgettable experiences
                for our distinguished clientele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-black via-red-900/5 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            GUEST REVIEWS
          </h2>

          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-white text-2xl">
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
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                    alt="Michael R."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">Michael R. - Phoenix</h4>
                    <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Best bachelor party venue in Scottsdale! Professional staff, amazing atmosphere, and the
                  entertainment was top-notch. Highly recommend for special occasions."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616c6106db4?w=60&h=60&fit=crop&crop=face"
                    alt="Sarah T."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">Sarah T. - Denver</h4>
                    <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Brought my husband here for his birthday and we both had an amazing time! The performers were
                  incredibly talented and the VIP service was exceptional."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/skin-logo-red-silhouette.png"
                    alt="Anonymous"
                    width={50}
                    height={50}
                    className="rounded-full mr-4 bg-red-600 p-2"
                  />
                  <div>
                    <h4 className="text-white font-bold">Marcus J. - Los Angeles</h4>
                    <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Flew in from LA for a business trip and this was the highlight! Sophisticated atmosphere, beautiful
                  performers, and world-class service. Will definitely be back."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=60&h=60&fit=crop&crop=face"
                    alt="James K."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">James K. - Chicago</h4>
                    <div className="flex text-white text-sm">★★★★★ • Yelp Review</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Classy establishment with beautiful performers. Great for business entertainment or special
                  celebrations. The VIP packages are definitely worth it."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face"
                    alt="Robert M."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">Robert M. - Atlanta</h4>
                    <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Outstanding venue! Professional atmosphere, talented entertainers, and excellent service. Perfect for
                  bachelor parties and corporate events."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/skin-logo-red-silhouette.png"
                    alt="Anonymous"
                    width={50}
                    height={50}
                    className="rounded-full mr-4 bg-red-600 p-2"
                  />
                  <div>
                    <h4 className="text-white font-bold">Antonio R. - Miami</h4>
                    <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Been to clubs all over Miami and this place sets the standard! The heritage and class they bring to
                  adult entertainment is unmatched. Truly bringing that old skin back!"
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=60&h=60&fit=crop&crop=face"
                    alt="Carlos M."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">Carlos M. - Las Vegas</h4>
                    <div className="flex text-white text-sm">★★★★★ • Yelp Review</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Traveled from Vegas for a friend's bachelor party. This place exceeded all expectations! The VIP
                  experience was incredible and the performers were absolutely stunning."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                    alt="David L."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">David L. - San Diego</h4>
                    <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "VIP treatment from start to finish. Clean facility, professional dancers, and excellent customer
                  service. Worth every penny for a special night out."
                </p>
              </div>

              {/* Duplicate set for seamless scrolling */}
              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                    alt="Michael R."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">Michael R. - Phoenix</h4>
                    <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Best bachelor party venue in Scottsdale! Professional staff, amazing atmosphere, and the
                  entertainment was top-notch. Highly recommend for special occasions."
                </p>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616c6106db4?w=60&h=60&fit=crop&crop=face"
                    alt="Sarah T."
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold">Sarah T. - Denver</h4>
                    <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  "Brought my husband here for his birthday and we both had an amazing time! The performers were
                  incredibly talented and the VIP service was exceptional."
                </p>
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="mt-12 bg-gradient-to-br from-red-900/20 to-black border border-red-500/40 p-8 rounded-lg max-w-2xl mx-auto">
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
      <section className="py-16 bg-gradient-to-b from-black to-red-900/20">
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

      <section id="hiring" className="py-20 bg-gradient-to-b from-black to-red-900/20 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              BE PART OF THE EXPERIENCE
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              Join Scottsdale's premier adult entertainment destination. We're seeking professional, licensed
              entertainers and experienced hospitality staff.
            </p>
          </div>

          {/* Entertainer Positions */}
          <div className="mb-16">
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
          <div className="mb-16">
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

          <div className="text-center">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black via-red-900/10 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            CONTACT & LOCATION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Visit Us</h3>
              <div className="text-white/90 space-y-2">
                <p className="text-lg font-semibold">Skin Cabaret</p>
                <p>1137 N Scottsdale Rd.</p>
                <p>Scottsdale, AZ 85251</p>
                <p className="mt-4 text-red-400">Open 7 Days a Week</p>
                <p className="text-white/80">Mon-Sun: 8:00 PM - 6:00 AM</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-8 rounded-lg">
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

          {/*
          <h2 className="text-4xl font-black text-white mb-8 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">CONTACT US</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">RESERVATIONS & VIP</h3>
              <p className="text-white mb-4">
                <a href="tel:+14804257546" className="hover:text-red-400 transition-colors">
                  (480) 425-7546
                </a>
              </p>
              <p className="text-white/80">Call for bachelor parties, VIP reservations, and special events</p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">EMAIL INQUIRIES</h3>
              <p className="text-white mb-4">
                <a href="mailto:info@skincabaret.com" className="hover:text-red-400 transition-colors">
                  info@skincabaret.com
                </a>
              </p>
              <p className="text-white/80">General inquiries and information requests</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-6">LOCATION & HOURS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">ADDRESS</h4>
                <p className="text-white/90">
                  Scottsdale, Arizona
                  <br />
                  (Exact address provided upon reservation)
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">HOURS</h4>
                <p className="text-white/90">
                  Monday - Sunday: 8:00 PM - 6:00 AM
                  <br />
                  Private events available by appointment
                </p>
              </div>
            </div>
          </div>
          */}
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
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-white/70 text-sm">
                <p>1137 N Scottsdale Rd.</p>
                <p>Scottsdale, AZ 85257</p>
                <p>(480) 425-7546</p>
                <p>info@skincabaret.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Hours & Policies</h4>
              <div className="space-y-2 text-white/70 text-sm">
                <p>8:00 PM - 6:00 AM Daily</p>
                <p>No Cameras/Recording</p>
                <p>No Outside Food/Drinks</p>
                <p>Management Reserves All Rights</p>
                <p>Zero Tolerance Policy</p>
              </div>
            </div>
          </div>

          <div className="border-t border-red-600/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/60 text-sm mb-4 md:mb-0">
                © 2025-2026 Skin Cabaret. All rights reserved. |
                <span className="ml-1">Adult Entertainment Venue - 21+ Only</span>
              </div>
              <div className="text-white/60 text-sm">
                Website Design by{" "}
                <a href="https://glyphlock.com" className="text-red-400 hover:text-red-300 transition-colors">
                  Glyphlock LLC
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Age Verification Popup */}
      {ageVerificationOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-900/40 to-black border border-red-500/60 p-8 rounded-lg max-w-md w-full text-center relative">
            <button
              onClick={() => setAgeVerificationOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>

            <div className="mb-6">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret Logo"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-white mb-2">21+ TO ENTER SITE</h2>
              <p className="text-white/80">
                This website contains adult content. You must be 21 years or older to enter.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAgeVerification}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                I AM 21 OR OLDER - ENTER
              </button>
              <button
                onClick={() => (window.location.href = "https://google.com")}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                I AM UNDER 21 - EXIT
              </button>
            </div>

            <p className="text-white/60 text-xs mt-4">
              By entering this site, you confirm that you are 21 years or older and agree to our terms of service.
            </p>
          </div>
        </div>
      )}

      {/* Reservation Popup */}
      {showReservationPopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-900/40 to-black border border-red-500/60 p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setShowReservationPopup(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-white mb-6 text-center">Make a Reservation</h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
              />
              <select className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white focus:border-red-400 focus:outline-none">
                <option value="">Select Service</option>
                <option value="bachelor">Bachelor Party</option>
                <option value="vip">VIP Experience</option>
                <option value="table">Table Service</option>
                <option value="champagne">Champagne Saturday</option>
              </select>
              <textarea
                placeholder="Special requests or details..."
                rows={3}
                className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                Submit Reservation Request
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm mb-2">Or call directly:</p>
              <a href="tel:+14804257546" className="text-red-400 hover:text-red-300 font-bold text-lg">
                (480) 425-7546
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
