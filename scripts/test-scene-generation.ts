/**
 * Test script for Scene Generation
 * Tests the fallback scene generation without requiring OpenAI API key
 */

interface Scene {
  order: number
  title: string
  description: string
  visualPrompt: string
  duration: number
  mood: string
}

// Mock book data
const testBooks = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'literary',
    synopsis: `Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices. Would you have done anything different, if you had the chance to undo your regrets?`,
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'scifi',
    synopsis: `Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.`,
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'thriller',
    synopsis: `Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.`,
  },
]

// Fallback scene generation (same as in API)
function generateFallbackScenes(book: any, count: number): Scene[] {
  const synopsis = book.synopsis
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

// Enhanced scene generation with cinematic improvements
function generateEnhancedScenes(book: any, count: number): Scene[] {
  const baseScenes = generateFallbackScenes(book, count)

  // Add cinematic enhancements based on genre
  const genreVisuals: Record<string, string[]> = {
    literary: [
      'Soft focus, artistic composition, muted colors',
      'Thoughtful close-ups, shallow depth of field',
      'Symbolic imagery, contemplative pacing',
      'Natural lighting, intimate framing',
      'Elegant camera movements, poetic visuals',
    ],
    scifi: [
      'Futuristic technology, sleek design, blue-tinted lighting',
      'Space vistas, stars and galaxies, vast scale',
      'Holographic displays, advanced interfaces',
      'Clean white corridors, high-tech equipment',
      'Dramatic reveals, lens flares, epic scope',
    ],
    thriller: [
      'Dark shadows, high contrast lighting, urban decay',
      'Tense close-ups, handheld camera, quick cuts',
      'Rain-slicked streets, neon reflections, noir aesthetic',
      'Surveillance angles, mysterious figures in shadows',
      'Rapid pacing, disorienting perspectives, danger',
    ],
  }

  const visuals = genreVisuals[book.genre] || [
    'Cinematic composition',
    'Dramatic lighting',
    'Professional camera work',
    'Compelling visuals',
    'Movie-quality production',
  ]

  return baseScenes.map((scene, index) => ({
    ...scene,
    visualPrompt: `${scene.visualPrompt} ${visuals[index % visuals.length]}.`,
  }))
}

// Test function
function testSceneGeneration() {
  console.log('🎬 Testing Scene Generation\n')
  console.log('='.repeat(80))

  testBooks.forEach((book, bookIndex) => {
    console.log(`\n\n📚 Book ${bookIndex + 1}: "${book.title}" by ${book.author}`)
    console.log(`Genre: ${book.genre}`)
    console.log('-'.repeat(80))

    const sceneCount = 5
    const scenes = generateEnhancedScenes(book, sceneCount)

    scenes.forEach((scene, sceneIndex) => {
      console.log(`\n🎬 Scene ${scene.order}: ${scene.title}`)
      console.log(`   Mood: ${scene.mood}`)
      console.log(`   Duration: ${scene.duration}s`)
      console.log(`\n   Description:`)
      console.log(`   ${scene.description}`)
      console.log(`\n   Visual Prompt for AI:`)
      console.log(`   ${scene.visualPrompt}`)

      if (sceneIndex < scenes.length - 1) {
        console.log('\n   ' + '·'.repeat(70))
      }
    })

    console.log('\n' + '-'.repeat(80))
    console.log(`✅ Generated ${scenes.length} scenes for "${book.title}"`)
  })

  console.log('\n\n' + '='.repeat(80))
  console.log('✨ Scene Generation Test Complete\n')

  console.log('💡 Usage in API:')
  console.log('   POST /api/books/[id]/scenes')
  console.log('   Body: { "count": 5, "style": "dramatic" }')
  console.log('\n📝 Note: This is fallback generation.')
  console.log('   With OPENAI_API_KEY, scenes will be much more sophisticated.')
}

// Run test
testSceneGeneration()
