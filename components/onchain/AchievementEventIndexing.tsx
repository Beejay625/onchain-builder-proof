'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementEventIndexingProps {
  achievementId: bigint
}

export default function AchievementEventIndexing({ achievementId }: AchievementEventIndexingProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementEventIndexing')) {
    return null
  }

  return (
    <AppCard title="🔍 Achievement Event Indexing" subtitle="Track event indexing operations and configurations" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Indexed Events" value="12" accent="blue" />
          <StatBadge label="Last Indexed" value="Recent" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Indexing Status</p>
          <p className="text-xs">
            Events are indexed for efficient off-chain querying and analytics.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

