'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AIInterviewerState } from '@/types'
import { Mic, Loader2, MessageSquare } from 'lucide-react'

interface AIAvatarProps {
  state: AIInterviewerState
  className?: string
}

export function AIAvatar({ state, className }: AIAvatarProps) {
  const { status } = state

  const getStatusIcon = () => {
    switch (status) {
      case 'speaking':
        return <MessageSquare className="h-12 w-12" />
      case 'listening':
        return <Mic className="h-12 w-12" />
      case 'thinking':
      case 'processing':
        return <Loader2 className="h-12 w-12 animate-spin" />
      default:
        return <MessageSquare className="h-12 w-12" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'speaking':
        return 'AI is speaking...'
      case 'listening':
        return 'Listening to your response...'
      case 'thinking':
        return 'Thinking...'
      case 'processing':
        return 'Analyzing your response...'
      default:
        return 'Ready'
    }
  }

  const getGlowColor = () => {
    switch (status) {
      case 'speaking':
        return 'shadow-primary/50'
      case 'listening':
        return 'shadow-green-500/50'
      case 'thinking':
      case 'processing':
        return 'shadow-yellow-500/50'
      default:
        return 'shadow-gray-500/30'
    }
  }

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <motion.div
        className={cn(
          'relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white shadow-2xl',
          getGlowColor()
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
        {getStatusIcon()}
        
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
        <h3 className="text-lg font-semibold text-foreground">AI Interviewer</h3>
        <p className="text-sm text-muted-foreground mt-1">{getStatusText()}</p>
      </div>
    </div>
  )
}
