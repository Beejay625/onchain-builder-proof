'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementDrafts() {
  const { address } = useAccount()
  const [draftContent, setDraftContent] = useState('')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('achievementDrafts')) {
    return null
  }

  const saveDraft = () => {
    if (typeof window !== 'undefined' && draftContent.trim()) {
      localStorage.setItem(`draft-${Date.now()}`, draftContent)
      setDraftContent('')
    }
  }

  const draftCount = typeof window !== 'undefined' 
    ? Object.keys(localStorage).filter(key => key.startsWith('draft-')).length 
    : 0

  return (
    <AppCard title="📝 Achievement Drafts" subtitle="Save and manage achievement drafts" accent="amber">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Saved Drafts" value={draftCount.toString()} accent="blue" />
          <StatBadge label="Published" value={userPostIds?.length?.toString() || '0'} accent="green" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Draft Content</label>
          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            placeholder="Write your achievement draft..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={saveDraft}
          disabled={!draftContent.trim()}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          Save Draft
        </button>
        <p className="text-xs text-gray-500">
          Drafts are saved locally and can be published later.
        </p>
      </div>
    </AppCard>
  )
}

