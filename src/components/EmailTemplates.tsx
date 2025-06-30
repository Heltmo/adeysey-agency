"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Calendar, CheckCircle2, Target, BarChart3 } from "lucide-react"
import EmailSignature from "./EmailSignature"

interface EmailTemplateProps {
  userType: "brand" | "creator"
  day: number
  email: string
}

const brandTemplates = {
  0: {
    subject: "Your Brand Partnership Strategy Guide is Ready",
    preheader: "Everything you need to launch your first UGC campaign",
    content: (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to Your Growth Journey!</h1>
          <p className="text-slate-300">Thanks for joining our network of performance-driven brands. Let's get you set up for success.</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">🎯 Your 24-Page Strategy Guide Includes:</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• Campaign planning frameworks for 6 content types</li>
            <li>• Creator vetting checklist (47 evaluation points)</li>
            <li>• Pricing and negotiation strategies</li>
            <li>• ROI measurement and optimization tactics</li>
            <li>• Legal templates and brand safety guidelines</li>
          </ul>
          <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900">
            <Download className="w-4 h-4 mr-2" />
            Download Strategy Guide
          </Button>
        </div>

        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <p className="text-blue-400 text-sm">
            <strong>Next:</strong> Tomorrow you'll receive our campaign templates that have generated $2M+ in trackable revenue.
          </p>
        </div>

        <EmailSignature
          senderName="Marcus Chen"
          title="Brand Partnership Manager"
        />
      </div>
    )
  },
  1: {
    subject: "Ready-to-use UGC campaign templates",
    preheader: "Save 10+ hours with our proven campaign frameworks",
    content: (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-white">6 Campaign Templates That Convert</h1>
        <p className="text-slate-300">These templates have been tested across 500+ campaigns and generated an average 3.2x ROAS.</p>

        <div className="grid gap-4">
          {[
            "Product Launch Campaigns",
            "Brand Awareness & Storytelling",
            "Holiday & Seasonal Promotions",
            "User Testimonials & Reviews",
            "Unboxing & First Impressions",
            "Performance-Driven Conversions"
          ].map((template, index) => (
            <div key={template} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <span className="text-white font-medium">{template}</span>
              <Button size="sm" variant="outline">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
          Access All Templates
        </Button>

        <EmailSignature
          senderName="Sarah Mitchell"
          title="Campaign Strategy Lead"
        />
      </div>
    )
  },
  14: {
    subject: "Ready to scale? Let's talk strategy",
    preheader: "Schedule your complimentary strategy session",
    content: (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-white">Time to Scale Your Success</h1>
        <p className="text-slate-300">
          You've had 2 weeks to explore our resources. Ready to discuss a custom partnership?
        </p>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-3">📞 What We'll Cover in Your Strategy Call:</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Review your current marketing goals and challenges</li>
            <li>• Identify the best creator profiles for your brand</li>
            <li>• Custom campaign strategy recommendations</li>
            <li>• Partnership pricing and timeline discussion</li>
          </ul>
        </div>

        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Strategy Call
        </Button>
      </div>
    )
  }
}

const creatorTemplates = {
  0: {
    subject: "Welcome to ADEYSEY MEDIA - Your toolkit awaits",
    preheader: "Everything you need to create high-converting content",
    content: (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to ADEYSEY MEDIA!</h1>
          <p className="text-slate-300">You've joined an elite group of high-performing content creators. Let's get you set up for success.</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">🚀 Your Creator Toolkit Includes:</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• Content creation templates for 8 video types</li>
            <li>• Brand pitch email templates</li>
            <li>• Rate calculation worksheet</li>
            <li>• Performance tracking spreadsheet</li>
            <li>• Legal contract templates</li>
          </ul>
          <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900">
            <Download className="w-4 h-4 mr-2" />
            Download Creator Toolkit
          </Button>
        </div>

        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
          <p className="text-emerald-400 text-sm">
            <strong>Next:</strong> Tomorrow you'll learn our application process and get insider tips for approval.
          </p>
        </div>

        <EmailSignature
          senderName="Alex Rodriguez"
          title="Creator Success Manager"
        />
      </div>
    )
  },
  7: {
    subject: "How to 3x your rates (without losing clients)",
    preheader: "Professional negotiation strategies that work",
    content: (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-white">The Rate Negotiation Playbook</h1>
        <p className="text-slate-300">
          Our top creators use these exact strategies to command premium rates while maintaining strong brand relationships.
        </p>

        <div className="grid gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold text-emerald-400 mb-2">📊 Rate Calculation Formula</h3>
            <p className="text-slate-300 text-sm">Base Rate + Engagement Multiplier + Usage Rights + Timeline Urgency</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold text-emerald-400 mb-2">💬 Negotiation Scripts</h3>
            <p className="text-slate-300 text-sm">Proven email templates for rate discussions, revisions, and value justification</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold text-emerald-400 mb-2">📦 Package Structuring</h3>
            <p className="text-slate-300 text-sm">Create irresistible offers with tiered pricing and value-add services</p>
          </div>
        </div>

        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
          <Download className="w-4 h-4 mr-2" />
          Download Negotiation Playbook
        </Button>
      </div>
    )
  },
  14: {
    subject: "Exclusive brand opportunities await",
    preheader: "Get matched with premium brands in your niche",
    content: (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-white">Ready for Premium Brand Partnerships?</h1>
        <p className="text-slate-300">
          Complete your creator profile to unlock exclusive opportunities with our vetted brand partners.
        </p>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="font-semibold text-white mb-3">🎯 What You'll Get Access To:</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Weekly curated brand opportunities in your niche</li>
            <li>• Higher-paying campaigns ($500-$5000+ range)</li>
            <li>• Long-term partnership opportunities</li>
            <li>• Priority matching with fast-growing brands</li>
          </ul>
        </div>

        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
          <p className="text-emerald-400 text-sm">
            <strong>Limited Time:</strong> Complete your profile in the next 48 hours to join our Q1 brand matching cohort.
          </p>
        </div>

        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
          Complete Creator Profile
        </Button>
      </div>
    )
  }
}

export default function EmailTemplate({ userType, day, email }: EmailTemplateProps) {
  const templates = userType === "brand" ? brandTemplates : creatorTemplates
  const template = templates[day as keyof typeof templates]

  if (!template) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-slate-400 text-center">Email template not available for day {day}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Email Header Info */}
      <div className="text-center space-y-2">
        <Badge variant={userType === "brand" ? "blue" : "default"}>
          Day {day} - {userType === "brand" ? "Brand" : "Creator"} Email
        </Badge>
        <p className="text-sm text-slate-400">To: {email}</p>
        <p className="text-sm text-slate-500">Subject: {template.subject}</p>
        <p className="text-xs text-slate-500">Preview: {template.preheader}</p>
      </div>

      {/* Email Content */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <p className="font-medium text-white">ADEYSEY MEDIA</p>
                <p className="text-xs text-slate-400">hello@adeyseymedia.com</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Automated
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {template.content}
        </CardContent>
      </Card>

      {/* Email Footer */}
      <div className="text-center space-y-2 text-xs text-slate-500">
        <p>This email was sent to {email} because you signed up for our {userType} onboarding sequence.</p>
        <p>
          <button className="underline hover:text-slate-400">Unsubscribe</button> |
          <button className="underline hover:text-slate-400 ml-2">Update Preferences</button>
        </p>
      </div>
    </div>
  )
}
