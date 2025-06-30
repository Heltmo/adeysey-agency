"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Clock, Target, Users, CheckCircle2, ArrowRight, Calendar, BarChart3, Zap, Eye, TrendingUp, MessageSquare } from "lucide-react"
import EmailTemplate from "./EmailTemplates"
import AutomationMetrics from "./AutomationMetrics"
import SMSSequence from "./SMSSequence"

interface EmailSequenceProps {
  userType: "brand" | "creator"
  email: string
  phone?: string
}

const brandEmailSequence = [
  {
    day: 0,
    title: "Welcome & Strategy Guide",
    subject: "Your Brand Partnership Strategy Guide is Ready",
    preview: "Everything you need to launch your first UGC campaign",
    content: "Comprehensive 24-page strategy guide covering campaign planning, creator vetting, and ROI measurement",
    cta: "Download Strategy Guide",
    icon: Target
  },
  {
    day: 1,
    title: "Campaign Framework Templates",
    subject: "Ready-to-use UGC campaign templates",
    preview: "Save 10+ hours with our proven campaign frameworks",
    content: "6 campaign templates: Product launch, Brand awareness, Holiday campaigns, User testimonials, Unboxing videos, and Performance-driven content",
    cta: "Get Templates",
    icon: BarChart3
  },
  {
    day: 3,
    title: "Creator Vetting Checklist",
    subject: "How to spot high-converting creators in 5 minutes",
    preview: "Our internal 47-point creator evaluation system",
    content: "Step-by-step checklist to evaluate creator authenticity, engagement rates, audience quality, and conversion potential",
    cta: "View Checklist",
    icon: CheckCircle2
  },
  {
    day: 7,
    title: "ROI Calculator & Tracking Setup",
    subject: "Calculate your UGC campaign ROI in real-time",
    preview: "Free calculator + tracking spreadsheet templates",
    content: "Interactive ROI calculator, performance tracking templates, and KPI benchmarking against 500+ successful campaigns",
    cta: "Access Calculator",
    icon: BarChart3
  },
  {
    day: 14,
    title: "Exclusive Partnership Opportunity",
    subject: "Ready to scale? Let's talk strategy",
    preview: "Schedule your complimentary strategy session",
    content: "1-on-1 strategy call with our team to review your brand goals, discuss custom creator matching, and explore partnership opportunities",
    cta: "Book Strategy Call",
    icon: Calendar
  }
]

const creatorEmailSequence = [
  {
    day: 0,
    title: "Creator Welcome Package",
    subject: "Welcome to ADEYSEY MEDIA - Your toolkit awaits",
    preview: "Everything you need to create high-converting content",
    content: "Content creation toolkit, brand pitch templates, rate negotiation guide, and performance optimization strategies",
    cta: "Access Toolkit",
    icon: Zap
  },
  {
    day: 1,
    title: "Application Requirements",
    subject: "How to get approved in our ADEYSEY MEDIA network",
    preview: "Step-by-step application guide + approval tips",
    content: "Detailed application requirements, portfolio guidelines, performance metrics needed, and insider tips from approved creators",
    cta: "Start Application",
    icon: Users
  },
  {
    day: 3,
    title: "Content Performance Masterclass",
    subject: "The 5 elements of viral UGC content",
    preview: "Learn from our top-performing creators",
    content: "Video masterclass covering content hooks, storytelling frameworks, call-to-action optimization, and engagement tactics that convert",
    cta: "Watch Masterclass",
    icon: Target
  },
  {
    day: 7,
    title: "Rate Negotiation Playbook",
    subject: "How to 3x your rates (without losing clients)",
    preview: "Professional negotiation strategies that work",
    content: "Rate calculation formulas, negotiation scripts, package structuring, and value-based pricing strategies from 6-figure creators",
    cta: "Download Playbook",
    icon: BarChart3
  },
  {
    day: 14,
    title: "Priority Brand Matching",
    subject: "Exclusive brand opportunities await",
    preview: "Get matched with premium brands in your niche",
    content: "Complete your profile to unlock priority access to brand partnerships, exclusive campaign opportunities, and higher-paying collaborations",
    cta: "Complete Profile",
    icon: CheckCircle2
  }
]

export default function EmailSequence({ userType, email, phone }: EmailSequenceProps) {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [viewingTemplate, setViewingTemplate] = useState<number | null>(null)
  const [viewingMetrics, setViewingMetrics] = useState(false)
  const [viewingSMS, setViewingSMS] = useState(false)
  const sequence = userType === "brand" ? brandEmailSequence : creatorEmailSequence
  const userTypeLabel = userType === "brand" ? "Brand Partner" : "Creator"

  if (viewingSMS && phone) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setViewingSMS(false)}
            className="text-slate-400 hover:text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Email Sequence
          </Button>
          <h3 className="text-xl font-bold text-white">SMS Automation</h3>
        </div>
        <SMSSequence userType={userType} phone={phone} />
      </div>
    )
  }

  if (viewingMetrics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setViewingMetrics(false)}
            className="text-slate-400 hover:text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Sequence
          </Button>
          <h3 className="text-xl font-bold text-white">Automation Performance</h3>
        </div>
        <AutomationMetrics />
      </div>
    )
  }

  if (viewingTemplate !== null) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setViewingTemplate(null)}
            className="text-slate-400 hover:text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Sequence
          </Button>
          <h3 className="text-xl font-bold text-white">Email Preview</h3>
        </div>
        <EmailTemplate
          userType={userType}
          day={viewingTemplate}
          email={email}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <Badge variant={userType === "brand" ? "blue" : "default"} className="mb-4">
          {userTypeLabel} Onboarding Sequence
        </Badge>
        <h2 className="text-3xl font-bold text-white">Your 14-Day Onboarding Journey</h2>
        <p className="text-slate-300 text-lg">
          Automated email sequence designed specifically for {userType === "brand" ? "growth-focused brands" : "ambitious creators"}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <Mail className="w-4 h-4" />
          <span>Emails will be sent to: {email}</span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewingMetrics(true)}
            className="text-slate-300 border-slate-600 hover:border-emerald-500 hover:text-emerald-400"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Performance Metrics
          </Button>
          {phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewingSMS(true)}
              className="text-slate-300 border-slate-600 hover:border-emerald-500 hover:text-emerald-400"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              View SMS Automation
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        {sequence.map((emailData, index) => (
          <Card
            key={`email-${emailData.day}-${emailData.title}`}
            className={`cursor-pointer transition-all duration-300 ${
              selectedEmail === index
                ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                : 'hover:border-slate-600'
            }`}
            onClick={() => setSelectedEmail(selectedEmail === index ? null : index)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <emailData.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">
                          Day {emailData.day} {emailData.day === 0 ? "(Immediate)" : ""}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-white">{emailData.title}</CardTitle>
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                  selectedEmail === index ? 'rotate-90' : ''
                }`} />
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-white mb-1">Subject: {emailData.subject}</p>
                  <p className="text-sm text-slate-400">{emailData.preview}</p>
                </div>

                {selectedEmail === index && (
                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h4 className="font-medium text-white mb-2">Email Content:</h4>
                    <p className="text-slate-300 mb-4">{emailData.content}</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-emerald-400 border-emerald-500 hover:bg-emerald-500 hover:text-slate-900"
                      >
                        {emailData.cta}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setViewingTemplate(emailData.day)
                        }}
                        className="text-slate-300"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Email
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {phone && (
        <div className="text-center space-y-4 pt-8">
          <div className="p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-3">📧 + 📱 Multi-Channel Strategy</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-medium text-emerald-400">Email Automation</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Detailed resources & guides</li>
                  <li>• Long-form educational content</li>
                  <li>• Templates & downloadable assets</li>
                  <li>• Comprehensive strategy information</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-emerald-400">SMS Automation</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Time-sensitive alerts & reminders</li>
                  <li>• Urgent opportunities & deadlines</li>
                  <li>• Quick updates & confirmations</li>
                  <li>• Immediate response triggers</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-slate-800/30 rounded-lg">
              <p className="text-emerald-400 font-medium text-center">342% higher engagement with combined email + SMS vs email alone</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center space-y-4 pt-8">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-3">What Happens After Day 14?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {userType === "brand" ? (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Ongoing Partnership Support</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Monthly performance reports</li>
                    <li>• New creator recommendations</li>
                    <li>• Campaign optimization tips</li>
                    <li>• Industry trend updates</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Exclusive Resources</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Private Slack community</li>
                    <li>• Quarterly strategy workshops</li>
                    <li>• Priority customer support</li>
                    <li>• Early access to new features</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Active Creator Benefits</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Weekly brand opportunities</li>
                    <li>• Performance coaching sessions</li>
                    <li>• Revenue optimization support</li>
                    <li>• Content feedback & reviews</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-400">Community Access</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Creator networking events</li>
                    <li>• Collaboration opportunities</li>
                    <li>• Skill-building workshops</li>
                    <li>• Industry insider updates</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
