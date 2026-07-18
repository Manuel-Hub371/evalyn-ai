'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { InterviewQuestion } from '@/types'

interface QuestionDisplayProps {
  question: InterviewQuestion | null
  className?: string
}

export function QuestionDisplay({ question, className }: QuestionDisplayProps) {
  if (!question) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-lg text-muted-foreground">
          Preparing your first question...
        </p>
      </div>
    )
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={cn('text-center py-12 px-8', className)}
    >
      <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed">
        {question.text}
      </p>
    </motion.div>
  )
}
