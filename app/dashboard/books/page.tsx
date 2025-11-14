'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Book, Film, Plus } from 'lucide-react'

interface BookData {
  id: string
  title: string
  author: string
  genre: string
  coverImageUrl?: string
  createdAt: string
  trailers: Array<{
    id: string
    title: string
    status: string
    thumbnailUrl?: string
  }>
}

export default function BooksPage() {
  const [books, setBooks] = useState<BookData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        const data = await response.json()

        if (data.success) {
          setBooks(data.books)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError('Failed to fetch books')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
              <p className="text-gray-600 mt-1">Manage your book library and trailers</p>
            </div>
            {/* eslint-disable-next-line product-quality/no-broken-internal-links */}
            <Link href="/studio">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Trailer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {books.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No books yet</h2>
            <p className="text-gray-600 mb-6">
              Start by creating your first book trailer
            </p>
            {/* eslint-disable-next-line product-quality/no-broken-internal-links */}
            <Link href="/studio">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Trailer
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Cover Image */}
                <div className="relative h-64 bg-gray-200">
                  {book.coverImageUrl ? (
                    <Image
                      src={book.coverImageUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Book className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded">
                      {book.genre}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Trailers */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Film className="w-4 h-4" />
                        Trailers ({book.trailers.length})
                      </span>
                    </div>

                    {book.trailers.length > 0 ? (
                      <div className="space-y-2">
                        {book.trailers.slice(0, 2).map((trailer) => (
                          <div
                            key={trailer.id}
                            className="text-sm text-gray-600 flex items-center justify-between"
                          >
                            <span className="truncate">{trailer.title}</span>
                            <span
                              className={`px-2 py-1 text-xs rounded ${
                                trailer.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : trailer.status === 'processing'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {trailer.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No trailers yet</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Link href="/studio" className="flex-1">
                      <Button size="sm" className="w-full">
                        Create Trailer
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
