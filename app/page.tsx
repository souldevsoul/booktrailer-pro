"use client"

import * as React from "react"
import Image from "next/image"
import { Button, Heading, Text } from "@/components/ui"
import { Footer } from "@/components/marketing/layout/footer"
import { NewsletterPopup } from "@/components/marketing/NewsletterPopup"
import {
  RiSparklingLine,
  RiFilmLine,
  RiFlashlightLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiArrowRightLine,
  RiPlayCircleLine,
  RiCheckLine,
  RiCloseLine,
  RiStarFill,
  RiClapperboardLine,
  RiVideoLine,
  RiBookLine,
  RiMagicLine,
} from "react-icons/ri"

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [currentTrailer, setCurrentTrailer] = React.useState(0)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  // Sample book trailers carousel
  const trailerExamples = [
    { genre: "Sci-Fi", title: "Beyond the Nebula", image: "/images/examples/scifi-space-1762953366054.png" },
    { genre: "Horror", title: "The Haunted Manor", image: "/images/examples/horror-mansion-1762953403955.png" },
    { genre: "Adventure", title: "Temple of Secrets", image: "/images/examples/adventure-jungle-1762953455059.png" },
    { genre: "Historical", title: "Echoes of War", image: "/images/examples/historical-war-1762953471442.png" },
    { genre: "Thriller", title: "Urban Shadows", image: "/images/examples/urban-crime-1762953491364.png" },
    { genre: "Fantasy", title: "Dragon's Legacy", image: "/images/examples/fantasy-dragon-1762953506535.png" },
    { genre: "Romance", title: "Paris in Spring", image: "/images/examples/romance-paris-1762952208346.png" },
    { genre: "Dystopian", title: "The Last City", image: "/images/examples/dystopian-city-1762952252197.png" },
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrailer((prev) => (prev + 1) % trailerExamples.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Features data
  const features = [
    {
      icon: RiMagicLine,
      title: "AI-Powered Generation",
      description: "Transform your book's essence into stunning cinematic trailers using cutting-edge AI video technology. Simply provide your book details, and watch as our AI creates a compelling visual story.",
    },
    {
      icon: RiClapperboardLine,
      title: "Cinematic Templates",
      description: "Choose from dozens of professionally designed templates tailored to your genre. From mystery thrillers to romance, each template captures the perfect mood and atmosphere.",
    },
    {
      icon: RiFlashlightLine,
      title: "Instant Generation",
      description: "Create broadcast-quality trailers in minutes, not days. Our optimized pipeline delivers 1080p HD videos faster than traditional video editing workflows.",
    },
    {
      icon: RiShieldCheckLine,
      title: "Copyright Safe",
      description: "All assets, music, and effects are fully licensed for commercial use. Your trailers are ready to publish on any platform without legal concerns.",
    },
    {
      icon: RiGlobalLine,
      title: "Multi-Platform Ready",
      description: "Export in formats optimized for YouTube, Instagram, TikTok, Amazon, and more. One click delivers the perfect specs for each platform.",
    },
    {
      icon: RiVideoLine,
      title: "Professional Quality",
      description: "Cinematic transitions, color grading, and effects that rival professional studios. Every frame designed to captivate your audience and drive sales.",
    },
  ]

  // Pricing data
  const pricingPlans = [
    {
      name: "Author",
      price: "$0",
      description: "Perfect for indie authors",
      features: [
        { text: "2 trailers per month", included: true },
        { text: "720p HD quality", included: true },
        { text: "10 template styles", included: true },
        { text: "Watermark included", included: true },
        { text: "1080p exports", included: false },
        { text: "Custom branding", included: false },
      ],
      ctaText: "Start Free",
      popular: false,
    },
    {
      name: "Publisher",
      price: "$49",
      description: "For professionals and publishers",
      features: [
        { text: "20 trailers per month", included: true },
        { text: "1080p HD quality", included: true },
        { text: "50+ template styles", included: true },
        { text: "No watermark", included: true },
        { text: "Custom branding", included: true },
        { text: "Priority rendering", included: true },
        { text: "Multi-platform exports", included: true },
      ],
      ctaText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Studio",
      price: "Custom",
      description: "For agencies and large publishers",
      features: [
        { text: "Unlimited trailers", included: true },
        { text: "4K quality", included: true },
        { text: "All templates + custom", included: true },
        { text: "White-label branding", included: true },
        { text: "Dedicated support", included: true },
        { text: "API access", included: true },
        { text: "Custom integrations", included: true },
        { text: "SLA guarantee", included: true },
      ],
      ctaText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-cinematic border-b border-slate-200 shadow-cinema-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition-transform duration-300">
              <RiFilmLine className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-slate-900 tracking-tight">BookTrailer Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-700 hover:text-gray-600 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-gray-600 transition-colors">Pricing</a>
            <a href="/about" className="text-sm font-medium text-slate-700 hover:text-gray-600 transition-colors">About</a>
            <a href="/contact" className="text-sm font-medium text-slate-700 hover:text-gray-600 transition-colors">Contact</a>
          </nav>
          <Button
            size="md"
            onClick={() => window.location.href = '/studio'}
          >
            Create Trailer
          </Button>
        </div>
      </header>

      {/* Hero Section - Hollywood Premiere Style */}
      <section className="relative overflow-hidden min-h-screen bg-black">
        {/* Red Carpet Background with Spotlights */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-900 to-black opacity-90" />
          {/* Animated Spotlights */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left Side - Cinematic Text Content */}
            <div className="space-y-8 lg:space-y-10">
              {/* Director's Clapperboard Badge */}
              <div className={`inline-flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="relative">
                  {/* Clapperboard */}
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-2xl transform -rotate-6 border-2 border-black">
                    <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-white via-gray-800 to-black" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RiClapperboardLine className="w-8 h-8 text-black" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono text-violet-400 uppercase tracking-widest">Now Playing</div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">BookTrailer Pro</div>
                </div>
              </div>

              {/* Movie Poster Style Headline */}
              <div className="space-y-6">
                {/* "From the creators of" style text */}
                <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                  <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-violet-500/30 rounded-full">
                    <span className="text-violet-300 text-sm font-semibold uppercase tracking-[0.3em]">Premiere Presentation</span>
                  </div>
                </div>

                {/* Main Headline - Movie Poster Style */}
                <h1 className="space-y-4">
                  {/* Top line - smaller, classic movie style */}
                  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                    <span className="block text-2xl md:text-3xl font-display font-bold text-violet-300 tracking-wider uppercase">
                      Transform Your Story
                    </span>
                  </div>

                  {/* Main title - HUGE and dramatic */}
                  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <span className="block text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black leading-none tracking-tight">
                      <span className="block text-white drop-shadow-2xl">FROM BOOK</span>
                      <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer" style={{ backgroundSize: '200% auto' }}>
                        TO BLOCKBUSTER
                      </span>
                    </span>
                  </div>
                </h1>

                {/* Tagline - Movie style */}
                <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
                  <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-xl">
                    Create cinematic book trailers in minutes. AI-powered video generation that turns your pages into premiere-worthy content.
                  </p>
                </div>
              </div>

              {/* Rating & Stats - Movie Style */}
              <div className={`flex flex-wrap items-center gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1000ms' }}>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <div className="h-6 w-px bg-gray-600" />
                <div className="text-gray-400 font-medium">1000+ Authors</div>
                <div className="h-6 w-px bg-gray-600" />
                <div className="text-gray-400 font-medium">50k+ Trailers</div>
              </div>

              {/* CTA Buttons - Premiere Style */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className={`${isVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                  <Button
                    size="xl"
                    className="gap-3 text-lg px-10 py-7 animate-pulse-glow relative overflow-hidden group"
                    onClick={() => window.location.href = '/studio'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <RiFilmLine className="w-6 h-6 relative z-10" />
                    <span className="relative z-10 font-bold">Start Creating</span>
                  </Button>
                </div>
                <div className={`${isVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
                  <Button
                    size="xl"
                    variant="outline"
                    className="gap-3 text-lg px-10 py-7 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                    onClick={() => window.location.href = '/demo'}
                  >
                    <RiPlayCircleLine className="w-6 h-6" />
                    <span className="font-bold">Watch Trailers</span>
                  </Button>
                </div>
              </div>

              {/* "In theaters now" style text */}
              <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1600ms' }}>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <RiSparklingLine className="w-4 h-4 text-violet-400" />
                  <span className="uppercase tracking-wider">No credit card required • Start free</span>
                </div>
              </div>
            </div>

            {/* Right Side - Film Strip Showcase */}
            <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-3'}`} style={{ transitionDelay: '800ms' }}>
              {/* Film Strip Container */}
              <div className="relative">
                {/* Main Film Strip Frame */}
                <div className="relative bg-black rounded-2xl shadow-2xl overflow-hidden border-8 border-black">
                  {/* Film perforations - Top */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 flex items-center justify-around px-4">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-4 h-3 bg-gray-800 rounded-sm" />
                    ))}
                  </div>

                  {/* Film perforations - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-20 flex items-center justify-around px-4">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-4 h-3 bg-gray-800 rounded-sm" />
                    ))}
                  </div>

                  {/* Split Screen Content */}
                  <div className="relative aspect-[9/16] md:aspect-[3/4] overflow-hidden">
                    {/* Book → Trailer Transformation */}
                    <div className="absolute inset-0 grid grid-cols-2 gap-1">
                      {/* Left: Book Cover */}
                      <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                        <div className="relative z-10 text-center space-y-4">
                          <RiBookLine className="w-20 h-20 text-amber-200 mx-auto drop-shadow-lg" />
                          <div className="text-amber-100 font-display font-bold text-xl uppercase tracking-wider">Your Book</div>
                        </div>
                        {/* Vertical divider */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
                      </div>

                      {/* Right: Movie Camera/Film */}
                      <div className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-pink-900 flex items-center justify-center p-6 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                        {/* Animated film reels */}
                        <div className="absolute top-8 right-8 w-16 h-16 border-8 border-pink-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
                          <div className="absolute inset-2 border-4 border-violet-400/30 rounded-full" />
                        </div>
                        <div className="absolute bottom-8 left-8 w-12 h-12 border-6 border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                          <div className="absolute inset-2 border-4 border-pink-400/30 rounded-full" />
                        </div>
                        <div className="relative z-10 text-center space-y-4">
                          <RiFilmLine className="w-20 h-20 text-violet-200 mx-auto drop-shadow-lg animate-pulse" style={{ animationDuration: '3s' }} />
                          <div className="text-violet-100 font-display font-bold text-xl uppercase tracking-wider">Cinematic Trailer</div>
                        </div>
                      </div>
                    </div>

                    {/* Transformation Arrow Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="bg-black/80 backdrop-blur-sm rounded-full p-6 border-4 border-white/20 shadow-2xl animate-pulse">
                        <RiArrowRightLine className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Film timecode overlay */}
                  <div className="absolute top-8 left-0 right-0 z-20 px-8 flex justify-between items-center text-xs font-mono text-white/60">
                    <span>00:00:00:00</span>
                    <span className="animate-pulse">⏺ REC</span>
                  </div>
                </div>

                {/* Floating camera icon */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 animate-float">
                  <RiVideoLine className="w-12 h-12 text-white" />
                </div>

                {/* Film roll decoration */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500 rounded-full shadow-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                  <RiMagicLine className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom premiere curtain effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      {/* Trailer Examples Carousel */}
      <section className="relative bg-gradient-dark py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Trailers That Captivate
            </h2>
            <p className="text-slate-300 text-lg">See what our AI can create for your book</p>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-cinema-2xl">
            {trailerExamples.map((example, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentTrailer ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={example.image}
                  alt={`${example.genre} trailer: ${example.title}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg mb-4">
                      <span className="text-sm font-semibold uppercase tracking-wider">{example.genre}</span>
                    </div>
                    <h3 className="text-5xl font-display font-bold">{example.title}</h3>
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <RiPlayCircleLine className="w-16 h-16 hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {trailerExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTrailer(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTrailer ? 'w-8 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full mb-6">
              <RiSparklingLine className="w-5 h-5 text-gray-600" />
              <Text variant="body-sm" className="text-gray-600 font-semibold uppercase tracking-wider">Features</Text>
            </div>
            <Heading variant="h2" className="mb-4 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900">Everything You Need</Heading>
            <Text variant="body-lg" className="text-slate-600 max-w-3xl mx-auto">
              Powerful features designed for authors, publishers, and literary professionals
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-cinema-md hover-lift">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-glow-indigo">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <Heading variant="h4" className="mb-4 text-slate-900 font-display">
                    {feature.title}
                  </Heading>
                  <Text variant="body" className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </Text>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-600 text-white rounded-full mb-6 shadow-cinema-md">
              <RiStarFill className="w-5 h-5" />
              <Text variant="body-sm" className="font-semibold uppercase tracking-wider">Pricing</Text>
            </div>
            <Heading variant="h2" className="mb-4 font-display text-4xl md:text-5xl lg:text-6xl text-slate-900">Choose Your Plan</Heading>
            <Text variant="body-lg" className="text-slate-600 max-w-3xl mx-auto">
              Start free, upgrade when you need more. All plans include core cinematic features.
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 ${
                  plan.popular
                    ? "bg-gradient-primary text-white border-gray-400 shadow-cinema-2xl"
                    : "bg-white border-slate-200 shadow-cinema-lg"
                }`}
              >
                {plan.popular && (
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg mb-6">
                    <Text variant="caption" className="text-white font-semibold uppercase tracking-wider">Most Popular</Text>
                  </div>
                )}
                <Heading variant="h3" className={`mb-2 font-display ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </Heading>
                <div className="mb-6">
                  <span className={`text-5xl font-display font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className={`text-lg font-medium ${plan.popular ? "text-white/80" : "text-slate-600"}`}>/mo</span>
                  )}
                </div>
                <Text variant="body" className={`mb-8 ${plan.popular ? "text-white/90" : "text-slate-600"}`}>
                  {plan.description}
                </Text>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <RiCheckLine className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-white" : "text-gray-600"}`} />
                      ) : (
                        <RiCloseLine className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-white/40" : "text-slate-400"}`} />
                      )}
                      <Text
                        variant="body-sm"
                        className={`${
                          feature.included
                            ? plan.popular ? "text-white" : "text-slate-900"
                            : plan.popular ? "text-white/40" : "text-slate-400"
                        } font-medium`}
                      >
                        {feature.text}
                      </Text>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  variant={plan.popular ? "secondary" : "primary"}
                  className="w-full gap-3"
                >
                  {plan.ctaText}
                  <RiArrowRightLine className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-cinema text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-cinema-lg">
            <RiSparklingLine className="w-5 h-5" />
            <Text variant="body-sm" className="font-semibold uppercase tracking-wider">Ready to Start?</Text>
          </div>
          <Heading variant="h1" className="mb-6 font-display text-5xl md:text-6xl lg:text-7xl">
            Bring Your Book to Life
          </Heading>
          <Text variant="body-lg" className="text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of authors and publishers using BookTrailer Pro to create cinematic trailers that captivate readers. Start your free trial today—no credit card required.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="xl"
              variant="secondary"
              className="gap-3 bg-white text-gray-600 hover:bg-slate-50"
              onClick={() => window.location.href = '/studio'}
            >
              <RiArrowRightLine className="w-5 h-5" />
              Start Free Trial
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="gap-3 border-2 border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/contact'}
            >
              <RiBookLine className="w-5 h-5" />
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Newsletter Popup */}
      <NewsletterPopup />
    </div>
  )
}
