import { cn } from '@/lib/utils'

interface StatusIndicatorProps {
  status: 'checking' | 'good' | 'available' | 'poor' | 'error' | 'unavailable' | 'denied' | 'connected' | 'disconnected' | 'reconnecting'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const statusColors = {
  checking: 'bg-yellow-500',
  good: 'bg-green-500',
  available: 'bg-green-500',
  poor: 'bg-yellow-500',
  error: 'bg-red-500',
  unavailable: 'bg-red-500',
  denied: 'bg-red-500',
  connected: 'bg-green-500',
  disconnected: 'bg-red-500',
  reconnecting: 'bg-yellow-500 animate-pulse',
}

const sizeClasses = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
}

export function StatusIndicator({
  status,
  label,
  size = 'md',
  className,
}: StatusIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-full',
          statusColors[status],
          sizeClasses[size]
        )}
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  )
}
