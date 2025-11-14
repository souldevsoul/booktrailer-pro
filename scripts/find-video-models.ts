import Replicate from 'replicate'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

async function findVideoModels() {
  console.log('🔍 Searching for available video generation models...\n')

  try {
    // Search for video generation models
    const searchTerms = ['video', 'text-to-video', 'luma', 'runway', 'stable-video']

    for (const term of searchTerms) {
      console.log(`\n📹 Searching for: "${term}"`)
      console.log('─'.repeat(60))

      try {
        // Use the collections endpoint which is more reliable
        const models = await replicate.models.list()

        // Filter models by search term
        let found = 0
        for await (const model of models) {
          if (
            model.name?.toLowerCase().includes(term.toLowerCase()) ||
            model.description?.toLowerCase().includes(term.toLowerCase())
          ) {
            found++
            console.log(`\n   ✅ ${model.owner}/${model.name}`)
            console.log(`      Description: ${model.description?.substring(0, 100)}...`)
            console.log(`      Latest version: ${model.latest_version?.id?.substring(0, 12)}...`)

            if (found >= 3) break // Limit to 3 results per term
          }
        }

        if (found === 0) {
          console.log(`   ⚠️  No models found for "${term}"`)
        }
      } catch (error: any) {
        console.log(`   ❌ Error searching: ${error.message}`)
      }

      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    // List some known working text-to-video models
    console.log('\n\n🎬 Known Text-to-Video Models:')
    console.log('═'.repeat(60))

    const knownModels = [
      {
        name: 'minimax/video-01',
        description: 'MiniMax text-to-video model (6 seconds)',
        ref: 'minimax/video-01',
      },
      {
        name: 'minimax/video-01-live',
        description: 'MiniMax text-to-video live model',
        ref: 'minimax/video-01-live',
      },
      {
        name: 'lucataco/animate-diff',
        description: 'AnimateDiff for video generation',
        ref: 'lucataco/animate-diff',
      },
      {
        name: 'stability-ai/stable-video-diffusion',
        description: 'Image-to-video generation',
        ref: 'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438',
      },
    ]

    knownModels.forEach(model => {
      console.log(`\n   📦 ${model.name}`)
      console.log(`      ${model.description}`)
      console.log(`      Usage: replicate.run("${model.ref}")`)
    })

    console.log('\n\n💡 Recommendation:')
    console.log('   For book trailers, consider using:')
    console.log('   1. minimax/video-01 - Best for text-to-video')
    console.log('   2. Use cover image + stable-video-diffusion for image-to-video')
    console.log('   3. Generate images with FLUX then animate with AnimateDiff')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
  }
}

findVideoModels().catch(console.error)
