'use client'

import { useState } from 'react'

interface AchievementSharingProps {
  achievementId: string
  achievementTitle: string
}

export default function AchievementSharing({ achievementId, achievementTitle }: AchievementSharingProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/achievement/${achievementId}`
  
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out my achievement: ${achievementTitle}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Share Achievement</h3>
      
      <div className="space-y-3">
        <button
          onClick={shareToTwitter}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <span>🐦</span> Share on Twitter
        </button>
        
        <button
          onClick={shareToLinkedIn}
          className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2"
        >
          <span>💼</span> Share on LinkedIn
        </button>
        
        <button
          onClick={copyLink}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
        >
          <span>📋</span> {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}
