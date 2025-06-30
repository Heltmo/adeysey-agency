"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TestTube, Eye, RefreshCw, Download, TrendingUp } from "lucide-react"

interface ABTestData {
  variant_id: string
  views: number
  email_submissions: number
  phone_submissions: number
  segment_selections: number
  onboarding_views: number
  conversion_rate: number
}

interface FormAnalytics {
  total_sessions: number
  email_completion_rate: number
  phone_completion_rate: number
  segment_completion_rate: number
  most_common_drop_off: string
  avg_time_to_complete: number
}

export default function TestingDashboard() {
  const [abTestData, setAbTestData] = useState<ABTestData[]>([])
  const [formAnalytics, setFormAnalytics] = useState<FormAnalytics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Mock data for demonstration - in real app this would come from analytics API
  useEffect(() => {
    const mockABData: ABTestData[] = [
      {
        variant_id: "original",
        views: 1247,
        email_submissions: 156,
        phone_submissions: 98,
        segment_selections: 89,
        onboarding_views: 72,
        conversion_rate: 7.14
      },
      {
        variant_id: "performance-focused",
        views: 1189,
        email_submissions: 178,
        phone_submissions: 112,
        segment_selections: 101,
        onboarding_views: 87,
        conversion_rate: 8.49
      },
      {
        variant_id: "roi-focused",
        views: 1203,
        email_submissions: 203,
        phone_submissions: 134,
        segment_selections: 118,
        onboarding_views: 102,
        conversion_rate: 9.81
      },
      {
        variant_id: "speed-focused",
        views: 1156,
        email_submissions: 164,
        phone_submissions: 95,
        segment_selections: 84,
        onboarding_views: 69,
        conversion_rate: 7.27
      }
    ]

    const mockFormAnalytics: FormAnalytics = {
      total_sessions: 4795,
      email_completion_rate: 85.2,
      phone_completion_rate: 67.8,
      segment_completion_rate: 94.1,
      most_common_drop_off: "phone_step",
      avg_time_to_complete: 127
    }

    setAbTestData(mockABData)
    setFormAnalytics(mockFormAnalytics)
  }, [])

  // Check for admin access
  useEffect(() => {
    const hasAdminAccess = window.location.search.includes('admin=true') ||
                          window.location.search.includes('debug=true')
    setIsVisible(hasAdminAccess)
  }, [])

  const forceVariant = (variantId: string) => {
    localStorage.setItem('headline_variant', variantId)
    window.location.reload()
  }

  const clearVariant = () => {
    localStorage.removeItem('headline_variant')
    window.location.reload()
  }

  const exportData = () => {
    const data = {
      ab_test_results: abTestData,
      form_analytics: formAnalytics,
      export_date: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `adeysey-media-analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isVisible) {
    return null
  }

  const bestPerformingVariant = abTestData.reduce((best, current) =>
    current.conversion_rate > best.conversion_rate ? current : best
  )

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <div className="mb-4">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
          size="sm"
        >
          <TestTube className="w-4 h-4 mr-2" />
          Analytics Dashboard
        </Button>
      </div>

      {/* Dashboard Panel */}
      <div className="w-96 max-h-96 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg shadow-2xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Testing Dashboard
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={exportData}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* A/B Test Results */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Headline A/B Test Results
            </h4>

            <div className="space-y-2 mb-3">
              {abTestData.map((variant) => (
                <div
                  key={variant.variant_id}
                  className={`p-3 rounded border ${
                    variant.variant_id === bestPerformingVariant.variant_id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium capitalize">
                      {variant.variant_id.replace('-', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      {variant.variant_id === bestPerformingVariant.variant_id && (
                        <Badge className="bg-emerald-500 text-black text-xs">Winner</Badge>
                      )}
                      <Button
                        onClick={() => forceVariant(variant.variant_id)}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Views:</span>
                      <span className="text-white ml-1">{variant.views}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Emails:</span>
                      <span className="text-white ml-1">{variant.email_submissions}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Conv Rate:</span>
                      <span className="text-emerald-400 ml-1 font-semibold">
                        {variant.conversion_rate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Onboard:</span>
                      <span className="text-white ml-1">{variant.onboarding_views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={clearVariant}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Clear Forced Variant
            </Button>
          </div>

          {/* Form Analytics */}
          {formAnalytics && (
            <div>
              <h4 className="text-white font-semibold mb-3">Form Performance</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Sessions:</span>
                  <span className="text-white">{formAnalytics.total_sessions}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Email Completion:</span>
                  <span className="text-emerald-400">{formAnalytics.email_completion_rate}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Phone Completion:</span>
                  <span className="text-yellow-400">{formAnalytics.phone_completion_rate}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Segment Completion:</span>
                  <span className="text-emerald-400">{formAnalytics.segment_completion_rate}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Completion Time:</span>
                  <span className="text-white">{formAnalytics.avg_time_to_complete}s</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Main Drop-off:</span>
                  <span className="text-red-400">{formAnalytics.most_common_drop_off.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Testing Tools */}
          <div>
            <h4 className="text-white font-semibold mb-3">Testing Tools</h4>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-800/50 rounded border border-slate-700">
                <p className="text-slate-400 mb-1">Test Mode URLs:</p>
                <p className="text-emerald-400">?test=true - Enhanced form testing</p>
                <p className="text-blue-400">?debug=true - A/B test info</p>
                <p className="text-purple-400">?admin=true - Show this dashboard</p>
              </div>

              <Button
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}?test=true`)}
                variant="ghost"
                size="sm"
                className="w-full text-xs text-slate-400 hover:text-white"
              >
                Copy Test URL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
