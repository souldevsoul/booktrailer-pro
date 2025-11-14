"use client"

import { Container } from "@/components/ui/container"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import { RiTruckLine, RiTimeLine, RiGlobalLine, RiCheckLine } from "react-icons/ri"

export default function DeliveryPolicyPage() {
  const lastUpdated = "November 8, 2025"

  return (
    <main className="min-h-screen bg-white">
      <Header
        logoText="BookTrailer Pro"
        navLinks={[
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "About", href: "/#about" },
        ]}
        ctaButton={{
          text: "Try Free",
          href: "/dashboard",
        }}
      />

      <section className="py-20 bg-gradient-to-br from-indigo-50 to-violet-50">
        <Container maxWidth="xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 rounded-2xl shadow-cinema border border-slate-200 mb-8">
              <RiTruckLine className="w-6 h-6 text-indigo-600" />
              <span className="text-sm font-semibold tracking-wide text-indigo-600">Delivery Policy</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Delivery Policy
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              BookTrailer Pro is a digital service platform. Understand how we deliver our video trailer generation services to you.
            </p>
            <p className="text-sm font-semibold text-gray-600">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container maxWidth="xl">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Digital Service */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiTruckLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">1. Nature of Service</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Digital Service Delivery</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    BookTrailer Pro is a 100% digital service platform. We do not ship physical goods. All services are delivered electronically via our web application and API.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    There are no shipping addresses, tracking numbers, or physical delivery logistics involved with our service.
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">What Gets Delivered</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Instant access to BookTrailer Pro web application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>AI-powered book trailer video generation services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Cinematic video creation capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Generated video files (downloadable MP4/MOV)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>API access for programmatic usage (Pro and Enterprise plans)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delivery Timing */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiTimeLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">2. Delivery Timeframes</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Account Access</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <span className="font-semibold">Delivery Time:</span> Instant
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    After successful payment processing, your account is immediately upgraded to the selected plan tier. Access is granted within seconds of payment confirmation.
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Video Generation</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Standard trailer generation:</span> 2-5 minutes depending on video length and complexity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Custom scene generation:</span> 3-7 minutes for initial rendering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Batch processing:</span> Varies based on queue length and content volume</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Confirmation & Receipts</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Email confirmation:</span> Sent immediately upon successful payment and service activation. Receipts include transaction details, plan information, and next billing date.
                  </p>
                </div>
              </div>
            </div>

            {/* Geographic Availability */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiGlobalLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">3. Geographic Availability</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Global Service</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    BookTrailer Pro services are available worldwide. You can access our platform from anywhere with an internet connection.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Requirements:</span> Internet connection, modern web browser (Chrome, Firefox, Safari, Edge), valid payment method.
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Regional Restrictions</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Our services may not be available in regions where:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>International sanctions prohibit service delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Local laws restrict AI-generated content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Payment processing is unavailable</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Contact <a href="mailto:support@booktrailer.pro" className="font-semibold underline hover:no-underline text-indigo-600">support@booktrailer.pro</a> to verify service availability in your region.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Interruptions */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiCheckLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">4. Service Availability & Uptime</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Uptime Commitment</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <span className="font-semibold">Target Uptime:</span> 99.9% monthly uptime
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We strive to maintain continuous service availability. Scheduled maintenance is announced in advance via email and status page.
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Planned Maintenance</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Scheduled during low-traffic periods (typically 2-4 AM PST)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>48-hour advance notice via email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Real-time status updates at status.booktrailer.pro</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-300">Unplanned Outages</h3>
                  <p className="leading-relaxed mb-3">
                    In rare cases of unplanned service interruption:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-300 font-semibold">•</span>
                      <span>Immediate notification via status page and email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-300 font-semibold">•</span>
                      <span>Transparent ETAs for service restoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-300 font-semibold">•</span>
                      <span>Post-incident reports for major outages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-300 font-semibold">•</span>
                      <span>Potential service credits for extended downtime (see Refund Policy)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Delivery */}
            <div>
              <div className="p-8 bg-gradient-primary rounded-2xl shadow-cinema text-white">
                <h2 className="text-2xl font-bold mb-4">Enterprise Customers</h2>
                <p className="leading-relaxed mb-4">
                  <span className="font-semibold">Custom Delivery Options:</span> Enterprise customers may have custom service delivery terms including:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>Dedicated API endpoints with guaranteed response times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>Priority queue processing for batch jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>Custom SLA with uptime guarantees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>White-label delivery options</span>
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Contact: <a href="mailto:enterprise@booktrailer.pro" className="underline hover:no-underline font-semibold">enterprise@booktrailer.pro</a>
                </p>
              </div>
            </div>

            {/* Failed Delivery */}
            <div>
              <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-indigo-300">
                  If Service Delivery Fails
                </h2>
                <p className="leading-relaxed mb-4">
                  If you experience issues accessing our service after payment:
                </p>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-indigo-300">1.</span>
                    <span>Check your email for payment confirmation and account activation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-indigo-300">2.</span>
                    <span>Verify your internet connection and browser compatibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-indigo-300">3.</span>
                    <span>Clear browser cache and cookies, then try logging in again</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-indigo-300">4.</span>
                    <span>Check status.booktrailer.pro for any ongoing service issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-indigo-300">5.</span>
                    <span>Contact support@booktrailer.pro immediately - we&apos;ll resolve within 24 hours</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="p-8 bg-white rounded-2xl shadow-cinema border border-slate-200 text-center">
                <h2 className="text-2xl font-bold mb-4">Delivery Support</h2>
                <p className="text-gray-700 mb-6">
                  Questions about service delivery or experiencing access issues?
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:support@booktrailer.pro" className="underline hover:no-underline text-indigo-600">
                      support@booktrailer.pro
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a href="tel:+14155551234" className="underline hover:no-underline text-indigo-600">
                      +1 (415) 555-1234
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Status Page:</span>{" "}
                    <a href="https://status.booktrailer.pro" className="underline hover:no-underline text-indigo-600" target="_blank" rel="noopener noreferrer">
                      status.booktrailer.pro
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
