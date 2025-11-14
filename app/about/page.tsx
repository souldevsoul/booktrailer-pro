'use client'

import { Header } from '@/components/marketing/layout'
import { Container } from '@/components/ui/container'
import { RiSparklingLine, RiVideoLine, RiBookLine, RiStarLine, RiTeamLine, RiLightbulbLine } from 'react-icons/ri'

export default function AboutPage() {
  const values = [
    {
      icon: <RiBookLine className="w-8 h-8" />,
      title: "Authors First",
      description: "Every decision we make prioritizes the needs and success of authors. Your stories deserve powerful marketing tools.",
    },
    {
      icon: <RiLightbulbLine className="w-8 h-8" />,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to make professional video production accessible to every author.",
    },
    {
      icon: <RiStarLine className="w-8 h-8" />,
      title: "Quality",
      description: "Cinematic quality shouldn't require a Hollywood budget. We deliver professional results at an indie price.",
    },
    {
      icon: <RiTeamLine className="w-8 h-8" />,
      title: "Community",
      description: "We're building a community of authors who support each other in bringing their stories to visual life.",
    },
  ]

  const milestones = [
    {
      year: "2024",
      title: "BookTrailer Pro Founded",
      description: "Started with a mission to democratize professional book trailer creation for authors worldwide.",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Integrated MiniMax Video-01 and OpenAI for intelligent scene generation from book content.",
    },
    {
      year: "2024",
      title: "Music Library Launch",
      description: "Curated royalty-free music library across 12 genres to match every book's mood.",
    },
    {
      year: "2025",
      title: "Public Launch",
      description: "Opened to authors worldwide with free tier, democratizing book video marketing.",
    },
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

      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white rounded-full mb-8">
              <RiSparklingLine className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Empowering Authors with Cinematic Video Marketing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're making professional book trailer creation accessible to every author. Transform your story into a cinematic visual experience with AI-powered video generation.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Every book has a story that deserves to be seen, not just read. Video is the most powerful marketing tool available today, but professional video production has been inaccessible for most authors.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We built BookTrailer Pro to change that. By leveraging AI video generation technology, we're making studio-quality book trailers accessible to everyone—from indie authors to major publishers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform uses <span className="font-semibold text-primary">MiniMax Video-01</span> for cinematic video generation and <span className="font-semibold text-primary">OpenAI GPT-4</span> for intelligent scene extraction. These proven AI models power professional results at a fraction of traditional costs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-minimal-lg border border-gray-200">
              <div className="space-y-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10x</div>
                  <p className="text-gray-700">Faster than traditional video production</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">90%</div>
                  <p className="text-gray-700">Cost savings vs hiring a videographer</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">5 min</div>
                  <p className="text-gray-700">From book upload to cinematic trailer</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-minimal-md transition-shadow">
                <div className="text-primary mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones along the way</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 text-lg">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Powered by Leading AI</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use the most advanced AI models to deliver cinematic quality
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <RiVideoLine className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">MiniMax Video-01</h3>
              <p className="text-gray-600 mb-4">
                State-of-the-art text-to-video generation for cinematic quality book trailers
              </p>
              <div className="text-sm text-gray-500">6-second clips, ~2-5 min generation</div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <RiSparklingLine className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">OpenAI GPT-4</h3>
              <p className="text-gray-600 mb-4">
                Intelligent scene generation from your book's synopsis and key moments
              </p>
              <div className="text-sm text-gray-500">GPT-4o-mini, optimized for speed</div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <RiStarLine className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Vercel Infrastructure</h3>
              <p className="text-gray-600 mb-4">
                Enterprise-grade cloud storage and global CDN for fast delivery
              </p>
              <div className="text-sm text-gray-500">99.9% uptime, global edge network</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <Container maxWidth="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Bring Your Story to Life?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of authors creating cinematic book trailers with AI
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/studio"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Create Your First Trailer
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
