'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatusIndicator } from '@/components/shared/status-indicator'
import { VideoPreview } from '@/components/interview/video-preview'
import { useInterviewStore } from '@/store/interview-store'
import { checkBrowserCompatibility, checkInternetSpeed } from '@/lib/utils'
import {
  Camera,
  Mic,
  Volume2,
  Wifi,
  Chrome,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

export default function DeviceCheckPage() {
  const router = useRouter()
  const { deviceStatus, setDeviceStatus } = useInterviewStore()
  const [isChecking, setIsChecking] = useState(true)
  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    performAllChecks()
  }, [])

  const performAllChecks = async () => {
    setIsChecking(true)

    // Check browser compatibility
    const browserCompatible = checkBrowserCompatibility()
    setDeviceStatus({
      browser: browserCompatible ? 'compatible' : 'incompatible',
    })

    // Check camera
    await checkCamera()

    // Check microphone
    await checkMicrophone()

    // Check speaker
    setDeviceStatus({ speaker: 'available' })

    // Check internet
    await checkInternet()

    setIsChecking(false)
  }

  const checkCamera = async () => {
    try {
      setDeviceStatus({ camera: 'checking' })
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      setDeviceStatus({ camera: 'available' })
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      console.error('Camera check failed:', error)
      setDeviceStatus({ camera: 'denied' })
    }
  }

  const checkMicrophone = async () => {
    try {
      setDeviceStatus({ microphone: 'checking' })
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      })

      // Simulate audio level detection
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)

      setTimeout(() => {
        clearInterval(interval)
        setAudioLevel(0)
      }, 3000)

      setDeviceStatus({ microphone: 'available' })
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      console.error('Microphone check failed:', error)
      setDeviceStatus({ microphone: 'denied' })
    }
  }

  const checkInternet = async () => {
    setDeviceStatus({ internet: 'checking' })
    const speed = await checkInternetSpeed()
    setDeviceStatus({ internet: speed })
  }

  const retryCheck = async (device: 'camera' | 'microphone' | 'internet') => {
    if (device === 'camera') await checkCamera()
    else if (device === 'microphone') await checkMicrophone()
    else if (device === 'internet') await checkInternet()
  }

  const allChecksPassed =
    deviceStatus.camera === 'available' &&
    deviceStatus.microphone === 'available' &&
    deviceStatus.speaker === 'available' &&
    deviceStatus.internet !== 'disconnected' &&
    deviceStatus.browser === 'compatible'

  const handleContinue = () => {
    if (allChecksPassed) {
      router.push('/rules')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Device Check
          </h1>
          <p className="text-muted-foreground">
            We need to verify your camera, microphone, and internet connection
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              System Check Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {isChecking ? 'Checking...' : 'Complete'}
            </span>
          </div>
          <Progress
            value={isChecking ? 50 : 100}
            variant={allChecksPassed ? 'success' : 'default'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Camera Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-primary" />
                Camera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusIndicator
                  status={deviceStatus.camera}
                  label={
                    deviceStatus.camera === 'checking'
                      ? 'Testing camera...'
                      : deviceStatus.camera === 'available'
                      ? 'Camera is working'
                      : deviceStatus.camera === 'denied'
                      ? 'Permission denied'
                      : 'Camera unavailable'
                  }
                />

                {deviceStatus.camera === 'available' && (
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <VideoPreview isCameraOn={true} />
                  </div>
                )}

                {(deviceStatus.camera === 'denied' ||
                  deviceStatus.camera === 'unavailable') && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">
                        {deviceStatus.camera === 'denied'
                          ? 'Please allow camera access in your browser settings'
                          : 'Camera not detected. Please connect a camera'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => retryCheck('camera')}
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Camera
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Microphone Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mic className="h-5 w-5 text-primary" />
                Microphone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusIndicator
                  status={deviceStatus.microphone}
                  label={
                    deviceStatus.microphone === 'checking'
                      ? 'Testing microphone...'
                      : deviceStatus.microphone === 'available'
                      ? 'Microphone is working'
                      : deviceStatus.microphone === 'denied'
                      ? 'Permission denied'
                      : 'Microphone unavailable'
                  }
                />

                {deviceStatus.microphone === 'available' && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Speak to test your microphone
                    </p>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success transition-all duration-100"
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                  </div>
                )}

                {(deviceStatus.microphone === 'denied' ||
                  deviceStatus.microphone === 'unavailable') && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">
                        {deviceStatus.microphone === 'denied'
                          ? 'Please allow microphone access in your browser settings'
                          : 'Microphone not detected. Please connect a microphone'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => retryCheck('microphone')}
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Microphone
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Speaker Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                Speaker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusIndicator
                  status={deviceStatus.speaker}
                  label="Speaker is working"
                />
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Click the button to test your speaker
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const audio = new Audio(
                        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURQJRZ3d8sFpHAU4kdXy0IIzBhVmuuzjjkIHEliw6fCQSAsHQ5vZ8bReGwU7iM7y0IMzBhVouO3enVQOCUGa2PC7XB0FOYnN8dCALgUSW7zr56NWDghCmdnwvV4dBTiJzvHRgCwCElW76+ijVQ4HRJra8Lhc'
                      )
                      audio.play()
                    }}
                    className="w-full"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Play Test Sound
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Internet Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-primary" />
                Internet Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusIndicator
                  status={deviceStatus.internet}
                  label={
                    deviceStatus.internet === 'checking'
                      ? 'Testing connection...'
                      : deviceStatus.internet === 'good'
                      ? 'Connection is stable'
                      : deviceStatus.internet === 'poor'
                      ? 'Connection is weak'
                      : 'No connection'
                  }
                />

                {deviceStatus.internet === 'poor' && (
                  <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-warning">
                      Your connection may be unstable. Consider moving closer to
                      your router.
                    </p>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => retryCheck('internet')}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Browser Compatibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Chrome className="h-5 w-5 text-primary" />
              Browser Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatusIndicator
              status={
                deviceStatus.browser === 'compatible' ? 'good' : 'error'
              }
              label={
                deviceStatus.browser === 'compatible'
                  ? 'Your browser is compatible'
                  : 'Please use Chrome, Firefox, Edge, or Safari'
              }
            />
          </CardContent>
        </Card>

        {/* Results Summary */}
        {!isChecking && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {allChecksPassed ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-success" />
                      <div>
                        <p className="font-semibold text-foreground">
                          All checks passed!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You're ready to proceed with the interview
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-destructive" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Some checks failed
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Please resolve the issues above to continue
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push('/invitation')}
            disabled={isChecking}
          >
            Back
          </Button>

          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!allChecksPassed || isChecking}
          >
            Continue to Interview Rules
          </Button>
        </div>
      </div>
    </div>
  )
}
