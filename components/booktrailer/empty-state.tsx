import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 p-6">
        <Icon className="w-12 h-12 text-indigo-600" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-8">{description}</p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg" variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
