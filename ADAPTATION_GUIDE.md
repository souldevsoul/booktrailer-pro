# BookTrailer Pro - VoiceCraft Adaptation Guide

## Overview
**From:** Voice cloning → **To:** AI book trailer video generation
**Model:** Voice + Runway ML/Pika Labs (video generation)

## Brand
**Colors:** `#4F46E5` (Indigo), `#7C3AED` (Purple), `#EC4899` (Pink)
**Typography:** Merriweather (serif, literary), Inter
**Logo:** Open book transforming into film reel

## Database
```prisma
model Book {
  id String @id
  userId String
  title String
  author String
  genre String
  synopsis String @db.Text
  coverUrl String?
  trailers Trailer[]
}

model Trailer {
  id String @id
  bookId String
  book Book @relation(fields: [bookId], references: [id])
  style String // cinematic, dramatic, suspenseful, romantic
  duration Int // 30, 60, 90 seconds
  videoUrl String
  thumbnailUrl String
  musicTrack String?
  voiceoverUrl String?
  views Int @default(0)
}
```

## API
```typescript
// Generate video trailer
const video = await replicate.run(
  "runway-ml/gen-2:model-id",
  {
    input: {
      prompt: `cinematic book trailer for ${book.genre} novel,
      ${book.synopsis}, dramatic lighting, epic scenes`,
      duration: 60
    }
  }
)

// Add voiceover (use VoiceCraft voice!)
const voiceover = await replicate.run(
  "minimax/voice-cloning:version",
  {
    input: {
      voice_id: selectedNarratorVoice,
      text: trailerScript
    }
  }
)
```

## Homepage
```tsx
<h1>Bring Your Book to Life</h1>
<p>AI creates cinematic trailers for your novel in minutes. Perfect for Amazon, social media, and book marketing.</p>

**Features:**
- Cinematic video generation
- Professional voiceover narration
- 15+ trailer styles (thriller, romance, sci-fi)
- Royalty-free music library
- Social media sizing (1:1, 16:9, 9:16)

**Pricing:** Free (1 trailer), Author ($29/mo - 10 trailers), Publisher ($99/mo - unlimited)
```

---

*Turn readers into viewers!* 📚🎬
