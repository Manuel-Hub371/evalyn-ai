'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VideoPreview } from '@/components/interview/video-preview'
import { useInterviewStore } from '@/store/interview-store'
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
} from 'lucide-react'

export default function InterviewPage() {
  const router = useRouter()
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
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                {mockInterviewInvitation.companyName}
              </h2>
              <p className="text-xs text-gray-500">Interview Platform</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Candidate:</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockInterviewSession.candidateName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Job Title:</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockInterviewInvitation.jobPosition}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Interview Topics</h3>
          <div className="space-y-2">
            {stages.map((stage, index) => {
              const isCompleted = index < currentStageIndex
              const isCurrent = index === currentStageIndex

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    isCurrent
                      ? 'bg-blue-50 border-blue-200'
                      : isCompleted
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <span className={`text-sm font-medium ${isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-600'}`}>
                    {stage.stage}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-900">
            {mockInterviewInvitation.companyName} Interview
          </h1>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-700">Connected</Badge>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-blue-50">
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
                    <div className={`absolute left-0 right-0 bg-black/60 backdrop-blur-sm ${
                      cameraPosition.startsWith('bottom') ? 'top-0' : 'bottom-0'
                    }`}>
                      <div className="px-12 py-6">
                        <p className="text-sm text-white/70 m-0 p-0 leading-tight">Speaking:</p>
                        <p className="text-base font-medium text-white m-0 p-0 leading-snug">
                          {currentQuestion?.text || 'Loading...'}
                        </p>
                      </div>
                    </div>
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
                    <div className={`absolute left-0 right-0 bg-black/60 backdrop-blur-sm ${
                      cameraPosition.startsWith('bottom') ? 'top-0' : 'bottom-0'
                    }`}>
                      <div className="px-12 py-6">
                        <p className="text-sm text-white/70 m-0 p-0 leading-tight">AI Interviewer is asking:</p>
                        <p className="text-base font-medium text-white m-0 p-0 leading-snug">
                          {currentQuestion?.text || 'Loading...'}
                        </p>
                      </div>
                    </div>
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

            <div className="bg-white rounded-xl shadow-lg border p-4 flex items-center justify-between">
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
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <h3 className="text-sm font-semibold text-gray-900">Real-time transcript</h3>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">AI Speaking</p>
            <p className="text-sm text-gray-700">{currentQuestion?.text || 'Loading...'}</p>
          </div>
          {liveTranscript && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <p className="text-xs font-semibold text-gray-700 mb-2">Your Response</p>
              <p className="text-sm">{liveTranscript}</p>
            </div>
          )}
        </div>
      </div>

      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Leave Interview?</h3>
            <p className="text-gray-600 mb-6">Your responses will be submitted.</p>
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
