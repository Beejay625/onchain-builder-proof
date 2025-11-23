'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementPerformanceDashboardProps {
  achievementId: bigint
}

export default function AchievementPerformanceDashboard({ achievementId }: AchievementPerformanceDashboardProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementPerformanceDashboard')) {
    return null
  }

  const performanceScore = post
    ? Number(post.likes) * 2 + Number(post.comments) * 3
    : 0

  return (
    <AppCard title="📊 Achievement Performance Dashboard" subtitle="Comprehensive performance metrics" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Performance Score" value={performanceScore.toString()} accent="blue" />
          <StatBadge label="Rank" value="#1" accent="green" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Likes" value={post?.likes?.toString() || '0'} accent="red" />
          <StatBadge label="Comments" value={post?.comments?.toString() || '0'} accent="blue" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Performance Overview</p>
          <p className="text-xs">
            Performance score calculated from engagement metrics.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

