import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/get-current-user'

// Validation schema for export request
const ExportSchema = z.object({
  format: z.string(), // mp4-1080p, mp4-720p, mp4-4k, webm
  platform: z.string(), // youtube, instagram, tiktok, facebook, twitter, custom
  resolution: z.string(), // 1920x1080, 1080x1920, 1080x1080, etc.
  aspectRatio: z.string(), // 16:9, 9:16, 1:1, 4:5, 21:9
})

// POST /api/trailers/[id]/export - Export trailer in specific format
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

    if (trailer.status !== 'completed') {
      return NextResponse.json(
        {
          success: false,
          error: 'Trailer must be completed before exporting',
        },
        { status: 400 }
      )
    }

    if (!trailer.videoUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trailer video URL not available',
        },
        { status: 400 }
      )
    }

    const body = await request.json()
    const exportConfig = ExportSchema.parse(body)

    // Check if user has access to premium formats
    if (
      exportConfig.format === 'mp4-4k' ||
      exportConfig.format === 'webm-1080p' ||
      exportConfig.aspectRatio === '4:5' ||
      exportConfig.aspectRatio === '21:9'
    ) {
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
          status: 'active',
          plan: {
            in: ['publisher', 'studio'],
          },
        },
      })

      if (!subscription) {
        return NextResponse.json(
          {
            success: false,
            error: 'Premium export formats require a Publisher or Studio subscription',
          },
          { status: 403 }
        )
      }
    }

    // Create export record
    const exportRecord = await prisma.trailerExport.create({
      data: {
        trailerId,
        format: exportConfig.format,
        platform: exportConfig.platform,
        resolution: exportConfig.resolution,
        aspectRatio: exportConfig.aspectRatio,
        fileUrl: trailer.videoUrl, // In production, this would be transcoded
        fileSize: 0, // Placeholder - would be calculated after transcoding
        duration: trailer.duration,
        status: 'completed', // In production, would be 'processing' then 'completed'
        completedAt: new Date(),
      },
    })

    // Log usage
    await prisma.usageLog.create({
      data: {
        userId: user.id,
        action: 'export_video',
        trailerId,
        cost: 0,
        metadata: {
          format: exportConfig.format,
          platform: exportConfig.platform,
          resolution: exportConfig.resolution,
        },
      },
    })

    return NextResponse.json({
      success: true,
      export: {
        id: exportRecord.id,
        fileUrl: exportRecord.fileUrl,
        format: exportRecord.format,
        platform: exportRecord.platform,
        resolution: exportRecord.resolution,
        aspectRatio: exportRecord.aspectRatio,
      },
      message: 'Export created successfully',
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

    console.error('Error exporting trailer:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to export trailer',
      },
      { status: 500 }
    )
  }
}
