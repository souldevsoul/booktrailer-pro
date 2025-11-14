# Music Library Integration

## Overview

BookTrailer Pro includes a curated music library with royalty-free tracks for book trailers. Users can select background music that matches their book's genre and mood.

## Database Model

```prisma
model MusicTrack {
  id          String   @id @default(cuid())
  title       String
  artist      String?
  genre       String[] // cinematic, epic, romantic, suspense, etc.
  mood        String[] // dark, uplifting, mysterious, intense, etc.
  duration    Int      // in seconds
  tempo       String   // slow, medium, fast
  audioUrl    String   // URL to music file
  waveformUrl String?  // URL to waveform visualization
  isRoyaltyFree Boolean @default(true)
  license     String   @default("commercial-use")
  usageCount  Int      @default(0)
  isPremium   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## API Endpoints

### GET /api/music/library

Retrieves available music tracks with filtering options.

**Query Parameters:**
- `genre` (optional): Filter by genre (e.g., "thriller", "romance", "scifi")
- `mood` (optional): Filter by mood (e.g., "dark", "uplifting", "mysterious")
- `tempo` (optional): Filter by tempo ("slow", "medium", "fast")
- `premium` (optional): If "true", only show premium tracks
- `free` (optional): If "true", only show free tracks

**Example Request:**
```bash
GET /api/music/library?genre=thriller&mood=dark&tempo=slow
```

**Example Response:**
```json
{
  "success": true,
  "tracks": [
    {
      "id": "clx123abc",
      "title": "Dark Suspense",
      "artist": "Thriller Beats",
      "genre": ["thriller", "suspense", "mystery"],
      "mood": ["dark", "mysterious", "tense"],
      "duration": 165,
      "tempo": "slow",
      "audioUrl": "https://example.com/music/dark-suspense.mp3",
      "isRoyaltyFree": true,
      "license": "commercial-use",
      "usageCount": 42,
      "isPremium": false
    }
  ],
  "filters": {
    "genres": ["cinematic", "thriller", "romance", ...],
    "moods": ["dark", "uplifting", "mysterious", ...],
    "tempos": ["slow", "medium", "fast"]
  },
  "hasSubscription": false,
  "count": 10
}
```

**Access Control:**
- Free users can access non-premium tracks
- Paid subscribers (author, publisher, studio plans) can access all tracks including premium ones

## Integration with Trailer Generation

### POST /api/trailers/generate

Include `musicTrack` parameter to add background music to your trailer.

**Request Body:**
```json
{
  "bookId": "clx123book",
  "templateId": "cinematic-default",
  "style": "dramatic",
  "duration": 60,
  "musicTrack": "clx123music"  // Optional: Music track ID
}
```

**Validation:**
- System verifies the music track exists
- For premium tracks, verifies user has active paid subscription
- Returns 404 if track not found
- Returns 403 if user lacks access to premium tracks

**Usage Tracking:**
- When a trailer is successfully generated with music, the track's `usageCount` is incremented
- Music track ID is logged in UsageLog metadata

## Music Library Management

### Seeding the Database

Run the seed script to populate the music library:

```bash
npm run seed:music
```

This will:
1. Clear existing music tracks
2. Create 12 sample tracks across multiple genres
3. Include 10 free tracks and 2 premium tracks

**Current Music Library:**

| Track | Genre | Mood | Tempo | Premium |
|-------|-------|------|-------|---------|
| Epic Journey | cinematic, epic, adventure | uplifting, inspiring, heroic | medium | No |
| Dark Suspense | thriller, suspense, mystery | dark, mysterious, tense | slow | No |
| Romantic Strings | romance, emotional | romantic, gentle, emotional | slow | No |
| Futuristic Dreams | scifi, electronic | futuristic, mysterious, ambient | medium | No |
| Magical Realm | fantasy, cinematic | magical, whimsical, mysterious | medium | No |
| Creeping Shadows | horror, suspense | dark, eerie, tense | slow | No |
| Melancholic Piano | literary, emotional | melancholic, contemplative, gentle | slow | No |
| Hope Rising | literary, cinematic | uplifting, inspiring, emotional | medium | No |
| Battle Drums | action, epic, adventure | intense, energetic, powerful | fast | No |
| Mysterious Quest | mystery, adventure | mysterious, curious, intriguing | medium | No |
| Cinematic Masterpiece | cinematic, epic, dramatic | epic, powerful, inspiring | medium | **Yes** |
| Emotional Journey | emotional, cinematic, literary | emotional, touching, inspiring | slow | **Yes** |

### Adding Real Music Tracks

To add real music files to your library:

1. **Upload music files** to cloud storage (Vercel Blob, AWS S3, etc.)
2. **Get URLs** for each track
3. **Update seed script** or create admin interface to add tracks with real `audioUrl` values

Example with Vercel Blob:
```typescript
import { put } from '@vercel/blob'

const blob = await put('music/dark-suspense.mp3', file, {
  access: 'public',
})

// Use blob.url as audioUrl
```

### Optional Waveform Generation

Generate waveform visualizations for the music picker UI:

```bash
# Using ffmpeg + audiowaveform
ffmpeg -i input.mp3 -f wav - | audiowaveform -i - -o waveform.png
```

Store waveform images and reference in `waveformUrl` field.

## Genre and Mood Mapping

### Available Genres
- **cinematic**: Orchestral, dramatic, movie-quality
- **epic**: Grand, heroic, sweeping
- **thriller**: Tense, suspenseful
- **romance**: Romantic, intimate, emotional
- **scifi**: Futuristic, electronic
- **fantasy**: Magical, mystical
- **horror**: Eerie, creepy, unsettling
- **mystery**: Mysterious, intriguing
- **literary**: Contemplative, thoughtful
- **action**: Energetic, fast-paced
- **emotional**: Touching, heartfelt
- **adventure**: Bold, exploratory

### Available Moods
- **dark**: Shadowy, ominous
- **uplifting**: Hopeful, inspiring
- **mysterious**: Enigmatic, puzzling
- **tense**: Anxious, on-edge
- **romantic**: Loving, affectionate
- **heroic**: Brave, noble
- **gentle**: Soft, calm
- **emotional**: Touching, sentimental
- **futuristic**: Modern, technological
- **magical**: Enchanting, fantastical
- **eerie**: Spooky, unsettling
- **intense**: Strong, powerful
- **contemplative**: Thoughtful, reflective
- **whimsical**: Playful, lighthearted
- **melancholic**: Sad, wistful
- **energetic**: Dynamic, vigorous
- **curious**: Inquisitive, wondering
- **intriguing**: Fascinating, captivating
- **inspiring**: Motivational, encouraging
- **powerful**: Strong, commanding
- **touching**: Moving, affecting

## Best Practices

### 1. Genre Matching
Match music genre to book genre for cohesive trailers:
- Thriller books → thriller, suspense, mystery music
- Romance books → romance, emotional music
- Sci-Fi books → scifi, electronic, futuristic music
- Fantasy books → fantasy, cinematic, magical music

### 2. Mood Selection
Choose music mood based on the specific book's tone:
- Dark thriller → dark, tense, mysterious
- Uplifting drama → uplifting, inspiring, emotional
- Romantic comedy → romantic, gentle, whimsical

### 3. Tempo Considerations
- **Slow tempo**: Contemplative, emotional, intimate scenes
- **Medium tempo**: Balanced pacing, cinematic storytelling
- **Fast tempo**: Action, excitement, high energy

### 4. Duration
Ensure music track duration matches or exceeds trailer duration. If shorter, implement looping or fade-out.

## Frontend Integration

### Example: Music Picker Component

```typescript
'use client'

import { useState, useEffect } from 'react'

interface MusicTrack {
  id: string
  title: string
  artist: string
  genre: string[]
  mood: string[]
  tempo: string
  duration: number
  isPremium: boolean
}

export function MusicPicker({ bookGenre, onSelect }: {
  bookGenre: string
  onSelect: (trackId: string) => void
}) {
  const [tracks, setTracks] = useState<MusicTrack[]>([])
  const [selectedGenre, setSelectedGenre] = useState(bookGenre)

  useEffect(() => {
    fetch(`/api/music/library?genre=${selectedGenre}`)
      .then(res => res.json())
      .then(data => setTracks(data.tracks))
  }, [selectedGenre])

  return (
    <div className="music-picker">
      <h3>Choose Background Music</h3>
      <div className="tracks">
        {tracks.map(track => (
          <div key={track.id} className="track-card">
            <h4>{track.title}</h4>
            <p>{track.artist}</p>
            <span>{track.tempo} • {track.duration}s</span>
            {track.isPremium && <span className="badge">Premium</span>}
            <button onClick={() => onSelect(track.id)}>
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Future Enhancements

### Planned Features:
1. **Music Preview**: Add audio player to preview tracks before selection
2. **Waveform Visualization**: Display audio waveforms for visual reference
3. **Custom Uploads**: Allow users to upload their own royalty-free music
4. **Smart Recommendations**: AI-powered music suggestions based on book content
5. **Volume Control**: Adjust music volume relative to narration
6. **Fade In/Out**: Automatic fade transitions at start/end
7. **Multiple Tracks**: Support multiple music segments for longer trailers
8. **Sync Timing**: Synchronize music beats with scene transitions

### Integration Ideas:
- **Epidemic Sound API**: Access professional music library
- **AudioJungle Integration**: Curated stock music marketplace
- **Spotify/Apple Music**: Link to official soundtrack releases
- **Custom Composer**: Commission original scores for premium users

## Troubleshooting

### Issue: Music track not found
**Solution**: Verify track ID exists in database and track hasn't been deleted.

### Issue: Premium track access denied
**Solution**: User needs active author/publisher/studio subscription to access premium tracks.

### Issue: Music not syncing with video
**Note**: Current implementation generates video only. Music mixing will be added in post-processing phase.

## Related Documentation
- [Replicate Integration](./REPLICATE_INTEGRATION.md) - Video generation
- [API Routes](../README.md) - Complete API documentation
- [Prisma Schema](../prisma/schema.prisma) - Database models

---

**Last Updated:** 2025-11-14
