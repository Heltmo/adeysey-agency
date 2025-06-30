"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, ArrowRight, ArrowLeft, AlertCircle, Loader2, Calendar, Users, Target, Zap } from "lucide-react"
import { trackHeadlineConversion } from "./HeadlineABTest"
import type { AnalyticsEvent, AnalyticsData } from "@/types/analytics"

interface MultiStepLeadCaptureProps {
  onComplete: (data: LeadData) => void
  onViewOnboarding: () => void
  onBackToHome: () => void
  className?: string
}

interface LeadData {
  // Basic Info
  email: string
  phone?: string
  userType: "brand" | "creator"

  // Creator specific
  name?: string
  platforms?: string[]
  platformDetails?: {
    [platform: string]: {
      username: string
      followerCount: string
    }
  }
  referralSource?: string

  // Metadata
  headlineVariant?: string
  timeOnPage?: number
  formStartTime?: number
  completionTime?: number
}

interface FormErrors {
  email?: string
  phone?: string
  name?: string
  platforms?: string
  [key: string]: string | undefined
}

const PLATFORMS = [
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'youtube', label: 'YouTube', icon: '📺' },
  { id: 'snapchat', label: 'Snapchat', icon: '👻' },
  { id: 'twitter', label: 'Twitter/X', icon: '🐦' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { id: 'other', label: 'Other', icon: '📱' }
]

const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media',
  'Friend/Colleague Referral',
  'Industry Event',
  'Email Newsletter',
  'Podcast',
  'Blog/Article',
  'Other'
]

const FOLLOWER_RANGES = [
  '1K - 10K (Nano-influencer)',
  '10K - 100K (Micro-influencer)',
  '100K - 1M (Macro-influencer)',
  '1M+ (Mega-influencer)',
  'Less than 1K'
]

export default function MultiStepLeadCapture({
  onComplete,
  onViewOnboarding,
  onBackToHome,
  className = ""
}: MultiStepLeadCaptureProps) {
  const [step, setStep] = useState<"email" | "phone" | "userType" | "platforms" | "creatorDetails" | "complete">("email")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formStartTime] = useState(Date.now())

  // Form data
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [userType, setUserType] = useState<"brand" | "creator" | null>(null)
  const [name, setName] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [platformDetails, setPlatformDetails] = useState<{[key: string]: {username: string, followerCount: string}}>({})
  const [referralSource, setReferralSource] = useState("")

  // Validation functions
  const validateEmail = useCallback((email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return undefined
  }, [])

  const validatePhone = useCallback((phone: string): string | undefined => {
    if (!phone) return undefined // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    if (cleanPhone.length < 10) return "Phone number must be at least 10 digits"
    if (!phoneRegex.test(cleanPhone)) return "Please enter a valid phone number"
    return undefined
  }, [])

  // Analytics tracking
  const trackStepEvent = useCallback((eventType: string, stepName: string, data?: AnalyticsData) => {
    if (typeof window !== 'undefined') {
      const analyticsEvent: AnalyticsEvent = {
        event: `lead_capture_${eventType}`,
        step: stepName,
        email_domain: email ? email.split('@')[1] : undefined,
        timestamp: new Date().toISOString(),
        form_duration: Date.now() - formStartTime,
        headline_variant: localStorage.getItem('headline_variant') || undefined,
        ...data
      }
      window.dataLayer?.push(analyticsEvent)
    }
  }, [email, formStartTime])

  // n8n webhook integration
  const sendToN8n = useCallback(async (leadData: LeadData) => {
    try {
      // Replace with your actual n8n webhook URL
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/lead-capture'

      const payload = {
        ...leadData,
        source: 'website',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href
      }

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      trackStepEvent('n8n_sent', 'webhook', { user_type: leadData.userType })
    } catch (error) {
      console.error('Failed to send to n8n:', error)
      trackStepEvent('n8n_error', 'webhook', { error: 'webhook_failed' })
    }
  }, [trackStepEvent])

  // Step handlers
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
    trackStepEvent('completed', 'email')

    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call

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
    trackStepEvent('completed', 'phone', { phone_provided: !!phone })

    await new Promise(resolve => setTimeout(resolve, 400))

    setStep("userType")
    setIsSubmitting(false)
  }

  const handleUserTypeSelect = async (type: "brand" | "creator") => {
    setIsSubmitting(true)
    setUserType(type)

    trackStepEvent('completed', 'userType', { user_type: type })
    trackHeadlineConversion('segment_select')

    await new Promise(resolve => setTimeout(resolve, 600))

    if (type === "brand") {
      // Complete form for brands - they go straight to booking
      const leadData: LeadData = {
        email,
        phone: phone || undefined,
        userType: type,
        headlineVariant: localStorage.getItem('headline_variant') || undefined,
        timeOnPage: Date.now() - formStartTime,
        formStartTime,
        completionTime: Date.now()
      }

      await sendToN8n(leadData)
      onComplete(leadData)
      setStep("complete")
    } else {
      // Creators need additional info
      setStep("platforms")
    }

    setIsSubmitting(false)
  }

  const handlePlatformsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (selectedPlatforms.length === 0) {
      setErrors({ platforms: "Please select at least one platform" })
      setIsSubmitting(false)
      return
    }

    setErrors({})
    trackStepEvent('completed', 'platforms', { platforms_selected: selectedPlatforms.length })

    await new Promise(resolve => setTimeout(resolve, 400))

    setStep("creatorDetails")
    setIsSubmitting(false)
  }

  const handleCreatorDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!name.trim()) {
      setErrors({ name: "Name is required" })
      setIsSubmitting(false)
      return
    }

    // Validate platform details
    const missingDetails = selectedPlatforms.some(platform =>
      !platformDetails[platform]?.username || !platformDetails[platform]?.followerCount
    )

    if (missingDetails) {
      setErrors({ platforms: "Please complete all platform details" })
      setIsSubmitting(false)
      return
    }

    setErrors({})

    const leadData: LeadData = {
      email,
      phone: phone || undefined,
      userType: "creator",
      name,
      platforms: selectedPlatforms,
      platformDetails,
      referralSource: referralSource || undefined,
      headlineVariant: localStorage.getItem('headline_variant') || undefined,
      timeOnPage: Date.now() - formStartTime,
      formStartTime,
      completionTime: Date.now()
    }

    trackStepEvent('completed', 'creatorDetails', {
      platforms_count: selectedPlatforms.length,
      referral_source: referralSource
    })

    await sendToN8n(leadData)
    onComplete(leadData)
    setStep("complete")
    setIsSubmitting(false)
  }

  const handlePlatformToggle = (platformId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms(prev => [...prev, platformId])
      if (!platformDetails[platformId]) {
        setPlatformDetails(prev => ({
          ...prev,
          [platformId]: { username: '', followerCount: '' }
        }))
      }
    } else {
      setSelectedPlatforms(prev => prev.filter(p => p !== platformId))
      setPlatformDetails(prev => {
        const newDetails = { ...prev }
        delete newDetails[platformId]
        return newDetails
      })
    }
  }

  const updatePlatformDetail = (platform: string, field: 'username' | 'followerCount', value: string) => {
    setPlatformDetails(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }))
  }

  // Test mode helpers
  const isTestMode = typeof window !== 'undefined' && window.location.search.includes('test=true')

  return (
    <div className={`max-w-lg mx-auto ${className}`}>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">
            Step {step === 'email' ? '1' : step === 'phone' ? '2' : step === 'userType' ? '3' : step === 'platforms' ? '4' : step === 'creatorDetails' ? '5' : '6'} of {userType === 'brand' ? '4' : '6'}
          </span>
          <span className="text-xs text-slate-400">
            {Math.round((Date.now() - formStartTime) / 1000)}s
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1">
          <div
            className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
            style={{
              width: `${
                step === 'email' ? '16%' :
                step === 'phone' ? '33%' :
                step === 'userType' ? '50%' :
                step === 'platforms' ? '66%' :
                step === 'creatorDetails' ? '83%' : '100%'
              }`
            }}
          />
        </div>
      </div>

      {/* Test mode indicator */}
      {isTestMode && (
        <div className="mb-4 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
          <p className="text-yellow-400 text-sm text-center">
            🧪 Test Mode: {step} | Email: {email || 'none'} | Type: {userType || 'none'}
          </p>
        </div>
      )}

      {/* Step 1: Email */}
      {step === "email" && (
        <form onSubmit={handleEmailSubmit}>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Let's get started</h3>
              <p className="text-slate-300 text-sm mb-4">Enter your email to begin</p>
            </div>

            <div className="flex gap-3 p-2 bg-slate-800 rounded-lg border border-slate-700">
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                }}
                placeholder="your@email.com"
                className="bg-transparent border-0 text-white placeholder-slate-400 text-lg px-4 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold px-8 py-3 text-lg"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </Button>
            </div>

            {errors.email && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}

            <p className="text-sm text-slate-400">For brands and creators. Free to get started.</p>
          </div>
        </form>
      )}

      {/* Step 2: Phone */}
      {step === "phone" && (
        <form onSubmit={handlePhoneSubmit}>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone number</h3>
              <p className="text-slate-300 text-sm mb-4">Get SMS updates for time-sensitive opportunities (optional)</p>
            </div>

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
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
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
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep("userType")}
                className="text-slate-400 hover:text-white"
              >
                Skip
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Step 3: User Type */}
      {step === "userType" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">I am a...</h3>
            <p className="text-slate-300 text-sm mb-6">This helps us customize your experience</p>
          </div>

          <div className="grid gap-4">
            <Button
              onClick={() => handleUserTypeSelect("brand")}
              variant="outline"
              disabled={isSubmitting}
              className="flex items-center gap-4 h-16 text-left justify-start hover:bg-blue-500 hover:text-white hover:border-blue-500"
            >
              {isSubmitting && userType === "brand" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Target className="w-6 h-6" />
              )}
              <div>
                <div className="font-semibold">Brand / Business</div>
                <div className="text-sm opacity-75">Looking for creators to promote my products</div>
              </div>
            </Button>

            <Button
              onClick={() => handleUserTypeSelect("creator")}
              variant="outline"
              disabled={isSubmitting}
              className="flex items-center gap-4 h-16 text-left justify-start hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
            >
              {isSubmitting && userType === "creator" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Users className="w-6 h-6" />
              )}
              <div>
                <div className="font-semibold">Content Creator</div>
                <div className="text-sm opacity-75">I create content and want brand partnerships</div>
              </div>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep("phone")}
            className="text-slate-400 hover:text-white w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}

      {/* Step 4: Creator Platforms */}
      {step === "platforms" && (
        <form onSubmit={handlePlatformsSubmit}>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Which platforms do you create for?</h3>
              <p className="text-slate-300 text-sm mb-4">Select all that apply</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2 p-3 rounded-lg border border-slate-700 hover:border-slate-600">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={(checked) => handlePlatformToggle(platform.id, checked as boolean)}
                  />
                  <Label htmlFor={platform.id} className="flex items-center gap-2 text-white cursor-pointer">
                    <span>{platform.icon}</span>
                    {platform.label}
                  </Label>
                </div>
              ))}
            </div>

            {errors.platforms && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.platforms}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("userType")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || selectedPlatforms.length === 0}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Continue ({selectedPlatforms.length} selected)
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Step 5: Creator Details */}
      {step === "creatorDetails" && (
        <form onSubmit={handleCreatorDetailsSubmit}>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Tell us about yourself</h3>
              <p className="text-slate-300 text-sm mb-4">This helps us match you with the right brands</p>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-white mb-2 block">Your Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                }}
                placeholder="Enter your full name"
                className="bg-slate-800 border-slate-700 text-white"
                required
              />
              {errors.name && (
                <div className="flex items-center gap-2 mt-1 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Platform Details */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Platform Details</h4>
              {selectedPlatforms.map((platformId) => {
                const platform = PLATFORMS.find(p => p.id === platformId)
                if (!platform) return null
                return (
                  <div key={platformId} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <span>{platform.icon}</span>
                      <span className="text-white font-medium">{platform.label}</span>
                    </div>

                    <div className="grid gap-3">
                      <div>
                        <Label className="text-slate-300 text-sm">Username/Handle</Label>
                        <Input
                          value={platformDetails[platformId]?.username || ''}
                          onChange={(e) => updatePlatformDetail(platformId, 'username', e.target.value)}
                          placeholder={`@your${platform.label.toLowerCase()}handle`}
                          className="bg-slate-900 border-slate-600 text-white mt-1"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-300 text-sm">Follower Count</Label>
                        <Select
                          value={platformDetails[platformId]?.followerCount || ''}
                          onValueChange={(value) => updatePlatformDetail(platformId, 'followerCount', value)}
                        >
                          <SelectTrigger className="bg-slate-900 border-slate-600 text-white mt-1">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {FOLLOWER_RANGES.map((range) => (
                              <SelectItem key={range} value={range}>{range}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Referral Source */}
            <div>
              <Label className="text-white mb-2 block">How did you hear about us?</Label>
              <Select value={referralSource} onValueChange={setReferralSource}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {REFERRAL_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {errors.platforms && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.platforms}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("platforms")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Zap className="w-5 h-5 mr-2" />}
                Complete Application
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Step 6: Complete */}
      {step === "complete" && userType && (
        <div className="space-y-4 p-6 bg-slate-800 rounded-lg border border-emerald-500/50">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <div className="text-center space-y-4">
            {userType === "brand" ? (
              <>
                <h3 className="text-lg font-semibold text-white mb-2">Welcome, Brand Partner!</h3>
                <p className="text-slate-300 mb-4">
                  We've received your information and will send you a calendar link to book a strategy call within the next 5 minutes.
                </p>
                <div className="flex items-center gap-2 justify-center text-emerald-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Booking automation is processing...</span>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white mb-2">Welcome to our Creator Network!</h3>
                <p className="text-slate-300 mb-4">
                  Thank you for your detailed application. Our team will review your profile and get back to you within 24-48 hours.
                </p>
                <div className="text-sm text-slate-400">
                  Selected platforms: {selectedPlatforms.join(', ')}
                </div>
              </>
            )}

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  trackHeadlineConversion('onboarding_view')
                  onViewOnboarding()
                }}
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
          <p>Name: {name}</p>
          <p>Platforms: {selectedPlatforms.join(', ')}</p>
          <p>Step: {step}</p>
          <p>Form Duration: {Math.round((Date.now() - formStartTime) / 1000)}s</p>
        </div>
      )}
    </div>
  )
}
