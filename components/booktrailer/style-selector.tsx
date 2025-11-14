'use client'

import { useState } from 'react'
import { Film, Music, Clock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface StyleSelectorProps {
  onStyleChange?: (settings: TrailerSettings) => void
}

export interface TrailerSettings {
  style: string
  duration: number
  musicTrack?: string
  narrationVoice?: string
}

const STYLES = [
  {
    value: 'dramatic',
    label: 'Dramatic',
    description: 'Intense, emotional, high contrast lighting, cinematic camera movements',
    preview: '🎭',
  },
  {
    value: 'epic',
    label: 'Epic',
    description: 'Grand scale, sweeping vistas, heroic music, dramatic reveals',
    preview: '⚔️',
  },
  {
    value: 'intimate',
    label: 'Intimate',
    description: 'Close-up shots, soft lighting, emotional depth, quiet moments',
    preview: '💫',
  },
  {
    value: 'suspenseful',
    label: 'Suspenseful',
    description: 'Dark atmosphere, tension building, mysterious shadows, thriller aesthetic',
    preview: '🔍',
  },
  {
    value: 'whimsical',
    label: 'Whimsical',
    description: 'Playful camera work, bright colors, magical feel, lighthearted tone',
    preview: '✨',
  },
]

const MUSIC_TRACKS = [
  { value: 'cinematic-drama', label: 'Cinematic Drama' },
  { value: 'epic-orchestral', label: 'Epic Orchestral' },
  { value: 'emotional-piano', label: 'Emotional Piano' },
  { value: 'suspense-strings', label: 'Suspense Strings' },
  { value: 'uplifting-pop', label: 'Uplifting Pop' },
  { value: 'dark-ambient', label: 'Dark Ambient' },
]

const NARRATION_VOICES = [
  { value: 'male-dramatic', label: 'Male - Dramatic' },
  { value: 'male-warm', label: 'Male - Warm' },
  { value: 'female-dramatic', label: 'Female - Dramatic' },
  { value: 'female-soft', label: 'Female - Soft' },
  { value: 'none', label: 'No Narration' },
]

export function StyleSelector({ onStyleChange }: StyleSelectorProps) {
  const [selectedStyle, setSelectedStyle] = useState('dramatic')
  const [duration, setDuration] = useState([60])
  const [musicTrack, setMusicTrack] = useState<string>()
  const [narrationVoice, setNarrationVoice] = useState<string>()

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value)
    notifyChange({ style: value, duration: duration[0], musicTrack, narrationVoice })
  }

  const handleDurationChange = (value: number[]) => {
    setDuration(value)
    notifyChange({ style: selectedStyle, duration: value[0], musicTrack, narrationVoice })
  }

  const handleMusicChange = (value: string) => {
    setMusicTrack(value)
    notifyChange({ style: selectedStyle, duration: duration[0], musicTrack: value, narrationVoice })
  }

  const handleNarrationChange = (value: string) => {
    setNarrationVoice(value)
    notifyChange({ style: selectedStyle, duration: duration[0], musicTrack, narrationVoice: value })
  }

  const notifyChange = (settings: TrailerSettings) => {
    onStyleChange?.(settings)
  }

  const currentStyle = STYLES.find((s) => s.value === selectedStyle)

  return (
    <div className="space-y-6">
      {/* Style Selection */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Film className="w-4 h-4" />
          Trailer Style
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => handleStyleChange(style.value)}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all
                ${
                  selectedStyle === style.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="text-3xl mb-2">{style.preview}</div>
              <div className="font-semibold text-gray-900">{style.label}</div>
              <div className="text-xs text-gray-500 mt-1">{style.description}</div>
            </button>
          ))}
        </div>
        {currentStyle && (
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-sm text-indigo-900">
              <strong>{currentStyle.label}:</strong> {currentStyle.description}
            </p>
          </div>
        )}
      </div>

      {/* Duration Slider */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Duration: {duration[0]} seconds
        </Label>
        <Slider
          value={duration}
          onValueChange={handleDurationChange}
          min={30}
          max={120}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>30s (Quick)</span>
          <span>60s (Standard)</span>
          <span>120s (Extended)</span>
        </div>
      </div>

      {/* Music Track */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Music className="w-4 h-4" />
          Background Music (Optional)
        </Label>
        <Select value={musicTrack} onValueChange={handleMusicChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select music track" />
          </SelectTrigger>
          <SelectContent>
            {MUSIC_TRACKS.map((track) => (
              <SelectItem key={track.value} value={track.value}>
                {track.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Narration Voice */}
      <div className="space-y-2">
        <Label>Narration Voice (Optional)</Label>
        <Select value={narrationVoice} onValueChange={handleNarrationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select narration voice" />
          </SelectTrigger>
          <SelectContent>
            {NARRATION_VOICES.map((voice) => (
              <SelectItem key={voice.value} value={voice.value}>
                {voice.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
