'use client'

import { useEffect, useRef, useState } from 'react'
import { Video, VideoOff, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { StatusIndicator } from '@/components/shared/status-indicator'

interface VideoPreviewProps {
  isCameraOn: boolean
  isRecording?: boolean
  className?: string
  showControls?: boolean
  onFullscreen?: () => void
}

export function VideoPreview({
  isCameraOn,
  isRecording = false,
  className,
  showControls = false,
  onFullscreen,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const setupCamera = async () => {
      if (isCameraOn) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
            audio: false,
          })
          setStream(mediaStream)
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
          }
        } catch (error) {
          console.error('Error accessing camera:', error)
        }
      } else {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
          setStream(null)
        }
      }
    }

    setupCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isCameraOn])

  return (
    <div className={cn('relative rounded-xl overflow-hidden bg-black', className)}>
      {isCameraOn ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Status indicators overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <StatusIndicator status="connected" label="Camera On" size="sm" />
            {isRecording && (
              <StatusIndicator
                status="error"
                label="Recording"
                size="sm"
                className="animate-pulse"
              />
            )}
          </div>

          {/* Fullscreen button */}
          {showControls && onFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onFullscreen}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900">
          <VideoOff className="h-16 w-16 text-gray-400" />
          <p className="text-gray-400">Camera is off</p>
        </div>
      )}
    </div>
  )
}
