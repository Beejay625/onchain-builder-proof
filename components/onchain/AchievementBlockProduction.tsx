'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementBlockProductionProps {
  achievementId: bigint
}

export default function AchievementBlockProduction({ achievementId }: AchievementBlockProductionProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementBlockProduction')) {
    return null
  }

  return (
    <AppCard title="⛏️ Achievement Block Production" subtitle="Track block production operations in blockchain networks" accent="orange">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Blocks Produced" value="1,234" accent="blue" />
          <StatBadge label="Success Rate" value="99.8%" accent="green" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Avg Block Time" value="2.0s" accent="purple" />
          <StatBadge label="Last Block" value="Recent" accent="orange" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Block Production Stats</p>
          <p className="text-xs">
            Track validator block production performance and metrics.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

