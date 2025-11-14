'use client'

import { TrailerGenerator } from '@/components/booktrailer'
import { Heading, Text } from '@/components/ui'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Heading className="mb-4 text-white text-5xl">
            Trailer Studio
          </Heading>
          <Text className="text-white/90 max-w-2xl text-lg">
            Create stunning cinematic book trailers in minutes. Upload your book details,
            customize the style, and let AI generate a professional video trailer.
          </Text>
        </div>
      </div>

      {/* Generator */}
      <TrailerGenerator />
    </div>
  )
}
