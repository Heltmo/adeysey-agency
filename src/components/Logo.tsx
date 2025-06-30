import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ className = "", size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle */}
          <circle cx="24" cy="24" r="24" fill="url(#gradient)" />

          {/* Letter A */}
          <path
            d="M24 8L32 32H28L26 26H22L20 32H16L24 8Z"
            fill="white"
            stroke="none"
          />
          <path
            d="M22.5 22H25.5L24 18L22.5 22Z"
            fill="#0F172A"
            stroke="none"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-white tracking-tight ${textSizeClasses[size]}`}>
            ADEYSEY
          </span>
          <span className={`font-bold text-emerald-400 tracking-tight ${textSizeClasses[size]} -mt-1`}>
            MEDIA
          </span>
        </div>
      )}
    </div>
  )
}
