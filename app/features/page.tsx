'use client'

import { Header } from '@/components/marketing/layout'
import { Container } from '@/components/ui/container'
import {
  RiVideoLine, RiSparklingLine, RiMusicLine, RiPaletteLine,
  RiDownloadLine, RiShareLine, RiTimerLine, RiShieldCheckLine,
  RiTeamLine, RiLineChartLine, RiGlobalLine, RiStarLine
} from 'react-icons/ri'

export default function FeaturesPage() {
  const features = [
    {
      icon: <RiVideoLine className="w-12 h-12" />,
      title: "AI Video Generation",
      description: "Create cinematic book trailers using MiniMax Video-01, the leading text-to-video AI model. Professional quality results in minutes, not days.",
      highlights: [
        "6-second cinematic clips",
        "Multiple visual styles",
        "Genre-optimized prompts",
        "Professional filmmaking quality"
      ]
    },
    {
      icon: <RiSparklingLine className="w-12 h-12" />,
      title: "Smart Scene Generation",
      description: "AI analyzes your book synopsis and automatically generates 5-8 key scenes. Powered by OpenAI GPT-4 for intelligent story understanding.",
      highlights: [
        "Auto-extract key moments",
        "Visual prompt generation",
        "Mood and pacing analysis",
        "Edit and refine scenes"
      ]
    },
    {
      icon: <RiMusicLine className="w-12 h-12" />,
      title: "Music Library",
      description: "Choose from our curated library of royalty-free music tracks. Every genre and mood covered - from epic orchestral to intimate piano.",
      highlights: [
        "12 free tracks",
        "Premium music collection",
        "Genre-matched suggestions",
        "Multiple moods and tempos"
      ]
    },
    {
      icon: <RiPaletteLine className="w-12 h-12" />,
      title: "5 Cinematic Styles",
      description: "Choose the perfect visual style for your book's genre. From dramatic thrillers to whimsical fantasy - we have your aesthetic covered.",
      highlights: [
        "Dramatic - High contrast, emotional",
        "Epic - Grand scale, sweeping",
        "Intimate - Close-ups, soft lighting",
        "Suspenseful - Dark, mysterious",
        "Whimsical - Bright, magical"
      ]
    },
    {
      icon: <RiTimerLine className="w-12 h-12" />,
      title: "Lightning Fast",
      description: "Generate professional trailers in minutes. Upload your book details, customize scenes, and get your video - all in under 5 minutes.",
      highlights: [
        "2-5 min video generation",
        "Real-time progress tracking",
        "Async processing",
        "Email notifications when ready"
      ]
    },
    {
      icon: <RiDownloadLine className="w-12 h-12" />,
      title: "Multiple Export Formats",
      description: "Download your trailer in formats optimized for every platform. YouTube, Instagram, TikTok, Facebook - we have got you covered.",
      highlights: [
        "16:9 for YouTube",
        "9:16 for TikTok/Instagram Stories",
        "1:1 for Instagram Feed",
        "HD and 4K quality options"
      ]
    },
    {
      icon: <RiShareLine className="w-12 h-12" />,
      title: "Social Media Ready",
      description: "Share directly to your social platforms or download for manual posting. Built-in analytics track views, shares, and engagement.",
      highlights: [
        "One-click social sharing",
        "Embeddable trailer player",
        "Copy shareable links",
        "Track trailer performance"
      ]
    },
    {
      icon: <RiShieldCheckLine className="w-12 h-12" />,
      title: "Commercial Rights",
      description: "Full commercial rights to all generated trailers. Use them anywhere - your website, social media, ads, book launches, presentations.",
      highlights: [
        "100% commercial usage rights",
        "No watermarks (paid plans)",
        "Royalty-free music included",
        "Lifetime access to downloads"
      ]
    },
    {
      icon: <RiTeamLine className="w-12 h-12" />,
      title: "Publisher Accounts",
      description: "Manage multiple authors and books from one dashboard. Perfect for publishing houses with large catalogs.",
      highlights: [
        "Unlimited books (Enterprise)",
        "Team collaboration",
        "Bulk generation",
        "Centralized billing"
      ]
    },
    {
      icon: <RiLineChartLine className="w-12 h-12" />,
      title: "Analytics Dashboard",
      description: "Track trailer performance across platforms. See views, engagement, and conversion metrics in one place.",
      highlights: [
        "View counts and watch time",
        "Social media engagement",
        "Click-through rates",
        "Export detailed reports"
      ]
    },
    {
      icon: <RiGlobalLine className="w-12 h-12" />,
      title: "Multi-Genre Support",
      description: "Optimized visual styles for 8+ genres. Each genre gets custom prompts, pacing, and music recommendations.",
      highlights: [
        "Thriller & Mystery",
        "Romance & Contemporary",
        "Sci-Fi & Fantasy",
        "Literary & Historical"
      ]
    },
    {
      icon: <RiStarLine className="w-12 h-12" />,
      title: "Premium Templates",
      description: "Access exclusive trailer templates designed by professional videographers. Save time with pre-built structures.",
      highlights: [
        "20+ professional templates",
        "Genre-specific layouts",
        "Customizable scenes",
        "Regular template updates"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header
        logoText="BookTrailer Pro"
        navLinks={[
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Studio", href: "/studio" },
        ]}
        ctaButton={{
          text: "Create Trailer",
          href: "/studio",
        }}
      />

      {/* Hero */}
      <section className="py-20 border-b border-gray-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-secondary text-white rounded-full mb-8">
              <RiSparklingLine className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Features</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Everything You Need to Create Stunning Book Trailers
            </h1>
            <p className="text-xl text-gray-600">
              Powered by the world's most advanced AI models. Built for authors, publishers, and literary marketers who demand the best.
            </p>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-minimal-lg transition-shadow"
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-primary mt-1">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-gray-50">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Powered by Industry-Leading AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use multiple AI models: MiniMax Video-01 (cinematic video), OpenAI GPT-4 (scene generation), and Vercel infrastructure (global delivery).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <RiVideoLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">MiniMax Video-01</h3>
              <p className="text-gray-600">State-of-the-art text-to-video generation</p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <RiSparklingLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">OpenAI GPT-4</h3>
              <p className="text-gray-600">Intelligent scene extraction & generation</p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <RiGlobalLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vercel Edge</h3>
              <p className="text-gray-600">Global CDN for lightning-fast delivery</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-primary text-white">
        <Container maxWidth="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Create Your First Trailer?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of authors bringing their stories to life with AI-powered video
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/studio"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Start Creating Free
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                View Pricing
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
