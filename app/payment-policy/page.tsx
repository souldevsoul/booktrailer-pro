"use client"

import { Container } from "@/components/ui/container"
import { Header } from "@/components/marketing/layout/header"
import { Footer } from "@/components/marketing/layout/footer"
import { RiSecurePaymentLine, RiMoneyDollarCircleLine, RiShieldCheckLine, RiAlertLine } from "react-icons/ri"
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from "react-icons/si"

export default function PaymentPolicyPage() {
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
              <RiSecurePaymentLine className="w-6 h-6 text-indigo-600" />
              <span className="text-sm font-semibold tracking-wide text-indigo-600">Payment Policy</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Payment Policy
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Secure, transparent, and compliant payment processing. Understand how payments work on BookTrailer Pro.
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
            {/* Payment Methods */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiSecurePaymentLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">1. Accepted Payment Methods</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-900">Credit & Debit Cards</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white p-3 border border-slate-200 rounded-lg flex items-center justify-center">
                      <SiVisa className="w-16 h-12 text-[#1A1F71]" />
                    </div>
                    <div className="bg-white p-3 border border-slate-200 rounded-lg flex items-center justify-center">
                      <SiMastercard className="w-16 h-12" />
                    </div>
                    <div className="bg-white p-3 border border-slate-200 rounded-lg flex items-center justify-center">
                      <SiApplepay className="w-16 h-12 text-black" />
                    </div>
                    <div className="bg-white p-3 border border-slate-200 rounded-lg flex items-center justify-center">
                      <SiGooglepay className="w-16 h-12" />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We accept all major credit and debit cards: Visa, Mastercard, American Express, and Discover. We also support digital wallets including Apple Pay and Google Pay for fast and secure checkout.
                  </p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Payment Processor</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All payments are processed securely through Stripe, a PCI DSS Level 1 compliant payment processor. BookTrailer Pro does not store your complete credit card information on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Billing */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiMoneyDollarCircleLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">2. Billing & Charges</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Subscription Billing</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Monthly plans:</span> Charged on the same day each month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Annual plans:</span> Charged once per year on subscription anniversary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Billing in advance:</span> All plans are billed at the beginning of the period</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span><span className="font-semibold">Automatic renewal:</span> Subscriptions auto-renew until cancelled</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Currency & Pricing</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <span className="font-semibold">Primary Currency:</span> United States Dollar (USD)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    All prices are displayed in USD. If your bank or card is in a different currency, your financial institution will convert the charge at their current exchange rate.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">Note:</span> Your bank may charge currency conversion fees. These fees are set by your bank, not by BookTrailer Pro.
                  </p>
                </div>

                <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-300">No Minimum or Maximum Transaction Amounts</h3>
                  <p className="leading-relaxed">
                    In compliance with Visa and Mastercard regulations, we do not impose minimum or maximum transaction amounts for card payments. All subscription tiers are available regardless of payment amount.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiShieldCheckLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">3. Payment Security</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">PCI DSS Compliance</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>PCI DSS Level 1 certified payment processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>256-bit SSL/TLS encryption for all transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Tokenized card storage (we never store complete card numbers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>3D Secure authentication for supported cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Fraud detection and prevention systems</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">What We Store</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    For your convenience, we store:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Last 4 digits of your card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Card expiration date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Card brand (Visa, Mastercard, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>Billing address</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <span className="font-semibold">We do NOT store:</span> Complete card numbers or CVV/CVC security codes
                  </p>
                </div>
              </div>
            </div>

            {/* Failed Payments */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl shadow-cinema flex items-center justify-center">
                  <RiAlertLine className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">4. Failed Payments & Retries</h2>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Automatic Retry</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    If a payment fails, we will automatically retry up to 3 times over 7 days:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>1st retry: 3 days after initial failure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>2nd retry: 5 days after initial failure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-semibold">•</span>
                      <span>3rd retry: 7 days after initial failure</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-900">Account Suspension</h3>
                  <p className="text-gray-700 leading-relaxed">
                    If all retry attempts fail, your subscription will be suspended. You can reactivate by updating your payment method. No data is deleted during suspension.
                  </p>
                </div>

                <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-300">Email Notifications</h3>
                  <p className="leading-relaxed">
                    We will email you immediately when a payment fails and before each retry attempt. Please update your payment information promptly to avoid service interruption.
                  </p>
                </div>
              </div>
            </div>

            {/* Taxes */}
            <div>
              <div className="p-8 bg-gradient-primary rounded-2xl shadow-cinema text-white">
                <h2 className="text-2xl font-bold mb-4">Taxes & VAT</h2>
                <p className="leading-relaxed mb-4">
                  <span className="font-semibold">Prices are exclusive of taxes.</span> Depending on your location, applicable taxes (VAT, GST, sales tax) may be added to your invoice.
                </p>
                <p className="leading-relaxed mb-4">
                  Tax rates are determined by your billing address and local regulations. If you are a business in the EU with a valid VAT number, you may be eligible for reverse charge mechanism.
                </p>
                <p className="leading-relaxed">
                  For questions about taxes, contact: <a href="mailto:billing@booktrailer.pro" className="underline hover:no-underline font-semibold">billing@booktrailer.pro</a>
                </p>
              </div>
            </div>

            {/* Disputes */}
            <div>
              <div className="p-6 bg-gradient-dark text-white rounded-2xl shadow-cinema border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-indigo-300">
                  Payment Disputes & Chargebacks
                </h2>
                <p className="leading-relaxed mb-4">
                  <span className="font-semibold">Contact us first:</span> If you see an unexpected charge, please contact us at support@booktrailer.pro before initiating a chargeback. We can often resolve issues quickly.
                </p>
                <p className="leading-relaxed mb-4">
                  <span className="font-semibold">Right to dispute:</span> In accordance with Visa and Mastercard regulations, you have the right to dispute transactions with your card issuer.
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold">Chargeback consequences:</span> Accounts with chargebacks may be suspended pending investigation. Fraudulent chargebacks may result in permanent account termination.
                </p>
              </div>
            </div>

            {/* Invoice */}
            <div>
              <div className="p-6 bg-white rounded-2xl shadow-cinema border border-slate-200">
                <h2 className="text-2xl font-bold mb-4">Invoices & Receipts</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-semibold">•</span>
                    <span>Automatic email receipts for all charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-semibold">•</span>
                    <span>Download invoices from your account dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-semibold">•</span>
                    <span>Invoices include: company info, transaction details, tax information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-semibold">•</span>
                    <span>Historical invoices retained for 7 years</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="p-8 bg-indigo-50 rounded-2xl shadow-cinema border border-slate-200 text-center">
                <h2 className="text-2xl font-bold mb-4">Payment Questions?</h2>
                <p className="text-gray-700 mb-6">
                  Contact our billing team for payment-related inquiries
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:billing@booktrailer.pro" className="underline hover:no-underline text-indigo-600">
                      billing@booktrailer.pro
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Support:</span>{" "}
                    <a href="mailto:support@booktrailer.pro" className="underline hover:no-underline text-indigo-600">
                      support@booktrailer.pro
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
