import { Skeleton } from '@/components/ui/skeleton'

export function TrailerPreviewSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Video Player Skeleton */}
      <div className="relative aspect-video bg-gray-900">
        <Skeleton className="w-full h-full" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>

      {/* Controls Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-7 w-3/4" />

        {/* Info Row */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}
