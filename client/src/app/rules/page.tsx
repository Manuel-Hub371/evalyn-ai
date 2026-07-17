'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { interviewRules } from '@/lib/mock-data'
import { CheckCircle2, Circle, ShieldCheck } from 'lucide-react'
import * as Icons from 'lucide-react'

export default function RulesPage() {
  const router = useRouter()
  const [acceptedRules, setAcceptedRules] = useState<Set<number>>(new Set())
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)

  const toggleRule = (index: number) => {
    const newAccepted = new Set(acceptedRules)
    if (newAccepted.has(index)) {
      newAccepted.delete(index)
    } else {
      newAccepted.add(index)
    }
    setAcceptedRules(newAccepted)
  }

  const allRulesAccepted =
    acceptedRules.size === interviewRules.length && acceptedPrivacy

  const handleContinue = () => {
    if (allRulesAccepted) {
      router.push('/lobby')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Interview Guidelines
          </h1>
          <p className="text-muted-foreground">
            Please read and accept the following rules before proceeding
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {interviewRules.map((rule, index) => {
            const IconComponent =
              Icons[rule.icon as keyof typeof Icons] || Icons.Circle
            const isAccepted = acceptedRules.has(index)

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isAccepted
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => toggleRule(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isAccepted
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {rule.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {rule.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      {isAccepted ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Privacy Policy Acceptance */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardContent className="p-6">
            <div
              className="flex items-start gap-4 cursor-pointer"
              onClick={() => setAcceptedPrivacy(!acceptedPrivacy)}
            >
              <div className="flex-shrink-0 pt-1">
                {acceptedPrivacy ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-foreground leading-relaxed">
                  I have read and agree to the{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Service
                  </a>
                  . I understand that this interview will be recorded and my data
                  will be processed in accordance with the privacy policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Rules Accepted
                </p>
                <p className="text-sm text-muted-foreground">
                  {acceptedRules.size} of {interviewRules.length} rules accepted
                  {acceptedPrivacy && ' • Privacy policy accepted'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {allRulesAccepted ? '✓' : `${acceptedRules.size}/${interviewRules.length + 1}`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        {!allRulesAccepted && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Please Note:</strong> You must accept all guidelines and
              the privacy policy to proceed with the interview.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push('/device-check')}>
            Back
          </Button>

          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!allRulesAccepted}
          >
            {allRulesAccepted
              ? 'Continue to Lobby'
              : `Accept All Rules (${acceptedRules.size}/${interviewRules.length + 1})`}
          </Button>
        </div>
      </div>
    </div>
  )
}
