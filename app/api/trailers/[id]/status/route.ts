import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/get-current-user'

// GET /api/trailers/[id]/status - Check trailer generation status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    const userId = user.id

    const trailer = await prisma.bookTrailer.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        status: true,
        videoUrl: true,
        thumbnailUrl: true,
        errorMessage: true,
        processingTime: true,
        createdAt: true,
        completedAt: true,
      },
    })

    if (!trailer) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trailer not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      trailer,
    })
  } catch (error) {
    console.error('Error fetching trailer status:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch trailer status',
      },
      { status: 500 }
    )
  }
}
