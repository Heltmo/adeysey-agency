import React from 'react'
import { Globe, Mail, Phone, Linkedin, Twitter, Instagram } from 'lucide-react'

interface EmailSignatureProps {
  senderName?: string
  title?: string
}

export default function EmailSignature({
  senderName = "ADEYSEY MEDIA Team",
  title = "Influencer Marketing Specialists"
}: EmailSignatureProps) {
  return (
    <div className="mt-6 pt-4 border-t border-slate-700">
      <div className="bg-slate-800/30 rounded-lg p-4">
        {/* Signature Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <p className="font-bold text-white text-lg">ADEYSEY MEDIA</p>
            <p className="text-emerald-400 text-sm font-medium">Performance-Driven Influencer Marketing</p>
          </div>
        </div>

        {/* Contact Person */}
        <div className="mb-3">
          <p className="font-semibold text-white">{senderName}</p>
          <p className="text-slate-300 text-sm">{title}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-emerald-400" />
            <a href="mailto:hello@adeyseymedia.com" className="text-slate-300 hover:text-emerald-400">
              hello@adeyseymedia.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 text-emerald-400" />
            <a href="https://adeyseymedia.com" className="text-slate-300 hover:text-emerald-400">
              adeyseymedia.com
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-4">
          <a href="https://linkedin.com/company/adeyseymedia" className="text-slate-400 hover:text-blue-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/adeyseymedia" className="text-slate-400 hover:text-blue-400 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/adeyseymedia" className="text-slate-400 hover:text-pink-400 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Tagline */}
        <div className="text-xs text-slate-500 border-t border-slate-700 pt-3">
          <p className="font-medium text-emerald-400 mb-1">Where Creators Drive Growth. Where Brands Scale Faster.</p>
          <p>Connecting tech & eCommerce brands with vetted micro-influencers for high-converting UGC campaigns.</p>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-slate-600 mt-3 pt-2 border-t border-slate-800">
          <p>This email and any attachments are confidential and may be legally privileged. If you received this email in error, please notify the sender and delete it immediately.</p>
        </div>
      </div>
    </div>
  )
}
