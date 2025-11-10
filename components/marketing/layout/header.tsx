"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, Film } from "lucide-react"

export interface NavLink {
  label: string
  href: string
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  logoText?: string
  navLinks?: NavLink[]
  ctaButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  transparent?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({
    logo,
    logoText = "BookTrailer Pro",
    navLinks = [],
    ctaButton,
    transparent = false,
    className,
    ...props
  }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const headerBg = transparent && !scrolled
      ? "bg-transparent"
      : "bg-white/80 backdrop-cinematic border-b border-slate-200 shadow-cinema-sm"

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          headerBg,
          className
        )}
        {...props}
      >
        <Container maxWidth="xl">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              {logo || (
                <>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition-transform duration-300">
                      <Film className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-xl font-display font-bold text-slate-900 tracking-tight">{logoText}</span>
                </>
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-gray-600 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              {ctaButton && (
                ctaButton.href ? (
                  <a href={ctaButton.href}>
                    <Button variant="primary" size="md">
                      {ctaButton.text}
                    </Button>
                  </a>
                ) : (
                  <Button variant="primary" size="md" onClick={ctaButton.onClick}>
                    {ctaButton.text}
                  </Button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-gray-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4 backdrop-cinematic">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm font-medium text-slate-700 hover:text-gray-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                {ctaButton && (
                  ctaButton.href ? (
                    <a href={ctaButton.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" size="md" fullWidth>
                        {ctaButton.text}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      onClick={() => {
                        ctaButton.onClick?.()
                        setMobileMenuOpen(false)
                      }}
                    >
                      {ctaButton.text}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}
        </Container>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
