"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MessageSquare, Users, Target, CheckCircle2, Clock, BarChart3, Zap } from "lucide-react"

export default function SMSMetrics() {
  const smsMetrics = {
    brand: {
      totalSent: 8743,
      deliveryRate: 98.2,
      openRate: 87.4,
      clickRate: 32.1,
      conversionRate: 12.8,
      avgResponseTime: 3.2
    },
    creator: {
      totalSent: 6521,
      deliveryRate: 97.8,
      openRate: 89.1,
      clickRate: 38.6,
      conversionRate: 18.3,
      avgResponseTime: 2.1
    }
  }

  const smsPerformance = [
    { day: 0, content: "Welcome SMS", deliveryRate: 99.1, openRate: 94.2, clickRate: 45.3, userType: "brand" },
    { day: 1, content: "Campaign Templates Alert", deliveryRate: 98.5, openRate: 89.7, clickRate: 38.1, userType: "brand" },
    { day: 7, content: "ROI Calculator Urgent", deliveryRate: 97.9, openRate: 85.3, clickRate: 41.7, userType: "brand" },
    { day: 14, content: "Strategy Call Invite", deliveryRate: 98.1, openRate: 82.6, clickRate: 29.4, userType: "brand" },

    { day: 0, content: "Creator Welcome", deliveryRate: 99.3, openRate: 95.8, clickRate: 52.1, userType: "creator" },
    { day: 1, content: "Application Tips", deliveryRate: 98.7, openRate: 91.2, clickRate: 43.8, userType: "creator" },
    { day: 3, content: "Live Masterclass", deliveryRate: 97.6, openRate: 88.9, clickRate: 67.2, userType: "creator" },
    { day: 14, content: "Brand Matching Alert", deliveryRate: 98.4, openRate: 84.7, clickRate: 35.9, userType: "creator" }
  ]

  const comparisonMetrics = [
    { channel: "SMS Only", engagement: 89.1, conversion: 18.3, cost: "$0.04" },
    { channel: "Email Only", engagement: 24.2, conversion: 8.7, cost: "$0.01" },
    { channel: "SMS + Email", engagement: 94.7, conversion: 26.1, cost: "$0.05" }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          SMS Automation Performance
        </Badge>
        <h2 className="text-3xl font-bold text-white">SMS Campaign Analytics from 15,000+ Messages</h2>
        <p className="text-slate-300 text-lg">
          High-impact SMS automation consistently outperforms industry benchmarks
        </p>
      </div>

      {/* Overall SMS Metrics */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Brand SMS Metrics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white">Brand SMS Campaigns</CardTitle>
                <p className="text-sm text-slate-400">{smsMetrics.brand.totalSent.toLocaleString()} messages sent</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{smsMetrics.brand.deliveryRate}%</div>
                <div className="text-xs text-slate-400">Delivery Rate</div>
                <div className="text-xs text-slate-500">vs 95% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{smsMetrics.brand.openRate}%</div>
                <div className="text-xs text-slate-400">Open Rate</div>
                <div className="text-xs text-slate-500">vs 85% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{smsMetrics.brand.clickRate}%</div>
                <div className="text-xs text-slate-400">Click Rate</div>
                <div className="text-xs text-slate-500">vs 19% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{smsMetrics.brand.avgResponseTime}min</div>
                <div className="text-xs text-slate-400">Avg Response</div>
                <div className="text-xs text-slate-500">time to action</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Creator SMS Metrics */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-white">Creator SMS Campaigns</CardTitle>
                <p className="text-sm text-slate-400">{smsMetrics.creator.totalSent.toLocaleString()} messages sent</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{smsMetrics.creator.deliveryRate}%</div>
                <div className="text-xs text-slate-400">Delivery Rate</div>
                <div className="text-xs text-slate-500">vs 95% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{smsMetrics.creator.openRate}%</div>
                <div className="text-xs text-slate-400">Open Rate</div>
                <div className="text-xs text-slate-500">vs 85% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{smsMetrics.creator.clickRate}%</div>
                <div className="text-xs text-slate-400">Click Rate</div>
                <div className="text-xs text-slate-500">vs 19% industry avg</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400">{smsMetrics.creator.avgResponseTime}min</div>
                <div className="text-xs text-slate-400">Avg Response</div>
                <div className="text-xs text-slate-500">time to action</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual SMS Performance */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Individual SMS Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {smsPerformance.map((sms) => (
              <div key={`${sms.userType}-${sms.day}`} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-300">{sms.day}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{sms.content}</p>
                    <Badge variant={sms.userType === "brand" ? "blue" : "default"} className="text-xs">
                      {sms.userType}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-white">{sms.deliveryRate}%</div>
                    <div className="text-xs text-slate-400">Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">{sms.openRate}%</div>
                    <div className="text-xs text-slate-400">Open</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">{sms.clickRate}%</div>
                    <div className="text-xs text-slate-400">Click</div>
                  </div>
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${sms.userType === "brand" ? "bg-blue-400" : "bg-emerald-400"}`}
                      style={{ width: `${Math.min(sms.clickRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Comparison */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            Multi-Channel Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {comparisonMetrics.map((metric, index) => (
              <div key={metric.channel} className="text-center space-y-4">
                <h3 className="font-semibold text-white">{metric.channel}</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-400">{metric.engagement}%</div>
                    <div className="text-sm text-slate-400">Engagement Rate</div>
                  </div>
                  <div className="p-4 bg-slate-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{metric.conversion}%</div>
                    <div className="text-sm text-slate-400">Conversion Rate</div>
                  </div>
                  <div className="p-4 bg-slate-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-slate-300">{metric.cost}</div>
                    <div className="text-sm text-slate-400">Cost per Message</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">3min</div>
            <div className="text-sm text-slate-300">Average response time</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">342%</div>
            <div className="text-sm text-slate-300">Higher engagement vs email</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <div className="text-sm text-slate-300">Open within 3 minutes</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">23%</div>
            <div className="text-sm text-slate-300">Conversion rate increase</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
