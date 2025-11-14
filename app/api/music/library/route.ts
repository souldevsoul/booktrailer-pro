import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/get-current-user'

// GET /api/music/library - Get available music tracks
// Supports filtering by genre, mood, tempo, and premium status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const mood = searchParams.get('mood')
    const tempo = searchParams.get('tempo')
    const premiumOnly = searchParams.get('premium') === 'true'
    const freeOnly = searchParams.get('free') === 'true'

    // Build where clause
    const where: any = {}

    if (genre) {
      where.genre = {
        has: genre,
      }
    }

    if (mood) {
      where.mood = {
        has: mood,
      }
    }

    if (tempo) {
      where.tempo = tempo
    }

    if (premiumOnly) {
      where.isPremium = true
    } else if (freeOnly) {
      where.isPremium = false
    }

    // Fetch tracks
    const tracks = await prisma.musicTrack.findMany({
      where,
      orderBy: [
        { usageCount: 'desc' }, // Most popular first
        { title: 'asc' },
      ],
    })

    // Check user's subscription for premium access
    let hasSubscription = false
    if (user) {
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
          status: 'active',
          plan: {
            in: ['author', 'publisher', 'studio'],
          },
        },
      })
      hasSubscription = !!subscription
    }

    // Filter out premium tracks if user doesn't have subscription
    const availableTracks = hasSubscription
      ? tracks
      : tracks.filter(track => !track.isPremium)

    // Get unique genres and moods for filters
    const allGenres = new Set<string>()
    const allMoods = new Set<string>()
    const allTempos = new Set<string>()

    availableTracks.forEach(track => {
      track.genre.forEach(g => allGenres.add(g))
      track.mood.forEach(m => allMoods.add(m))
      allTempos.add(track.tempo)
    })

    return NextResponse.json({
      success: true,
      tracks: availableTracks,
      filters: {
        genres: Array.from(allGenres).sort(),
        moods: Array.from(allMoods).sort(),
        tempos: Array.from(allTempos).sort(),
      },
      hasSubscription,
      count: availableTracks.length,
    })
  } catch (error) {
    console.error('Error fetching music library:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch music library',
      },
      { status: 500 }
    )
  }
}
