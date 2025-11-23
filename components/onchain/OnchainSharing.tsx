'use client'

import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface OnchainSharingProps {
  achievementId: bigint
}

export default function OnchainSharing({ achievementId }: OnchainSharingProps) {
  const [sharePlatform, setSharePlatform] = useState<'twitter' | 'linkedin' | 'copy'>('copy')
  const achievementUrl = typeof window !== 'undefined' ? `${window.location.origin}/achievement/${achievementId.toString()}` : ''

  if (!isFeatureEnabled('onchainSharing')) {
    return null
  }

  const handleShare = () => {
    if (sharePlatform === 'copy') {
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(achievementUrl)
      }
    } else if (sharePlatform === 'twitter') {
      const text = `Check out my achievement on Base! ${achievementUrl}`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    } else if (sharePlatform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(achievementUrl)}`, '_blank')
    }
  }

  return (
    <AppCard title="🔗 Onchain Sharing" subtitle="Share achievements across platforms" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Share Platform</label>
          <select
            value={sharePlatform}
            onChange={(e) => setSharePlatform(e.target.value as 'twitter' | 'linkedin' | 'copy')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="copy">Copy Link</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>
        <button
          onClick={handleShare}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {sharePlatform === 'copy' ? 'Copy Link' : `Share on ${sharePlatform.charAt(0).toUpperCase() + sharePlatform.slice(1)}`}
        </button>
        <p className="text-xs text-gray-500">
          Share your onchain achievements with the world!
        </p>
      </div>
    </AppCard>
  )
}

