'use client'

import { useState } from 'react'

interface ShareButtonProps {
  achievementId: string
  content: string
}

export default function ShareButton({ achievementId, content }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/achievement/${achievementId}`
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out my builder achievement: ${content.slice(0, 100)}...`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
      >
        🔗 Share
      </button>

      {showShareMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10 p-2">
          <button
            onClick={handleTwitterShare}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            🐦 Share on Twitter
          </button>
          <button
            onClick={handleLinkedInShare}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            💼 Share on LinkedIn
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            📋 {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      )}
    </div>
  )
}
