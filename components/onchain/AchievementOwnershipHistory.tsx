'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementOwnershipHistoryProps {
  achievementId: bigint
}

export default function AchievementOwnershipHistory({ achievementId }: AchievementOwnershipHistoryProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementOwnershipHistory')) {
    return null
  }

  const timestamp = post?.timestamp ? Number(post.timestamp) * 1000 : null

  return (
    <AppCard title="👤 Achievement Ownership History" subtitle="Track ownership changes over time" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Original Owner" value={post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'} accent="blue" />
          <StatBadge label="Created" value={timestamp ? new Date(timestamp).toLocaleDateString() : 'N/A'} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Ownership Timeline</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Original creation:</span>
              <span>{timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Owner:</span>
              <span className="font-mono">{post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  )
}

