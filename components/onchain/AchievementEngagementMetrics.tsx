'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementEngagementMetricsProps {
  achievementId: bigint
}

export default function AchievementEngagementMetrics({ achievementId }: AchievementEngagementMetricsProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementEngagementMetrics')) {
    return null
  }

  const engagementRate = post && post.comments > 0n
    ? Number((post.likes * 100n) / post.comments) / 100
    : post?.likes ? Number(post.likes) : 0

  return (
    <AppCard title="📈 Achievement Engagement Metrics" subtitle="Comprehensive engagement analytics" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Likes" value={post?.likes?.toString() || '0'} accent="red" />
          <StatBadge label="Comments" value={post?.comments?.toString() || '0'} accent="blue" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Engagement Rate" value={`${engagementRate.toFixed(1)}%`} accent="green" />
          <StatBadge label="Interactions" value={post ? (Number(post.likes) + Number(post.comments)).toString() : '0'} accent="purple" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Engagement Insights</p>
          <p className="text-xs">
            All metrics are calculated from onchain data for transparency.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

