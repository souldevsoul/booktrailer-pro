'use client'

import { useState, useEffect } from 'react'
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link2,
  MessageCircle,
  Instagram,
  Youtube,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface SocialSharePanelProps {
  trailerId: string
  trailerUrl?: string
  trailerTitle?: string
  trailerDescription?: string
}

interface SharePlatform {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  getShareUrl: (url: string, title: string, description: string) => string
}

const PLATFORMS: SharePlatform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <Youtube className="w-5 h-5" />,
    color: 'bg-red-600 hover:bg-red-700',
    getShareUrl: (url) => `https://studio.youtube.com/`,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600',
    getShareUrl: (url) => `https://www.instagram.com/`,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook className="w-5 h-5" />,
    color: 'bg-blue-600 hover:bg-blue-700',
    getShareUrl: (url, title, description) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: <Twitter className="w-5 h-5" />,
    color: 'bg-black hover:bg-gray-800',
    getShareUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=BookTrailer`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />,
    color: 'bg-blue-700 hover:bg-blue-800',
    getShareUrl: (url, title, description) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'bg-green-600 hover:bg-green-700',
    getShareUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  },
  {
    id: 'email',
    name: 'Email',
    icon: <Mail className="w-5 h-5" />,
    color: 'bg-gray-600 hover:bg-gray-700',
    getShareUrl: (url, title, description) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\nWatch here: ${url}`)}`,
  },
]

export function SocialSharePanel({
  trailerId,
  trailerUrl = '',
  trailerTitle = 'Check out my book trailer!',
  trailerDescription = 'I created this cinematic trailer for my book using BookTrailer Pro.',
}: SocialSharePanelProps) {
  const [shareUrl, setShareUrl] = useState(trailerUrl || `https://booktrailerpro.com/trailers/${trailerId}`)
  const [copied, setCopied] = useState(false)
  const [shareMessage, setShareMessage] = useState(trailerDescription)
  const [shareStats, setShareStats] = useState<Record<string, number>>({})
  const [hasNativeShare, setHasNativeShare] = useState(false)

  // Check if native share is available (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator.share === 'function') {
      setHasNativeShare(true)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('Failed to copy link')
    }
  }

  const handleShareToPlatform = async (platform: SharePlatform) => {
    // Track share
    try {
      await fetch(`/api/trailers/${trailerId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: platform.id }),
      })

      setShareStats((prev) => ({
        ...prev,
        [platform.id]: (prev[platform.id] || 0) + 1,
      }))
    } catch (error) {
      console.error('Error tracking share:', error)
    }

    // Open share URL
    const url = platform.getShareUrl(shareUrl, trailerTitle, shareMessage)
    window.open(url, '_blank', 'width=600,height=600')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trailerTitle,
          text: shareMessage,
          url: shareUrl,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Your Trailer
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Share your book trailer across social media platforms
        </p>
      </div>

      {/* Share Link */}
      <div className="space-y-2">
        <Label htmlFor="share-url">Share Link</Label>
        <div className="flex gap-2">
          <Input
            id="share-url"
            value={shareUrl}
            onChange={(e) => setShareUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleCopyLink}
            variant={copied ? 'primary' : 'outline'}
            className="flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Share Message */}
      <div className="space-y-2">
        <Label htmlFor="share-message">Share Message (Optional)</Label>
        <Textarea
          id="share-message"
          value={shareMessage}
          onChange={(e) => setShareMessage(e.target.value)}
          placeholder="Add a custom message to your share..."
          rows={3}
        />
      </div>

      {/* Platform Buttons */}
      <div>
        <Label className="mb-3 block">Share to Platform</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => handleShareToPlatform(platform)}
              className={`
                ${platform.color}
                text-white p-4 rounded-lg transition-all hover:scale-105
                flex flex-col items-center justify-center gap-2
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              `}
            >
              {platform.icon}
              <span className="text-sm font-semibold">{platform.name}</span>
              {shareStats[platform.id] && (
                <span className="text-xs opacity-75">
                  {shareStats[platform.id]} {shareStats[platform.id] === 1 ? 'share' : 'shares'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Native Share Button (Mobile) */}
      {hasNativeShare && (
        <Button onClick={handleNativeShare} variant="outline" className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          More Sharing Options
        </Button>
      )}

      {/* Embed Code */}
      <div className="space-y-2">
        <Label htmlFor="embed-code">Embed Code</Label>
        <div className="relative">
          <Textarea
            id="embed-code"
            value={`<iframe src="${shareUrl}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}
            readOnly
            rows={3}
            className="font-mono text-xs"
          />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `<iframe src="${shareUrl}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`
              )
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Embed this trailer on your website or blog
        </p>
      </div>

      {/* Direct Download Link */}
      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Link2 className="w-4 h-4" />
          Quick Actions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button
            onClick={() => window.open(shareUrl, '_blank')}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            Open in New Tab
          </Button>
          <Button
            onClick={() => {
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`
              window.open(qrUrl, '_blank')
            }}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            Generate QR Code
          </Button>
        </div>
      </div>

      {/* Social Media Tips */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-2">Social Media Tips</h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• <strong>Instagram:</strong> Post to Stories and Reels for maximum reach</li>
          <li>• <strong>TikTok:</strong> Add trending music and hashtags</li>
          <li>• <strong>YouTube:</strong> Upload as a Short for better discoverability</li>
          <li>• <strong>Facebook:</strong> Share to book-related groups and pages</li>
          <li>• <strong>Twitter:</strong> Use #BookTrailer, #AmReading, #BookPromo</li>
        </ul>
      </div>

      {/* Hashtag Suggestions */}
      <div className="space-y-2">
        <Label>Suggested Hashtags</Label>
        <div className="flex flex-wrap gap-2">
          {[
            '#BookTrailer',
            '#AmReading',
            '#BookPromo',
            '#BookMarketing',
            '#NewRelease',
            '#AuthorLife',
            '#Bookstagram',
            '#BookTok',
          ].map((hashtag) => (
            <button
              key={hashtag}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(hashtag)
                setCopied(true)
                setTimeout(() => setCopied(false), 1000)
              }}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors"
            >
              {hashtag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
