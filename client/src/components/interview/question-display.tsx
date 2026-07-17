'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { InterviewQuestion, AIInterviewerState } from '@/types'
import { useState, useEffect } from 'react'

interface QuestionDisplayProps {
  question: InterviewQuestion | null
  aiState?: AIInterviewerState
  liveTranscript?: string
  position?: 'top' | 'bottom'
  className?: string
}

export function QuestionDisplay({ question, aiState, liveTranscript, position = 'bottom', className }: QuestionDisplayProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Typing effect for AI question
  useEffect(() => {
    if (!question || aiState?.status !== 'speaking') {
      if (aiState?.status !== 'speaking') {
        setDisplayedText(question?.text || '')
        setIsTypingComplete(true)
      }
      return
    }

    setDisplayedText('')
    setIsTypingComplete(false)
    
    const text = question.text
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, 30) // Speed of typing (30ms per character)

    return () => clearInterval(typingInterval)
  }, [question?.id, aiState?.status])

  const getStatusContent = () => {
    if (!aiState) return null
    
    switch (aiState.status) {
      case 'speaking':
        return {
          label: 'AI is asking',
          emoji: '🤖',
          showWaveform: true,
          color: 'text-blue-400',
          bgGradient: 'from-blue-500/20'
        }
      case 'listening':
        return {
          label: 'You are speaking',
          emoji: '🎤',
          showWaveform: true,
          color: 'text-green-400',
          bgGradient: 'from-green-500/20'
        }
      case 'thinking':
        return {
          label: 'AI is thinking',
          emoji: '💭',
          showTyping: true,
          color: 'text-yellow-400',
          bgGradient: 'from-yellow-500/20'
        }
      case 'processing':
        return {
          label: 'Processing',
          emoji: '⚙️',
          showTyping: true,
          color: 'text-purple-400',
          bgGradient: 'from-purple-500/20'
        }
      default:
        return null
    }
  }

  if (!question) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'bg-black/75 backdrop-blur-lg px-4 py-3',
          position === 'top' ? 'rounded-t-lg border-b border-white/10' : 'border-t border-white/10',
          className
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">⏳</span>
          <p className="text-sm text-white/80">
            Preparing your first question...
          </p>
        </div>
      </motion.div>
    )
  }

  const statusContent = getStatusContent()
  const showUserTranscript = aiState?.status === 'listening'
  const showAITyping = aiState?.status === 'speaking'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-gradient-to-t to-transparent backdrop-blur-lg px-4 py-3',
        statusContent?.bgGradient || 'from-black/75',
        'from-black/75',
        position === 'top' ? 'rounded-t-lg border-b border-white/10' : 'border-t border-white/10',
        className
      )}
    >
      {/* Status Bar */}
      <AnimatePresence mode="wait">
        {statusContent && (
          <motion.div 
            key={aiState?.status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 mb-2.5"
          >
            <span className="text-sm">{statusContent.emoji}</span>
            
            <span className={cn('text-xs font-semibold uppercase tracking-wider', statusContent.color)}>
              {statusContent.label}
            </span>
            
            {/* Waveform Animation */}
            {statusContent.showWaveform && (
              <div className="flex items-center gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      'w-0.5 rounded-full',
                      aiState?.status === 'speaking' ? 'bg-blue-400' : 'bg-green-400'
                    )}
                    animate={{
                      height: ['6px', '16px', '6px'],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Typing Animation */}
            {statusContent.showTyping && (
              <div className="flex items-center gap-1 ml-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn('w-1 h-1 rounded-full', statusContent.color.replace('text-', 'bg-'))}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content Area - Shows either Question or Live Transcript */}
      <AnimatePresence mode="wait">
        {showUserTranscript ? (
          // User's Live Transcript (when AI is listening)
          <motion.div
            key="transcript"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            <span className="text-base flex-shrink-0 mt-0.5">💬</span>
            <div className="flex-1">
              <p className="text-sm text-white/90 leading-relaxed italic">
                {liveTranscript || 'Listening...'}
              </p>
              <motion.span
                className="inline-block w-0.5 h-4 bg-green-400 ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ) : (
          // AI's Question (with typing effect when speaking, static when not)
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            <span className="text-base flex-shrink-0 mt-0.5">❓</span>
            <div className="flex-1">
              <p className="text-sm md:text-base font-medium text-white leading-relaxed">
                {showAITyping ? displayedText : (displayedText || question.text)}
              </p>
              {showAITyping && !isTypingComplete && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
