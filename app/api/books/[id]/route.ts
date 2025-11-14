import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/get-current-user'

// Validation schema for book updates
const BookUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  author: z.string().min(1).max(100).optional(),
  genre: z
    .enum([
      'thriller',
      'romance',
      'scifi',
      'fantasy',
      'mystery',
      'literary',
      'horror',
      'historical',
      'young-adult',
      'contemporary',
    ])
    .optional(),
  description: z.string().min(10).optional(),
  synopsis: z.string().optional(),
  isbn: z.string().optional(),
  publishDate: z.string().optional(),
  targetAge: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']).optional(),
})

// GET /api/books/[id] - Get a single book
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    const userId = user.id

    const book = await prisma.book.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        trailers: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: 'Book not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      book,
    })
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch book',
      },
      { status: 500 }
    )
  }
}

// PATCH /api/books/[id] - Update a book
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    const userId = user.id

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!existingBook) {
      return NextResponse.json(
        {
          success: false,
          error: 'Book not found',
        },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = BookUpdateSchema.parse(body)

    // Update book
    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: {
        ...(validatedData.title && { title: validatedData.title }),
        ...(validatedData.author && { author: validatedData.author }),
        ...(validatedData.genre && { genre: validatedData.genre }),
        ...(validatedData.description && { description: validatedData.description }),
        ...(validatedData.synopsis !== undefined && { synopsis: validatedData.synopsis }),
        ...(validatedData.isbn !== undefined && { isbn: validatedData.isbn }),
        ...(validatedData.publishDate && {
          publishDate: new Date(validatedData.publishDate),
        }),
        ...(validatedData.targetAge !== undefined && { targetAge: validatedData.targetAge }),
        ...(validatedData.keywords && { keywords: validatedData.keywords }),
        ...(validatedData.status && { status: validatedData.status }),
      },
    })

    return NextResponse.json({
      success: true,
      book: updatedBook,
      message: 'Book updated successfully',
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

    console.error('Error updating book:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update book',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/books/[id] - Delete a book and all its trailers
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    const userId = user.id

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!existingBook) {
      return NextResponse.json(
        {
          success: false,
          error: 'Book not found',
        },
        { status: 404 }
      )
    }

    // Delete book (cascades to trailers due to onDelete: Cascade)
    await prisma.book.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete book',
      },
      { status: 500 }
    )
  }
}
