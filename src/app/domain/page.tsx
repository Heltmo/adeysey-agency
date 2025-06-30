"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Logo from "@/components/Logo"
import TestimonialsSection from "@/components/TestimonialsSection"
import { ArrowRight, Target, Users, TrendingUp, CheckCircle2, Zap, BarChart3, Shield, Mail, Phone, Globe, Linkedin, Twitter, Instagram } from "lucide-react"

export default function DomainLandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header with Logo */}
      <header className="px-6 py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-6">
            <a href="#services" className="text-slate-300 hover:text-emerald-400 transition-colors">Services</a>
            <a href="#case-studies" className="text-slate-300 hover:text-emerald-400 transition-colors">Case Studies</a>
            <a href="#contact" className="text-slate-300 hover:text-emerald-400 transition-colors">Contact</a>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Performance-Driven Influencer Marketing
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            Where Creators<br />
            Drive <span className="text-emerald-400">Growth</span>
          </h1>

          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            We connect tech & eCommerce brands with vetted micro-influencers to create
            high-converting UGC campaigns that deliver measurable results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-lg px-8 py-4">
              Start Your Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-slate-300 border-slate-600 hover:bg-slate-800 text-lg px-8 py-4">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-400">150+</div>
              <div className="text-slate-300">Successful Campaigns</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-400">$12M+</div>
              <div className="text-slate-300">Revenue Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-400">500+</div>
              <div className="text-slate-300">Vetted Creators</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-400">4.2x</div>
              <div className="text-slate-300">Average ROAS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Our Services</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive influencer marketing solutions designed for performance and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <Target className="w-12 h-12 text-emerald-400 mb-4" />
                <CardTitle className="text-white">Brand Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Strategic influencer partnerships that align with your brand values and drive measurable results.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Creator vetting & matching</li>
                  <li>• Campaign strategy & planning</li>
                  <li>• Performance tracking & optimization</li>
                  <li>• Content rights management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Creator Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Comprehensive support system to help creators build sustainable income streams and grow their influence.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Rate negotiation coaching</li>
                  <li>• Content creation training</li>
                  <li>• Brand partnership matching</li>
                  <li>• Performance analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-emerald-400 mb-4" />
                <CardTitle className="text-white">Campaign Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Advanced analytics and reporting to measure campaign performance and optimize for maximum ROI.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Real-time performance tracking</li>
                  <li>• ROI measurement & reporting</li>
                  <li>• Audience insights & analysis</li>
                  <li>• Competitive benchmarking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Our Process</h2>
            <p className="text-xl text-slate-300">
              Built for speed, clarity, and measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit", icon: Target, desc: "Deep analysis of your brand positioning and content gaps" },
              { step: "02", title: "Match", icon: Users, desc: "AI-powered creator matching based on audience alignment" },
              { step: "03", title: "Launch", icon: Zap, desc: "Streamlined campaign execution with proven frameworks" },
              { step: "04", title: "Optimize", icon: TrendingUp, desc: "Real-time performance tracking and scaling decisions" }
            ].map((item) => (
              <Card key={item.step} className="bg-slate-900/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400 font-mono text-sm">{item.step}</span>
                  <CardTitle className="text-2xl text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Ready to Scale Your Growth?</h2>
          <p className="text-xl text-slate-300 mb-12">
            Join the performance-driven brands and creators who choose results over hype.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">For Brands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300">Launch high-converting UGC campaigns with vetted creators.</p>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
                  Start Brand Campaign
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">For Creators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300">Join our network and access premium brand partnerships.</p>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
                  Apply as Creator
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">hello@adeyseymedia.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a href="https://linkedin.com/company/adeyseymedia" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/adeyseymedia" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/adeyseymedia" className="text-slate-400 hover:text-pink-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-slate-500 text-sm">
&copy; 2024 ADEYSEY MEDIA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
