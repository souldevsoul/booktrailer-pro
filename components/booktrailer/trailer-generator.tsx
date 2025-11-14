'use client'

import { useState } from 'react'
import { BookUploader } from './book-uploader'
import { StyleSelector, type TrailerSettings } from './style-selector'
import { TrailerPreview } from './trailer-preview'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'

type Step = 'upload' | 'customize' | 'generate' | 'preview'

export function TrailerGenerator() {
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [bookId, setBookId] = useState<string | null>(null)
  const [trailerId, setTrailerId] = useState<string | null>(null)
  const [trailerSettings, setTrailerSettings] = useState<TrailerSettings>({
    style: 'dramatic',
    duration: 60,
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleBookCreated = (id: string) => {
    setBookId(id)
    setCurrentStep('customize')
  }

  const handleStyleChange = (settings: TrailerSettings) => {
    setTrailerSettings(settings)
  }

  const handleGenerateTrailer = async () => {
    if (!bookId) return

    setIsGenerating(true)
    setCurrentStep('generate')

    try {
      const response = await fetch('/api/trailers/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId,
          ...trailerSettings,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTrailerId(data.trailer.id)
        setCurrentStep('preview')
      } else {
        alert(`Error: ${data.error}`)
        setCurrentStep('customize')
      }
    } catch (error) {
      console.error('Error generating trailer:', error)
      alert('Failed to generate trailer')
      setCurrentStep('customize')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStartOver = () => {
    setCurrentStep('upload')
    setBookId(null)
    setTrailerId(null)
  }

  const steps = [
    { id: 'upload', label: 'Upload Book', number: 1 },
    { id: 'customize', label: 'Customize Style', number: 2 },
    { id: 'generate', label: 'Generate', number: 3 },
    { id: 'preview', label: 'Preview & Download', number: 4 },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    transition-colors
                    ${
                      index <= currentStepIndex
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {step.number}
                </div>
                <p
                  className={`
                    text-sm mt-2 font-medium
                    ${index <= currentStepIndex ? 'text-indigo-600' : 'text-gray-400'}
                  `}
                >
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 transition-colors
                    ${index < currentStepIndex ? 'bg-indigo-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {currentStep === 'upload' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upload Your Book Details</h2>
            <BookUploader onBookCreated={handleBookCreated} />
          </div>
        )}

        {currentStep === 'customize' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customize Trailer Style</h2>
              <Button variant="outline" onClick={() => setCurrentStep('upload')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            <StyleSelector onStyleChange={handleStyleChange} />
            <div className="mt-8">
              <Button
                onClick={handleGenerateTrailer}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Generating Trailer...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Trailer
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'generate' && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Generating Your Trailer</h2>
            <p className="text-gray-600">
              Our AI is creating a cinematic trailer for your book. This may take 2-5 minutes...
            </p>
          </div>
        )}

        {currentStep === 'preview' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Book Trailer</h2>
              <Button variant="outline" onClick={handleStartOver}>
                Create Another
              </Button>
            </div>
            <TrailerPreview trailerId={trailerId || undefined} autoRefresh={true} />
          </div>
        )}
      </div>
    </div>
  )
}
