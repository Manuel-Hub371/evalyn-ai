'use client'

import { useState } from 'react'
import { Mic, MicOff, Video, VideoOff, Monitor, Play, Maximize2, FileText, Settings, HelpCircle, PhoneOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function BottomDock() {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)

  return (
    <div className="pb-4 px-6">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto bg-[#1E293B]/80 backdrop-blur-xl rounded-[16px] border border-[#334155]/50 px-4 py-2.5 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <ControlButton
              icon={isMicOn ? Mic : MicOff}
              active={isMicOn}
              onClick={() => setIsMicOn(!isMicOn)}
              label="Microphone"
              variant={isMicOn ? 'default' : 'danger'}
            />
            <ControlButton
              icon={isCameraOn ? Video : VideoOff}
              active={isCameraOn}
              onClick={() => setIsCameraOn(!isCameraOn)}
              label="Camera"
              variant={isCameraOn ? 'default' : 'secondary'}
            />
            <ControlButton
              icon={Monitor}
              label="Screen Share"
            />
            <ControlButton
              icon={Play}
              label="Resume"
            />
            <ControlButton
              icon={Maximize2}
              label="Whiteboard"
            />
          </div>

          {/* Center - Separator */}
          <div className="w-px h-6 bg-[#334155]" />

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <ControlButton
              icon={FileText}
              label="Notes"
            />
            <ControlButton
              icon={Settings}
              label="Settings"
            />
            <ControlButton
              icon={HelpCircle}
              label="Help"
            />

            {/* End Interview Button */}
            <button className="flex items-center gap-2 px-5 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-all shadow-lg shadow-[#EF4444]/20">
              <PhoneOff className="w-4 h-4" />
              <span className="font-medium text-sm">End Interview</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface ControlButtonProps {
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
  variant?: 'default' | 'danger' | 'secondary'
}

function ControlButton({ icon: Icon, label, active = true, onClick, variant = 'default' }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all",
        "hover:bg-[#273449]",
        variant === 'danger' && !active && "bg-[#EF4444]/10"
      )}
      title={label}
    >
      <div className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
        variant === 'default' && active && "bg-[#3B82F6] text-white",
        variant === 'default' && !active && "bg-[#273449] text-[#94A3B8]",
        variant === 'danger' && !active && "bg-[#EF4444] text-white",
        variant === 'secondary' && "bg-[#273449] text-[#94A3B8]"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-[#94A3B8] text-[10px]">{label}</span>
    </button>
  )
}
