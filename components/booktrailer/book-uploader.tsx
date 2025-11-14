'use client'

import { useState, useCallback } from 'react'
import { Upload, Book, X } from 'lucide-react'
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

interface BookUploaderProps {
  onBookCreated?: (bookId: string) => void
}

const GENRES = [
  { value: 'thriller', label: 'Thriller' },
  { value: 'romance', label: 'Romance' },
  { value: 'scifi', label: 'Sci-Fi' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'literary', label: 'Literary Fiction' },
  { value: 'horror', label: 'Horror' },
  { value: 'historical', label: 'Historical Fiction' },
  { value: 'young-adult', label: 'Young Adult' },
  { value: 'contemporary', label: 'Contemporary' },
]

const TARGET_AUDIENCES = [
  { value: 'children', label: 'Children' },
  { value: 'young-adult', label: 'Young Adult' },
  { value: 'adult', label: 'Adult' },
]

export function BookUploader({ onBookCreated }: BookUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    synopsis: '',
    isbn: '',
    publishDate: '',
    targetAge: '',
    keywords: '',
  })

  const handleCoverUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const removeCover = useCallback(() => {
    setCoverImage(null)
    setCoverFile(null)
  }, [])

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const keywords = formData.keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          keywords,
          coverImage: coverImage || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        onBookCreated?.(data.book.id)
        // Reset form
        setFormData({
          title: '',
          author: '',
          genre: '',
          description: '',
          synopsis: '',
          isbn: '',
          publishDate: '',
          targetAge: '',
          keywords: '',
        })
        setCoverImage(null)
        setCoverFile(null)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error creating book:', error)
      alert('Failed to create book')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover Upload */}
      <div className="space-y-2">
        <Label htmlFor="cover">Book Cover</Label>
        {!coverImage ? (
          <label
            htmlFor="cover"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
            <input
              id="cover"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleCoverUpload}
            />
          </label>
        ) : (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img
              src={coverImage}
              alt="Book cover"
              className="w-full h-full object-contain bg-gray-100"
            />
            <button
              type="button"
              onClick={removeCover}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter book title"
          required
        />
      </div>

      {/* Author */}
      <div className="space-y-2">
        <Label htmlFor="author">Author *</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => handleInputChange('author', e.target.value)}
          placeholder="Enter author name"
          required
        />
      </div>

      {/* Genre & Target Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre *</Label>
          <Select
            value={formData.genre}
            onValueChange={(value) => handleInputChange('genre', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAge">Target Audience</Label>
          <Select
            value={formData.targetAge}
            onValueChange={(value) => handleInputChange('targetAge', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              {TARGET_AUDIENCES.map((audience) => (
                <SelectItem key={audience.value} value={audience.value}>
                  {audience.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Brief description of your book (min 10 characters)"
          rows={3}
          required
        />
      </div>

      {/* Synopsis */}
      <div className="space-y-2">
        <Label htmlFor="synopsis">Synopsis (Optional)</Label>
        <Textarea
          id="synopsis"
          value={formData.synopsis}
          onChange={(e) => handleInputChange('synopsis', e.target.value)}
          placeholder="Full synopsis or key scenes for the trailer"
          rows={5}
        />
      </div>

      {/* ISBN & Publish Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN (Optional)</Label>
          <Input
            id="isbn"
            value={formData.isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
            placeholder="978-3-16-148410-0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishDate">Publish Date (Optional)</Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={(e) => handleInputChange('publishDate', e.target.value)}
          />
        </div>
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (Optional)</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => handleInputChange('keywords', e.target.value)}
          placeholder="adventure, magic, hero (comma separated)"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isUploading || !formData.title || !formData.author || !formData.genre}
        className="w-full"
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Creating Book...
          </>
        ) : (
          <>
            <Book className="w-4 h-4 mr-2" />
            Create Book
          </>
        )}
      </Button>
    </form>
  )
}
