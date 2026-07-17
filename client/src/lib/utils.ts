import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  }
  return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} min${remainingMinutes !== 1 ? 's' : ''}`
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date)
}

export function getInterviewTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    technical: 'Technical Interview',
    behavioral: 'Behavioral Interview',
    teaching: 'Teaching Demo',
    scenario: 'Scenario-Based Interview',
    mixed: 'Comprehensive Interview',
  }
  return labels[type] || type
}

export function checkBrowserCompatibility(): boolean {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  const isEdge = /Edg/.test(navigator.userAgent)
  const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
  const isFirefox = /Firefox/.test(navigator.userAgent)

  return isChrome || isEdge || isSafari || isFirefox
}

export async function checkInternetSpeed(): Promise<'good' | 'poor'> {
  try {
    const startTime = Date.now()
    await fetch('https://www.google.com/favicon.ico', { cache: 'no-store' })
    const endTime = Date.now()
    const latency = endTime - startTime

    return latency < 500 ? 'good' : 'poor'
  } catch {
    return 'poor'
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function calculateProgress(
  currentStageIndex: number,
  totalStages: number,
  stageProgress: number = 0
): number {
  if (totalStages === 0) return 0
  const baseProgress = (currentStageIndex / totalStages) * 100
  const stageWeight = (1 / totalStages) * 100
  return Math.min(100, baseProgress + (stageProgress * stageWeight) / 100)
}
