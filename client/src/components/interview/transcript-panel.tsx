'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { WaveformAnimation } from '@/components/shared/waveform-animation'

interface TranscriptPanelProps {
  liveTranscript: string
  isListening: boolean
  className?: string
}

export function TranscriptPanel({
  liveTranscript,
  isListening,
  className,
}: TranscriptPanelProps) {
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [liveTranscript])

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Live Transcript
        </h3>
        <WaveformAnimation isActive={isListening} />
      </div>

      <div
        ref={transcriptRef}
        className="min-h-[100px] max-h-[200px] overflow-y-auto scrollbar-thin"
      >
        {liveTranscript ? (
          <p className="text-foreground leading-relaxed">{liveTranscript}</p>
        ) : (
          <p className="text-muted-foreground italic">
            {isListening
              ? 'Listening... Start speaking to see your words appear here.'
              : 'Your response will be transcribed here in real-time.'}
          </p>
        )}
      </div>
    </div>
  )
}
