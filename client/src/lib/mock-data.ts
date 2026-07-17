import { InterviewInvitation, InterviewSession, InterviewStage } from '@/types'

export const mockInterviewInvitation: InterviewInvitation = {
  id: 'inv-1234567890',
  companyName: 'TechCorp Industries',
  companyLogo: '/company-logo.png',
  jobPosition: 'Senior Software Engineer',
  jobLevel: 'Senior',
  interviewType: 'mixed',
  interviewLanguage: 'English',
  estimatedDuration: 60,
  instructions: [
    'Ensure you are in a quiet environment with stable internet',
    'Use a laptop or desktop computer for the best experience',
    'Keep your camera on throughout the interview',
    'Have a valid government ID ready for verification',
    'The interview will be recorded for evaluation purposes',
  ],
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  allowsPause: false,
  allowsTabSwitch: false,
  recordingEnabled: true,
  privacyPolicyUrl: 'https://techcorp.com/privacy',
}

export const mockInterviewStages: InterviewStage[] = [
  {
    id: 'stage-1',
    name: 'Introduction',
    description: 'Getting to know you and your background',
    order: 1,
    completed: false,
  },
  {
    id: 'stage-2',
    name: 'Technical Assessment',
    description: 'Evaluating your technical skills and problem-solving abilities',
    order: 2,
    completed: false,
  },
  {
    id: 'stage-3',
    name: 'Behavioral Questions',
    description: 'Understanding your work style and past experiences',
    order: 3,
    completed: false,
  },
  {
    id: 'stage-4',
    name: 'Scenario-Based Questions',
    description: 'Assessing your decision-making in real-world situations',
    order: 4,
    completed: false,
  },
  {
    id: 'stage-5',
    name: 'Closing Remarks',
    description: 'Final questions and next steps',
    order: 5,
    completed: false,
  },
]

export const mockInterviewSession: InterviewSession = {
  id: 'session-1234567890',
  invitationId: 'inv-1234567890',
  candidateName: 'Alex Johnson',
  candidateEmail: 'alex.johnson@email.com',
  startedAt: new Date(),
  expectedEndTime: new Date(Date.now() + 60 * 60 * 1000),
  currentStageId: 'stage-1',
  stages: mockInterviewStages,
  questions: [],
  responses: [],
  progress: 0,
  status: 'not-started',
}

export const interviewRules = [
  {
    icon: 'Volume2',
    title: 'Quiet Environment',
    description: 'Ensure you are in a quiet location with minimal background noise',
  },
  {
    icon: 'Video',
    title: 'Camera Required',
    description: 'Your camera must remain on throughout the entire interview',
  },
  {
    icon: 'Mic',
    title: 'Clear Audio',
    description: 'Speak clearly and at a moderate pace for accurate transcription',
  },
  {
    icon: 'Monitor',
    title: 'No Tab Switching',
    description: 'Do not switch browser tabs or windows during the interview',
  },
  {
    icon: 'Clock',
    title: 'Time Management',
    description: 'Be mindful of time limits for each question',
  },
  {
    icon: 'Shield',
    title: 'Recording Notice',
    description: 'This interview will be recorded for evaluation purposes',
  },
  {
    icon: 'AlertCircle',
    title: 'Technical Issues',
    description: 'Report any technical problems immediately using the help button',
  },
  {
    icon: 'FileText',
    title: 'Privacy Policy',
    description: 'By continuing, you agree to our privacy policy and terms of service',
  },
]

export const sampleQuestions = [
  {
    stage: 'Introduction',
    questions: [
      'Tell me about yourself and your professional background.',
      'What attracted you to this position at TechCorp Industries?',
      'Walk me through your career journey so far.',
    ],
  },
  {
    stage: 'Technical Assessment',
    questions: [
      'Explain the concept of object-oriented programming and give an example.',
      'How would you optimize a slow database query?',
      'Describe your experience with cloud technologies.',
      'What is your approach to testing and debugging code?',
    ],
  },
  {
    stage: 'Behavioral Questions',
    questions: [
      'Describe a time when you had to resolve a conflict within your team.',
      'Tell me about a challenging project you led and how you ensured its success.',
      'How do you handle tight deadlines and pressure?',
      'Give an example of when you had to learn a new technology quickly.',
    ],
  },
  {
    stage: 'Scenario-Based Questions',
    questions: [
      'If you noticed a critical bug in production, how would you handle it?',
      'How would you approach designing a system that needs to scale to millions of users?',
      'What would you do if stakeholders disagreed on a technical approach?',
    ],
  },
]
