"use client"

import * as React from "react"
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
    { genre: "Thriller", title: "The Silent Echo", bg: "from-slate-900 to-gray-900" },
    { genre: "Romance", title: "Moonlit Promises", bg: "from-gray-900 to-pink-900" },
    { genre: "Sci-Fi", title: "Beyond the Nebula", bg: "from-gray-900 to-gray-900" },
    { genre: "Mystery", title: "The Last Clue", bg: "from-slate-900 to-gray-900" },
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
            onClick={() => window.location.href = '/dashboard'}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50/30 to-gray-50/30 min-h-[90vh] flex items-center">
        {/* Spotlight effect */}
        <div className="absolute inset-0 spotlight-overlay pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center space-y-12">
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white rounded-full shadow-cinema-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <RiSparklingLine className="w-5 h-5" />
              <Text variant="body-sm" className="font-semibold uppercase tracking-wider">AI-Powered Book Trailers</Text>
            </div>

            {/* Big Revealing Text */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                <span className={`block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-slate-900">Turn Your Book Into</span>
                </span>
                <span className={`block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-gradient-cinema">A Cinematic Trailer</span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Text variant="lead" className="text-slate-700 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
                Create stunning, professional book trailers in minutes. AI-powered video generation that captures your story's essence and drives reader engagement.
              </Text>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap justify-center gap-6 pt-4 transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                size="xl"
                className="gap-3"
                onClick={() => window.location.href = '/dashboard'}
              >
                <RiArrowRightLine className="w-6 h-6" />
                Create Your Trailer
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="gap-3"
                onClick={() => window.location.href = '/demo'}
              >
                <RiPlayCircleLine className="w-6 h-6" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
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
                className={`absolute inset-0 bg-gradient-to-br ${example.bg} flex items-center justify-center transition-opacity duration-1000 ${
                  index === currentTrailer ? 'opacity-100' : 'opacity-0'
                }`}
              >
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
              onClick={() => window.location.href = '/dashboard'}
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
