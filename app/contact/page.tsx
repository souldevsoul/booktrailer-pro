"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import {
  RiMailLine,
  RiCustomerService2Line,
  RiRocketLine,
  RiTeamLine,
  RiTimeLine,
  RiArrowRightLine,
  RiCheckLine,
  RiQuestionLine,
} from "react-icons/ri"
import { Film } from "lucide-react"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: RiCustomerService2Line,
      title: "General Support",
      description: "Questions about your account, features, or how to use BookTrailer Pro",
      email: "support@booktrailer.pro",
      responseTime: "24 hours",
    },
    {
      icon: RiRocketLine,
      title: "Sales & Enterprise",
      description: "Interested in Enterprise plan, custom pricing, or volume discounts",
      email: "sales@booktrailer.pro",
      responseTime: "4 hours",
    },
    {
      icon: RiTeamLine,
      title: "Partnerships",
      description: "Integration partnerships, affiliate programs, or collaboration opportunities",
      email: "partners@booktrailer.pro",
      responseTime: "48 hours",
    },
  ]

  const supportTopics = [
    {
      title: "Account & Billing",
      items: [
        "Plan upgrades and downgrades",
        "Payment and invoice questions",
        "Account cancellation",
        "Refund requests",
      ],
    },
    {
      title: "Technical Support",
      items: [
        "API integration help",
        "Book trailer generation issues",
        "Video quality problems",
        "Error troubleshooting",
      ],
    },
    {
      title: "Book Trailers",
      items: [
        "Trailer style customization",
        "Book cover upload requirements",
        "Scene generation tips",
        "Music and audio options",
      ],
    },
    {
      title: "Enterprise Inquiries",
      items: [
        "Custom deployment options",
        "SLA and uptime guarantees",
        "Security compliance",
        "Volume pricing",
      ],
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
          { label: "About", href: "/about" },
        ]}
        ctaButton={{
          text: "Try Free",
          href: "/dashboard",
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark border-b border-slate-200">
        <Container maxWidth="xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary rounded-full mb-8 shadow-glow-indigo">
              <RiMailLine className="w-6 h-6 text-white" />
              <span className="text-sm font-display font-bold text-white tracking-wider">Contact Us</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight text-white">
              We're Here to Help
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Have questions? Need support? Want to discuss enterprise options? Our team is ready to assist you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon

              return (
                <div
                  key={index}
                  className="p-8 bg-white rounded-2xl border border-slate-200 shadow-cinema hover:shadow-cinema-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-glow-indigo">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-4 text-slate-900">
                    {method.title}
                  </h3>

                  <p className="mb-6 text-slate-600">
                    {method.description}
                  </p>

                  <div className="mb-6">
                    <a
                      href={`mailto:${method.email}`}
                      className="text-lg font-semibold text-indigo-600 hover:text-indigo-700 underline decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
                    >
                      {method.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <RiTimeLine className="w-5 h-5" />
                    Response within {method.responseTime}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-slate-50">
        <Container maxWidth="xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900">
                Send Us a Message
              </h2>
              <p className="text-xl text-slate-600">
                Fill out the form and we'll get back to you as soon as possible
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-cinema">
              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Acme Publishing"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="">Select a topic...</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="sales">Sales & Enterprise</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  Send Message
                  <RiArrowRightLine className="w-5 h-5" />
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  We typically respond within 24 hours on business days
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Support Topics */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900">
              Common Support Topics
            </h2>
            <p className="text-xl text-slate-600">
              Reach out about any of these topics—we're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {supportTopics.map((topic, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-slate-200 shadow-cinema"
              >
                <h3 className="text-2xl font-display font-bold mb-6 text-slate-900">
                  {topic.title}
                </h3>
                <ul className="space-y-3">
                  {topic.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <RiCheckLine className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-600" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-gradient-dark">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              Looking for Something Else?
            </h2>
            <p className="text-xl text-slate-300">
              Quick links to help you find what you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="/pricing"
              className="p-6 bg-white/10 backdrop-cinematic rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <RiQuestionLine className="w-12 h-12 mx-auto mb-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <h3 className="text-lg font-display font-bold mb-2 text-white">Pricing FAQ</h3>
              <p className="text-sm text-slate-300">
                Common questions about plans and billing
              </p>
            </a>

            <a
              href="/about"
              className="p-6 bg-gradient-primary rounded-2xl shadow-glow-indigo text-center hover:scale-105 transition-all duration-300 group"
            >
              <Film className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-display font-bold mb-2 text-white">About Us</h3>
              <p className="text-sm text-white/90">
                Learn more about BookTrailer Pro
              </p>
            </a>

            <a
              href="/features"
              className="p-6 bg-white/10 backdrop-cinematic rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <RiCustomerService2Line className="w-12 h-12 mx-auto mb-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
              <h3 className="text-lg font-display font-bold mb-2 text-white">Feature Docs</h3>
              <p className="text-sm text-slate-300">
                Learn about all BookTrailer Pro capabilities
              </p>
            </a>
          </div>
        </Container>
      </section>

      {/* Enterprise Support */}
      <section className="py-24 bg-slate-50">
        <Container maxWidth="xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Enterprise & Urgent Support
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Enterprise customers with SLA agreements have access to priority 24/7 support via dedicated channels.
            </p>
            <div className="p-8 bg-white rounded-2xl shadow-cinema">
              <h3 className="text-2xl font-display font-bold mb-4 text-slate-900">ENTERPRISE CUSTOMERS</h3>
              <p className="text-slate-600 mb-6">
                If you have an active Enterprise plan with SLA guarantee, use your dedicated support channels for immediate assistance.
              </p>
              <Button
                variant="primary"
                size="lg"
                asChild
                className="inline-flex items-center gap-2"
              >
                <a href="mailto:enterprise@booktrailer.pro">
                  Contact Enterprise Support
                  <RiArrowRightLine className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
