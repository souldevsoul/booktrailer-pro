import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import Replicate from 'replicate'
import { requireAuth } from '@/lib/get-current-user'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

// Validation schema
const GenerateTrailerSchema = z.object({
  bookId: z.string().cuid(),
  templateId: z.string().default('cinematic-default'),
  style: z.string().default('dramatic'),
  duration: z.number().min(30).max(120).default(60),
  musicTrack: z.string().optional(),
  narrationVoice: z.string().optional(),
})

// POST /api/trailers/generate - Generate a book trailer
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const userId = user.id

    const body = await request.json()
    const validatedData = GenerateTrailerSchema.parse(body)

    // Verify book exists and belongs to user
    const book = await prisma.book.findFirst({
      where: {
        id: validatedData.bookId,
        userId,
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

    // Verify music track exists if provided
    if (validatedData.musicTrack) {
      const musicTrack = await prisma.musicTrack.findUnique({
        where: { id: validatedData.musicTrack },
      })

      if (!musicTrack) {
        return NextResponse.json(
          {
            success: false,
            error: 'Music track not found',
          },
          { status: 404 }
        )
      }

      // Check if user has access to premium tracks
      if (musicTrack.isPremium) {
        const subscription = await prisma.subscription.findFirst({
          where: {
            userId,
            status: 'active',
            plan: {
              in: ['author', 'publisher', 'studio'],
            },
          },
        })

        if (!subscription) {
          return NextResponse.json(
            {
              success: false,
              error: 'Premium music tracks require a paid subscription',
            },
            { status: 403 }
          )
        }
      }
    }

    // Create trailer record with 'pending' status
    const trailer = await prisma.bookTrailer.create({
      data: {
        userId,
        bookId: validatedData.bookId,
        title: `${book.title} - Trailer`,
        description: book.synopsis || book.description,
        templateId: validatedData.templateId,
        style: validatedData.style,
        duration: validatedData.duration,
        musicTrack: validatedData.musicTrack,
        narrationVoice: validatedData.narrationVoice,
        aiPrompt: generatePrompt(book, validatedData.style),
        model: 'minimax-video-01',
        status: 'pending',
      },
    })

    // Start async video generation
    generateTrailerAsync(trailer.id, book, validatedData)
      .catch((error) => {
        console.error('Async trailer generation failed:', error)
        // Update trailer status to failed
        prisma.bookTrailer
          .update({
            where: { id: trailer.id },
            data: {
              status: 'failed',
              errorMessage: error.message,
            },
          })
          .catch(console.error)
      })

    return NextResponse.json(
      {
        success: true,
        trailer: {
          id: trailer.id,
          status: trailer.status,
          bookId: trailer.bookId,
        },
        message: 'Trailer generation started. Use /api/trailers/[id]/status to check progress.',
      },
      { status: 202 }
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

    console.error('Error starting trailer generation:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to start trailer generation',
      },
      { status: 500 }
    )
  }
}

interface BookWithMeta {
  title: string
  author: string
  genre: string
  synopsis?: string | null
  description?: string | null
  userId: string
  coverImageUrl?: string | null
}

// Helper function to generate AI prompt optimized for video generation
function generatePrompt(book: BookWithMeta, style: string): string {
  const styleVisuals: Record<string, string> = {
    dramatic: 'Cinematic drama with intense emotional moments. High contrast lighting, deep shadows, dramatic camera angles. Moody color grading with rich blacks and vibrant highlights. Dynamic camera movements including slow zooms and sweeping pans.',
    epic: 'Grand epic scale with sweeping landscapes. Wide establishing shots, aerial views, golden hour lighting. Heroic and majestic atmosphere. Dramatic reveals with lens flares and volumetric lighting.',
    intimate: 'Intimate character-focused scenes. Shallow depth of field, soft natural lighting. Close-up shots capturing subtle emotions. Warm color palette, gentle camera movements, quiet contemplative moments.',
    suspenseful: 'Dark thriller aesthetic with mysterious atmosphere. Low-key lighting, shadows and silhouettes. Tense pacing with slow reveals. Cool desaturated color grading with hints of danger. Unsettling camera angles.',
    whimsical: 'Magical and playful visual style. Bright vibrant colors, soft glowing lights. Whimsical camera movements with gentle floating effects. Fantasy elements, sparkles and ethereal atmosphere. Joyful and lighthearted tone.',
  }

  const genreScenes: Record<string, string> = {
    thriller: 'Dark urban settings, rain-slicked streets, mysterious figures in shadows',
    romance: 'Intimate moments, soft candlelight, beautiful natural settings, emotional connections',
    scifi: 'Futuristic technology, space vistas, holographic displays, advanced cityscapes',
    fantasy: 'Magical forests, ancient castles, mystical creatures, glowing runes and spells',
    mystery: 'Foggy streets, dim-lit libraries, hidden clues, atmospheric tension',
    literary: 'Artistic cinematography, symbolic imagery, thoughtful compositions, elegant settings',
    horror: 'Eerie abandoned places, flickering lights, unsettling shadows, creeping dread',
    historical: 'Period-accurate settings, rich textures, authentic costumes, vintage atmosphere',
  }

  const visualStyle = styleVisuals[style] || styleVisuals.dramatic
  const genreElements = genreScenes[book.genre] || 'visually compelling scenes'

  // Create a concise, visual-focused prompt
  const storyText = book.synopsis || book.description || 'A compelling story'
  const prompt = `A cinematic book trailer: "${book.title}" by ${book.author}.

Visual Style: ${visualStyle}

Scene Elements: ${genreElements}

Story Essence: ${storyText.substring(0, 200)}...

Cinematic Techniques: Professional filmmaking, smooth camera work, atmospheric lighting, compelling composition. Movie trailer aesthetic with dramatic pacing.`

  return prompt
}

// Async function to generate trailer
async function generateTrailerAsync(
  trailerId: string,
  book: BookWithMeta,
  settings: z.infer<typeof GenerateTrailerSchema>
) {
  const startTime = Date.now()

  try {
    // Update status to 'processing'
    await prisma.bookTrailer.update({
      where: { id: trailerId },
      data: { status: 'processing' },
    })

    // Generate video using Replicate
    // Using MiniMax Video-01 model for text-to-video generation
    const output = await replicate.run(
      'minimax/video-01',
      {
        input: {
          prompt: generatePrompt(book, settings.style),
          prompt_optimizer: true, // Optimize prompt for better results
        },
      }
    )

    const videoUrl = Array.isArray(output) ? output[0] : (output as unknown as string)

    // Generate thumbnail (placeholder for now)
    const thumbnailUrl = book.coverImageUrl || undefined

    const processingTime = (Date.now() - startTime) / 1000

    // Update trailer with generated content
    await prisma.bookTrailer.update({
      where: { id: trailerId },
      data: {
        status: 'completed',
        videoUrl,
        thumbnailUrl,
        processingTime,
        completedAt: new Date(),
        generationCost: 0.5, // Placeholder cost
      },
    })

    // Log usage
    await prisma.usageLog.create({
      data: {
        userId: book.userId,
        action: 'generate_trailer',
        trailerId,
        cost: 0.5,
        metadata: {
          duration: settings.duration,
          style: settings.style,
          model: 'minimax-video-01',
          musicTrack: settings.musicTrack,
        },
      },
    })

    // Increment music track usage count if used
    if (settings.musicTrack) {
      await prisma.musicTrack.update({
        where: { id: settings.musicTrack },
        data: {
          usageCount: {
            increment: 1,
          },
        },
      })
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Trailer generation error:', error)

    await prisma.bookTrailer.update({
      where: { id: trailerId },
      data: {
        status: 'failed',
        errorMessage,
      },
    })

    throw error
  }
}
