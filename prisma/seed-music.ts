/**
 * Music Library Seed Script
 * Populates the database with royalty-free music tracks for book trailers
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const musicTracks = [
  // Cinematic/Dramatic tracks
  {
    title: 'Epic Journey',
    artist: 'Cinematic Sounds',
    genre: ['cinematic', 'epic', 'adventure'],
    mood: ['uplifting', 'inspiring', 'heroic'],
    duration: 180,
    tempo: 'medium',
    audioUrl: 'https://example.com/music/epic-journey.mp3', // Placeholder
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },
  {
    title: 'Dark Suspense',
    artist: 'Thriller Beats',
    genre: ['thriller', 'suspense', 'mystery'],
    mood: ['dark', 'mysterious', 'tense'],
    duration: 165,
    tempo: 'slow',
    audioUrl: 'https://example.com/music/dark-suspense.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },
  {
    title: 'Romantic Strings',
    artist: 'Love Melodies',
    genre: ['romance', 'emotional'],
    mood: ['romantic', 'gentle', 'emotional'],
    duration: 150,
    tempo: 'slow',
    audioUrl: 'https://example.com/music/romantic-strings.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },

  // Sci-Fi/Fantasy tracks
  {
    title: 'Futuristic Dreams',
    artist: 'Space Sounds',
    genre: ['scifi', 'electronic'],
    mood: ['futuristic', 'mysterious', 'ambient'],
    duration: 195,
    tempo: 'medium',
    audioUrl: 'https://example.com/music/futuristic-dreams.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },
  {
    title: 'Magical Realm',
    artist: 'Fantasy Orchestra',
    genre: ['fantasy', 'cinematic'],
    mood: ['magical', 'whimsical', 'mysterious'],
    duration: 170,
    tempo: 'medium',
    audioUrl: 'https://example.com/music/magical-realm.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },

  // Horror/Suspense tracks
  {
    title: 'Creeping Shadows',
    artist: 'Dark Atmosphere',
    genre: ['horror', 'suspense'],
    mood: ['dark', 'eerie', 'tense'],
    duration: 140,
    tempo: 'slow',
    audioUrl: 'https://example.com/music/creeping-shadows.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },

  // Literary/Emotional tracks
  {
    title: 'Melancholic Piano',
    artist: 'Emotional Keys',
    genre: ['literary', 'emotional'],
    mood: ['melancholic', 'contemplative', 'gentle'],
    duration: 160,
    tempo: 'slow',
    audioUrl: 'https://example.com/music/melancholic-piano.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },
  {
    title: 'Hope Rising',
    artist: 'Inspirational Strings',
    genre: ['literary', 'cinematic'],
    mood: ['uplifting', 'inspiring', 'emotional'],
    duration: 175,
    tempo: 'medium',
    audioUrl: 'https://example.com/music/hope-rising.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },

  // Action/Adventure tracks
  {
    title: 'Battle Drums',
    artist: 'Epic Warriors',
    genre: ['action', 'epic', 'adventure'],
    mood: ['intense', 'energetic', 'powerful'],
    duration: 155,
    tempo: 'fast',
    audioUrl: 'https://example.com/music/battle-drums.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },
  {
    title: 'Mysterious Quest',
    artist: 'Adventure Sounds',
    genre: ['mystery', 'adventure'],
    mood: ['mysterious', 'curious', 'intriguing'],
    duration: 190,
    tempo: 'medium',
    audioUrl: 'https://example.com/music/mysterious-quest.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: false,
  },

  // Premium tracks
  {
    title: 'Cinematic Masterpiece',
    artist: 'Premium Productions',
    genre: ['cinematic', 'epic', 'dramatic'],
    mood: ['epic', 'powerful', 'inspiring'],
    duration: 200,
    tempo: 'medium',
    audioUrl: 'https://example.com/music/cinematic-masterpiece.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: true,
  },
  {
    title: 'Emotional Journey',
    artist: 'Premium Sounds',
    genre: ['emotional', 'cinematic', 'literary'],
    mood: ['emotional', 'touching', 'inspiring'],
    duration: 210,
    tempo: 'slow',
    audioUrl: 'https://example.com/music/emotional-journey.mp3',
    isRoyaltyFree: true,
    license: 'commercial-use',
    isPremium: true,
  },
]

async function main() {
  console.log('🎵 Seeding music library...\n')

  // Clear existing tracks
  await prisma.musicTrack.deleteMany({})
  console.log('✅ Cleared existing music tracks')

  // Create tracks
  for (const track of musicTracks) {
    const created = await prisma.musicTrack.create({
      data: track,
    })
    console.log(`✅ Created: "${created.title}" (${created.genre.join(', ')})`)
  }

  console.log(`\n✨ Successfully seeded ${musicTracks.length} music tracks!`)

  // Print summary
  const byGenre = await prisma.musicTrack.groupBy({
    by: ['genre'],
    _count: true,
  })

  console.log('\n📊 Music Library Summary:')
  console.log(`   Total tracks: ${musicTracks.length}`)
  console.log(`   Free tracks: ${musicTracks.filter(t => !t.isPremium).length}`)
  console.log(`   Premium tracks: ${musicTracks.filter(t => t.isPremium).length}`)
  console.log('\n🎼 Available Genres:')
  const allGenres = new Set(musicTracks.flatMap(t => t.genre))
  allGenres.forEach(genre => {
    const count = musicTracks.filter(t => t.genre.includes(genre)).length
    console.log(`   - ${genre}: ${count} tracks`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding music library:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
