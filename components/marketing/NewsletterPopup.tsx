"use client"

import { useState, useEffect } from 'react'
import { RiCloseLine, RiMailLine, RiSparklingLine, RiFilmLine } from 'react-icons/ri'
import { Button } from '@/components/ui'

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen')

    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('newsletter-popup-seen', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed! Check your inbox.')
        setEmail('')

        // Close popup after 2 seconds on success
        setTimeout(() => {
          handleClose()
        }, 2000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white max-w-lg w-full rounded-2xl shadow-cinema-2xl overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="relative bg-gradient-primary p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105"
              aria-label="Close"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-6">
              {/* Film Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-glow-violet">
                  <RiFilmLine className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg mb-3">
                  <RiSparklingLine className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Special Offer
                  </span>
                </div>
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Join the Cinematic
                  <br />
                  Revolution
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-lg text-slate-700 mb-6">
              Subscribe to our newsletter and get <strong className="text-gray-600">exclusive early access</strong> to new features, trailer templates, and AI video updates.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-semibold uppercase tracking-wider mb-2 text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-400 focus:border-gray-400 transition-all text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <RiMailLine className="w-5 h-5" />
                    Subscribe Now
                  </>
                )}
              </Button>

              {/* Status Message */}
              {status !== 'idle' && (
                <div className={`p-4 rounded-xl border-2 ${
                  status === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <p className={`text-sm font-semibold ${
                    status === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {message}
                  </p>
                </div>
              )}
            </form>

            <p className="text-xs text-slate-500 mt-4 text-center">
              No spam, unsubscribe anytime. By subscribing, you agree to our{' '}
              <a href="/privacy" className="underline hover:text-gray-600 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Bottom Accent */}
          <div className="h-2 bg-gradient-primary" />
        </div>
      </div>
    </>
  )
}
