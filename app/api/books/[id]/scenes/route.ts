import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/get-current-user'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

// Validation schema
const GenerateScenesSchema = z.object({
  count: z.number().min(3).max(10).default(5),
  style: z.string().optional(),
})

interface Scene {
  order: number
  title: string
  description: string
  visualPrompt: string
  duration: number
  mood: string
}

// GET /api/books/[id]/scenes - Get all scenes for a book
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookId } = await params
    const user = await requireAuth()

    // Verify book exists and belongs to user
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: user.id,
      },
    })

    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }

    // Get all scenes for this book
    const scenes = await prisma.scene.findMany({
      where: { bookId },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({
      success: true,
      scenes,
      count: scenes.length,
    })
  } catch (error) {
    console.error('Error fetching scenes:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch scenes',
      },
      { status: 500 }
    )
  }
}

// POST /api/books/[id]/scenes - Generate scenes from book synopsis using AI
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookId } = await params
    const user = await requireAuth()

    // Verify book exists and belongs to user
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: user.id,
      },
    })

    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      )
    }

    if (!book.description && !book.synopsis) {
      return NextResponse.json(
        {
          success: false,
          error: 'Book must have description or synopsis to generate scenes'
        },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { count, style } = GenerateScenesSchema.parse(body)

    // Generate scenes using OpenAI
    const scenes = await generateScenesWithAI(book, count, style)

    // Delete existing scenes for this book
    await prisma.scene.deleteMany({
      where: { bookId },
    })

    // Save new scenes to database
    await prisma.scene.createMany({
      data: scenes.map((scene, index) => ({
        bookId,
        order: scene.order || index + 1,
        title: scene.title,
        sceneText: scene.description,
        visualPrompt: scene.visualPrompt,
        duration: scene.duration,
        mood: scene.mood,
      })),
    })

    // Fetch the created scenes to return with IDs
    const savedScenes = await prisma.scene.findMany({
      where: { bookId },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({
      success: true,
      scenes: savedScenes,
      count: savedScenes.length,
      message: 'Scenes generated and saved successfully',
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

    console.error('Error generating scenes:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate scenes',
      },
      { status: 500 }
    )
  }
}

interface BookData {
  title: string
  author: string
  genre: string
  synopsis?: string | null
  description?: string | null
}

async function generateScenesWithAI(
  book: BookData,
  count: number,
  style?: string
): Promise<Scene[]> {
  const synopsis = book.synopsis || book.description

  // If OpenAI is not configured, use fallback
  if (!openai) {
    console.log('OpenAI not configured, using fallback scene generation')
    return generateFallbackScenes(book, count)
  }

  const systemPrompt = `You are an expert film director and cinematographer creating a book trailer.
Your task is to break down a book's synopsis into ${count} visually compelling scenes for a cinematic trailer.

Each scene should:
- Capture a key moment from the story
- Be visually descriptive (focus on what we SEE, not what happens)
- Include cinematic details (lighting, camera angles, mood)
- Be suitable for AI video generation
- Last 5-8 seconds

Genre: ${book.genre}
${style ? `Visual Style: ${style}` : ''}

Return ONLY a valid JSON array of scenes with this structure:
[
  {
    "order": 1,
    "title": "Opening Scene",
    "description": "Brief narrative description",
    "visualPrompt": "Detailed visual description for video generation",
    "duration": 6,
    "mood": "mysterious/dramatic/uplifting/tense/etc"
  }
]`

  const userPrompt = `Book: "${book.title}" by ${book.author}
Genre: ${book.genre}

Synopsis:
${synopsis}

Generate ${count} cinematic scenes for a book trailer. Focus on visual storytelling.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8, // Creative but consistent
      max_tokens: 2000,
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    const parsed = JSON.parse(responseText)

    // Handle both direct array and wrapped object formats
    const scenes: Scene[] = Array.isArray(parsed) ? parsed : parsed.scenes || []

    // Validate and normalize scenes
    return scenes.map((scene, index) => ({
      order: scene.order || index + 1,
      title: scene.title || `Scene ${index + 1}`,
      description: scene.description || '',
      visualPrompt: scene.visualPrompt || scene.description || '',
      duration: scene.duration || 6,
      mood: scene.mood || 'cinematic',
    }))
  } catch (error) {
    console.error('OpenAI API error:', error)

    // Fallback: Generate basic scenes from synopsis
    return generateFallbackScenes(book, count)
  }
}

// Fallback scene generation if OpenAI fails
function generateFallbackScenes(book: BookData, count: number): Scene[] {
  const synopsis = book.synopsis || book.description || ''
  const words = synopsis.split(' ')
  const chunkSize = Math.floor(words.length / count)

  const scenes: Scene[] = []

  for (let i = 0; i < count; i++) {
    const start = i * chunkSize
    const end = i === count - 1 ? words.length : (i + 1) * chunkSize
    const chunk = words.slice(start, end).join(' ')

    scenes.push({
      order: i + 1,
      title: `Scene ${i + 1}`,
      description: chunk.substring(0, 150) + '...',
      visualPrompt: `A cinematic scene from "${book.title}". ${chunk.substring(0, 200)}. Professional filmmaking, dramatic lighting, ${book.genre} atmosphere.`,
      duration: 6,
      mood: getMoodForGenre(book.genre),
    })
  }

  return scenes
}

function getMoodForGenre(genre: string): string {
  const moodMap: Record<string, string> = {
    thriller: 'tense',
    romance: 'romantic',
    scifi: 'futuristic',
    fantasy: 'magical',
    mystery: 'mysterious',
    literary: 'contemplative',
    horror: 'eerie',
    historical: 'nostalgic',
    'young-adult': 'dramatic',
    contemporary: 'realistic',
  }

  return moodMap[genre] || 'cinematic'
}
