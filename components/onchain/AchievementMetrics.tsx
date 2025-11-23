'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementMetricsProps {
  achievementId: bigint
}

export default function AchievementMetrics({ achievementId }: AchievementMetricsProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainAchievementMetrics')) {
    return null
  }

  const engagementRate = post && post.comments > 0n
    ? Number((post.likes * 100n) / post.comments) / 100
    : 0

  return (
    <AppCard title="📈 Achievement Metrics" subtitle="Track performance metrics" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Likes" value={post?.likes?.toString() || '0'} accent="red" />
          <StatBadge label="Comments" value={post?.comments?.toString() || '0'} accent="blue" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Engagement Rate" value={`${engagementRate.toFixed(1)}%`} accent="green" />
          <StatBadge label="Age" value={post?.timestamp ? `${Math.floor((Date.now() - Number(post.timestamp) * 1000) / (1000 * 60 * 60 * 24))} days` : 'N/A'} accent="purple" />
        </div>
      </div>
    </AppCard>
  )
}

