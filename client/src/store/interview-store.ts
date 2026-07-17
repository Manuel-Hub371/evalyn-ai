import { create } from 'zustand'
import {
  InterviewSession,
  InterviewStage,
  InterviewQuestion,
  InterviewResponse,
  AIInterviewerState,
  DeviceStatus,
  ConnectionStatus,
  TranscriptEntry,
} from '@/types'

interface InterviewStore {
  // Session
  session: InterviewSession | null
  setSession: (session: InterviewSession) => void
  updateProgress: (progress: number) => void
  
  // AI Interviewer
  aiState: AIInterviewerState
  setAIState: (state: AIInterviewerState) => void
  
  // Current Question
  currentQuestion: InterviewQuestion | null
  setCurrentQuestion: (question: InterviewQuestion | null) => void
  
  // Transcript
  transcript: TranscriptEntry[]
  addTranscriptEntry: (entry: TranscriptEntry) => void
  clearTranscript: () => void
  
  // Devices
  deviceStatus: DeviceStatus
  setDeviceStatus: (status: Partial<DeviceStatus>) => void
  
  // Connection
  connectionStatus: ConnectionStatus
  setConnectionStatus: (status: ConnectionStatus) => void
  
  // Media controls
  isCameraOn: boolean
  isMicrophoneOn: boolean
  toggleCamera: () => void
  toggleMicrophone: () => void
  
  // Live transcript (current speaking)
  liveTranscript: string
  setLiveTranscript: (text: string) => void
  
  // Reset
  reset: () => void
}

const initialDeviceStatus: DeviceStatus = {
  camera: 'checking',
  microphone: 'checking',
  speaker: 'checking',
  internet: 'checking',
  browser: 'compatible',
}

const initialConnectionStatus: ConnectionStatus = {
  status: 'connected',
  quality: 'excellent',
  latency: 0,
}

const initialAIState: AIInterviewerState = {
  status: 'idle',
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  updateProgress: (progress) =>
    set((state) =>
      state.session ? { session: { ...state.session, progress } } : state
    ),

  aiState: initialAIState,
  setAIState: (aiState) => set({ aiState }),

  currentQuestion: null,
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),

  transcript: [],
  addTranscriptEntry: (entry) =>
    set((state) => ({ transcript: [...state.transcript, entry] })),
  clearTranscript: () => set({ transcript: [] }),

  deviceStatus: initialDeviceStatus,
  setDeviceStatus: (status) =>
    set((state) => ({
      deviceStatus: { ...state.deviceStatus, ...status },
    })),

  connectionStatus: initialConnectionStatus,
  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

  isCameraOn: true,
  isMicrophoneOn: true,
  toggleCamera: () => set((state) => ({ isCameraOn: !state.isCameraOn })),
  toggleMicrophone: () =>
    set((state) => ({ isMicrophoneOn: !state.isMicrophoneOn })),

  liveTranscript: '',
  setLiveTranscript: (liveTranscript) => set({ liveTranscript }),

  reset: () =>
    set({
      session: null,
      aiState: initialAIState,
      currentQuestion: null,
      transcript: [],
      deviceStatus: initialDeviceStatus,
      connectionStatus: initialConnectionStatus,
      isCameraOn: true,
      isMicrophoneOn: true,
      liveTranscript: '',
    }),
}))
