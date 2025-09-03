"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  quickReplies?: string[]
}

export default function HelpChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Skin Cabaret! I'm here to help you with reservations, information about our services, and answer any questions you might have. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      quickReplies: ["Make Reservation", "VIP Services", "Hours & Location", "Bachelor Parties", "Contact Info"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text: string, isBot: boolean, quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      quickReplies,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleQuickReply = (reply: string) => {
    addMessage(reply, false)
    handleBotResponse(reply)
  }

  const handleBotResponse = (userMessage: string) => {
    setIsTyping(true)

    setTimeout(
      () => {
        setIsTyping(false)

        const lowerMessage = userMessage.toLowerCase()

        if (lowerMessage.includes("reservation") || lowerMessage.includes("book") || lowerMessage.includes("reserve")) {
          addMessage(
            "I'd be happy to help you with a reservation! For immediate booking, please call us at (480) 425-7546. Our staff can assist with:\n\n• VIP table reservations\n• Bachelor party packages\n• Special event bookings\n• Group reservations\n\nWould you like me to provide more information about any of these services?",
            true,
            ["VIP Tables", "Bachelor Parties", "Call Now", "Hours"],
          )
        } else if (lowerMessage.includes("vip") || lowerMessage.includes("services")) {
          addMessage(
            "Our VIP services include:\n\n• Private VIP booths with bottle service\n• Exclusive performer experiences\n• Premium champagne service\n• Personalized attention from our staff\n• Priority seating and reservations\n\nVIP packages start at $200 and can be customized for your group. Would you like to make a VIP reservation?",
            true,
            ["Make VIP Reservation", "Pricing Details", "Bachelor VIP", "Contact"],
          )
        } else if (
          lowerMessage.includes("hours") ||
          lowerMessage.includes("location") ||
          lowerMessage.includes("address")
        ) {
          addMessage(
            "📍 **Location & Hours:**\n\nSkin Cabaret\n1137 N Scottsdale Rd.\nScottsdale, AZ 85251\n\n🕐 **Hours:**\nDaily: 8:00 PM - 6:00 AM\n\n📞 **Phone:** (480) 425-7546\n✉️ **Email:** info@skincabaret.com\n\nWe're open 7 days a week! Free parking available.",
            true,
            ["Get Directions", "Make Reservation", "Contact Info", "VIP Services"],
          )
        } else if (
          lowerMessage.includes("bachelor") ||
          lowerMessage.includes("party") ||
          lowerMessage.includes("group")
        ) {
          addMessage(
            "🎉 **Bachelor Party Headquarters!**\n\nWe specialize in unforgettable bachelor party experiences:\n\n• Custom entertainment packages\n• VIP booth reservations\n• Bottle service and premium drinks\n• Professional DJ services\n• Group activities and games\n• Complimentary birthday/bachelor recognition\n\nPackages available 7 days a week! Call (480) 425-7546 to plan your celebration.",
            true,
            ["Call for Bachelor Party", "VIP Packages", "Pricing", "Make Reservation"],
          )
        } else if (
          lowerMessage.includes("contact") ||
          lowerMessage.includes("phone") ||
          lowerMessage.includes("call")
        ) {
          addMessage(
            "📞 **Contact Information:**\n\n**Phone:** (480) 425-7546\n**Email:** info@skincabaret.com\n**Address:** 1137 N Scottsdale Rd, Scottsdale, AZ 85251\n\n**Best times to call:**\n• 6:00 PM - 2:00 AM for same-day reservations\n• 12:00 PM - 6:00 PM for advance bookings\n\nOur staff is available to assist with reservations, VIP packages, and special events!",
            true,
            ["Call Now", "Make Reservation", "VIP Services", "Hours"],
          )
        } else if (
          lowerMessage.includes("price") ||
          lowerMessage.includes("cost") ||
          lowerMessage.includes("pricing")
        ) {
          addMessage(
            "💰 **Pricing Information:**\n\n**Cover Charge:** Varies by day/event\n**VIP Tables:** Starting at $200\n**Bachelor Packages:** Custom pricing\n**Bottle Service:** Premium selection available\n\nFor specific pricing and package details, please call (480) 425-7546. Our staff can create a custom quote based on your group size and preferences!",
            true,
            ["Call for Pricing", "VIP Packages", "Bachelor Parties", "Make Reservation"],
          )
        } else if (lowerMessage.includes("dress code") || lowerMessage.includes("attire")) {
          addMessage(
            "👔 **Dress Code:**\n\n**Men:** Collared shirts, dress pants, dress shoes required. No athletic wear, shorts, sandals, or hats.\n\n**Women:** Upscale casual to formal attire.\n\nWe maintain high standards to ensure a sophisticated atmosphere for all guests. Management reserves the right to refuse entry for inappropriate attire.",
            true,
            ["Make Reservation", "Contact Info", "Hours", "VIP Services"],
          )
        } else if (lowerMessage.includes("age") || lowerMessage.includes("21")) {
          addMessage(
            "🔞 **Age Requirements:**\n\n• Must be 21+ with valid government-issued ID\n• No exceptions - ID required for entry\n• We strictly enforce age verification\n\nValid forms of ID:\n• Driver's License\n• Passport\n• State-issued ID card\n• Military ID",
            true,
            ["Make Reservation", "Dress Code", "Hours", "Contact"],
          )
        } else {
          addMessage(
            "I'd be happy to help you with information about Skin Cabaret! I can assist with:\n\n• Making reservations\n• VIP services and packages\n• Bachelor party planning\n• Hours and location\n• Pricing information\n• Dress code requirements\n\nWhat would you like to know more about?",
            true,
            ["Make Reservation", "VIP Services", "Bachelor Parties", "Hours & Location", "Contact Info"],
          )
        }
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    addMessage(inputValue, false)
    handleBotResponse(inputValue)
    setInputValue("")
  }

  const handleCallAction = () => {
    window.location.href = "tel:+14804257546"
  }

  const handleEmailAction = () => {
    window.location.href = "mailto:info@skincabaret.com"
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-black border border-red-500/30 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-t-lg flex items-center gap-3">
            <Image
              src="/images/skin-logo-red-silhouette.png"
              alt="Skin Cabaret"
              width={32}
              height={32}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
            <div>
              <h3 className="text-white font-bold">Skin Cabaret Assistant</h3>
              <p className="text-white/80 text-sm">Here to help with reservations & info</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? "bg-red-900/30 border border-red-500/30 text-white"
                      : "bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  {message.quickReplies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-white text-xs px-3 py-1 rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-red-900/30 border border-red-500/30 text-white p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-red-500/30">
            <div className="flex gap-2 mb-3">
              <button
                onClick={handleCallAction}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
              >
                <Phone className="w-3 h-3" />
                Call Now
              </button>
              <button
                onClick={handleEmailAction}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
              >
                <Mail className="w-3 h-3" />
                Email
              </button>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-red-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about reservations, VIP services..."
                className="flex-1 bg-black/50 border border-red-500/40 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:border-red-400 focus:outline-none text-sm"
              />
              <Button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-red-600 hover:bg-red-700 text-white p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
