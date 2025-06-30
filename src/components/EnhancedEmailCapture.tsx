"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
import { trackHeadlineConversion } from "./HeadlineABTest"
import type { AnalyticsEvent, AnalyticsData } from "@/types/analytics"

interface EnhancedEmailCaptureProps {
  onComplete: (data: { email: string; phone?: string; userType: "brand" | "creator" }) => void
  onViewOnboarding: () => void
  onBackToHome: () => void
  className?: string
}

interface FormErrors {
  email?: string
  phone?: string
}

export default function EnhancedEmailCapture({
  onComplete,
  onViewOnboarding,
  onBackToHome,
  className = ""
}: EnhancedEmailCaptureProps) {
  const [step, setStep] = useState<"email" | "phone" | "segment" | "complete">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [userType, setUserType] = useState<"brand" | "creator" | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Email validation
  const validateEmail = useCallback((email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email address"

    // Additional validation for common business domains
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
    const domain = email.split('@')[1]?.toLowerCase()

    if (step === "email" && domain && !commonDomains.includes(domain)) {
      // Likely business email - good for conversion tracking
      trackAnalyticsEvent('business_email_detected', { domain })
    }

    return undefined
  }, [step])

  // Phone validation
  const validatePhone = useCallback((phone: string): string | undefined => {
    if (!phone) return undefined // Phone is optional

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')

    if (cleanPhone.length < 10) return "Phone number must be at least 10 digits"
    if (!phoneRegex.test(cleanPhone)) return "Please enter a valid phone number"

    return undefined
  }, [])

  // Analytics tracking helper
  const trackAnalyticsEvent = useCallback((event: string, data?: AnalyticsData) => {
    if (typeof window !== 'undefined') {
      const analyticsEvent: AnalyticsEvent = {
        event: `email_capture_${event}`,
        email_domain: email ? email.split('@')[1] : undefined,
        step: step,
        timestamp: new Date().toISOString(),
        ...data
      }
      window.dataLayer?.push(analyticsEvent)
    }
  }, [email, step])

  // Form submission handlers
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const emailError = validateEmail(email)
    if (emailError) {
      setErrors({ email: emailError })
      setIsSubmitting(false)
      return
    }

    setErrors({})

    // Simulate API call delay for testing
    await new Promise(resolve => setTimeout(resolve, 800))

    trackHeadlineConversion('email_submit')
    trackAnalyticsEvent('email_submitted')

    setStep("phone")
    setIsSubmitting(false)
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const phoneError = validatePhone(phone)
    if (phoneError) {
      setErrors({ phone: phoneError })
      setIsSubmitting(false)
      return
    }

    setErrors({})

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600))

    trackHeadlineConversion('phone_submit')
    trackAnalyticsEvent('phone_submitted', { phone_provided: !!phone })

    setStep("segment")
    setIsSubmitting(false)
  }

  const handleSegmentSelect = async (type: "brand" | "creator") => {
    setIsSubmitting(true)
    setUserType(type)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    trackHeadlineConversion('segment_select')
    trackAnalyticsEvent('segment_selected', { user_type: type })

    // Complete the form and notify parent
    onComplete({ email, phone: phone || undefined, userType: type })

    setStep("complete")
    setIsSubmitting(false)
  }

  const handleViewOnboarding = () => {
    trackHeadlineConversion('onboarding_view')
    trackAnalyticsEvent('onboarding_viewed')
    onViewOnboarding()
  }

  // Test mode helpers for development
  const isTestMode = typeof window !== 'undefined' && window.location.search.includes('test=true')

  return (
    <div className={`max-w-lg mx-auto ${className}`}>
      {/* Progress indicator for test mode */}
      {isTestMode && (
        <div className="mb-4 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
          <p className="text-yellow-400 text-sm text-center">
            🧪 Test Mode: Step {step} | Email: {email || 'none'} | Phone: {phone || 'none'}
          </p>
        </div>
      )}

      {step === "email" && (
        <form onSubmit={handleEmailSubmit}>
          <div className="flex gap-3 p-2 bg-slate-800 rounded-lg border border-slate-700">
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
              }}
              placeholder="Enter your email to get started →"
              className="bg-transparent border-0 text-white placeholder-slate-400 text-lg px-4 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-8 py-3 text-lg"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </Button>
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </div>
          )}
          <p className="text-sm text-slate-400 mt-3">For brands and creators. Free to get started.</p>
        </form>
      )}

      {step === "phone" && (
        <form onSubmit={handlePhoneSubmit}>
          <div className="space-y-4">
            <p className="text-lg text-slate-300 mb-4">Enter your phone number for SMS updates</p>
            <div className="flex gap-3 p-2 bg-slate-800 rounded-lg border border-slate-700">
              <Input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
                }}
                placeholder="(555) 123-4567"
                type="tel"
                className="bg-transparent border-0 text-white placeholder-slate-400 text-lg px-4 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </Button>
            </div>
            {errors.phone && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </div>
            )}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep("email")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <p className="text-xs text-slate-400 text-right">
                Optional but recommended for time-sensitive opportunities
              </p>
            </div>
          </div>
        </form>
      )}

      {step === "segment" && (
        <div className="space-y-4">
          <p className="text-lg text-slate-300 mb-6">Are you a Brand or a Creator?</p>
          <div className="flex gap-4">
            <Button
              onClick={() => handleSegmentSelect("brand")}
              variant="outline"
              disabled={isSubmitting}
              className="flex-1 h-12 text-lg hover:bg-blue-500 hover:text-white hover:border-blue-500"
            >
              {isSubmitting && userType === "brand" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              I'm a Brand
            </Button>
            <Button
              onClick={() => handleSegmentSelect("creator")}
              variant="outline"
              disabled={isSubmitting}
              className="flex-1 h-12 text-lg hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
            >
              {isSubmitting && userType === "creator" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              I'm a Creator
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep("phone")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}

      {step === "complete" && userType && (
        <div className="space-y-4 p-6 bg-slate-800 rounded-lg border border-emerald-500/50">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              {userType === "brand" ? "Welcome, Brand Partner!" : "Welcome, Creator!"}
            </h3>
            <p className="text-slate-300 mb-4">
              {userType === "brand"
                ? `You'll receive our 14-day brand partnership onboarding sequence via email${phone ? ' and SMS' : ''} starting with your strategy guide within the next 5 minutes.`
                : `You'll receive our 14-day creator onboarding sequence via email${phone ? ' and SMS' : ''} starting with your content toolkit within the next 5 minutes.`
              }
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleViewOnboarding}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
              >
                Preview Your Onboarding Journey
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToHome}
                className="text-slate-400"
              >
                Continue Exploring
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Debug info for test mode */}
      {isTestMode && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded text-xs text-slate-400">
          <p><strong>Debug Info:</strong></p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>User Type: {userType || 'not selected'}</p>
          <p>Current Step: {step}</p>
          <p>Errors: {JSON.stringify(errors)}</p>
        </div>
      )}
    </div>
  )
}
