import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/get-current-user'
import { JsonValue } from '@prisma/client/runtime/library'

// Validation schema for share tracking
const ShareSchema = z.object({
  platform: z.enum([
    'youtube',
    'instagram',
    'facebook',
    'twitter',
    'linkedin',
    'whatsapp',
    'email',
    'tiktok',
    'other',
  ]),
  shareUrl: z.string().url().optional(),
})

// POST /api/trailers/[id]/share - Track social media shares
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: trailerId } = await params
    const user = await requireAuth()

    // Verify trailer exists and belongs to user
    const trailer = await prisma.bookTrailer.findFirst({
      where: {
        id: trailerId,
        userId: user.id,
      },
    })

    if (!trailer) {
      return NextResponse.json(
        { success: false, error: 'Trailer not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { platform, shareUrl } = ShareSchema.parse(body)

    // Create share record (using SocialShare model from schema)
    // Note: If SocialShare model doesn't exist yet, we can track in UsageLog
    try {
      await prisma.usageLog.create({
        data: {
          userId: user.id,
          action: 'share_trailer',
          trailerId,
          cost: 0,
          metadata: {
            platform,
            shareUrl,
            timestamp: new Date().toISOString(),
          },
        },
      })
    } catch (error) {
      console.error('Error creating share log:', error)
      // Continue even if logging fails
    }

    // Optionally increment trailer views or share count
    // This could be used for analytics
    await prisma.bookTrailer.update({
      where: { id: trailerId },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: `Share to ${platform} tracked successfully`,
      data: {
        trailerId,
        platform,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error tracking share:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track share',
      },
      { status: 500 }
    )
  }
}

// GET /api/trailers/[id]/share - Get share statistics
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: trailerId } = await params
    const user = await requireAuth()

    // Verify trailer exists and belongs to user
    const trailer = await prisma.bookTrailer.findFirst({
      where: {
        id: trailerId,
        userId: user.id,
      },
      select: {
        id: true,
        views: true,
        likes: true,
      },
    })

    if (!trailer) {
      return NextResponse.json(
        { success: false, error: 'Trailer not found' },
        { status: 404 }
      )
    }

    // Get share counts by platform from usage logs
    const shareLogs = await prisma.usageLog.findMany({
      where: {
        userId: user.id,
        trailerId,
        action: 'share_trailer',
      },
      select: {
        metadata: true,
        createdAt: true,
      },
    })

    // Aggregate share counts by platform
    const sharesByPlatform: Record<string, number> = {}
    shareLogs.forEach((log) => {
      const metadata = log.metadata as { platform?: string } | null
      const platform = metadata?.platform || 'unknown'
      sharesByPlatform[platform] = (sharesByPlatform[platform] || 0) + 1
    })

    return NextResponse.json({
      success: true,
      stats: {
        trailerId,
        views: trailer.views,
        likes: trailer.likes,
        totalShares: shareLogs.length,
        sharesByPlatform,
        recentShares: shareLogs.slice(0, 10).map((log) => {
          const metadata = log.metadata as { platform?: string } | null
          return {
            platform: metadata?.platform,
            timestamp: log.createdAt,
          }
        }),
      },
    })
  } catch (error) {
    console.error('Error fetching share stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch share statistics',
      },
      { status: 500 }
    )
  }
}
