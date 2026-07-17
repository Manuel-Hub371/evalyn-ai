'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AIInterviewerState } from '@/types'
import { Mic, Loader2, MessageSquare } from 'lucide-react'

interface AIAvatarProps {
  state: AIInterviewerState
  className?: string
  compact?: boolean
}

export function AIAvatar({ state, className, compact = false }: AIAvatarProps) {
  const { status } = state

  const getStatusText = () => {
    switch (status) {
      case 'speaking':
        return 'Speaking...'
      case 'listening':
        return 'Listening...'
      case 'thinking':
        return 'Thinking...'
      case 'processing':
        return 'Analyzing...'
      default:
        return 'Ready'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'speaking':
        return 'bg-primary'
      case 'listening':
        return 'bg-green-500'
      case 'thinking':
      case 'processing':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getBorderColor = () => {
    switch (status) {
      case 'speaking':
        return 'border-primary/60'
      case 'listening':
        return 'border-green-500/60'
      case 'thinking':
      case 'processing':
        return 'border-yellow-500/60'
      default:
        return 'border-gray-500/60'
    }
  }

  // Compact version for overlay (video call style)
  if (compact) {
    return (
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-lg shadow-2xl border-2',
          getBorderColor(),
          className
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: status === 'speaking' ? [1, 1.02, 1] : 1,
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          scale: {
            duration: 2,
            repeat: status === 'speaking' ? Infinity : 0,
            ease: 'easeInOut',
          }
        }}
        style={{ width: '140px', height: '105px' }}
      >
        {/* Video call style background with avatar */}
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative">
          {/* Avatar silhouette or image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-white/90"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Name badge at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-2 py-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white">Eva - AI</span>
              {/* Microphone indicator */}
              {status === 'listening' && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Mic className="w-3 h-3 text-green-400" />
                </motion.div>
              )}
              {status === 'speaking' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <MessageSquare className="w-3 h-3 text-primary" />
                </motion.div>
              )}
              {(status === 'thinking' || status === 'processing') && (
                <Loader2 className="w-3 h-3 text-yellow-400 animate-spin" />
              )}
            </div>
          </div>

          {/* Status indicator dot */}
          <div className={cn(
            'absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 border-white shadow-lg',
            getStatusColor()
          )} />

          {/* Pulse effect for listening */}
          {status === 'listening' && (
            <motion.div
              className="absolute inset-0 border-2 border-green-400 rounded-lg"
              animate={{
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
        </div>
      </motion.div>
    )
  }

  // Original full version
  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <motion.div
        className={cn(
          'relative w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4',
          getBorderColor()
        )}
        animate={{
          scale: status === 'speaking' ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: status === 'speaking' ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        {/* Female AI Avatar */}
        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 flex items-center justify-center text-6xl">
          👩‍💼
        </div>
        
        {/* Pulse effect for listening */}
        {status === 'listening' && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-500"
            animate={{
              scale: [1, 1.3],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">Eva - AI Interviewer</h3>
        <p className="text-sm text-muted-foreground mt-1">{getStatusText()}</p>
      </div>
    </div>
  )
}
