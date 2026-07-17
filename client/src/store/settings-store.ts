import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { InterviewSettings } from '@/types'

interface SettingsStore extends InterviewSettings {
  setTheme: (theme: InterviewSettings['theme']) => void
  setFontSize: (fontSize: InterviewSettings['fontSize']) => void
  setCameraDevice: (deviceId: string) => void
  setMicrophoneDevice: (deviceId: string) => void
  setSpeakerDevice: (deviceId: string) => void
  setAudioVolume: (volume: number) => void
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  setLanguage: (language: string) => void
  reset: () => void
}

const defaultSettings: InterviewSettings = {
  theme: 'system',
  fontSize: 'medium',
  audioVolume: 80,
  highContrastMode: false,
  reducedMotion: false,
  language: 'en',
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setCameraDevice: (cameraDeviceId) => set({ cameraDeviceId }),
      setMicrophoneDevice: (microphoneDeviceId) => set({ microphoneDeviceId }),
      setSpeakerDevice: (speakerDeviceId) => set({ speakerDeviceId }),
      setAudioVolume: (audioVolume) => set({ audioVolume }),
      toggleHighContrast: () =>
        set((state) => ({ highContrastMode: !state.highContrastMode })),
      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),
      setLanguage: (language) => set({ language }),
      reset: () => set(defaultSettings),
    }),
    {
      name: 'interview-settings',
    }
  )
)
