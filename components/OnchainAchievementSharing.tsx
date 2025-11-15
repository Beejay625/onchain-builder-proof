'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSharingProps {
  achievementId: bigint
}

export default function OnchainAchievementSharing({ achievementId }: OnchainAchievementSharingProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (!post) return null

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/achievement/${achievementId}` : ''
  const shareText = `Check out my achievement: ${post.content.substring(0, 100)}...`

  const shareToTwitter = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    }
  }

  const shareToLinkedIn = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
    }
  }

  const copyLink = () => {
    if (typeof window !== 'undefined' && shareUrl) {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Onchain Achievement Sharing</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Shareable Link</div>
          <div className="font-mono text-xs break-all text-blue-600">{shareUrl || 'Loading...'}</div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={shareToTwitter}
            className="flex-1 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
          >
            Twitter
          </button>
          <button
            onClick={shareToLinkedIn}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            LinkedIn
          </button>
          <button
            onClick={copyLink}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  )
}
