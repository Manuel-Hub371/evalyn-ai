'use client'

import { User, Mail, Briefcase, MapPin, FileText, Linkedin, Globe, Check, Circle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const candidateInfo = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  position: 'Senior Software Engineer',
  experience: '8 years',
  location: 'San Francisco, CA',
  photo: null,
}

const interviewStages = [
  { name: 'Introduction', status: 'completed' },
  { name: 'Technical Assessment', status: 'active' },
  { name: 'Coding Challenge', status: 'pending' },
  { name: 'Behavioural Questions', status: 'pending' },
  { name: 'Scenario Questions', status: 'pending' },
  { name: 'Candidate Questions', status: 'pending' },
  { name: 'Interview Summary', status: 'pending' },
]

const aiNotes = [
  'Review API Security',
  'Ask about Kubernetes',
  'Clarify Leadership Example',
]

const interviewTips = [
  'Maintain eye contact with camera',
  'Listen carefully before answering',
  'Take brief pauses to organize thoughts',
  'Ask clarifying questions if needed',
]

export function LeftSidebar() {
  const [notesExpanded, setNotesExpanded] = useState(true)
  const [tipsExpanded, setTipsExpanded] = useState(true)
  const completedCount = interviewStages.filter(s => s.status === 'completed').length
  const progressPercentage = (completedCount / interviewStages.length) * 100

  return (
    <div className="flex flex-col gap-4 overflow-y-auto scrollbar-thin">
      {/* Candidate Information */}
      <div className="bg-[#1E293B] rounded-[20px] p-5 border border-[#334155]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#273449] rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-[#94A3B8]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#F8FAFC] text-base font-semibold">{candidateInfo.name}</h3>
            <p className="text-[#94A3B8] text-sm mt-1">{candidateInfo.position}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
            <span className="text-[#94A3B8] text-sm truncate">{candidateInfo.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
            <span className="text-[#94A3B8] text-sm">{candidateInfo.experience}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
            <span className="text-[#94A3B8] text-sm">{candidateInfo.location}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-[#273449] border-[#334155] hover:bg-[#334155] text-[#F8FAFC]">
            <FileText className="w-4 h-4 mr-2" />
            Resume
          </Button>
          <Button variant="outline" size="sm" className="bg-[#273449] border-[#334155] hover:bg-[#334155]">
            <Linkedin className="w-4 h-4 text-[#3B82F6]" />
          </Button>
          <Button variant="outline" size="sm" className="bg-[#273449] border-[#334155] hover:bg-[#334155]">
            <Globe className="w-4 h-4 text-[#94A3B8]" />
          </Button>
        </div>
      </div>

      {/* Interview Progress */}
      <div className="bg-[#1E293B] rounded-[20px] p-5 border border-[#334155]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#F8FAFC] text-sm font-semibold">Interview Progress</h3>
          <span className="text-[#3B82F6] text-sm font-medium">{Math.round(progressPercentage)}%</span>
        </div>

        <Progress value={progressPercentage} className="h-2 mb-6 bg-[#273449]" />

        <div className="space-y-3">
          {interviewStages.map((stage, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                stage.status === 'completed' && "bg-[#22C55E] border-[#22C55E]",
                stage.status === 'active' && "bg-[#3B82F6] border-[#3B82F6] shadow-lg shadow-[#3B82F6]/50",
                stage.status === 'pending' && "bg-[#273449] border-[#334155]"
              )}>
                {stage.status === 'completed' && <Check className="w-4 h-4 text-white" />}
                {stage.status === 'active' && <Circle className="w-3 h-3 fill-white text-white" />}
                {stage.status === 'pending' && <div className="w-2 h-2 rounded-full bg-[#475569]" />}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-sm",
                  stage.status === 'completed' && "text-[#22C55E]",
                  stage.status === 'active' && "text-[#F8FAFC] font-medium",
                  stage.status === 'pending' && "text-[#94A3B8]"
                )}>
                  {stage.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Tips */}
      <div className="bg-[#1E293B] rounded-[20px] p-5 border border-[#334155]">
        <button
          onClick={() => setTipsExpanded(!tipsExpanded)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-[#F8FAFC] text-sm font-semibold">Interview Tips</h3>
          </div>
          <svg
            className={cn("w-4 h-4 text-[#94A3B8] transition-transform", tipsExpanded && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {tipsExpanded && (
          <div className="space-y-2">
            {interviewTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-2.5 bg-[#273449] rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 flex-shrink-0" />
                <p className="text-[#94A3B8] text-xs leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Notes */}
      <div className="bg-[#1E293B] rounded-[20px] p-5 border border-[#334155]">
        <button
          onClick={() => setNotesExpanded(!notesExpanded)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-[#F8FAFC] text-sm font-semibold">AI Notes</h3>
          <svg
            className={cn("w-4 h-4 text-[#94A3B8] transition-transform", notesExpanded && "rotate-180")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {notesExpanded && (
          <div className="space-y-2">
            {aiNotes.map((note, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-[#273449] rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 flex-shrink-0" />
                <p className="text-[#94A3B8] text-sm">{note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
