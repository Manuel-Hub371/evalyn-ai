'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockInterviewInvitation, mockInterviewSession } from '@/lib/mock-data'
import { useInterviewStore } from '@/store/interview-store'
import { formatDuration } from '@/lib/utils'
import {
  User,
  Briefcase,
  Building2,
  Clock,
  Bot,
  CheckCircle2,
  Loader2,
} from 'lucide-react'

export default function LobbyPage() {
  const router = useRouter()
  const { setSession } = useInterviewStore()
  const [countdown, setCountdown] = useState(5)
  const [isReady, setIsReady] = useState(false)
  const invitation = mockInterviewInvitation

  useEffect(() => {
    if (isReady && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isReady && countdown === 0) {
      startInterview()
    }
  }, [countdown, isReady])

  const startInterview = () => {
    // Initialize interview session
    setSession(mockInterviewSession)
    router.push('/interview')
  }

  const handleReady = () => {
    setIsReady(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-muted/20 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl border-2">
            <CardContent className="p-12">
              {!isReady ? (
                <>
                  {/* Lobby Header */}
                  <div className="text-center mb-12">
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg">
                        <Bot className="h-12 w-12 text-white" />
                      </div>
                    </motion.div>

                    <motion.h1
                      className="text-3xl font-bold text-foreground mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Welcome to Your Interview
                    </motion.h1>

                    <motion.p
                      className="text-lg text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      You're about to begin your AI-powered interview
                    </motion.p>
                  </div>

                  {/* Interview Information */}
                  <motion.div
                    className="space-y-6 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Candidate
                          </p>
                          <p className="text-base font-semibold text-foreground truncate">
                            {mockInterviewSession.candidateName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Position
                          </p>
                          <p className="text-base font-semibold text-foreground">
                            {invitation.jobPosition}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Company
                          </p>
                          <p className="text-base font-semibold text-foreground">
                            {invitation.companyName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Duration
                          </p>
                          <p className="text-base font-semibold text-foreground">
                            {formatDuration(invitation.estimatedDuration)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* AI Interviewer Introduction */}
                  <motion.div
                    className="mb-12 p-6 bg-primary/5 border border-primary/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-start gap-4">
                      <Bot className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Your AI Interviewer
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          I'll be conducting your interview today. I'll ask you a
                          series of questions designed to understand your skills,
                          experience, and fit for the role. Take your time with
                          each response, and feel free to ask for clarification if
                          needed. This is a conversational interview - just be
                          yourself!
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Final Checklist */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="font-semibold text-foreground mb-4">
                      Before We Begin
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Camera and microphone are working',
                        'You are in a quiet environment',
                        'Internet connection is stable',
                        'You have reviewed the interview guidelines',
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-sm"
                        >
                          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Ready Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      size="xl"
                      onClick={handleReady}
                      className="w-full text-lg font-semibold"
                    >
                      I'm Ready to Begin
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Countdown */}
                  <div className="text-center py-12">
                    <motion.div
                      className="flex justify-center mb-8"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary">
                          {countdown}
                        </span>
                      </div>
                    </motion.div>

                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      Starting Your Interview
                    </h2>

                    <p className="text-lg text-muted-foreground mb-8">
                      Please wait while we prepare everything...
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Initializing AI interviewer</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Back Button (only when not in countdown) */}
          {!isReady && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                variant="ghost"
                onClick={() => router.push('/rules')}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back to Guidelines
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
