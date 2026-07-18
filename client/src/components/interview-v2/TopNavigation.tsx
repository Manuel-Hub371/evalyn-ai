'use client'

import { useState, useEffect } from 'react'
import { Clock, Wifi, Circle } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import { useInterviewStore } from '@/store/interview-store'
import { mockInterviewInvitation } from '@/lib/mock-data'

export function TopNavigation() {
  const { session, connectionStatus } = useInterviewStore()
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="h-16 bg-[#1E293B] border-b border-[#334155] flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        {/* Left - Branding */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">E</span>
            </div>
            <span className="text-[#F8FAFC] text-sm font-medium">Evalyn AI</span>
          </div>

          <div className="w-px h-6 bg-[#334155]" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#273449] rounded-lg flex items-center justify-center">
              <span className="text-[#94A3B8] text-xs">TC</span>
            </div>
            <div>
              <p className="text-[#F8FAFC] text-sm font-medium">
                {mockInterviewInvitation.companyName}
              </p>
              <p className="text-[#94A3B8] text-xs">
                {mockInterviewInvitation.jobPosition}
              </p>
            </div>
          </div>
        </div>

        {/* Center - Interview Stage */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#273449] rounded-xl">
          <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
          <span className="text-[#F8FAFC] text-sm font-medium">Technical Assessment</span>
        </div>

        {/* Right - Status */}
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#273449] rounded-lg">
            <Clock className="w-4 h-4 text-[#94A3B8]" />
            <span className="text-[#F8FAFC] text-sm font-mono">{formatTime(elapsedTime)}</span>
          </div>

          {/* Recording Status */}
          {mockInterviewInvitation.recordingEnabled && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#273449] rounded-lg">
              <Circle className="w-2 h-2 fill-[#EF4444] text-[#EF4444] animate-pulse" />
              <span className="text-[#F8FAFC] text-sm">Recording</span>
            </div>
          )}

          {/* Network Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#273449] rounded-lg">
            <Wifi className="w-4 h-4 text-[#22C55E]" />
            <span className="text-[#94A3B8] text-sm">Excellent</span>
          </div>
        </div>
      </div>
    </header>
  )
}
