"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock, Target, Zap, CheckCircle2 } from "lucide-react"

interface SMSTemplateProps {
  userType: "brand" | "creator"
  day: number
  phone: string
}

const brandTemplates = {
  0: {
    content: "🎯 Welcome to ADEYSEY MEDIA! Your strategy guide is ready. Check your email for the download link. Reply STOP to opt out.",
    sender: "ADEYSEY MEDIA",
    timing: "Immediate after signup",
    purpose: "Welcome & resource delivery notification"
  },
  1: {
    content: "📋 Your campaign templates are here! 6 proven frameworks that generated $2M+ in revenue. Check your email now.",
    sender: "ADEYSEY MEDIA",
    timing: "24 hours after signup",
    purpose: "Resource alert & urgency"
  },
  7: {
    content: "📊 URGENT: Your ROI calculator expires in 48 hours. Calculate campaign returns instantly: adeyseymedia.com/calc Reply STOP to opt out.",
    sender: "ADEYSEY MEDIA",
    timing: "1 week after signup",
    purpose: "Time-sensitive tool access"
  },
  14: {
    content: "📞 Ready to scale? Book your FREE strategy call today. Limited slots available this week: adeyseymedia.com/call",
    sender: "ADEYSEY MEDIA",
    timing: "2 weeks after signup",
    purpose: "Sales conversion & urgency"
  }
}

const creatorTemplates = {
  0: {
    content: "🚀 Welcome to ADEYSEY MEDIA! Your content toolkit is ready. Check your email to download. Reply STOP to opt out.",
    sender: "ADEYSEY MEDIA",
    timing: "Immediate after signup",
    purpose: "Welcome & resource delivery notification"
  },
  1: {
    content: "✅ Application tips in your inbox! Get insider secrets for network approval. Check email now for higher success rates.",
    sender: "ADEYSEY MEDIA",
    timing: "24 hours after signup",
    purpose: "Resource alert & value reinforcement"
  },
  3: {
    content: "🎬 LIVE: Content Performance Masterclass starts in 2 hours. Learn the 5 elements of viral UGC: adeyseymedia.com/live",
    sender: "ADEYSEY MEDIA",
    timing: "72 hours after signup",
    purpose: "Event reminder & urgency"
  },
  14: {
    content: "🎯 EXCLUSIVE: Premium brand opportunities closing soon. Complete your profile in 24hrs for priority access.",
    sender: "ADEYSEY MEDIA",
    timing: "2 weeks after signup",
    purpose: "Conversion urgency & FOMO"
  }
}

export default function SMSTemplate({ userType, day, phone }: SMSTemplateProps) {
  const templates = userType === "brand" ? brandTemplates : creatorTemplates
  const template = templates[day as keyof typeof templates]

  if (!template) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-slate-400 text-center">SMS template not available for day {day}</p>
        </CardContent>
      </Card>
    )
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const charCount = template.content.length

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* SMS Header Info */}
      <div className="text-center space-y-2">
        <Badge variant={userType === "brand" ? "blue" : "default"}>
          Day {day} - {userType === "brand" ? "Brand" : "Creator"} SMS
        </Badge>
        <p className="text-sm text-slate-400">To: {phone}</p>
        <p className="text-xs text-slate-500">Timing: {template.timing}</p>
        <p className="text-xs text-slate-500">Purpose: {template.purpose}</p>
      </div>

      {/* Phone Mockup */}
      <div className="mx-auto w-80 bg-gray-900 rounded-3xl p-2 shadow-2xl">
        <div className="bg-black rounded-3xl p-4 h-[600px] relative">
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white text-sm mb-4">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-white rounded-full" />
              <div className="w-4 h-2 bg-white rounded-full" />
              <div className="w-4 h-2 bg-white rounded-full" />
              <div className="w-6 h-2 bg-green-500 rounded-full" />
            </div>
          </div>

          {/* Messages Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{template.sender}</h3>
              <p className="text-gray-400 text-sm">Text Message</p>
            </div>
          </div>

          {/* Conversation */}
          <div className="space-y-4 h-96 overflow-y-auto">
            {/* Previous context message */}
            <div className="flex justify-end">
              <div className="max-w-xs bg-blue-500 rounded-lg p-3">
                <p className="text-white text-sm">Thanks for signing up!</p>
                <p className="text-blue-100 text-xs mt-1">Yesterday {currentTime}</p>
              </div>
            </div>

            {/* Main SMS */}
            <div className="flex justify-start">
              <div className="max-w-xs bg-gray-800 rounded-lg p-3">
                <p className="text-white text-sm leading-relaxed">{template.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-400 text-xs">Today {currentTime}</p>
                  <Badge variant="outline" className="text-xs">
                    {charCount}/160
                  </Badge>
                </div>
              </div>
            </div>

            {/* Delivery status */}
            <div className="flex justify-start">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Text Message"
                className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                disabled
              />
              <Button size="sm" className="rounded-full w-8 h-8 p-0">
                ↑
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SMS Analytics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            SMS Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">98%</div>
              <div className="text-xs text-slate-400">Delivery Rate</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">85%</div>
              <div className="text-xs text-slate-400">Open Rate</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">34%</div>
              <div className="text-xs text-slate-400">Click Rate</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">3min</div>
              <div className="text-xs text-slate-400">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Footer */}
      <div className="text-center space-y-2 text-xs text-slate-500">
        <p>SMS sent from short code 12345. Standard messaging rates apply.</p>
        <p>Recipient can reply STOP to unsubscribe or HELP for assistance.</p>
        <p>Compliant with TCPA, CAN-SPAM, and carrier guidelines.</p>
      </div>
    </div>
  )
}
