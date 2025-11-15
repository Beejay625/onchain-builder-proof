'use client'

interface VerificationBadgeProps {
  verified: boolean
  type?: 'default' | 'premium' | 'elite'
}

export default function VerificationBadge({ verified, type = 'default' }: VerificationBadgeProps) {
  if (!verified) return null

  const getBadgeStyle = () => {
    switch (type) {
      case 'premium':
        return { icon: '⭐', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-300' }
      case 'elite':
        return { icon: '💎', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-300' }
      default:
        return { icon: '✓', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-300' }
    }
  }

  const style = getBadgeStyle()

  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${style.bg} ${style.border} border ${style.color} font-bold text-sm`}
      title="Verified Builder"
    >
      {style.icon}
    </span>
  )
}
