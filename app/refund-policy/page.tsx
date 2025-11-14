"use client"

import { Container } from "@/components/ui/container"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import { RiRefundLine, RiTimeLine, RiCheckLine, RiMailLine } from "react-icons/ri"

export default function RefundPolicyPage() {
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

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-violet-50">
        <Container maxWidth="xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 rounded-2xl shadow-cinema border border-slate-200 mb-8">
              <RiRefundLine className="w-6 h-6 text-indigo-600" />
              <span className="text-sm font-semibold tracking-wide text-indigo-600">Refund Policy</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Refund & Return Policy
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Our commitment to customer satisfaction. Understand our refund and return policy for BookTrailer Pro services.
            </p>
            <p className="text-sm font-semibold text-gray-600">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      {/* Policy Content */}
      <section className="py-24">
        <Container maxWidth="xl">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* General Policy */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiRefundLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">1. General Refund Policy</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Digital Service</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    BookTrailer Pro is a digital service platform. Once book trailer generation services are rendered, they cannot be &quot;returned&quot; in the traditional sense as they are immediately consumed digital services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    However, we stand behind the quality of our service and offer refunds under specific circumstances outlined below.
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">14-Day Free Trial</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All Pro plan subscriptions include a 14-day free trial. You can cancel at any time during this trial period without being charged. No refund is necessary as no payment has been processed.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligible Refunds */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiCheckLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">2. Eligible for Refund</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Technical Issues</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You are eligible for a full refund if:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      Our service was unavailable for more than 24 consecutive hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      You experienced repeated technical errors preventing service usage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      Book trailer generation consistently failed to produce output
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      We were unable to resolve technical issues within 48 hours of your support request
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Billing Errors</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You are eligible for a refund if:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      You were charged incorrectly due to our billing system error
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      You were double-charged for the same subscription period
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      You were charged after cancellation was processed
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">First-Time Subscription</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For first-time paid subscribers who are not satisfied with the service, you may request a refund within 7 days of your first charge. This one-time courtesy refund is available once per customer.
                  </p>
                </div>
              </div>
            </div>

            {/* Not Eligible */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiTimeLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">3. Not Eligible for Refund</h2>
              </div>

              <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 text-indigo-300">The Following Are NOT Eligible:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-300 font-semibold">•</span>
                    <span>Change of mind after using the service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-300 font-semibold">•</span>
                    <span>Dissatisfaction with AI-generated book trailer quality (subjective opinion)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-300 font-semibold">•</span>
                    <span>Already used video generation credits (partial refunds not available)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-300 font-semibold">•</span>
                    <span>Cancellation after the refund eligibility period has passed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-300 font-semibold">•</span>
                    <span>Violation of our Terms of Service resulting in account termination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-300 font-semibold">•</span>
                    <span>Third-party API costs incurred (we pass through costs from Replicate)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Refund Process */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiMailLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">4. How to Request a Refund</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Step 1: Contact Support</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Email our support team at{" "}
                    <a href="mailto:support@booktrailer.pro" className="font-semibold underline hover:no-underline text-indigo-600">
                      support@booktrailer.pro
                    </a>{" "}
                    with the subject line &quot;Refund Request&quot;
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Include: Your account email, reason for refund request, order/transaction ID, and any supporting documentation (screenshots, error messages, etc.)
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Step 2: Review Process</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team will review your request within 2-3 business days. We may contact you for additional information or to attempt to resolve any technical issues.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Step 3: Decision & Processing</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If approved, refunds are processed within 5-7 business days. Refunds are issued to the original payment method.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Note:</span> Depending on your bank or card issuer, it may take an additional 3-5 business days for the refund to appear in your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div>
              <div className="p-8 bg-gradient-primary rounded-2xl shadow-cinema text-white">
                <h2 className="text-2xl font-bold mb-4">Cancellation vs. Refund</h2>
                <p className="leading-relaxed mb-4">
                  <span className="font-semibold">Cancellation:</span> You can cancel your subscription at any time through your account settings. You will retain access until the end of your current billing period, but no refund will be issued for the remaining time.
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold">Refund:</span> A refund returns money already paid and is only available under the eligible circumstances outlined above.
                </p>
              </div>
            </div>

            {/* Enterprise */}
            <div>
              <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-indigo-300">
                  Enterprise Customers
                </h2>
                <p className="leading-relaxed">
                  Enterprise customers with custom contracts should refer to their specific Service Level Agreement (SLA) for refund terms. Enterprise refund policies may differ from standard plans.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="p-8 bg-white rounded-2xl shadow-cinema border border-slate-200 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                <p className="text-gray-700 mb-6">
                  If you have questions about our refund policy, please contact us:
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
