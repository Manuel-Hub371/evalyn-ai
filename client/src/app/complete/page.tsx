'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockInterviewInvitation } from '@/lib/mock-data'
import { useInterviewStore } from '@/store/interview-store'
import {
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  Home,
} from 'lucide-react'

export default function CompletePage() {
  const { reset } = useInterviewStore()

  useEffect(() => {
    // Clean up interview state after completion
    // But keep it for now to show summary
  }, [])

  const handleClose = () => {
    reset()
    window.close()
  }

  const handleReturnHome = () => {
    reset()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-success/5 to-success/10 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl border-2 border-success/20">
            <CardContent className="p-12">
              {/* Success Icon */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
                  <CheckCircle2 className="h-12 w-12 text-success relative z-10" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Interview Completed!
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                  Thank you for completing your interview with{' '}
                  <span className="font-semibold text-foreground">
                    {mockInterviewInvitation.companyName}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Your responses have been submitted successfully
                </p>
              </motion.div>

              {/* Submission Details */}
              <motion.div
                className="mb-8 p-6 bg-muted/30 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Submission Confirmed
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span className="font-medium text-foreground">
                      {mockInterviewInvitation.jobPosition}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submission Time:</span>
                    <span className="font-medium text-foreground">
                      {new Date().toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  What Happens Next?
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                      1
                    </span>
                    <span>
                      Our team will review your interview responses within the
                      next 3-5 business days
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                      2
                    </span>
                    <span>
                      You'll receive an email with the results and next steps
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                      3
                    </span>
                    <span>
                      If you're selected to move forward, we'll schedule a
                      follow-up interview
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold text-foreground mb-4">
                  Need Assistance?
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:careers@techcorp.com"
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Email Support
                      </p>
                      <p className="text-xs text-muted-foreground">
                        careers@techcorp.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Phone Support
                      </p>
                      <p className="text-xs text-muted-foreground">
                        +1 (234) 567-8900
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  size="lg"
                  onClick={handleReturnHome}
                  className="w-full"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Return to Home
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleClose}
                  className="w-full"
                >
                  Close Browser
                </Button>
              </motion.div>

              {/* Feedback Link */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href="/feedback"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  Share your interview experience
                  <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            </CardContent>
          </Card>

          {/* Additional Message */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-sm text-muted-foreground">
              We appreciate your time and interest in joining our team!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
