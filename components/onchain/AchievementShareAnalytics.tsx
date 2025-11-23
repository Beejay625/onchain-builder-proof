'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementShareAnalyticsProps {
  achievementId: bigint
}

export default function AchievementShareAnalytics({ achievementId }: AchievementShareAnalyticsProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementShareAnalytics')) {
    return null
  }

  return (
    <AppCard title="📊 Achievement Share Analytics" subtitle="Track sharing metrics and performance" accent="green">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Shares" value="0" accent="blue" />
          <StatBadge label="Platforms" value="0" accent="purple" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Twitter Shares" value="0" accent="cyan" />
          <StatBadge label="LinkedIn Shares" value="0" accent="blue" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Share Performance</p>
          <p className="text-xs">
            Track how your achievement is being shared across different platforms.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

