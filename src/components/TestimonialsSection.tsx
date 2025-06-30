"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    title: "Marketing Director",
    company: "TechFlow Solutions",
    image: "SC",
    rating: 5,
    text: "ADEYSEY MEDIA transformed our influencer strategy. We went from 2.1x ROAS to 4.8x ROAS in just 3 months. Their creator vetting process is unmatched.",
    results: "4.8x ROAS",
    campaign: "B2B Software Launch"
  },
  {
    name: "Marcus Williams",
    title: "Founder & CEO",
    company: "EcoGlow Beauty",
    image: "MW",
    rating: 5,
    text: "Working with ADEYSEY MEDIA was a game-changer. They connected us with micro-influencers who genuinely aligned with our brand values. The authenticity drove incredible engagement.",
    results: "312% Engagement Increase",
    campaign: "Sustainable Beauty Campaign"
  },
  {
    name: "Jessica Torres",
    title: "Content Creator",
    company: "@fitlifejess • 45K followers",
    image: "JT",
    rating: 5,
    text: "ADEYSEY MEDIA doesn't just find you brands - they help you grow as a creator. The rate negotiation training helped me triple my earnings in 6 months.",
    results: "3x Rate Increase",
    campaign: "Creator Development Program"
  }
]

const caseStudies = [
  {
    title: "FitTech Startup: 500% Revenue Growth",
    client: "FlexFit Technologies",
    industry: "Health & Fitness Tech",
    challenge: "New app launch with zero brand awareness",
    solution: "Micro-influencer campaign targeting fitness enthusiasts",
    results: {
      revenue: "500% increase",
      downloads: "150K+ new users",
      cost: "67% lower CAC",
      timeline: "90 days"
    },
    metrics: [
      { label: "Creator Partners", value: "24", icon: Users },
      { label: "Content Pieces", value: "96", icon: Target },
      { label: "Total Reach", value: "2.3M", icon: TrendingUp },
      { label: "Conversion Rate", value: "8.4%", icon: CheckCircle2 }
    ]
  },
  {
    title: "E-commerce Beauty Brand: 380% ROAS",
    client: "LuxGlow Cosmetics",
    industry: "Beauty & Cosmetics",
    challenge: "Struggling to compete with major beauty brands",
    solution: "Authentic UGC campaign with diverse micro-influencers",
    results: {
      revenue: "380% ROAS",
      engagement: "245% increase",
      followers: "89K new followers",
      timeline: "120 days"
    },
    metrics: [
      { label: "Creator Partners", value: "32", icon: Users },
      { label: "UGC Videos", value: "128", icon: Target },
      { label: "Total Views", value: "4.7M", icon: TrendingUp },
      { label: "Sales Conversion", value: "12.1%", icon: CheckCircle2 }
    ]
  }
]

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-6">
            Client Success Stories
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Real Results from Real Partnerships
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            See how ADEYSEY MEDIA has helped brands achieve measurable growth and creators build sustainable income streams.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <Card key={`${testimonial.name}-${testimonial.company}`} className="bg-slate-900/50 border-slate-700 relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-400">{testimonial.title}</p>
                      <p className="text-xs text-emerald-400">{testimonial.company}</p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-emerald-400 opacity-50" />
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={`${testimonial.name}-star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-slate-300 leading-relaxed mb-4">"{testimonial.text}"</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <Badge variant="outline" className="text-emerald-400 border-emerald-500">
                    {testimonial.campaign}
                  </Badge>
                  <span className="text-sm font-semibold text-emerald-400">
                    {testimonial.results}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white mb-4">Featured Case Studies</h3>
            <p className="text-slate-300 text-lg">Deep dives into our most successful campaigns</p>
          </div>

          {caseStudies.map((study) => (
            <Card key={study.client} className="bg-slate-900/30 border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{study.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">{study.industry}</Badge>
                      <span className="text-slate-400">Client: {study.client}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-2">Challenge</h4>
                    <p className="text-slate-300 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Solution</h4>
                    <p className="text-slate-300 text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-2">Timeline</h4>
                    <p className="text-slate-300 text-sm">{study.results.timeline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <metric.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
                  {Object.entries(study.results).filter(([key]) => key !== 'timeline').map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xl font-bold text-emerald-400">{value}</div>
                      <div className="text-xs text-slate-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400">150+</div>
              <div className="text-slate-300">Successful Campaigns</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400">$12M+</div>
              <div className="text-slate-300">Revenue Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400">500+</div>
              <div className="text-slate-300">Vetted Creators</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-400">98%</div>
              <div className="text-slate-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
