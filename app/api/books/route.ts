import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { put } from '@vercel/blob'
import { requireAuth } from '@/lib/get-current-user'

// Validation schema for book creation
const BookCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  author: z.string().min(1, 'Author is required').max(100),
  genre: z.enum([
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
  ]),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  synopsis: z.string().optional(),
  isbn: z.string().optional(),
  publishDate: z.string().optional(),
  targetAge: z.string().optional(),
  keywords: z.array(z.string()).optional().default([]),
  coverImage: z.string().optional(), // Base64 or URL
})

// GET /api/books - List all books for the current user
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const userId = user.id

    const books = await prisma.book.findMany({
      where: {
        userId,
      },
      include: {
        trailers: {
          select: {
            id: true,
            title: true,
            status: true,
            thumbnailUrl: true,
            duration: true,
            views: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      books,
      count: books.length,
    })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch books',
      },
      { status: 500 }
    )
  }
}

// POST /api/books - Create a new book
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const userId = user.id

    const body = await request.json()
    const validatedData = BookCreateSchema.parse(body)

    let coverImageUrl: string | undefined

    // Upload cover image if provided
    if (validatedData.coverImage) {
      try {
        // If it's a base64 string, convert to blob
        if (validatedData.coverImage.startsWith('data:image')) {
          const base64Data = validatedData.coverImage.split(',')[1]
          const buffer = Buffer.from(base64Data, 'base64')
          const filename = `covers/${userId}/${Date.now()}-${validatedData.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`

          const blob = await put(filename, buffer, {
            access: 'public',
            contentType: 'image/jpeg',
          })

          coverImageUrl = blob.url
        } else {
          // Assume it's already a URL
          coverImageUrl = validatedData.coverImage
        }
      } catch (uploadError) {
        console.error('Error uploading cover image:', uploadError)
        // Continue without cover image
      }
    }

    // Create book in database
    const book = await prisma.book.create({
      data: {
        userId,
        title: validatedData.title,
        author: validatedData.author,
        genre: validatedData.genre,
        description: validatedData.description,
        synopsis: validatedData.synopsis,
        isbn: validatedData.isbn,
        publishDate: validatedData.publishDate ? new Date(validatedData.publishDate) : null,
        coverImageUrl,
        targetAge: validatedData.targetAge,
        keywords: validatedData.keywords,
        status: 'draft',
      },
    })

    return NextResponse.json(
      {
        success: true,
        book,
        message: 'Book created successfully',
      },
      { status: 201 }
    )
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

    console.error('Error creating book:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create book',
      },
      { status: 500 }
    )
  }
}
