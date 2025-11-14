'use client'

import { useState, useEffect } from 'react'
import {
  GripVertical,
  Plus,
  Trash2,
  Sparkles,
  Edit2,
  Check,
  X,
  Clock,
  Wand2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Scene {
  id: string
  order: number
  title: string
  sceneText: string
  visualPrompt: string
  duration: number
  mood: string
}

interface SceneBuilderProps {
  bookId: string
  onScenesChange?: (scenes: Scene[]) => void
}

const MOODS = [
  { value: 'mysterious', label: 'Mysterious', emoji: '🔍' },
  { value: 'dramatic', label: 'Dramatic', emoji: '🎭' },
  { value: 'uplifting', label: 'Uplifting', emoji: '✨' },
  { value: 'tense', label: 'Tense', emoji: '⚡' },
  { value: 'romantic', label: 'Romantic', emoji: '💕' },
  { value: 'epic', label: 'Epic', emoji: '⚔️' },
  { value: 'eerie', label: 'Eerie', emoji: '👻' },
  { value: 'nostalgic', label: 'Nostalgic', emoji: '📜' },
]

export function SceneBuilder({ bookId, onScenesChange }: SceneBuilderProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  // Load existing scenes
  useEffect(() => {
    loadScenes()
  }, [bookId])

  const loadScenes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/books/${bookId}/scenes`)
      const data = await response.json()

      if (data.success) {
        setScenes(data.scenes || [])
        onScenesChange?.(data.scenes || [])
      }
    } catch (error) {
      console.error('Error loading scenes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateScenes = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch(`/api/books/${bookId}/scenes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 5 }),
      })

      const data = await response.json()

      if (data.success) {
        setScenes(data.scenes)
        onScenesChange?.(data.scenes)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error generating scenes:', error)
      alert('Failed to generate scenes')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUpdateScene = async (sceneId: string, updates: Partial<Scene>) => {
    try {
      const response = await fetch(`/api/scenes/${sceneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (data.success) {
        setScenes((prev) =>
          prev.map((s) => (s.id === sceneId ? { ...s, ...updates } : s))
        )
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error updating scene:', error)
      alert('Failed to update scene')
    }
  }

  const handleDeleteScene = async (sceneId: string) => {
    if (!confirm('Are you sure you want to delete this scene?')) return

    try {
      const response = await fetch(`/api/scenes/${sceneId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        await loadScenes() // Reload to get updated order
      }
    } catch (error) {
      console.error('Error deleting scene:', error)
      alert('Failed to delete scene')
    }
  }

  // Drag and drop handlers
  const handleDragStart = (sceneId: string) => {
    setDraggedId(sceneId)
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()

    if (!draggedId || draggedId === targetId) return

    const draggedIndex = scenes.findIndex((s) => s.id === draggedId)
    const targetIndex = scenes.findIndex((s) => s.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newScenes = [...scenes]
    const [draggedScene] = newScenes.splice(draggedIndex, 1)
    newScenes.splice(targetIndex, 0, draggedScene)

    // Update order numbers
    const reorderedScenes = newScenes.map((scene, index) => ({
      ...scene,
      order: index + 1,
    }))

    setScenes(reorderedScenes)
  }

  const handleDragEnd = async () => {
    if (!draggedId) return

    // Save new order to backend
    const draggedScene = scenes.find((s) => s.id === draggedId)
    if (draggedScene) {
      await handleUpdateScene(draggedId, { order: draggedScene.order })
    }

    setDraggedId(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Scene Builder</h3>
          <p className="text-sm text-gray-600 mt-1">
            {scenes.length === 0
              ? 'Generate AI scenes from your book or create custom scenes'
              : `${scenes.length} scenes • Drag to reorder`}
          </p>
        </div>
        <Button
          onClick={handleGenerateScenes}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {scenes.length === 0 ? 'Generate Scenes' : 'Regenerate'}
            </>
          )}
        </Button>
      </div>

      {/* Empty State */}
      {scenes.length === 0 && !isGenerating && (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg border-2 border-dashed border-indigo-200">
          <Wand2 className="w-16 h-16 text-indigo-400 mb-4" />
          <p className="text-gray-700 font-semibold mb-2">No scenes yet</p>
          <p className="text-gray-500 text-sm mb-4">
            Generate AI scenes from your book synopsis
          </p>
        </div>
      )}

      {/* Scenes List */}
      {scenes.length > 0 && (
        <div className="space-y-3">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              isEditing={editingId === scene.id}
              isDragging={draggedId === scene.id}
              onEdit={() => setEditingId(scene.id)}
              onCancelEdit={() => setEditingId(null)}
              onSave={(updates) => handleUpdateScene(scene.id, updates)}
              onDelete={() => handleDeleteScene(scene.id)}
              onDragStart={() => handleDragStart(scene.id)}
              onDragOver={(e) => handleDragOver(e, scene.id)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      )}

      {/* Info Box */}
      {scenes.length > 0 && (
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-sm text-indigo-900">
            <strong>Tip:</strong> Drag scenes to reorder them. Each scene will appear in order in
            your final trailer. Edit the visual prompts to fine-tune the AI generation.
          </p>
        </div>
      )}
    </div>
  )
}

interface SceneCardProps {
  scene: Scene
  isEditing: boolean
  isDragging: boolean
  onEdit: () => void
  onCancelEdit: () => void
  onSave: (updates: Partial<Scene>) => void
  onDelete: () => void
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragEnd: () => void
}

function SceneCard({
  scene,
  isEditing,
  isDragging,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
}: SceneCardProps) {
  const [editedScene, setEditedScene] = useState(scene)

  const handleSave = () => {
    onSave({
      title: editedScene.title,
      sceneText: editedScene.sceneText,
      visualPrompt: editedScene.visualPrompt,
      duration: editedScene.duration,
      mood: editedScene.mood,
    })
  }

  const moodEmoji = MOODS.find((m) => m.value === scene.mood)?.emoji || '🎬'

  if (isEditing) {
    return (
      <div className="p-6 bg-white rounded-lg border-2 border-indigo-300 shadow-lg">
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor={`title-${scene.id}`}>Scene Title</Label>
            <Input
              id={`title-${scene.id}`}
              value={editedScene.title || ''}
              onChange={(e) => setEditedScene({ ...editedScene, title: e.target.value })}
              placeholder="Opening Scene"
            />
          </div>

          {/* Scene Text */}
          <div className="space-y-2">
            <Label htmlFor={`text-${scene.id}`}>Scene Description</Label>
            <Textarea
              id={`text-${scene.id}`}
              value={editedScene.sceneText}
              onChange={(e) => setEditedScene({ ...editedScene, sceneText: e.target.value })}
              rows={3}
              placeholder="Brief narrative description..."
            />
          </div>

          {/* Visual Prompt */}
          <div className="space-y-2">
            <Label htmlFor={`visual-${scene.id}`}>Visual Prompt (for AI)</Label>
            <Textarea
              id={`visual-${scene.id}`}
              value={editedScene.visualPrompt}
              onChange={(e) =>
                setEditedScene({ ...editedScene, visualPrompt: e.target.value })
              }
              rows={3}
              placeholder="Detailed visual description for video generation..."
            />
          </div>

          {/* Duration and Mood */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`duration-${scene.id}`}>Duration (seconds)</Label>
              <Input
                id={`duration-${scene.id}`}
                type="number"
                min={3}
                max={15}
                value={editedScene.duration}
                onChange={(e) =>
                  setEditedScene({ ...editedScene, duration: parseInt(e.target.value) || 6 })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`mood-${scene.id}`}>Mood</Label>
              <Select
                value={editedScene.mood}
                onValueChange={(value) => setEditedScene({ ...editedScene, mood: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOODS.map((mood) => (
                    <SelectItem key={mood.value} value={mood.value}>
                      {mood.emoji} {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={onCancelEdit} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`
        group p-4 bg-white rounded-lg border-2 transition-all cursor-move
        ${isDragging ? 'opacity-50 border-indigo-400' : 'border-gray-200 hover:border-indigo-300'}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <div className="flex-shrink-0 mt-1">
          <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
        </div>

        {/* Scene Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-bold text-indigo-700">{scene.order}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {scene.title || `Scene ${scene.order}`}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {scene.duration}s
                </span>
                <span>{moodEmoji} {MOODS.find((m) => m.value === scene.mood)?.label}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{scene.sceneText}</p>

          <div className="p-2 bg-gray-50 rounded text-xs text-gray-500 line-clamp-2">
            <strong>Visual:</strong> {scene.visualPrompt}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button onClick={onDelete} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
