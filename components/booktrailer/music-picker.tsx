'use client'

import { useState, useEffect, useRef } from 'react'
import { Music, Play, Pause, Clock, Sparkles, Volume2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface MusicTrack {
  id: string
  title: string
  artist?: string
  genre: string[]
  mood: string[]
  duration: number
  tempo: string
  audioUrl: string
  waveformUrl?: string
  isPremium: boolean
}

interface MusicPickerProps {
  onTrackSelect?: (trackId: string) => void
  selectedTrackId?: string
}

// Mock data - in production this would come from /api/music/library
const MOCK_TRACKS: MusicTrack[] = [
  {
    id: 'cinematic-drama-1',
    title: 'Rising Tension',
    artist: 'Cinematic Sounds',
    genre: ['cinematic', 'dramatic'],
    mood: ['dark', 'intense', 'mysterious'],
    duration: 180,
    tempo: 'medium',
    audioUrl: '/music/cinematic-drama.mp3',
    isPremium: false,
  },
  {
    id: 'epic-orchestral-1',
    title: 'Epic Journey',
    artist: 'Epic Composer',
    genre: ['epic', 'orchestral'],
    mood: ['uplifting', 'heroic', 'grand'],
    duration: 210,
    tempo: 'medium',
    audioUrl: '/music/epic-orchestral.mp3',
    isPremium: false,
  },
  {
    id: 'emotional-piano-1',
    title: 'Heartfelt Moments',
    artist: 'Piano Dreams',
    genre: ['emotional', 'piano'],
    mood: ['romantic', 'nostalgic', 'soft'],
    duration: 165,
    tempo: 'slow',
    audioUrl: '/music/emotional-piano.mp3',
    isPremium: false,
  },
  {
    id: 'suspense-strings-1',
    title: 'Dark Secrets',
    artist: 'Thriller Sounds',
    genre: ['suspense', 'thriller'],
    mood: ['dark', 'mysterious', 'tense'],
    duration: 195,
    tempo: 'slow',
    audioUrl: '/music/suspense-strings.mp3',
    isPremium: false,
  },
  {
    id: 'uplifting-pop-1',
    title: 'Bright Days',
    artist: 'Pop Orchestra',
    genre: ['pop', 'uplifting'],
    mood: ['uplifting', 'happy', 'energetic'],
    duration: 175,
    tempo: 'fast',
    audioUrl: '/music/uplifting-pop.mp3',
    isPremium: false,
  },
  {
    id: 'dark-ambient-1',
    title: 'Shadows Fall',
    artist: 'Ambient Collective',
    genre: ['ambient', 'dark'],
    mood: ['dark', 'eerie', 'mysterious'],
    duration: 220,
    tempo: 'slow',
    audioUrl: '/music/dark-ambient.mp3',
    isPremium: true,
  },
]

const GENRE_FILTERS = [
  { value: 'all', label: 'All Genres' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'epic', label: 'Epic' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'suspense', label: 'Suspense' },
  { value: 'pop', label: 'Pop' },
  { value: 'ambient', label: 'Ambient' },
]

const MOOD_FILTERS = [
  { value: 'all', label: 'All Moods' },
  { value: 'dark', label: 'Dark' },
  { value: 'uplifting', label: 'Uplifting' },
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'intense', label: 'Intense' },
  { value: 'energetic', label: 'Energetic' },
]

export function MusicPicker({ onTrackSelect, selectedTrackId }: MusicPickerProps) {
  const [tracks, setTracks] = useState<MusicTrack[]>(MOCK_TRACKS)
  const [filteredTracks, setFilteredTracks] = useState<MusicTrack[]>(MOCK_TRACKS)
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [genreFilter, setGenreFilter] = useState('all')
  const [moodFilter, setMoodFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Filter tracks
  useEffect(() => {
    let filtered = [...tracks]

    if (genreFilter !== 'all') {
      filtered = filtered.filter((track) => track.genre.includes(genreFilter))
    }

    if (moodFilter !== 'all') {
      filtered = filtered.filter((track) => track.mood.includes(moodFilter))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (track) =>
          track.title.toLowerCase().includes(query) ||
          track.artist?.toLowerCase().includes(query)
      )
    }

    setFilteredTracks(filtered)
  }, [genreFilter, moodFilter, searchQuery, tracks])

  // Load tracks from API (in production)
  useEffect(() => {
    // In production: fetch('/api/music/library')
    setTracks(MOCK_TRACKS)
  }, [])

  const handlePlayPause = (trackId: string, audioUrl: string) => {
    if (playingTrackId === trackId) {
      audioRef.current?.pause()
      setPlayingTrackId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setPlayingTrackId(trackId)
      }
    }
  }

  const handleSelectTrack = (trackId: string) => {
    onTrackSelect?.(trackId)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Music className="w-5 h-5" />
          Background Music
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose a royalty-free track for your trailer
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GENRE_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mood">Mood</Label>
          <Select value={moodFilter} onValueChange={setMoodFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MOOD_FILTERS.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{filteredTracks.length} tracks available</span>
        {selectedTrackId && (
          <span className="flex items-center gap-1 text-indigo-600">
            <Check className="w-4 h-4" />
            Track selected
          </span>
        )}
      </div>

      {/* Tracks List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isPlaying={playingTrackId === track.id}
            isSelected={selectedTrackId === track.id}
            onPlayPause={() => handlePlayPause(track.id, track.audioUrl)}
            onSelect={() => handleSelectTrack(track.id)}
            formatDuration={formatDuration}
          />
        ))}

        {filteredTracks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <Music className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-500">No tracks found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        className="hidden"
      />

      {/* Info Box */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-900">
          <strong>Note:</strong> All tracks are royalty-free and licensed for commercial use.
          Premium tracks require an upgraded plan.
        </p>
      </div>
    </div>
  )
}

interface TrackCardProps {
  track: MusicTrack
  isPlaying: boolean
  isSelected: boolean
  onPlayPause: () => void
  onSelect: () => void
  formatDuration: (seconds: number) => string
}

function TrackCard({
  track,
  isPlaying,
  isSelected,
  onPlayPause,
  onSelect,
  formatDuration,
}: TrackCardProps) {
  return (
    <div
      className={`
        group p-4 rounded-lg border-2 transition-all
        ${
          isSelected
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <Button
          onClick={onPlayPause}
          variant="outline"
          size="sm"
          className={`
            flex-shrink-0 w-10 h-10 rounded-full
            ${isPlaying ? 'bg-indigo-500 text-white hover:bg-indigo-600' : ''}
          `}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                {track.title}
                {track.isPremium && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </h4>
              {track.artist && <p className="text-sm text-gray-600">{track.artist}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(track.duration)}
            </span>
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              {track.tempo}
            </span>
            <div className="flex gap-1">
              {track.genre.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Select Button */}
        <Button
          onClick={onSelect}
          variant={isSelected ? 'primary' : 'outline'}
          size="sm"
          className="flex-shrink-0"
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Selected
            </>
          ) : (
            'Select'
          )}
        </Button>
      </div>

      {/* Waveform placeholder */}
      {isPlaying && (
        <div className="mt-3 h-12 bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 rounded flex items-center justify-center">
          <div className="flex gap-1 items-end h-8">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-indigo-500 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
