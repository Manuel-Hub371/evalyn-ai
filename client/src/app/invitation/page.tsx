'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockInterviewInvitation } from '@/lib/mock-data'
import { formatDuration, formatDate, getInterviewTypeLabel } from '@/lib/utils'
import {
  Clock,
  Calendar,
  Globe,
  Briefcase,
  AlertCircle,
  Video,
} from 'lucide-react'

export default function InvitationPage() {
  const router = useRouter()
  const invitation = mockInterviewInvitation

  const handleStartInterview = () => {
    router.push('/device-check')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <Card className="shadow-2xl">
          <CardHeader className="text-center border-b pb-8">
            {/* Company Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-12 w-12 text-primary" />
              </div>
            </div>

            {/* Company Name */}
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {invitation.companyName}
            </h1>

            {/* Job Position */}
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {invitation.jobPosition}
            </h2>

            {/* Interview Type Badge */}
            <Badge variant="secondary" className="text-sm px-4 py-1">
              {getInterviewTypeLabel(invitation.interviewType)}
            </Badge>
          </CardHeader>

          <CardContent className="pt-8 pb-8">
            {/* Interview Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Estimated Duration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDuration(invitation.estimatedDuration)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Interview Language
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invitation.interviewLanguage}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Interview Format
                  </p>
                  <p className="text-sm text-muted-foreground">
                    AI-Powered Video Interview
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Valid Until
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(invitation.expiresAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            {invitation.instructions && invitation.instructions.length > 0 && (
              <div className="mb-8 p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Before You Begin
                </h3>
                <ul className="space-y-3">
                  {invitation.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Privacy Notice */}
            {invitation.recordingEnabled && (
              <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Recording Notice:</strong> This interview will be
                  recorded for evaluation and quality assurance purposes. By
                  proceeding, you consent to being recorded.
                </p>
              </div>
            )}

            {/* Start Button */}
            <Button
              size="xl"
              onClick={handleStartInterview}
              className="w-full text-lg font-semibold"
            >
              Start Interview
            </Button>

            {/* Privacy Policy Link */}
            {invitation.privacyPolicyUrl && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                By continuing, you agree to our{' '}
                <a
                  href={invitation.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
