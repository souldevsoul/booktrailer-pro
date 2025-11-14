import { Skeleton } from '@/components/ui/skeleton'

interface BookGridSkeletonProps {
  count?: number
}

export function BookGridSkeleton({ count = 6 }: BookGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Book Cover Skeleton */}
          <Skeleton className="w-full h-64" />

          {/* Book Info Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <Skeleton className="h-6 w-3/4" />

            {/* Author */}
            <Skeleton className="h-4 w-1/2" />

            {/* Genre Badge */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
