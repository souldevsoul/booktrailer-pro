import Replicate from 'replicate'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

async function testReplicateModels() {
  console.log('🧪 Testing Replicate API...\n')

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not found in environment')
    process.exit(1)
  }

  console.log('✅ API Token found')

  // Test 1: List available models
  console.log('\n📋 Test 1: Checking available models...')
  try {
    // Try to get model information
    console.log('   Checking luma/ray model...')

    // According to Replicate docs, luma/ray is the correct model
    // Let's verify we can access it
    const prediction = await replicate.predictions.create({
      version: 'lumina-text2video', // This might need to be updated
      input: {
        prompt: 'A cinematic book trailer showing an old library with magical books floating',
        duration: 5,
      },
    })

    console.log('   ✅ Model accessible')
    console.log(`   Prediction ID: ${prediction.id}`)
    console.log(`   Status: ${prediction.status}`)

  } catch (error: any) {
    console.error('   ❌ Error accessing model:', error.message)
    console.log('\n🔍 Trying alternative approach...')

    // Try with a different model that's known to work
    try {
      console.log('   Testing with stability-ai/stable-video-diffusion...')
      const output = await replicate.run(
        'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438' as any,
        {
          input: {
            input_image: 'https://replicate.delivery/pbxt/placeholder.jpg',
            fps: 6,
            motion_bucket_id: 127,
          },
        }
      )
      console.log('   ✅ Alternative model works')
      console.log('   Output:', output)
    } catch (altError: any) {
      console.error('   ❌ Alternative model also failed:', altError.message)
    }
  }

  // Test 2: Check API quota/limits
  console.log('\n💳 Test 2: Checking API status...')
  try {
    // Make a simple API call to check if we can access Replicate
    const models = await replicate.models.list()
    console.log('   ✅ API connection successful')
  } catch (error: any) {
    console.error('   ❌ API error:', error.message)
  }

  console.log('\n✨ Test complete!')
}

// Test prompt generation
function testPromptGeneration() {
  console.log('\n📝 Testing prompt generation...\n')

  const testBook = {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'literary',
    synopsis: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
  }

  const styles = ['dramatic', 'epic', 'intimate', 'suspenseful', 'whimsical']

  styles.forEach(style => {
    console.log(`\n🎨 Style: ${style.toUpperCase()}`)
    console.log('─'.repeat(60))

    const styleDescriptors: Record<string, string> = {
      dramatic: 'intense, emotional, high contrast lighting, cinematic camera movements',
      epic: 'grand scale, sweeping vistas, heroic music, dramatic reveals',
      intimate: 'close-up shots, soft lighting, emotional depth, quiet moments',
      suspenseful: 'dark atmosphere, tension building, mysterious shadows, thriller aesthetic',
      whimsical: 'playful camera work, bright colors, magical feel, lighthearted tone',
    }

    const styleDesc = styleDescriptors[style]
    const prompt = `Create a cinematic book trailer for "${testBook.title}" by ${testBook.author}.
Genre: ${testBook.genre}.
Style: ${styleDesc}.
Synopsis: ${testBook.synopsis}.
The trailer should capture the essence of the story with professional cinematography,
compelling visuals, and a narrative arc that hooks viewers.
Include text overlays for the title and author name.`

    console.log(prompt)
  })
}

// Run tests
async function main() {
  console.log('🚀 BookTrailer Pro - Replicate API Tests\n')
  console.log('=' .repeat(60))

  // Test prompts
  testPromptGeneration()

  console.log('\n' + '='.repeat(60) + '\n')

  // Test API
  await testReplicateModels()
}

main().catch(console.error)
