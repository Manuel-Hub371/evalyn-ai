'use client'

import { useState } from 'react'
import { MessageSquare, TrendingUp, ClipboardCheck, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

const tabs = [
  { id: 'transcript', label: 'Transcript', icon: MessageSquare },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'evaluation', label: 'Evaluation', icon: ClipboardCheck },
]

const transcriptMessages = [
  { speaker: 'ai', text: 'Good morning! Let\'s begin with your experience in system design.', time: '10:23 AM' },
  { speaker: 'candidate', text: 'Good morning! I have extensive experience designing scalable distributed systems.', time: '10:23 AM' },
  { speaker: 'ai', text: 'Can you walk me through your experience with microservices architecture?', time: '10:24 AM' },
]

const skills = [
  'Python', 'Java', 'Node.js', 'React', 'Docker', 'AWS', 'Kubernetes', 'System Design', 'REST APIs', 'SQL'
]

const insights = [
  { category: 'Communication', score: 85, color: '#3B82F6' },
  { category: 'Technical Knowledge', score: 92, color: '#22C55E' },
  { category: 'Leadership', score: 78, color: '#F59E0B' },
  { category: 'Problem Solving', score: 88, color: '#3B82F6' },
  { category: 'Confidence', score: 90, color: '#22C55E' },
  { category: 'Professionalism', score: 95, color: '#22C55E' },
]

const aiSuggestions = [
  'Ask about caching',
  'Explore authentication strategy',
  'Probe system scalability',
  'Discuss CI/CD',
]

const liveMetrics = [
  { label: 'Speaking Time', value: '12:34' },
  { label: 'Words Per Minute', value: '145' },
  { label: 'Response Length', value: '45s avg' },
  { label: 'Confidence Score', value: '90%' },
]

export function RightSidebar() {
  const [activeTab, setActiveTab] = useState('transcript')

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex bg-[#1E293B] rounded-[20px] p-1 border border-[#334155] mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[16px] transition-all",
                activeTab === tab.id
                  ? "bg-[#3B82F6] text-white"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#1E293B] rounded-[20px] border border-[#334155] overflow-hidden">
        {activeTab === 'transcript' && <TranscriptTab />}
        {activeTab === 'insights' && <InsightsTab />}
        {activeTab === 'evaluation' && <EvaluationTab />}
      </div>
    </div>
  )
}

function TranscriptTab() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-[#334155]">
        <h3 className="text-[#F8FAFC] text-sm font-semibold">Live Transcript</h3>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
        {transcriptMessages.map((msg, index) => (
          <div key={index} className={cn("flex flex-col", msg.speaker === 'candidate' && "items-end")}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3",
              msg.speaker === 'ai' ? "bg-[#273449]" : "bg-[#3B82F6]"
            )}>
              <p className="text-[#F8FAFC] text-sm leading-relaxed">{msg.text}</p>
            </div>
            <span className="text-[#94A3B8] text-xs mt-1.5">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsTab() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin p-5 space-y-6">
      {/* Real-time Insights */}
      <div>
        <h3 className="text-[#F8FAFC] text-sm font-semibold mb-4">Real-time Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#F8FAFC] text-sm">{insight.category}</span>
                <span className="text-[#F8FAFC] text-sm font-semibold">{insight.score}%</span>
              </div>
              <div className="h-2 bg-[#273449] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${insight.score}%`, backgroundColor: insight.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detected Skills */}
      <div>
        <h3 className="text-[#F8FAFC] text-sm font-semibold mb-3">Detected Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-[#273449] text-[#F8FAFC] text-xs rounded-lg border border-[#334155]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div>
        <h3 className="text-[#F8FAFC] text-sm font-semibold mb-3">AI Suggestions</h3>
        <div className="space-y-2">
          {aiSuggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-[#273449] rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 flex-shrink-0" />
              <p className="text-[#94A3B8] text-sm">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EvaluationTab() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin p-5 space-y-6">
      {/* Live Metrics */}
      <div>
        <h3 className="text-[#F8FAFC] text-sm font-semibold mb-4">Live Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          {liveMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-[#273449] rounded-xl border border-[#334155]">
              <p className="text-[#94A3B8] text-xs mb-1">{metric.label}</p>
              <p className="text-[#F8FAFC] text-lg font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Assessment */}
      <div className="p-4 bg-[#273449] rounded-xl border border-[#334155]">
        <h3 className="text-[#F8FAFC] text-sm font-semibold mb-3">Overall Assessment</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8] text-sm">Sentiment</span>
            <span className="text-[#22C55E] text-sm font-medium">Positive</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8] text-sm">Eye Contact</span>
            <span className="text-[#F8FAFC] text-sm font-medium">Excellent</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8] text-sm">Voice Clarity</span>
            <span className="text-[#F8FAFC] text-sm font-medium">Clear</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#94A3B8] text-sm">Thinking Time</span>
            <span className="text-[#F8FAFC] text-sm font-medium">4.2s avg</span>
          </div>
        </div>
      </div>
    </div>
  )
}
