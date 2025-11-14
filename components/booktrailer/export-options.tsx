'use client'

import { useState } from 'react'
import {
  Download,
  Smartphone,
  Monitor,
  Square,
  Film,
  Check,
  Sparkles,
  FileVideo,
  Maximize2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ExportOptionsProps {
  trailerId: string
  onExport?: (options: ExportConfig) => void
}

interface ExportConfig {
  format: string
  platform: string
  resolution: string
  aspectRatio: string
}

interface PresetOption {
  id: string
  name: string
  platform: string
  format: string
  resolution: string
  aspectRatio: string
  icon: React.ReactNode
  description: string
  isPremium: boolean
}

const PRESET_OPTIONS: PresetOption[] = [
  {
    id: 'youtube-landscape',
    name: 'YouTube / Desktop',
    platform: 'youtube',
    format: 'mp4-1080p',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    icon: <Monitor className="w-6 h-6" />,
    description: 'Perfect for YouTube, Vimeo, and desktop viewing',
    isPremium: false,
  },
  {
    id: 'instagram-story',
    name: 'Instagram Stories',
    platform: 'instagram',
    format: 'mp4-1080p',
    resolution: '1080x1920',
    aspectRatio: '9:16',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Vertical format for Instagram Stories, Reels, TikTok',
    isPremium: false,
  },
  {
    id: 'instagram-feed',
    name: 'Instagram Feed',
    platform: 'instagram',
    format: 'mp4-1080p',
    resolution: '1080x1080',
    aspectRatio: '1:1',
    icon: <Square className="w-6 h-6" />,
    description: 'Square format for Instagram, Facebook, Twitter feeds',
    isPremium: false,
  },
  {
    id: 'tiktok-vertical',
    name: 'TikTok',
    platform: 'tiktok',
    format: 'mp4-1080p',
    resolution: '1080x1920',
    aspectRatio: '9:16',
    icon: <Film className="w-6 h-6" />,
    description: 'Optimized for TikTok and vertical mobile viewing',
    isPremium: false,
  },
  {
    id: 'facebook-landscape',
    name: 'Facebook',
    platform: 'facebook',
    format: 'mp4-720p',
    resolution: '1280x720',
    aspectRatio: '16:9',
    icon: <Monitor className="w-6 h-6" />,
    description: 'Landscape format for Facebook posts and ads',
    isPremium: false,
  },
  {
    id: 'twitter-landscape',
    name: 'Twitter / X',
    platform: 'twitter',
    format: 'mp4-720p',
    resolution: '1280x720',
    aspectRatio: '16:9',
    icon: <Monitor className="w-6 h-6" />,
    description: 'Optimized for Twitter/X video posts',
    isPremium: false,
  },
  {
    id: 'custom-4k',
    name: '4K Ultra HD',
    platform: 'custom',
    format: 'mp4-4k',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    icon: <Maximize2 className="w-6 h-6" />,
    description: 'Maximum quality for professional use',
    isPremium: true,
  },
]

const CUSTOM_FORMATS = [
  { value: 'mp4-720p', label: 'MP4 - 720p HD' },
  { value: 'mp4-1080p', label: 'MP4 - 1080p Full HD' },
  { value: 'mp4-4k', label: 'MP4 - 4K Ultra HD', isPremium: true },
  { value: 'webm-1080p', label: 'WebM - 1080p', isPremium: true },
]

const CUSTOM_ASPECT_RATIOS = [
  { value: '16:9', label: '16:9 (Landscape)', resolution: '1920x1080' },
  { value: '9:16', label: '9:16 (Portrait)', resolution: '1080x1920' },
  { value: '1:1', label: '1:1 (Square)', resolution: '1080x1080' },
  { value: '4:5', label: '4:5 (Instagram)', resolution: '1080x1350', isPremium: true },
  { value: '21:9', label: '21:9 (Ultrawide)', resolution: '2560x1080', isPremium: true },
]

export function ExportOptions({ trailerId, onExport }: ExportOptionsProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>('youtube-landscape')
  const [useCustom, setUseCustom] = useState(false)
  const [customFormat, setCustomFormat] = useState('mp4-1080p')
  const [customAspectRatio, setCustomAspectRatio] = useState('16:9')
  const [isExporting, setIsExporting] = useState(false)

  const handlePresetSelect = (presetId: string) => {
    setSelectedPreset(presetId)
    setUseCustom(false)
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      let config: ExportConfig

      if (useCustom) {
        const aspectRatio = CUSTOM_ASPECT_RATIOS.find((ar) => ar.value === customAspectRatio)
        config = {
          format: customFormat,
          platform: 'custom',
          resolution: aspectRatio?.resolution || '1920x1080',
          aspectRatio: customAspectRatio,
        }
      } else {
        const preset = PRESET_OPTIONS.find((p) => p.id === selectedPreset)
        if (!preset) {
          alert('Please select an export preset')
          return
        }
        config = {
          format: preset.format,
          platform: preset.platform,
          resolution: preset.resolution,
          aspectRatio: preset.aspectRatio,
        }
      }

      // Call API to start export
      const response = await fetch(`/api/trailers/${trailerId}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      const data = await response.json()

      if (data.success) {
        onExport?.(config)
        // Download the file
        if (data.fileUrl) {
          window.open(data.fileUrl, '_blank')
        }
      } else {
        alert(`Export failed: ${data.error}`)
      }
    } catch (error) {
      console.error('Error exporting trailer:', error)
      alert('Failed to export trailer')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export & Download
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose a format optimized for your platform
        </p>
      </div>

      {/* Preset Options */}
      <div>
        <Label className="mb-3 block">Platform Presets</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_OPTIONS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset.id)}
              disabled={preset.isPremium}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all
                ${
                  selectedPreset === preset.id && !useCustom
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }
                ${preset.isPremium ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Premium Badge */}
              {preset.isPremium && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-indigo-500">{preset.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{preset.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{preset.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{preset.resolution}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{preset.aspectRatio}</span>
                  </div>
                </div>
                {selectedPreset === preset.id && !useCustom && (
                  <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Options Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          <h4 className="font-semibold text-gray-900">Custom Export Settings</h4>
          <p className="text-sm text-gray-600">Choose your own format and aspect ratio</p>
        </div>
        <Button
          onClick={() => setUseCustom(!useCustom)}
          variant={useCustom ? 'primary' : 'outline'}
          size="sm"
        >
          {useCustom ? 'Using Custom' : 'Use Custom'}
        </Button>
      </div>

      {/* Custom Settings */}
      {useCustom && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="space-y-2">
            <Label htmlFor="format">Video Format</Label>
            <Select value={customFormat} onValueChange={setCustomFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CUSTOM_FORMATS.map((format) => (
                  <SelectItem
                    key={format.value}
                    value={format.value}
                    disabled={format.isPremium}
                  >
                    {format.label}
                    {format.isPremium && ' (Premium)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
            <Select value={customAspectRatio} onValueChange={setCustomAspectRatio}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CUSTOM_ASPECT_RATIOS.map((ratio) => (
                  <SelectItem
                    key={ratio.value}
                    value={ratio.value}
                    disabled={ratio.isPremium}
                  >
                    {ratio.label} - {ratio.resolution}
                    {ratio.isPremium && ' (Premium)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Export Details */}
      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <FileVideo className="w-4 h-4" />
          Export Details
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Resolution:</span>
            <p className="font-semibold text-gray-900">
              {useCustom
                ? CUSTOM_ASPECT_RATIOS.find((ar) => ar.value === customAspectRatio)
                    ?.resolution
                : PRESET_OPTIONS.find((p) => p.id === selectedPreset)?.resolution}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Aspect Ratio:</span>
            <p className="font-semibold text-gray-900">
              {useCustom
                ? customAspectRatio
                : PRESET_OPTIONS.find((p) => p.id === selectedPreset)?.aspectRatio}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Format:</span>
            <p className="font-semibold text-gray-900">
              {useCustom
                ? customFormat.toUpperCase()
                : PRESET_OPTIONS.find((p) => p.id === selectedPreset)?.format.toUpperCase()}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Platform:</span>
            <p className="font-semibold text-gray-900 capitalize">
              {useCustom
                ? 'Custom'
                : PRESET_OPTIONS.find((p) => p.id === selectedPreset)?.platform}
            </p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <Button
        onClick={handleExport}
        disabled={isExporting || (!selectedPreset && !useCustom)}
        className="w-full"
        size="lg"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Export & Download
          </>
        )}
      </Button>

      {/* Info Box */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-900">
          <strong>Note:</strong> Exports are optimized for each platform. Premium formats (4K,
          WebM) require an upgraded subscription plan.
        </p>
      </div>
    </div>
  )
}
