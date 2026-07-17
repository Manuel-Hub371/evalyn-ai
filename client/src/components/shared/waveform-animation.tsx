'use client'

import { cn } from '@/lib/utils'

interface WaveformAnimationProps {
  isActive?: boolean
  className?: string
  barCount?: number
}

export function WaveformAnimation({
  isActive = false,
  className,
  barCount = 5,
}: WaveformAnimationProps) {
  return (
    <div className={cn('flex items-center gap-1 h-8', className)}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1 bg-primary rounded-full transition-all',
            isActive ? 'animate-pulse' : 'h-2'
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            height: isActive ? `${Math.random() * 20 + 10}px` : '8px',
          }}
        />
      ))}
    </div>
  )
}
