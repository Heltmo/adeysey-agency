"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock, Target, Users, CheckCircle2, ArrowRight, Calendar, BarChart3, Zap, Eye, TrendingUp } from "lucide-react"
import SMSTemplate from "./SMSTemplates"
import SMSMetrics from "./SMSMetrics"

interface SMSSequenceProps {
  userType: "brand" | "creator"
  phone: string
}

const brandSMSSequence = [
  {
    day: 0,
    title: "Welcome SMS",
    content: "🎯 Welcome to ADEYSEY MEDIA! Your strategy guide is ready. Check your email for the download link. Reply STOP to opt out.",
    timing: "Immediate",
    icon: Target,
    length: 137
  },
  {
    day: 1,
    title: "Campaign Templates Alert",
    content: "📋 Your campaign templates are here! 6 proven frameworks that generated $2M+ in revenue. Check your email now.",
    timing: "24 hours",
    icon: BarChart3,
    length: 115
  },
  {
    day: 3,
    title: "Creator Vetting Reminder",
    content: "🔍 Don't miss: Your creator vetting checklist (47 evaluation points) is waiting in your inbox. Start vetting smarter.",
    timing: "72 hours",
    icon: CheckCircle2,
    length: 127
  },
  {
    day: 7,
    title: "ROI Calculator",
    content: "📊 URGENT: Your ROI calculator expires in 48 hours. Calculate campaign returns instantly: [link] Reply STOP to opt out.",
    timing: "1 week",
    icon: BarChart3,
    length: 130
  },
  {
    day: 14,
    title: "Strategy Call Invite",
    content: "📞 Ready to scale? Book your FREE strategy call today. Limited slots available this week: [link]",
    timing: "2 weeks",
    icon: Calendar,
    length: 104
  }
]

const creatorSMSSequence = [
  {
    day: 0,
    title: "Welcome SMS",
    content: "🚀 Welcome to ADEYSEY MEDIA! Your content toolkit is ready. Check your email to download. Reply STOP to opt out.",
    timing: "Immediate",
    icon: Zap,
    length: 125
  },
  {
    day: 1,
    title: "Application Guide",
    content: "✅ Application tips in your inbox! Get insider secrets for network approval. Check email now for higher success rates.",
    timing: "24 hours",
    icon: Users,
    length: 120
  },
  {
    day: 3,
    title: "Masterclass Alert",
    content: "🎬 LIVE: Content Performance Masterclass starts in 2 hours. Learn the 5 elements of viral UGC: adeyseymedia.com/live",
    timing: "72 hours",
    icon: Target,
    length: 113
  },
  {
    day: 7,
    title: "Rate Negotiation Guide",
    content: "💰 3x your rates without losing clients! Your negotiation playbook is ready. Download from email before it expires.",
    timing: "1 week",
    icon: BarChart3,
    length: 119
  },
  {
    day: 14,
    title: "Brand Matching Alert",
    content: "🎯 EXCLUSIVE: Premium brand opportunities closing soon. Complete your profile in 24hrs for priority access.",
    timing: "2 weeks",
    icon: CheckCircle2,
    length: 114
  }
]

export default function SMSSequence({ userType, phone }: SMSSequenceProps) {
  const [selectedSMS, setSelectedSMS] = useState<number | null>(null)
  const [viewingTemplate, setViewingTemplate] = useState<number | null>(null)
  const [viewingMetrics, setViewingMetrics] = useState(false)
  const sequence = userType === "brand" ? brandSMSSequence : creatorSMSSequence
  const userTypeLabel = userType === "brand" ? "Brand Partner" : "Creator"

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
          <h3 className="text-xl font-bold text-white">SMS Performance</h3>
        </div>
        <SMSMetrics />
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
          <h3 className="text-xl font-bold text-white">SMS Preview</h3>
        </div>
        <SMSTemplate
          userType={userType}
          day={viewingTemplate}
          phone={phone}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <Badge variant={userType === "brand" ? "blue" : "default"} className="mb-4">
          {userTypeLabel} SMS Automation
        </Badge>
        <h2 className="text-3xl font-bold text-white">Your 14-Day SMS Journey</h2>
        <p className="text-slate-300 text-lg">
          High-impact SMS automation designed for {userType === "brand" ? "growth-focused brands" : "ambitious creators"}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <MessageSquare className="w-4 h-4" />
          <span>SMS will be sent to: {phone}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewingMetrics(true)}
          className="text-slate-300 border-slate-600 hover:border-emerald-500 hover:text-emerald-400"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          View SMS Performance Metrics
        </Button>
      </div>

      <div className="grid gap-6">
        {sequence.map((smsData, index) => (
          <Card
            key={`sms-${smsData.day}-${smsData.title}`}
            className={`cursor-pointer transition-all duration-300 ${
              selectedSMS === index
                ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                : 'hover:border-slate-600'
            }`}
            onClick={() => setSelectedSMS(selectedSMS === index ? null : index)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <smsData.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">
                          Day {smsData.day} ({smsData.timing})
                        </span>
                      </div>
                      <CardTitle className="text-lg text-white">{smsData.title}</CardTitle>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {smsData.length}/160 chars
                  </Badge>
                  <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    selectedSMS === index ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-white font-mono text-sm leading-relaxed">{smsData.content}</p>
                </div>

                {selectedSMS === index && (
                  <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <h4 className="font-medium text-white mb-3">SMS Details:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-slate-400">Character Count:</span>
                        <span className="text-white ml-2">{smsData.length}/160</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Send Time:</span>
                        <span className="text-white ml-2">{smsData.timing}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-emerald-400 border-emerald-500 hover:bg-emerald-500 hover:text-slate-900"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Test SMS
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setViewingTemplate(smsData.day)
                        }}
                        className="text-slate-300"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview SMS
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4 pt-8">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-3">Multi-Channel Strategy</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <h4 className="font-medium text-emerald-400">📧 Email + 📱 SMS Combined</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Email for detailed content & resources</li>
                <li>• SMS for urgent alerts & reminders</li>
                <li>• Cross-channel message reinforcement</li>
                <li>• Optimized delivery timing</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-emerald-400">Performance Benefits</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• 342% higher engagement vs email only</li>
                <li>• 85% SMS open rate within 3 minutes</li>
                <li>• 23% increase in conversion rates</li>
                <li>• Reduced campaign completion time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
