'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface OnchainAchievementSharingLinkProps {
  achievementId: bigint
}

export default function OnchainAchievementSharingLink({ achievementId }: OnchainAchievementSharingLinkProps) {
  const { address } = useAccount()
  const [copied, setCopied] = useState(false)
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/achievement/${achievementId}` 
    : ''

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Sharing Link</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="flex gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my achievement on Onchain Builder Proof! ${shareUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 text-center text-sm"
        >
          Share on Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-center text-sm"
        >
          Share on LinkedIn
        </a>
      </div>
    </div>
  )
}

