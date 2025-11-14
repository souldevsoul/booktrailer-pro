import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/get-current-user'

// Validation schema for scene updates
const UpdateSceneSchema = z.object({
  title: z.string().optional(),
  sceneText: z.string().min(10).optional(),
  visualPrompt: z.string().min(10).optional(),
  duration: z.number().min(3).max(15).optional(),
  mood: z.string().optional(),
  order: z.number().min(1).optional(),
})

// GET /api/scenes/[id] - Get a single scene
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sceneId } = await params
    const user = await requireAuth()

    // Get scene with book verification
    const scene = await prisma.scene.findFirst({
      where: {
        id: sceneId,
        book: {
          userId: user.id,
        },
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!scene) {
      return NextResponse.json(
        { success: false, error: 'Scene not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      scene,
    })
  } catch (error) {
    console.error('Error fetching scene:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch scene',
      },
      { status: 500 }
    )
  }
}

// PATCH /api/scenes/[id] - Update a scene
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sceneId } = await params
    const user = await requireAuth()

    // Verify scene exists and belongs to user
    const existingScene = await prisma.scene.findFirst({
      where: {
        id: sceneId,
        book: {
          userId: user.id,
        },
      },
    })

    if (!existingScene) {
      return NextResponse.json(
        { success: false, error: 'Scene not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const updates = UpdateSceneSchema.parse(body)

    // Update scene
    const updatedScene = await prisma.scene.update({
      where: { id: sceneId },
      data: updates,
    })

    return NextResponse.json({
      success: true,
      scene: updatedScene,
      message: 'Scene updated successfully',
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

    console.error('Error updating scene:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update scene',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/scenes/[id] - Delete a scene
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sceneId } = await params
    const user = await requireAuth()

    // Verify scene exists and belongs to user
    const existingScene = await prisma.scene.findFirst({
      where: {
        id: sceneId,
        book: {
          userId: user.id,
        },
      },
    })

    if (!existingScene) {
      return NextResponse.json(
        { success: false, error: 'Scene not found' },
        { status: 404 }
      )
    }

    // Delete scene
    await prisma.scene.delete({
      where: { id: sceneId },
    })

    // Reorder remaining scenes for the book
    const remainingScenes = await prisma.scene.findMany({
      where: { bookId: existingScene.bookId },
      orderBy: { order: 'asc' },
    })

    // Update order for remaining scenes
    for (let i = 0; i < remainingScenes.length; i++) {
      await prisma.scene.update({
        where: { id: remainingScenes[i].id },
        data: { order: i + 1 },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Scene deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting scene:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete scene',
      },
      { status: 500 }
    )
  }
}
