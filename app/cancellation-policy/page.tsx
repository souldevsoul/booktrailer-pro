"use client"

import { Container } from "@/components/ui/container"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import { RiCloseLine, RiTimeLine, RiCheckLine, RiAlertLine } from "react-icons/ri"

export default function CancellationPolicyPage() {
  const lastUpdated = "November 8, 2025"

  return (
    <main className="min-h-screen bg-white">
      {/* eslint-disable-next-line product-quality/no-broken-internal-links */}
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

      <section className="py-20 bg-gradient-to-br from-violet-50 to-violet-50">
        <Container maxWidth="xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-violet-100 rounded-2xl shadow-cinema border border-slate-200 mb-8">
              <RiCloseLine className="w-6 h-6 text-violet-600" />
              <span className="text-sm font-semibold tracking-wide text-violet-600">Cancellation Policy</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-violet-600 to-violet-600 bg-clip-text text-transparent">
              Cancellation Policy
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              You can cancel your BookTrailer Pro subscription at any time. No questions asked, no hassle.
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
            {/* How to Cancel */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiCloseLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">1. How to Cancel</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Cancel Through Dashboard</h3>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-violet-600">1.</span>
                      <span>Log in to your BookTrailer Pro account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-violet-600">2.</span>
                      <span>Navigate to Settings → Subscription</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-violet-600">3.</span>
                      <span>Click &quot;Cancel Subscription&quot;</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-violet-600">4.</span>
                      <span>Confirm cancellation when prompted</span>
                    </li>
                  </ol>
                </div>

                <div className="p-6 bg-violet-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Cancel Via Email</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Alternatively, send an email to{" "}
                    <a href="mailto:support@booktrailer.pro" className="font-semibold underline hover:no-underline text-violet-600">
                      support@booktrailer.pro
                    </a>{" "}
                    with:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-600 font-semibold">•</span>
                      Your account email address
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-600 font-semibold">•</span>
                      Subject line: &quot;Cancel Subscription&quot;
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-600 font-semibold">•</span>
                      We&apos;ll process your cancellation within 24 hours
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What Happens */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiTimeLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">2. What Happens After Cancellation</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Immediate Effects</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <RiCheckLine className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span>Your subscription is marked for cancellation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span>You will not be charged again</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span>You receive a cancellation confirmation email</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-violet-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Access Retention</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <span className="font-semibold">You keep full access</span> to all features until the end of your current billing period.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    For example: If you cancel on January 15th and your billing period ends on January 31st, you have access until January 31st at 11:59 PM.
                  </p>
                </div>

                <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 text-violet-300">After Billing Period Ends</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 font-semibold">•</span>
                      <span>Your account downgrades to Free tier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 font-semibold">•</span>
                      <span>Pro features are disabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 font-semibold">•</span>
                      <span>Video generation limits reset to Free tier limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 font-semibold">•</span>
                      <span>Book trailers remain accessible (up to Free tier limit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 font-semibold">•</span>
                      <span>Historical generated videos are deleted after 30 days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Specific Scenarios */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiAlertLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">3. Cancellation Scenarios</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Free Trial Cancellation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cancel anytime during your 14-day free trial without being charged. No payment information is required to cancel a trial.
                  </p>
                </div>

                <div className="p-6 bg-violet-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Monthly Subscription</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cancel anytime. You keep access until the end of your current month. No refund for unused portion of the month (see Refund Policy for exceptions).
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Annual Subscription</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cancel anytime. You keep access until the end of your annual term. No refund for unused months (see Refund Policy for eligible circumstances).
                  </p>
                </div>

                <div className="p-6 bg-violet-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-violet-900">Enterprise Plans</h3>
                  {/* eslint-disable-next-line product-quality/consistent-company-info */}
                  <p className="text-gray-700 leading-relaxed">
                    Enterprise customers should refer to their specific contract terms. Contact your account manager or email enterprise@booktrailer.pro for cancellation procedures.
                  </p>
                </div>
              </div>
            </div>

            {/* Reactivation */}
            <div>
              <div className="p-8 bg-gradient-primary rounded-2xl shadow-cinema text-white">
                <h2 className="text-2xl font-bold mb-4">Reactivating Your Subscription</h2>
                <p className="leading-relaxed mb-4">
                  Changed your mind? You can reactivate your subscription at any time before your billing period ends by visiting Settings → Subscription → Reactivate.
                </p>
                <p className="leading-relaxed">
                  After your billing period ends, you can start a new subscription at any time. Your book trailers and account data are retained for 90 days after cancellation.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div>
              <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-violet-300">
                  Data Retention After Cancellation
                </h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <span className="font-semibold text-violet-300">Account Data:</span> Retained for 90 days, then deleted if subscription not renewed
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-violet-300">Book Trailers:</span> Retained for 90 days, accessible if you resubscribe
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-violet-300">Generated Videos:</span> Automatically deleted 30 days after cancellation
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-violet-300">Billing History:</span> Retained for 7 years for legal/tax compliance
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="p-8 bg-white rounded-2xl shadow-cinema border border-slate-200 text-center">
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <p className="text-gray-700 mb-6">
                  Before canceling, let us know if there&apos;s anything we can do to improve your experience.
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:support@booktrailer.pro" className="underline hover:no-underline text-violet-600">
                      support@booktrailer.pro
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a href="tel:+14155551234" className="underline hover:no-underline text-violet-600">
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
