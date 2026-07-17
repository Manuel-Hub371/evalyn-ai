'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { AIAvatar } from '@/components/interview/ai-avatar'
import { VideoPreview } from '@/components/interview/video-preview'
import { QuestionDisplay } from '@/components/interview/question-display'
import { TranscriptPanel } from '@/components/interview/transcript-panel'
import { useInterviewStore } from '@/store/interview-store'
import { useSettingsStore } from '@/store/settings-store'
import { mockInterviewInvitation, sampleQuestions } from '@/lib/mock-data'
import { formatTime, generateId } from '@/lib/utils'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  HelpCircle,
  Square,
  Clock,
  Wifi,
  Building2,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lightbulb,
} from 'lucide-react'

export default function InterviewPage() {
  const router = useRouter()
  const {
    session,
    currentQuestion,
    setCurrentQuestion,
    aiState,
    setAIState,
    isCameraOn,
    isMicrophoneOn,
    toggleCamera,
    toggleMicrophone,
    liveTranscript,
    setLiveTranscript,
    addTranscriptEntry,
    updateProgress,
    connectionStatus,
  } = useInterviewStore()

  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showEndConfirm, setShowEndConfirm] = useState(false)

  // Simulate interview flow
  useEffect(() => {
    // Start with first question
    if (!currentQuestion) {
      askNextQuestion()
    }

    // Timer
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const askNextQuestion = () => {
    const stages = sampleQuestions
    const currentStage = stages[currentStageIndex]

    if (!currentStage) {
      // Interview complete
      completeInterview()
      return
    }

    const questions = currentStage.questions
    const question = questions[currentQuestionIndex]

    if (!question) {
      // Move to next stage
      setCurrentStageIndex(currentStageIndex + 1)
      setCurrentQuestionIndex(0)
      return
    }

    // Set AI to speaking
    setAIState({
      status: 'speaking',
      currentMessage: question,
    })

    // Create question object
    const questionObj = {
      id: generateId(),
      text: question,
      stageId: currentStage.stage,
      type: 'open-ended' as const,
      askedAt: new Date(),
    }

    setCurrentQuestion(questionObj)

    // After 3 seconds, AI stops speaking and starts listening
    setTimeout(() => {
      setAIState({ status: 'listening' })
      startListening()
    }, 3000)
  }

  const startListening = () => {
    // Simulate candidate speaking
    const phrases = [
      'Well, let me think about that...',
      'In my previous role, I...',
      'I believe the key to this is...',
      'From my experience...',
      'I would approach this by...',
    ]

    let phraseIndex = 0
    let transcript = ''

    const interval = setInterval(() => {
      if (phraseIndex < phrases.length) {
        transcript += phrases[phraseIndex] + ' '
        setLiveTranscript(transcript)
        phraseIndex++
      } else {
        clearInterval(interval)
        finishResponse(transcript)
      }
    }, 2000)
  }

  const finishResponse = (transcript: string) => {
    // Add to transcript
    addTranscriptEntry({
      id: generateId(),
      speaker: 'candidate',
      text: transcript,
      timestamp: new Date(),
    })

    // Clear live transcript
    setLiveTranscript('')

    // AI is thinking
    setAIState({ status: 'thinking' })

    // After 2 seconds, move to next question
    setTimeout(() => {
      const stages = sampleQuestions
      const currentStage = stages[currentStageIndex]
      const totalQuestionsInStage = currentStage.questions.length

      // Update progress
      const totalQuestions = stages.reduce(
        (sum, stage) => sum + stage.questions.length,
        0
      )
      const completedQuestions =
        stages
          .slice(0, currentStageIndex)
          .reduce((sum, stage) => sum + stage.questions.length, 0) +
        currentQuestionIndex +
        1

      const progress = (completedQuestions / totalQuestions) * 100
      updateProgress(progress)

      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      askNextQuestion()
    }, 2000)
  }

  const completeInterview = () => {
    updateProgress(100)
    router.push('/complete')
  }

  const handleEndInterview = () => {
    setShowEndConfirm(true)
  }

  const confirmEndInterview = () => {
    completeInterview()
  }

  const stages = sampleQuestions
  const currentStage = stages[currentStageIndex]
  const estimatedEndTime = new Date(Date.now() + 3600000) // 1 hour from now

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-card border-b flex items-center px-6">
        <div className="flex items-center gap-4 flex-1">
          {/* Company Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">
              {mockInterviewInvitation.companyName}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                Interview Progress
              </span>
              <span className="text-xs font-medium text-primary">
                {Math.round(session?.progress || 0)}%
              </span>
            </div>
            <Progress value={session?.progress || 0} className="h-2" />
          </div>

          {/* Time & Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono text-foreground">
                {formatTime(elapsedTime)}
              </span>
            </div>

            <Badge
              variant={
                connectionStatus.status === 'connected' ? 'default' : 'warning'
              }
              className="gap-1.5"
            >
              <Wifi className="h-3 w-3" />
              {connectionStatus.status === 'connected'
                ? 'Connected'
                : 'Reconnecting'}
            </Badge>

            {mockInterviewInvitation.recordingEnabled && (
              <Badge variant="destructive" className="gap-1.5 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white" />
                REC
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-hidden">
        {/* Left Panel - AI Interviewer + Question */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* AI Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AIAvatar state={aiState} className="mb-6" />
          </motion.div>

          {/* Current Question */}
          <AnimatePresence mode="wait">
            <QuestionDisplay
              key={currentQuestion?.id}
              question={currentQuestion}
              className="flex-1"
            />
          </AnimatePresence>
        </div>

        {/* Center Panel - Candidate Video (Smaller) */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <VideoPreview
              isCameraOn={isCameraOn}
              isRecording={mockInterviewInvitation.recordingEnabled}
              showControls={true}
              className="h-full min-h-[300px] max-h-[400px]"
            />
          </motion.div>
        </div>

        {/* Right Panel - Interview Information (Narrower) */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Stage Progress */}
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                Interview Stages
                <Badge variant="secondary" className="ml-auto text-xs">
                  {currentStageIndex + 1} / {stages.length}
                </Badge>
              </h3>

              <div className="space-y-2">
                {stages.map((stage, index) => {
                  const isCompleted = index < currentStageIndex
                  const isCurrent = index === currentStageIndex
                  const isUpcoming = index > currentStageIndex

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isCurrent
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium truncate ${
                            isCurrent
                              ? 'text-primary'
                              : isCompleted
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {stage.stage}
                        </p>
                      </div>

                      {isCurrent && (
                        <ChevronRight className="h-3 w-3 text-primary animate-pulse" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interview Tips */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Interview Tips
              </h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Take a moment to think before answering. Pauses show thoughtfulness.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Use specific examples from your experience to illustrate your points.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Maintain eye contact with the camera for a natural connection.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Speak clearly and at a moderate pace. The AI is listening carefully.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    If you need clarification, don't hesitate to ask for the question to be repeated.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Transcript + Controls */}
      <div className="border-t bg-card">
        {/* Live Transcript */}
        <div className="px-6 pt-4">
          <TranscriptPanel
            liveTranscript={liveTranscript}
            isListening={aiState.status === 'listening'}
          />
        </div>

        {/* Control Buttons */}
        <div className="px-6 py-4 flex items-center justify-center gap-3">
          <Button
            variant={isMicrophoneOn ? 'default' : 'destructive'}
            size="lg"
            onClick={toggleMicrophone}
            className="min-w-[120px]"
          >
            {isMicrophoneOn ? (
              <>
                <Mic className="h-5 w-5 mr-2" />
                Mute
              </>
            ) : (
              <>
                <MicOff className="h-5 w-5 mr-2" />
                Unmuted
              </>
            )}
          </Button>

          <Button
            variant={isCameraOn ? 'default' : 'secondary'}
            size="lg"
            onClick={toggleCamera}
            className="min-w-[120px]"
          >
            {isCameraOn ? (
              <>
                <Video className="h-5 w-5 mr-2" />
                Camera On
              </>
            ) : (
              <>
                <VideoOff className="h-5 w-5 mr-2" />
                Camera Off
              </>
            )}
          </Button>

          <Button variant="ghost" size="lg">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>

          <Button variant="ghost" size="lg">
            <HelpCircle className="h-5 w-5 mr-2" />
            Help
          </Button>

          <div className="flex-1" />

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndInterview}
            className="min-w-[140px]"
          >
            <Square className="h-5 w-5 mr-2" />
            End Interview
          </Button>
        </div>
      </div>

      {/* End Interview Confirmation Dialog */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl p-8 max-w-md w-full mx-4 border-2 border-destructive/20"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              End Interview?
            </h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to end this interview? Your responses so far
              will be submitted.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEndConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmEndInterview}
                className="flex-1"
              >
                End Interview
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
