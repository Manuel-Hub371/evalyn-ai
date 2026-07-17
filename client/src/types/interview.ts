export interface InterviewInvitation {
  id: string
  companyName: string
  companyLogo: string
  jobPosition: string
  jobLevel?: string
  interviewType: 'technical' | 'behavioral' | 'teaching' | 'scenario' | 'mixed'
  interviewLanguage: string
  estimatedDuration: number // in minutes
  instructions?: string[]
  interviewDate?: Date
  expiresAt: Date
  allowsPause: boolean
  allowsTabSwitch: boolean
  recordingEnabled: boolean
  privacyPolicyUrl?: string
}

export interface InterviewStage {
  id: string
  name: string
  description?: string
  order: number
  completed: boolean
}

export interface InterviewQuestion {
  id: string
  text: string
  stageId: string
  type: 'open-ended' | 'technical' | 'scenario' | 'follow-up'
  askedAt: Date
}

export interface InterviewResponse {
  id: string
  questionId: string
  transcript: string
  duration: number
  timestamp: Date
}

export interface AIInterviewerState {
  status: 'idle' | 'speaking' | 'listening' | 'thinking' | 'processing'
  currentMessage?: string
}

export interface DeviceStatus {
  camera: 'checking' | 'available' | 'unavailable' | 'denied'
  microphone: 'checking' | 'available' | 'unavailable' | 'denied'
  speaker: 'checking' | 'available' | 'unavailable'
  internet: 'checking' | 'good' | 'poor' | 'disconnected'
  browser: 'compatible' | 'incompatible'
}

export interface ConnectionStatus {
  status: 'connected' | 'reconnecting' | 'disconnected'
  quality: 'excellent' | 'good' | 'poor'
  latency: number
}

export interface InterviewSettings {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large' | 'x-large'
  cameraDeviceId?: string
  microphoneDeviceId?: string
  speakerDeviceId?: string
  audioVolume: number
  highContrastMode: boolean
  reducedMotion: boolean
  language: string
}

export interface InterviewSession {
  id: string
  invitationId: string
  candidateName: string
  candidateEmail: string
  startedAt: Date
  expectedEndTime: Date
  currentStageId: string
  stages: InterviewStage[]
  questions: InterviewQuestion[]
  responses: InterviewResponse[]
  progress: number // 0-100
  status: 'not-started' | 'in-progress' | 'paused' | 'completed' | 'cancelled'
}

export interface TranscriptEntry {
  id: string
  speaker: 'ai' | 'candidate'
  text: string
  timestamp: Date
  confidence?: number
}
