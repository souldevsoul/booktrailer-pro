"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiSparklingLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowRightLine,
  RiFilmLine,
  RiMagicLine,
  RiVideoLine,
} from "react-icons/ri"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Author",
      price: "$0",
      period: "forever",
      description: "Perfect for indie authors testing the waters",
      popular: false,
      features: [
        { text: "2 trailers per month", included: true },
        { text: "720p HD quality", included: true },
        { text: "10 template styles", included: true },
        { text: "30-60 second videos", included: true },
        { text: "MP4 export", included: true },
        { text: "Watermark included", included: true },
        { text: "Community support", included: true },
        { text: "1080p exports", included: false },
        { text: "Custom branding", included: false },
        { text: "Priority rendering", included: false },
      ],
      cta: "Start Free",
      ctaHref: "/studio",
    },
    {
      name: "Publisher",
      price: "$49",
      period: "per month",
      description: "For professionals and publishing houses",
      popular: true,
      features: [
        { text: "20 trailers per month", included: true },
        { text: "1080p Full HD quality", included: true },
        { text: "50+ template styles", included: true },
        { text: "30-120 second videos", included: true },
        { text: "All export formats", included: true },
        { text: "No watermark", included: true },
        { text: "Custom branding", included: true },
        { text: "Priority rendering queue", included: true },
        { text: "Multi-platform exports", included: true },
        { text: "Email support", included: true },
      ],
      cta: "Start Free Trial",
      ctaHref: "/studio",
    },
    {
      name: "Studio",
      price: "Custom",
      period: "contact us",
      description: "For agencies and large publishers",
      popular: false,
      features: [
        { text: "Unlimited trailers", included: true },
        { text: "4K quality", included: true },
        { text: "All templates + custom", included: true },
        { text: "Unlimited video length", included: true },
        { text: "White-label solution", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom integrations", included: true },
        { text: "API access", included: true },
        { text: "SLA guarantee (99.9%)", included: true },
        { text: "Priority 24/7 support", included: true },
      ],
      cta: "Contact Sales",
      ctaHref: "/contact",
    },
  ]

  const faqs = [
    {
      question: "How does the trailer generation work?",
      answer: "Upload your book details, cover, and synopsis. Choose a cinematic style (dramatic, epic, intimate, suspenseful, or whimsical). Our AI generates a professional video trailer in 2-5 minutes using advanced video generation models.",
    },
    {
      question: "What video formats can I export?",
      answer: "Author plan exports MP4 (720p). Publisher and Studio plans support multiple formats and resolutions including 1080p, 4K, and platform-specific exports for YouTube, Instagram, TikTok, and Facebook.",
    },
    {
      question: "Can I use my own music?",
      answer: "Publisher and Studio plans allow custom music uploads. Author plan can choose from our library of licensed tracks. All music is copyright-safe for commercial use.",
    },
    {
      question: "How many trailer styles are available?",
      answer: "Author plan includes 10 popular styles. Publisher plan includes 50+ styles covering all genres (thriller, romance, sci-fi, fantasy, mystery, literary, horror, historical). Studio plan includes custom style creation.",
    },
    {
      question: "What's included in the free trial?",
      answer: "The Publisher plan includes a 14-day free trial with full access to all features (20 trailers, 1080p, no watermark). No credit card required. Cancel anytime during the trial.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! All plans can be canceled at any time. You'll retain access until the end of your billing period. No questions asked, no cancellation fees.",
    },
    {
      question: "What's the AI model used for generation?",
      answer: "We use Replicate's Luma Ray model for cinematic video generation. It specializes in creating high-quality, narrative-driven video content perfect for book trailers.",
    },
    {
      question: "How long does generation take?",
      answer: "Most trailers generate in 2-5 minutes. Publisher plan users get priority queue access for faster processing. Studio plan includes dedicated rendering infrastructure.",
    },
    {
      question: "Can I edit the trailer after generation?",
      answer: "Currently, you can regenerate with different styles or settings. Advanced editing features are coming soon. Studio plan clients can request custom edits.",
    },
    {
      question: "Do you offer discounts for publishers?",
      answer: "Yes! We offer volume discounts for publishers with 10+ authors. Contact our sales team for custom pricing and white-label solutions.",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white rounded-full mb-8 shadow-cinema-lg">
              <RiSparklingLine className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Start free, scale as you grow. All plans include AI-powered video generation.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <RiCheckLine className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckLine className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckLine className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 ${
                  plan.popular
                    ? "bg-gradient-primary text-white border-indigo-400 shadow-cinema-2xl scale-105"
                    : "bg-white border-slate-200 shadow-cinema-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-lg">
                    <span className="text-sm font-semibold uppercase tracking-wider">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-2xl font-display font-bold mb-2 ${
                      plan.popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-5xl font-display font-bold ${
                        plan.popular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span
                        className={`text-lg font-medium ${
                          plan.popular ? "text-white/80" : "text-slate-600"
                        }`}
                      >
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${plan.popular ? "text-white/90" : "text-slate-600"}`}>
                    {plan.description}
                  </p>
                </div>

                <Link href={plan.ctaHref}>
                  <Button
                    size="lg"
                    className={`w-full mb-8 font-semibold ${
                      plan.popular
                        ? "bg-white text-indigo-600 hover:bg-slate-50"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {plan.cta}
                    <RiArrowRightLine className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <RiCheckLine
                          className={`w-5 h-5 flex-shrink-0 ${
                            plan.popular ? "text-white" : "text-indigo-600"
                          }`}
                        />
                      ) : (
                        <RiCloseLine
                          className={`w-5 h-5 flex-shrink-0 ${
                            plan.popular ? "text-white/40" : "text-slate-400"
                          }`}
                        />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? plan.popular
                              ? "text-white"
                              : "text-slate-900"
                            : plan.popular
                            ? "text-white/40 line-through"
                            : "text-slate-400 line-through"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-24 bg-gradient-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Transparent AI Pricing
            </h2>
            <p className="text-slate-300 text-lg">
              Based on Replicate Luma Ray API costs with our markup
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <RiFilmLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">30-Second Trailer</h3>
              <div className="text-3xl font-display font-bold mb-2 text-cyan-400">~$0.50</div>
              <p className="text-sm text-slate-300">Perfect for quick promos</p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center mb-4">
                <RiMagicLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">60-Second Trailer</h3>
              <div className="text-3xl font-display font-bold mb-2 text-cyan-400">~$1.00</div>
              <p className="text-sm text-slate-300">Standard book trailer</p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <RiVideoLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">120-Second Trailer</h3>
              <div className="text-3xl font-display font-bold mb-2 text-cyan-400">~$2.00</div>
              <p className="text-sm text-slate-300">Extended narrative</p>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto p-6 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/30">
            <p className="text-center text-white/90">
              <strong className="text-cyan-400">Publisher Plan ($49/mo)</strong> includes 20 trailers
              (worth ~$40 in API costs) plus 1080p exports, no watermark, custom branding, and priority support.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 rounded-full mb-6">
              <RiSparklingLine className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about BookTrailer Pro
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-slate-200 rounded-xl shadow-cinema-md hover-lift"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-cinema text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Start with our free Author plan. Upgrade anytime as your needs grow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/studio">
              <Button
                size="xl"
                className="gap-3 bg-white text-indigo-600 hover:bg-slate-50"
              >
                <RiArrowRightLine className="w-5 h-5" />
                Create Your First Trailer
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="gap-3 border-2 border-white text-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
