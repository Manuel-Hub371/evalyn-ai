'use client'

import { useState, useEffect } from 'react'
import { Mic, Video, Wifi } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const aiStates = {
  listening: { label: 'Listening...', color: '#22C55E' },
  thinking: { label: 'Thinking...', color: '#F59E0B' },
  generating: { label: 'Generating next question...', color: '#3B82F6' },
  speaking: { label: 'Speaking...', color: '#3B82F6' },
}

export function MainInterview() {
  const [aiState, setAIState] = useState<keyof typeof aiStates>('speaking')
  const [currentQuestion, setCurrentQuestion] = useState(
    'Can you walk me through your experience with microservices architecture?'
  )
  const [isSpeaking, setIsSpeaking] = useState(false)

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* AI Interviewer Card */}
      <div className="flex-1 bg-[#1E293B] rounded-[20px] border border-[#334155] p-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent pointer-events-none" />

        {/* AI Avatar */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className={cn(
              "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
              "bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] shadow-2xl"
            )}>
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            {/* Pulse Ring */}
            {aiState === 'speaking' && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#3B82F6]"
                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>

          {/* AI Status */}
          <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-[#273449] rounded-full">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: aiStates[aiState].color }}
            />
            <span className="text-[#F8FAFC] text-sm font-medium">{aiStates[aiState].label}</span>
          </div>

          {/* Current Question */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl text-center"
          >
            <p className="text-[#F8FAFC] text-xl leading-relaxed">{currentQuestion}</p>
          </motion.div>

          {/* Waveform Animation */}
          {aiState === 'speaking' && (
            <div className="mt-6 flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#3B82F6] rounded-full"
                  animate={{
                    height: ['16px', '32px', '16px'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Candidate Camera */}
      <div className="h-64 bg-[#1E293B] rounded-[20px] border border-[#334155] relative overflow-hidden">
        {/* Placeholder for camera feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#273449] to-[#1E293B] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#334155] rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-10 h-10 text-[#94A3B8]" />
            </div>
            <p className="text-[#94A3B8] text-sm">Camera Preview</p>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
            <Mic className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
            <Video className="w-4 h-4 text-[#22C55E]" />
          </div>
        </div>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#22C55E] rounded-full">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-3 bg-white rounded-full"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <span className="text-white text-sm font-medium">Speaking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
