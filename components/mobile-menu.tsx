"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Car } from "lucide-react"
import Image from "next/image"

interface MobileMenuProps {
  scrolled: boolean
}

export default function MobileMenu({ scrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menuItems = [
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Events", href: "#events" },
    { label: "Bachelor", href: "#bachelor" },
    { label: "VIP", href: "#vip" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-foreground hover:text-secondary hover:bg-transparent"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={closeMenu} />

          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background/95 backdrop-blur-md border-l border-border shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret Logo"
                  width={50}
                  height={50}
                  className="animate-glow"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMenu}
                  className="text-foreground hover:text-secondary"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="block text-xl font-bold uppercase tracking-wide text-foreground hover:text-secondary transition-colors duration-300 py-3 border-b border-border/30 hover:border-secondary/50"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer Actions */}
              <div className="p-6 border-t border-border space-y-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-bold uppercase tracking-wide"
                  onClick={() => {
                    window.location.href = "tel:4804257546"
                    closeMenu()
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-secondary text-sm font-bold uppercase tracking-wide">
                    <Car className="w-4 h-4" />
                    <span>Free VIP Shuttle</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">(480) 425-7546</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
