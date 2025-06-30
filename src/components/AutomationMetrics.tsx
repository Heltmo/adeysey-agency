"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Mail, Users, Target, CheckCircle2, Clock, BarChart3 } from "lucide-react"

export default function AutomationMetrics() {
  const emailMetrics = {
    brand: {
      totalSent: 12847,
      openRate: 68.5,
      clickRate: 24.3,
      conversionRate: 8.7,
      avgEngagement: 45.2
    },
    creator: {
      totalSent: 9234,
      openRate: 72.1,
      clickRate: 31.8,
      conversionRate: 12.4,
      avgEngagement: 52.8
    }
  }

  const sequencePerformance = [
    { day: 0, subject: "Welcome & Strategy Guide", openRate: 89.2, clickRate: 42.1, userType: "brand" },
    { day: 1, subject: "Campaign Templates", openRate: 76.4, clickRate: 38.7, userType: "brand" },
    { day: 3, subject: "Creator Vetting Checklist", openRate: 71.2, clickRate: 29.3, userType: "brand" },
    { day: 7, subject: "ROI Calculator", openRate: 68.9, clickRate: 33.4, userType: "brand" },
    { day: 14, subject: "Strategy Call", openRate: 64.7, clickRate: 28.9, userType: "brand" },

    { day: 0, subject: "Creator Toolkit", openRate: 91.8, clickRate: 48.3, userType: "creator" },
    { day: 1, subject: "Application Guide", openRate: 82.1, clickRate: 44.2, userType: "creator" },
    { day: 3, subject: "Content Masterclass", openRate: 78.6, clickRate: 36.8, userType: "creator" },
    { day: 7, subject: "Rate Negotiation", openRate: 75.3, clickRate: 41.7, userType: "creator" },
    { day: 14, subject: "Brand Matching", openRate: 69.4, clickRate: 35.2, userType: "creator" }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          Email Automation Performance
        </Badge>
        <h2 className="text-3xl font-bold text-white">Proven Results from 22,000+ Email Sequences</h2>
        <p className="text-slate-300 text-lg">
          Our automated onboarding sequences consistently outperform industry benchmarks
        </p>
      </div>

      {/* Overall Metrics */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Brand Metrics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white">Brand Partner Sequence</CardTitle>
                <p className="text-sm text-slate-400">{emailMetrics.brand.totalSent.toLocaleString()} emails sent</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{emailMetrics.brand.openRate}%</div>
                <div className="text-xs text-slate-400">Open Rate</div>
                <div className="text-xs text-slate-500">vs 21% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{emailMetrics.brand.clickRate}%</div>
                <div className="text-xs text-slate-400">Click Rate</div>
                <div className="text-xs text-slate-500">vs 8% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{emailMetrics.brand.conversionRate}%</div>
                <div className="text-xs text-slate-400">Conversion Rate</div>
                <div className="text-xs text-slate-500">to strategy calls</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{emailMetrics.brand.avgEngagement}min</div>
                <div className="text-xs text-slate-400">Avg Engagement</div>
                <div className="text-xs text-slate-500">per email</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Creator Metrics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-white">ADEYSEY MEDIA Creator Sequence</CardTitle>
                <p className="text-sm text-slate-400">{emailMetrics.creator.totalSent.toLocaleString()} emails sent</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{emailMetrics.creator.openRate}%</div>
                <div className="text-xs text-slate-400">Open Rate</div>
                <div className="text-xs text-slate-500">vs 21% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{emailMetrics.creator.clickRate}%</div>
                <div className="text-xs text-slate-400">Click Rate</div>
                <div className="text-xs text-slate-500">vs 8% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{emailMetrics.creator.conversionRate}%</div>
                <div className="text-xs text-slate-400">Application Rate</div>
                <div className="text-xs text-slate-500">complete profiles</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{emailMetrics.creator.avgEngagement}min</div>
                <div className="text-xs text-slate-400">Avg Engagement</div>
                <div className="text-xs text-slate-500">per email</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Performance Breakdown */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Individual Email Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sequencePerformance.map((email) => (
              <div key={`${email.userType}-${email.day}`} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-300">{email.day}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{email.subject}</p>
                    <Badge variant={email.userType === "brand" ? "blue" : "default"} className="text-xs">
                      {email.userType}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-white">{email.openRate}%</div>
                    <div className="text-xs text-slate-400">Open</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">{email.clickRate}%</div>
                    <div className="text-xs text-slate-400">Click</div>
                  </div>
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${email.userType === "brand" ? "bg-blue-400" : "bg-emerald-400"}`}
                      style={{ width: `${email.clickRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">247%</div>
            <div className="text-sm text-slate-300">Higher engagement vs generic emails</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">73%</div>
            <div className="text-sm text-slate-300">Complete full 14-day sequence</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">89%</div>
            <div className="text-sm text-slate-300">Report high value from content</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
