'use client'

import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

interface UploadProgressProps {
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  message?: string
}

export function UploadProgress({ progress, status, message }: UploadProgressProps) {
  return (
    <div className="space-y-3">
      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Status */}
      <div className="flex items-center gap-3">
        {status === 'uploading' && (
          <>
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            <span className="text-sm text-gray-600">
              {message || `Uploading... ${progress}%`}
            </span>
          </>
        )}

        {status === 'processing' && (
          <>
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            <span className="text-sm text-gray-600">
              {message || 'Processing...'}
            </span>
          </>
        )}

        {status === 'completed' && (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">
              {message || 'Upload complete!'}
            </span>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-600">
              {message || 'Upload failed'}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
