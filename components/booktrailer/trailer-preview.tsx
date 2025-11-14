'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Download, Share2, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TrailerPreviewProps {
  trailerId?: string
  autoRefresh?: boolean
  onStatusChange?: (status: string) => void
}

interface TrailerData {
  id: string
  status: string
  videoUrl?: string
  thumbnailUrl?: string
  errorMessage?: string
  processingTime?: number
  createdAt: string
  completedAt?: string
}

export function TrailerPreview({
  trailerId,
  autoRefresh = true,
  onStatusChange
}: TrailerPreviewProps) {
  const [trailer, setTrailer] = useState<TrailerData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Poll for trailer status
  useEffect(() => {
    if (!trailerId || !autoRefresh) return

    const fetchStatus = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/trailers/${trailerId}/status`)
        const data = await response.json()

        if (data.success) {
          setTrailer(data.trailer)
          onStatusChange?.(data.trailer.status)

          // Stop polling if completed or failed
          if (data.trailer.status === 'completed' || data.trailer.status === 'failed') {
            return true // Signal to stop interval
          }
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to fetch trailer status')
      } finally {
        setIsLoading(false)
      }

      return false
    }

    // Initial fetch
    fetchStatus()

    // Set up polling interval
    const interval = setInterval(async () => {
      const shouldStop = await fetchStatus()
      if (shouldStop) {
        clearInterval(interval)
      }
    }, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [trailerId, autoRefresh, onStatusChange])

  const handleDownload = () => {
    if (trailer?.videoUrl) {
      window.open(trailer.videoUrl, '_blank')
    }
  }

  const handleShare = async () => {
    if (trailer?.videoUrl) {
      try {
        await navigator.share({
          title: 'Book Trailer',
          text: 'Check out my book trailer!',
          url: trailer.videoUrl,
        })
      } catch (err) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(trailer.videoUrl)
        alert('Link copied to clipboard!')
      }
    }
  }

  if (!trailerId) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <Film className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500">No trailer selected</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-red-700 font-semibold mb-2">Error Loading Trailer</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  if (trailer?.status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-red-700 font-semibold mb-2">Trailer Generation Failed</p>
        <p className="text-red-600 text-sm">{trailer.errorMessage || 'Unknown error'}</p>
      </div>
    )
  }

  if (trailer?.status === 'pending' || trailer?.status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-indigo-50 rounded-lg border border-indigo-200">
        <RefreshCw className="w-16 h-16 text-indigo-500 mb-4 animate-spin" />
        <p className="text-indigo-900 font-semibold mb-2">
          {trailer.status === 'pending' ? 'Starting Generation...' : 'Generating Trailer...'}
        </p>
        <p className="text-indigo-700 text-sm">This may take 2-5 minutes</p>
        <div className="mt-4 w-64 h-2 bg-indigo-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    )
  }

  if (trailer?.status === 'completed' && trailer.videoUrl) {
    return (
      <div className="space-y-4">
        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            src={trailer.videoUrl}
            poster={trailer.thumbnailUrl}
            controls
            className="w-full h-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Success Badge */}
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-900">Trailer Generated Successfully!</p>
            {trailer.processingTime && (
              <p className="text-xs text-green-700">
                Processing time: {Math.round(trailer.processingTime)}s
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleDownload} variant="primary" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border border-gray-300">
      <RefreshCw className="w-16 h-16 text-gray-400 mb-4 animate-spin" />
      <p className="text-gray-500">Loading trailer...</p>
    </div>
  )
}

// Missing import
const Film = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
    />
  </svg>
)
