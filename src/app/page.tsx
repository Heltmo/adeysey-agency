"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Users, TrendingUp, CheckCircle2, Zap, BarChart3, Shield, Star, ArrowLeft } from "lucide-react"
import EmailSequence from "@/components/EmailSequence"
import TestimonialsSection from "@/components/TestimonialsSection"
import Logo from "@/components/Logo"
import HeadlineABTest from "@/components/HeadlineABTest"
import MultiStepLeadCapture from "@/components/MultiStepLeadCapture"
import TestingDashboard from "@/components/TestingDashboard"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "onboarding">("home")
  const [userData, setUserData] = useState<{
    email: string
    phone?: string
    userType: "brand" | "creator"
    name?: string
    platforms?: string[]
    platformDetails?: {[platform: string]: {username: string, followerCount: string}}
    referralSource?: string
  } | null>(null)
  const [selectedHeadlineVariant, setSelectedHeadlineVariant] = useState<string>("")

  const handleLeadCaptureComplete = (data: {
    email: string
    phone?: string
    userType: "brand" | "creator"
    name?: string
    platforms?: string[]
    platformDetails?: {[platform: string]: {username: string, followerCount: string}}
    referralSource?: string
  }) => {
    setUserData(data)
  }

  const handleViewOnboarding = () => {
    setCurrentView("onboarding")
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setUserData(null)
  }

  // Show onboarding sequence if user has completed signup
  if (currentView === "onboarding" && userData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="px-6 py-8">
          <button
            onClick={handleBackToHome}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </button>
          <EmailSequence
            userType={userData.userType}
            email={userData.email}
            phone={userData.phone}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <Logo size="lg" />
            </div>
            <HeadlineABTest onVariantSelected={setSelectedHeadlineVariant} />
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We build high-converting UGC pipelines for brands through a vetted network of proven micro-influencers.
            </p>
          </div>

          {/* Multi-Step Lead Capture */}
          <MultiStepLeadCapture
            onComplete={handleLeadCaptureComplete}
            onViewOnboarding={handleViewOnboarding}
            onBackToHome={handleBackToHome}
          />

          {/* A/B Test Info for Admins */}
          {typeof window !== 'undefined' && window.location.search.includes('debug=true') && (
            <div className="mt-4 p-3 bg-yellow-500/10 rounded border border-yellow-500/20 text-sm">
              <p className="text-yellow-400">
                🧪 A/B Test Active: Headline variant "{selectedHeadlineVariant}" |
                Add ?test=true to URL for enhanced form testing
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-6">
              Performance-Focused Process
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Built for Speed, Clarity, and Measurable Results
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit", icon: Target, desc: "Deep analysis of your brand positioning and content gaps" },
              { step: "02", title: "Match", icon: Users, desc: "AI-powered creator matching based on audience alignment" },
              { step: "03", title: "Launch", icon: Zap, desc: "Streamlined campaign execution with proven frameworks" },
              { step: "04", title: "Optimize", icon: TrendingUp, desc: "Real-time performance tracking and scaling decisions" }
            ].map((item) => (
              <Card key={item.step} className="bg-slate-900 border-slate-700 relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-emerald-400 font-mono text-sm">{item.step}</span>
                  </div>
                  <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{item.desc}</p>
                </CardContent>
                {item.step !== "04" && (
                  <ArrowRight className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-emerald-400 hidden md:block" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Brands */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-6">
                For Growing Brands
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                Fast Content.<br />
                Clear ROI.<br />
                <span className="text-blue-400">Vetted Creators.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Launch campaigns 10x faster than traditional agencies",
                  "Track every dollar with granular performance analytics",
                  "Access pre-vetted creators with proven conversion rates",
                  "Scale winning content across multiple platforms"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-lg text-slate-300 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { metric: "10x", label: "Faster Launch", icon: Zap },
                { metric: "85%", label: "Cost Reduction", icon: TrendingUp },
                { metric: "3.2x", label: "Higher ROAS", icon: BarChart3 },
                { metric: "99%", label: "Vetted Creators", icon: Shield }
              ].map((stat) => (
                <Card key={stat.label} className="bg-slate-800 border-slate-700 text-center p-6">
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.metric}</div>
                  <div className="text-slate-300 font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Creators */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-6 lg:order-first">
              {[
                { title: "Premium campaigns from vetted brands", subtitle: "" },
                { title: "Performance coaching included", subtitle: "" },
                { title: "Content creation toolkit access", subtitle: "Download available after application approval" },
                { title: "Growth-focused community", subtitle: "" }
              ].map((feature, index) => (
                <Card key={feature.title} className="bg-slate-900 border-slate-700 p-6">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-emerald-400 font-bold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-slate-300 font-medium mb-2">{feature.title}</p>
                  {feature.subtitle && (
                    <p className="text-xs text-slate-500">{feature.subtitle}</p>
                  )}
                </Card>
              ))}
            </div>
            <div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-6">
                For Micro-Influencers
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                Paid Campaigns.<br />
                Brief Coaching.<br />
                <span className="text-emerald-400">Toolkit Access.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed font-medium">
                Join a curated network of high-performing creators. Get matched with premium brands, receive performance coaching, and access our proven content frameworks.
              </p>
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-lg font-medium">Application-only network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-slate-400 text-sm font-medium mb-6">Trusted by growth-stage brands and emerging creators</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[
                { handle: "@hanafit", followers: "12.4K", avatar: "HF" },
                { handle: "@techreview", followers: "8.7K", avatar: "TR" },
                { handle: "@styleinspo", followers: "15.2K", avatar: "SI" },
                { handle: "@fitlifeco", followers: "22.1K", avatar: "FL" }
              ].map((creator) => (
                <div key={creator.handle} className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                    {creator.avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{creator.handle}</div>
                    <div className="text-xs text-slate-400">{creator.followers}</div>
                  </div>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials and Case Studies */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Ready to Scale Your Growth?
          </h2>
          <p className="text-xl text-slate-300 mb-12 font-medium">
            Join the performance-driven brands and creators who choose results over hype.
          </p>

          {/* Multi-Step Lead Capture */}
          <MultiStepLeadCapture
            onComplete={handleLeadCaptureComplete}
            onViewOnboarding={handleViewOnboarding}
            onBackToHome={handleBackToHome}
          />
        </div>
      </section>

      {/* Testing Dashboard */}
      <TestingDashboard />
    </div>
  )
}
