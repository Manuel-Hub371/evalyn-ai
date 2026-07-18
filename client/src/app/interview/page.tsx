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
import { formatTime, generateId, cn } from '@/lib/utils'
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
  MessageSquare,
  Moon,
  Sun,
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
    transcript,
  } = useInterviewStore()

  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [avatarPosition, setAvatarPosition] = useState({ x: 0, y: 0 }) // Starting position at top-left corner (no padding)
  const [isSwapped, setIsSwapped] = useState(false) // Track if views are swapped
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

  // Toggle theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

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

    // Add AI question to transcript
    addTranscriptEntry({
      id: generateId(),
      speaker: 'ai',
      text: question,
      timestamp: new Date(),
    })

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

  // Determine if text overlay should be at top or bottom based on avatar position
  const isAvatarInBottomHalf = avatarPosition.y > 182 // Half of 364px video height
  const textOverlayPosition = isAvatarInBottomHalf ? 'top' : 'bottom'

  // Handle double-click to swap views
  const handleSwapViews = () => {
    setIsSwapped(!isSwapped)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Top Navigation Bar - Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-16 bg-card/40 backdrop-blur-xl border-b border-white/10 flex items-center px-6 relative z-10"
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Company Logo - Glass effect */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">
              {mockInterviewInvitation.companyName}
            </span>
          </motion.div>

          {/* Progress Bar - Glowing effect */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                Interview Progress
              </span>
              <motion.span 
                className="text-xs font-medium text-primary"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round(session?.progress || 0)}%
              </motion.span>
            </div>
            <div className="relative h-2 bg-secondary/30 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/50"
                initial={{ width: 0 }}
                animate={{ width: `${session?.progress || 0}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Time & Status - Glass badges */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex items-center gap-2 text-sm bg-card/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-mono text-foreground">
                {formatTime(elapsedTime)}
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge
                variant={connectionStatus.status === 'connected' ? 'default' : 'warning'}
                className="gap-1.5 bg-card/40 backdrop-blur-sm border border-white/10"
              >
                <motion.div
                  animate={connectionStatus.status === 'connected' ? { 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Wifi className="h-3 w-3" />
                </motion.div>
                {connectionStatus.status === 'connected' ? 'Connected' : 'Reconnecting'}
              </Badge>
            </motion.div>

            {mockInterviewInvitation.recordingEnabled && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Badge variant="destructive" className="gap-1.5 bg-destructive/80 backdrop-blur-sm border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  REC
                </Badge>
              </motion.div>
            )}

            {/* Theme Toggle - Glass button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9 bg-card/40 backdrop-blur-sm border border-white/10 hover:bg-card/60"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 text-primary" />
                  ) : (
                    <Moon className="h-4 w-4 text-primary" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-hidden relative z-10">
        {/* Left Panel - Interview Info - Glass cards */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
          {/* Interview Info Card - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-card/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <span>Interview Information</span>
            </h3>
            
            <div className="space-y-3">
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  Company
                </div>
                <p className="text-sm font-medium text-foreground mt-0.5 ml-3">
                  {mockInterviewInvitation.companyName}
                </p>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  Position
                </div>
                <p className="text-sm font-medium text-foreground mt-0.5 ml-3">
                  {mockInterviewInvitation.jobPosition}
                </p>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  Duration
                </div>
                <p className="text-sm font-medium text-foreground mt-0.5 ml-3">
                  {mockInterviewInvitation.estimatedDuration} minutes
                </p>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  Time Elapsed
                </div>
                <motion.p 
                  className="text-sm font-medium text-foreground mt-0.5 ml-3 font-mono"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {formatTime(elapsedTime)}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Interview Steps Card - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-card/40 backdrop-blur-xl rounded-2xl p-3 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              </div>
              <span className="text-xs">Steps</span>
              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20">
                {currentStageIndex + 1}/{stages.length}
              </Badge>
            </h3>

            <div className="space-y-1.5">
              {stages.map((stage, index) => {
                const isCompleted = index < currentStageIndex
                const isCurrent = index === currentStageIndex
                const isPending = index > currentStageIndex

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 3 }}
                    className={cn(
                      'relative flex items-center gap-2 p-2 rounded-xl transition-all duration-300 overflow-hidden',
                      isCurrent && 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 shadow-md shadow-primary/10',
                      isCompleted && 'bg-success/5 border border-success/10',
                      isPending && 'bg-secondary/20 border border-white/5'
                    )}
                  >
                    {/* Animated background for current step */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    <div className="flex-shrink-0 relative z-10">
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 500, delay: index * 0.1 }}
                          className="w-5 h-5 rounded-lg bg-gradient-to-br from-success to-success/60 flex items-center justify-center shadow-lg shadow-success/30"
                        >
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </motion.div>
                      ) : isCurrent ? (
                        <motion.div
                          className="w-5 h-5 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
                          animate={{
                            boxShadow: [
                              '0 0 10px rgba(99, 102, 241, 0.5)',
                              '0 0 20px rgba(99, 102, 241, 0.8)',
                              '0 0 10px rgba(99, 102, 241, 0.5)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-white"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </motion.div>
                      ) : (
                        <div className="w-5 h-5 rounded-lg bg-secondary/30 border border-white/10 flex items-center justify-center">
                          <Circle className="h-3 w-3 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 relative z-10">
                      <p
                        className={cn(
                          'text-[11px] font-medium truncate leading-tight',
                          isCurrent && 'text-primary',
                          isCompleted && 'text-success',
                          isPending && 'text-muted-foreground'
                        )}
                      >
                        {stage.stage}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex-shrink-0 relative z-10">
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <Badge className="text-[9px] px-1.5 py-0 bg-success/20 text-success border-success/30 shadow-sm">
                            Done
                          </Badge>
                        </motion.div>
                      )}
                      {isCurrent && (
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Badge className="text-[9px] px-1.5 py-0 bg-primary/20 text-primary border-primary/30 shadow-sm">
                            Active
                          </Badge>
                        </motion.div>
                      )}
                      {isPending && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-secondary/30 text-muted-foreground border-white/10">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Center Panel - Video with Overlays and Controls */}
        <div className="lg:col-span-6 flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
            style={{ width: '580px', height: '364px' }}
          >
            {!isSwapped ? (
              <>
                {/* Main View - Video Preview */}
                <div 
                  className="w-full h-full"
                  onDoubleClick={handleSwapViews}
                >
                  <VideoPreview
                    isCameraOn={isCameraOn}
                    isRecording={mockInterviewInvitation.recordingEnabled}
                    showControls={true}
                    className="w-full h-full cursor-pointer"
                  />
                </div>

                {/* Small Overlay - AI Avatar (Draggable) */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  dragConstraints={{
                    left: 0,
                    right: 380, // 580px video width - 200px avatar width
                    top: 0,
                    bottom: 214, // 364px video height - 150px avatar height
                  }}
                  style={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    x: avatarPosition.x,
                    y: avatarPosition.y
                  }}
                  onDragEnd={(event, info) => {
                    setAvatarPosition({ 
                      x: info.offset.x + avatarPosition.x, 
                      y: info.offset.y + avatarPosition.y 
                    })
                  }}
                  onDoubleClick={handleSwapViews}
                  className="z-10 cursor-move"
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                >
                  <div style={{ width: '200px', height: '150px' }}>
                    <AIAvatar state={aiState} compact={true} />
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                {/* Main View - AI Avatar (Large) */}
                <div 
                  className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg"
                  onDoubleClick={handleSwapViews}
                >
                  <div className="relative w-full h-full flex items-center justify-center cursor-pointer">
                    {/* Large AI Avatar Icon */}
                    <svg
                      className="w-48 h-48 text-white/90"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    
                    {/* Name badge at bottom */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-medium text-white">Eva - AI Interviewer</span>
                        {aiState.status === 'listening' && (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Mic className="w-5 h-5 text-green-400" />
                          </motion.div>
                        )}
                        {aiState.status === 'speaking' && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            <MessageSquare className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className={cn(
                      'absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-white shadow-lg',
                      aiState.status === 'speaking' ? 'bg-primary' :
                      aiState.status === 'listening' ? 'bg-green-500' :
                      aiState.status === 'thinking' || aiState.status === 'processing' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    )} />
                  </div>
                </div>

                {/* Small Overlay - Video (Draggable) */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  dragConstraints={{
                    left: 0,
                    right: 380, // 580px video width - 200px box width
                    top: 0,
                    bottom: 214, // 364px video height - 150px box height
                  }}
                  style={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    x: avatarPosition.x,
                    y: avatarPosition.y,
                    width: '200px',
                    height: '150px'
                  }}
                  onDragEnd={(event, info) => {
                    setAvatarPosition({ 
                      x: info.offset.x + avatarPosition.x, 
                      y: info.offset.y + avatarPosition.y 
                    })
                  }}
                  onDoubleClick={handleSwapViews}
                  className="z-10 cursor-move overflow-hidden rounded-lg border-2 border-white/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                >
                  <VideoPreview
                    isCameraOn={isCameraOn}
                    isRecording={mockInterviewInvitation.recordingEnabled}
                    showControls={false}
                    className="w-full h-full"
                  />
                </motion.div>
              </>
            )}

            {/* Question Display Overlay - Dynamic Position */}
            <div className={cn(
              'absolute left-0 right-0 z-10',
              textOverlayPosition === 'top' ? 'top-0' : 'bottom-0'
            )}>
              <AnimatePresence mode="wait">
                <QuestionDisplay
                  key={currentQuestion?.id}
                  question={currentQuestion}
                  aiState={aiState}
                  liveTranscript={liveTranscript}
                  position={textOverlayPosition}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Control Buttons - Glassmorphism */}
          <motion.div 
            className="flex items-center justify-center gap-2 bg-card/40 backdrop-blur-xl rounded-2xl p-3 border border-white/10 shadow-xl" 
            style={{ width: '580px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isMicrophoneOn ? 'default' : 'destructive'}
                size="icon"
                onClick={toggleMicrophone}
                className={cn(
                  "w-12 h-12 rounded-xl shadow-lg transition-all duration-300",
                  isMicrophoneOn 
                    ? "bg-gradient-to-br from-primary to-accent hover:shadow-primary/50" 
                    : "bg-gradient-to-br from-destructive to-destructive/80 hover:shadow-destructive/50"
                )}
                title={isMicrophoneOn ? 'Mute' : 'Unmute'}
              >
                <motion.div
                  animate={isMicrophoneOn ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isMicrophoneOn ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isCameraOn ? 'default' : 'secondary'}
                size="icon"
                onClick={toggleCamera}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isCameraOn ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <VideoOff className="h-5 w-5" />
                )}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 rounded-xl bg-card/60 hover:bg-card/80 backdrop-blur-sm border border-white/10 transition-all duration-300"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 rounded-xl bg-card/60 hover:bg-card/80 backdrop-blur-sm border border-white/10 transition-all duration-300"
                title="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="flex-1" />

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="destructive"
                size="default"
                onClick={handleEndInterview}
                className="px-6 rounded-xl bg-gradient-to-r from-destructive to-destructive/80 hover:shadow-lg hover:shadow-destructive/50 transition-all duration-300"
              >
                <Square className="h-4 w-4 mr-2" />
                End Interview
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Panel - Interview Information - Glassmorphism */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Live Transcript Card - Glassmorphism */}
            <motion.div 
              className="bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl flex flex-col h-[350px] overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-accent/10">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <span>Live Transcript</span>
                  {aiState.status === 'listening' && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge variant="default" className="ml-auto text-xs bg-success/80 backdrop-blur-sm">
                        Listening...
                      </Badge>
                    </motion.div>
                  )}
                  {aiState.status === 'speaking' && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-primary/20 backdrop-blur-sm">
                      AI Speaking
                    </Badge>
                  )}
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {transcript.length === 0 ? (
                  <motion.div 
                    className="flex items-center justify-center h-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                      </motion.div>
                      <p className="text-sm text-muted-foreground">
                        Conversation will appear here...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {transcript.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={cn(
                          'flex gap-2',
                          entry.speaker === 'ai' ? 'justify-start' : 'justify-end'
                        )}
                      >
                        {entry.speaker === 'ai' && (
                          <motion.div 
                            className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-semibold shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            AI
                          </motion.div>
                        )}
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={cn(
                            'rounded-2xl px-3 py-2 max-w-[80%] backdrop-blur-sm shadow-lg',
                            entry.speaker === 'ai'
                              ? 'bg-secondary/60 text-foreground border border-white/10'
                              : 'bg-gradient-to-br from-primary to-accent text-white shadow-primary/20'
                          )}
                        >
                          <p className="text-xs leading-relaxed">{entry.text}</p>
                          <p className="text-[10px] mt-1 opacity-70">
                            {new Date(entry.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </motion.div>

                        {entry.speaker === 'candidate' && (
                          <motion.div 
                            className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-semibold shadow-lg shadow-primary/30"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                          >
                            You
                          </motion.div>
                        )}
                      </motion.div>
                    ))}

                    {/* Live transcript indicator */}
                    {liveTranscript && aiState.status === 'listening' && (
                      <motion.div 
                        className="flex gap-2 justify-end"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="rounded-2xl px-3 py-2 max-w-[80%] bg-primary/40 backdrop-blur-sm text-white border border-primary/30 shadow-lg">
                          <p className="text-xs leading-relaxed italic">
                            {liveTranscript}
                          </p>
                          <motion.span
                            className="inline-block w-1 h-3 bg-white ml-1 rounded"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/40 backdrop-blur-sm flex items-center justify-center text-white text-xs font-semibold border border-primary/30">
                          You
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>

            {/* Interview Tips - Glassmorphism */}
            <motion.div 
              className="bg-gradient-to-br from-primary/10 via-card/40 to-accent/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-primary/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                </motion.div>
                <span>Interview Tips</span>
              </h3>

              <div className="space-y-2">
                {[
                  'Take a moment to think before answering.',
                  'Use specific examples from your experience.',
                  'Maintain eye contact with the camera.',
                  'Speak clearly and at a moderate pace.'
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex gap-2 p-2 rounded-xl bg-card/30 backdrop-blur-sm border border-white/5 transition-all duration-300"
                  >
                    <motion.div 
                      className="flex-shrink-0 mt-0.5"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: index * 0.2, duration: 2, repeat: Infinity }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50" />
                    </motion.div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
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
