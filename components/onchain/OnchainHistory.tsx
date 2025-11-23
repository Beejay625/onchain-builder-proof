'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface OnchainHistoryProps {
  achievementId: bigint
}

export default function OnchainHistory({ achievementId }: OnchainHistoryProps) {
  const { address } = useAccount()
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainHistory')) {
    return null
  }

  const timestamp = post?.timestamp ? Number(post.timestamp) * 1000 : null
  const age = timestamp ? Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24)) : 0

  return (
    <AppCard title="📜 Onchain History" subtitle="View complete achievement history" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Created" value={timestamp ? new Date(timestamp).toLocaleDateString() : 'N/A'} accent="blue" />
          <StatBadge label="Age" value={`${age} days`} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">History Timeline</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Created:</span>
              <span>{timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Author:</span>
              <span className="font-mono">{post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Interactions:</span>
              <span>{post ? `${post.likes.toString()} likes, ${post.comments.toString()} comments` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  )
}

