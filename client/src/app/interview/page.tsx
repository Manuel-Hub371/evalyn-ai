'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VideoPreview } from '@/components/interview/video-preview'
import { useInterviewStore } from '@/store/interview-store'
import { useThemeStore } from '@/store/theme-store'
import { mockInterviewInvitation, mockInterviewSession, sampleQuestions } from '@/lib/mock-data'
import { formatTime, generateId } from '@/lib/utils'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  Building2,
  Monitor,
  Move,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeftRight,
  CheckCircle2,
  Circle,
  Loader,
  Moon,
  Sun,
} from 'lucide-react'

export default function InterviewPage() {
  const router = useRouter()
  const { theme, setTheme, getEffectiveTheme } = useThemeStore()
  const isDark = getEffectiveTheme() === 'dark'
  
  const {
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
  } = useInterviewStore()

  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [cameraPosition, setCameraPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('bottom-right')
  const [isSwapped, setIsSwapped] = useState(false) // false = AI large, true = Camera large

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  useEffect(() => {
    if (!currentQuestion) {
      askNextQuestion()
    }

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const askNextQuestion = () => {
    const stages = sampleQuestions
    const currentStage = stages[currentStageIndex]

    if (!currentStage) {
      completeInterview()
      return
    }

    const questions = currentStage.questions
    const question = questions[currentQuestionIndex]

    if (!question) {
      setCurrentStageIndex(currentStageIndex + 1)
      setCurrentQuestionIndex(0)
      return
    }

    setAIState({
      status: 'speaking',
      currentMessage: question,
    })

    const questionObj = {
      id: generateId(),
      text: question,
      stageId: currentStage.stage,
      type: 'open-ended' as const,
      askedAt: new Date(),
    }

    setCurrentQuestion(questionObj)

    setTimeout(() => {
      setAIState({ status: 'listening' })
      startListening()
    }, 3000)
  }

  const startListening = () => {
    const phrases = [
      'Well, let me think about that...',
      'In my previous role, I...',
      'I believe the key to this is...',
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
    addTranscriptEntry({
      id: generateId(),
      speaker: 'candidate',
      text: transcript,
      timestamp: new Date(),
    })

    setLiveTranscript('')
    setAIState({ status: 'thinking' })

    setTimeout(() => {
      const stages = sampleQuestions
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

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0B1120]' : 'bg-gray-50'}`}>
      {/* Left Sidebar */}
      <div className={`w-80 border-r flex flex-col ${
        isDark 
          ? 'bg-[#111827] border-[#374151]' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b ${isDark ? 'border-[#374151]' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className={`text-sm font-semibold ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
                {mockInterviewInvitation.companyName}
              </h2>
              <p className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>
                Interview Platform
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className={`text-xs mb-1 ${isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>
                Candidate:
              </p>
              <p className={`text-sm font-semibold ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
                {mockInterviewSession.candidateName}
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>
                Job Title:
              </p>
              <p className={`text-sm font-semibold ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
                {mockInterviewInvitation.jobPosition}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
            Interview Topics
          </h3>
          <div className="space-y-3">
            {stages.map((stage, index) => {
              const isCompleted = index < currentStageIndex
              const isCurrent = index === currentStageIndex
              const isPending = index > currentStageIndex

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                    isCurrent
                      ? isDark 
                        ? 'bg-[#1F2937] border-[#6366F1] shadow-md' 
                        : 'bg-blue-50 border-blue-400 shadow-md'
                      : isCompleted
                      ? isDark
                        ? 'bg-[#1F2937] border-green-500/50'
                        : 'bg-green-50 border-green-300'
                      : isDark
                      ? 'bg-[#1F2937] border-[#374151]'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </motion.div>
                      )}
                      {isCurrent && (
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Loader className="h-5 w-5 text-blue-600" />
                        </motion.div>
                      )}
                      {isPending && (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${
                        isCurrent 
                          ? isDark ? 'text-[#6366F1]' : 'text-blue-900'
                          : isCompleted 
                          ? 'text-green-900' 
                          : isDark ? 'text-[#9CA3AF]' : 'text-gray-500'
                      }`}>
                        {stage.stage}
                      </p>
                      
                      {/* Status Badge */}
                      <div className="mt-1.5">
                        {isCompleted && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Completed
                          </span>
                        )}
                        {isCurrent && (
                          <motion.span
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                          >
                            Active Now
                          </motion.span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator Bar */}
                  {isCurrent && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className={`h-16 border-b flex items-center justify-between px-6 ${
          isDark 
            ? 'bg-[#111827] border-[#374151]' 
            : 'bg-white border-gray-200'
        }`}>
          <h1 className={`text-lg font-semibold ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
            {mockInterviewInvitation.companyName} Interview
          </h1>
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB]' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Badge className="bg-green-100 text-green-700">Connected</Badge>
          </div>
        </div>

        <div className={`flex-1 flex items-center justify-center p-8 ${
          isDark 
            ? 'bg-gradient-to-br from-[#0B1120] to-[#1F2937]' 
            : 'bg-gradient-to-br from-gray-50 to-blue-50'
        }`}>
          <div className="max-w-6xl w-full">
            <motion.div
              className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-2xl overflow-hidden mb-6"
              style={{ height: '500px' }}
            >
              {/* Swap Button - Top Center */}
              <button
                onClick={() => setIsSwapped(!isSwapped)}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 hover:bg-white backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border border-gray-300 transition-all hover:scale-105"
                title="Swap AI and Camera views"
              >
                <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">
                  {isSwapped ? 'Show AI Large' : 'Show Camera Large'}
                </span>
              </button>

              <div className="absolute inset-0 flex items-center justify-center">
                {/* LARGE VIEW - Changes based on isSwapped */}
                {!isSwapped ? (
                  /* AI Avatar Large */
                  <>
                    {aiState.status === 'speaking' && (
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    <div className="text-center text-gray-900 z-10">
                      <div className="text-6xl mb-4">👩‍💼</div>
                      <p className="text-lg font-semibold">AI Interviewer</p>
                      <p className="text-sm text-gray-600">
                        {aiState.status === 'speaking' && 'Speaking...'}
                        {aiState.status === 'listening' && 'Listening...'}
                        {aiState.status === 'thinking' && 'Thinking...'}
                        {aiState.status === 'idle' && 'Ready'}
                      </p>
                    </div>

                    {/* Question overlay - position based on camera position */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={liveTranscript ? 'user-speaking' : aiState.status}
                        initial={{ opacity: 0, y: cameraPosition.startsWith('bottom') ? -20 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: cameraPosition.startsWith('bottom') ? -20 : 20 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute left-0 right-0 bg-black/70 backdrop-blur-md ${
                          cameraPosition.startsWith('bottom') ? 'top-0' : 'bottom-0'
                        }`}
                      >
                        <div className="px-12 py-6">
                          {/* Status Header with Waveform Animation */}
                          <div className="flex items-center gap-3 mb-3">
                            {/* Waveform Visualization */}
                            <div className="flex items-center gap-0.5">
                              {[...Array(8)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ 
                                    height: (liveTranscript || aiState.status !== 'idle') ? [4, 16, 4] : [4],
                                    opacity: (liveTranscript || aiState.status !== 'idle') ? [0.3, 1, 0.3] : [0.3]
                                  }}
                                  transition={{ 
                                    duration: liveTranscript ? 0.6 : (aiState.status === 'thinking' ? 1.2 : 0.8), 
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                  }}
                                  className={`w-0.5 rounded-full ${
                                    liveTranscript ? 'bg-green-400' :
                                    aiState.status === 'speaking' ? 'bg-blue-400' :
                                    aiState.status === 'listening' ? 'bg-green-400' :
                                    aiState.status === 'thinking' ? 'bg-purple-400' :
                                    'bg-gray-400'
                                  }`}
                                  style={{ height: '4px' }}
                                />
                              ))}
                            </div>

                            {/* Status Label */}
                            <motion.p
                              animate={{ opacity: [1, 0.6, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className={`text-xs font-semibold uppercase tracking-wider ${
                                liveTranscript ? 'text-green-400' :
                                aiState.status === 'speaking' ? 'text-blue-400' :
                                aiState.status === 'listening' ? 'text-green-400' :
                                aiState.status === 'thinking' ? 'text-purple-400' :
                                'text-gray-400'
                              }`}
                            >
                              {liveTranscript ? 'You Speaking' :
                               aiState.status === 'speaking' ? 'AI Speaking' :
                               aiState.status === 'listening' ? 'Listening' :
                               aiState.status === 'thinking' ? 'Analyzing' :
                               'Ready'}
                            </motion.p>
                          </div>

                          {/* Text Content - Shows user transcript or AI question */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                          >
                            <p className="text-base font-medium text-white m-0 p-0 leading-snug">
                              {liveTranscript || currentQuestion?.text || 'Loading...'}
                            </p>
                            {/* Typing cursor when user is speaking */}
                            {liveTranscript && (
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-0.5 h-4 bg-green-400 ml-1 align-middle"
                              />
                            )}
                          </motion.div>
                        </div>

                        {/* Animated bottom border based on status */}
                        <motion.div
                          className={`h-1 ${
                            liveTranscript ? 'bg-green-400' :
                            aiState.status === 'speaking' ? 'bg-blue-400' :
                            aiState.status === 'listening' ? 'bg-green-400' :
                            aiState.status === 'thinking' ? 'bg-purple-400' :
                            'bg-gray-400'
                          }`}
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scaleX: [0.9, 1, 0.9]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  /* Camera Large */
                  <>
                    <div className="absolute inset-0">
                      <VideoPreview
                        isCameraOn={isCameraOn}
                        isRecording={false}
                        showControls={false}
                        className="h-full w-full"
                      />
                      <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                        <p className="text-lg font-semibold text-white">
                          {mockInterviewSession.candidateName}
                        </p>
                      </div>
                    </div>

                    {/* Question overlay for swapped mode - position based on AI avatar position */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={liveTranscript ? 'user-speaking' : aiState.status}
                        initial={{ opacity: 0, y: cameraPosition.startsWith('bottom') ? -20 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: cameraPosition.startsWith('bottom') ? -20 : 20 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute left-0 right-0 bg-black/70 backdrop-blur-md ${
                          cameraPosition.startsWith('bottom') ? 'top-0' : 'bottom-0'
                        }`}
                      >
                        <div className="px-12 py-6">
                          {/* Status Header with Waveform Animation */}
                          <div className="flex items-center gap-3 mb-3">
                            {/* Waveform Visualization */}
                            <div className="flex items-center gap-0.5">
                              {[...Array(8)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ 
                                    height: (liveTranscript || aiState.status !== 'idle') ? [4, 16, 4] : [4],
                                    opacity: (liveTranscript || aiState.status !== 'idle') ? [0.3, 1, 0.3] : [0.3]
                                  }}
                                  transition={{ 
                                    duration: liveTranscript ? 0.6 : (aiState.status === 'thinking' ? 1.2 : 0.8), 
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                  }}
                                  className={`w-0.5 rounded-full ${
                                    liveTranscript ? 'bg-green-400' :
                                    aiState.status === 'speaking' ? 'bg-blue-400' :
                                    aiState.status === 'listening' ? 'bg-green-400' :
                                    aiState.status === 'thinking' ? 'bg-purple-400' :
                                    'bg-gray-400'
                                  }`}
                                  style={{ height: '4px' }}
                                />
                              ))}
                            </div>

                            {/* Status Label */}
                            <motion.p
                              animate={{ opacity: [1, 0.6, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className={`text-xs font-semibold uppercase tracking-wider ${
                                liveTranscript ? 'text-green-400' :
                                aiState.status === 'speaking' ? 'text-blue-400' :
                                aiState.status === 'listening' ? 'text-green-400' :
                                aiState.status === 'thinking' ? 'text-purple-400' :
                                'text-gray-400'
                              }`}
                            >
                              {liveTranscript ? 'You Speaking' :
                               aiState.status === 'speaking' ? 'AI Speaking' :
                               aiState.status === 'listening' ? 'Listening' :
                               aiState.status === 'thinking' ? 'Analyzing' :
                               'Ready'}
                            </motion.p>
                          </div>

                          {/* Text Content - Shows user transcript or AI question */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                          >
                            <p className="text-base font-medium text-white m-0 p-0 leading-snug">
                              {liveTranscript || currentQuestion?.text || 'Loading...'}
                            </p>
                            {/* Typing cursor when user is speaking */}
                            {liveTranscript && (
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-0.5 h-4 bg-green-400 ml-1 align-middle"
                              />
                            )}
                          </motion.div>
                        </div>

                        {/* Animated bottom border based on status */}
                        <motion.div
                          className={`h-1 ${
                            liveTranscript ? 'bg-green-400' :
                            aiState.status === 'speaking' ? 'bg-blue-400' :
                            aiState.status === 'listening' ? 'bg-green-400' :
                            aiState.status === 'thinking' ? 'bg-purple-400' :
                            'bg-gray-400'
                          }`}
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scaleX: [0.9, 1, 0.9]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}

                {/* SMALL CORNER BOX - Changes based on isSwapped */}
                <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  className={`absolute w-80 h-52 rounded-lg overflow-hidden shadow-xl border-2 border-white ${
                    cameraPosition === 'top-left' ? 'top-0 left-0' :
                    cameraPosition === 'top-right' ? 'top-0 right-0' :
                    cameraPosition === 'bottom-left' ? 'bottom-0 left-0' :
                    'bottom-0 right-0'
                  }`}
                  initial={false}
                  animate={{
                    top: cameraPosition.startsWith('top') ? '0' : 'auto',
                    bottom: cameraPosition.startsWith('bottom') ? '0' : 'auto',
                    left: cameraPosition.endsWith('left') ? '0' : 'auto',
                    right: cameraPosition.endsWith('right') ? '0' : 'auto',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {!isSwapped ? (
                    /* Camera in Corner */
                    <>
                      <VideoPreview
                        isCameraOn={isCameraOn}
                        isRecording={false}
                        showControls={false}
                        className="h-full w-full"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                        <p className="text-xs font-medium text-white">
                          {mockInterviewSession.candidateName}
                        </p>
                      </div>
                    </>
                  ) : (
                    /* AI Avatar in Corner */
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                      {aiState.status === 'speaking' && (
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <div className="text-center z-10">
                        <div className="text-3xl mb-2">👩‍💼</div>
                        <p className="text-xs font-semibold text-gray-900">AI Interviewer</p>
                        <p className="text-xs text-gray-600">
                          {aiState.status === 'speaking' && 'Speaking'}
                          {aiState.status === 'listening' && 'Listening'}
                          {aiState.status === 'thinking' && 'Thinking'}
                          {aiState.status === 'idle' && 'Ready'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Position Control Menu */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-1 flex flex-col gap-1">
                    <button
                      onClick={() => setCameraPosition('top-left')}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        cameraPosition === 'top-left' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                      }`}
                      title="Move to top-left"
                    >
                      <ArrowUpLeft className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setCameraPosition('top-right')}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        cameraPosition === 'top-right' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                      }`}
                      title="Move to top-right"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setCameraPosition('bottom-left')}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        cameraPosition === 'bottom-left' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                      }`}
                      title="Move to bottom-left"
                    >
                      <ArrowDownLeft className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setCameraPosition('bottom-right')}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        cameraPosition === 'bottom-right' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                      }`}
                      title="Move to bottom-right"
                    >
                      <ArrowDownRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Drag Handle */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-1.5 cursor-move">
                    <Move className="h-3 w-3 text-gray-600" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className={`rounded-xl shadow-lg border p-4 flex items-center justify-between ${
              isDark 
                ? 'bg-[#111827] border-[#374151]' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex gap-3">
                <Button onClick={toggleMicrophone} className="flex flex-col gap-1 h-auto py-3">
                  {isMicrophoneOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  <span className="text-xs">Mute</span>
                </Button>
                <Button onClick={toggleCamera} className="flex flex-col gap-1 h-auto py-3 bg-orange-500">
                  {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  <span className="text-xs">Camera</span>
                </Button>
                <Button variant="ghost" className="flex flex-col gap-1 h-auto py-3">
                  <Monitor className="h-5 w-5" />
                  <span className="text-xs">Share</span>
                </Button>
                <Button variant="ghost" className="flex flex-col gap-1 h-auto py-3">
                  <Settings className="h-5 w-5" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold font-mono">{formatTime(elapsedTime)}</p>
                <Button variant="destructive" onClick={handleEndInterview} className="bg-red-500">
                  Leave Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`w-80 border-l flex flex-col ${
        isDark 
          ? 'bg-[#111827] border-[#374151]' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b ${isDark ? 'border-[#374151]' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
              Live Transcript
            </h3>
            {(aiState.status === 'speaking' || liveTranscript) && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-1"
              >
                <div className="flex gap-0.5">
                  <motion.div
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                    className="w-1 bg-red-500 rounded-full"
                  />
                  <motion.div
                    animate={{ height: [8, 20, 8] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                    className="w-1 bg-red-500 rounded-full"
                  />
                  <motion.div
                    animate={{ height: [8, 14, 8] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    className="w-1 bg-red-500 rounded-full"
                  />
                </div>
                <span className="text-xs font-medium text-red-600">LIVE</span>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* AI Speaking Transcript */}
          <AnimatePresence mode="wait">
            {aiState.status === 'speaking' && currentQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.div
                  className={`rounded-xl p-4 border-2 shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-br from-[#1F2937] to-[#111827] border-blue-500'
                      : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
                  }`}
                  animate={{ 
                    boxShadow: [
                      '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                      '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
                      '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                    >
                      <span className="text-xs">👩‍💼</span>
                    </motion.div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${isDark ? 'text-[#6366F1]' : 'text-blue-900'}`}>
                        AI Interviewer
                      </p>
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-blue-600"
                        />
                        <span className={`text-xs font-medium ${isDark ? 'text-[#9CA3AF]' : 'text-blue-700'}`}>
                          Speaking...
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transcript Text with typing effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F9FAFB]' : 'text-gray-800'}`}>
                      {currentQuestion.text}
                    </p>
                  </motion.div>

                  {/* Sound Wave Animation */}
                  <div className="flex items-center gap-0.5 mt-3 justify-center">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: [4, 16, 4],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                        className="w-0.5 bg-blue-500 rounded-full"
                        style={{ height: '4px' }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Pulse Ring Effect */}
                <motion.div
                  className="absolute -inset-1 bg-blue-400 rounded-xl -z-10"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* User Speaking Transcript */}
          <AnimatePresence mode="wait">
            {liveTranscript && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.div
                  className={`rounded-xl p-4 border-2 shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-br from-[#1F2937] to-[#111827] border-green-500'
                      : 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
                  }`}
                  animate={{ 
                    boxShadow: [
                      '0 4px 6px -1px rgba(34, 197, 94, 0.3)',
                      '0 10px 15px -3px rgba(34, 197, 94, 0.4)',
                      '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <Mic className="h-3 w-3 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${isDark ? 'text-green-400' : 'text-green-900'}`}>
                        You
                      </p>
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-green-600"
                        />
                        <span className={`text-xs font-medium ${isDark ? 'text-[#9CA3AF]' : 'text-green-700'}`}>
                          Speaking...
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transcript Text with animated appearance */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F9FAFB]' : 'text-gray-800'}`}>
                      {liveTranscript}
                    </p>
                    {/* Typing cursor */}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-green-600 ml-1 align-middle"
                    />
                  </motion.div>

                  {/* Sound Wave Animation */}
                  <div className="flex items-center gap-0.5 mt-3 justify-center">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: [4, 20, 4],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity,
                          delay: i * 0.08,
                          ease: "easeInOut"
                        }}
                        className="w-0.5 bg-green-500 rounded-full"
                        style={{ height: '4px' }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Pulse Ring Effect */}
                <motion.div
                  className="absolute -inset-1 bg-green-400 rounded-xl -z-10"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle State - When no one is speaking */}
          {!liveTranscript && aiState.status !== 'speaking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl mb-4"
              >
                🎙️
              </motion.div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {aiState.status === 'listening' ? 'Listening...' : 'Ready for Interview'}
              </p>
              <p className="text-xs text-gray-400">
                Transcript will appear here
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className={`rounded-xl p-8 max-w-md shadow-2xl ${
            isDark ? 'bg-[#111827]' : 'bg-white'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-[#F9FAFB]' : 'text-gray-900'}`}>
              Leave Interview?
            </h3>
            <p className={`mb-6 ${isDark ? 'text-[#9CA3AF]' : 'text-gray-600'}`}>
              Your responses will be submitted.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowEndConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmEndInterview} className="flex-1 bg-red-500">
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
