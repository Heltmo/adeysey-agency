"use client"

import { useState, useEffect } from "react"
import type { AnalyticsEvent } from "@/types/analytics"

interface HeadlineVariant {
  id: string
  primary: string
  secondary: string
  weight: number // for weighted distribution
}

const headlineVariants: HeadlineVariant[] = [
  {
    id: "original",
    primary: "Where Creators Drive Growth.",
    secondary: "Where Brands Scale Faster.",
    weight: 25
  },
  {
    id: "performance-focused",
    primary: "Performance-Driven Results.",
    secondary: "Creator-Powered Growth.",
    weight: 25
  },
  {
    id: "roi-focused",
    primary: "Measurable ROI. Proven Creators.",
    secondary: "Campaigns That Convert.",
    weight: 25
  },
  {
    id: "speed-focused",
    primary: "Launch in 48 Hours.",
    secondary: "Scale with Vetted Creators.",
    weight: 25
  }
]

interface HeadlineABTestProps {
  onVariantSelected?: (variantId: string) => void
}

export default function HeadlineABTest({ onVariantSelected }: HeadlineABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<HeadlineVariant | null>(null)

  useEffect(() => {
    // Check if user already has a variant assigned (for consistency)
    const storedVariant = localStorage.getItem('headline_variant')

    if (storedVariant) {
      const variant = headlineVariants.find(v => v.id === storedVariant)
      if (variant) {
        setSelectedVariant(variant)
        onVariantSelected?.(variant.id)
        return
      }
    }

    // Weighted random selection for new users
    const totalWeight = headlineVariants.reduce((sum, variant) => sum + variant.weight, 0)
    const random = Math.random() * totalWeight

    let currentWeight = 0
    for (const variant of headlineVariants) {
      currentWeight += variant.weight
      if (random <= currentWeight) {
        setSelectedVariant(variant)
        localStorage.setItem('headline_variant', variant.id)
        onVariantSelected?.(variant.id)

        // Track variant assignment
        if (typeof window !== 'undefined') {
          // Analytics event
          const analyticsEvent: AnalyticsEvent = {
            event: 'ab_test_assignment',
            test_name: 'headline_variants',
            variant_id: variant.id,
            timestamp: new Date().toISOString()
          }
          window.dataLayer?.push(analyticsEvent)
        }
        break
      }
    }
  }, [onVariantSelected])

  if (!selectedVariant) {
    // Loading state - show original while selecting
    return (
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        Where Creators Drive Growth.<br />
        <span className="text-emerald-400">Where Brands Scale Faster.</span>
      </h1>
    )
  }

  return (
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
      {selectedVariant.primary}<br />
      <span className="text-emerald-400">{selectedVariant.secondary}</span>
    </h1>
  )
}

// Helper function to track conversion events
export function trackHeadlineConversion(event: 'email_submit' | 'phone_submit' | 'segment_select' | 'onboarding_view') {
  const variantId = localStorage.getItem('headline_variant')

  if (typeof window !== 'undefined' && variantId) {
    const analyticsEvent: AnalyticsEvent = {
      event: 'ab_test_conversion',
      test_name: 'headline_variants',
      variant_id: variantId,
      conversion_event: event,
      timestamp: new Date().toISOString()
    }
    window.dataLayer?.push(analyticsEvent)
  }
}
