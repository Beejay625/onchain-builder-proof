'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function BuilderRankings() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  if (!isFeatureEnabled('onchainBuilderRankings')) {
    return null
  }

  return (
    <AppCard title="🏆 Builder Rankings" subtitle="View rankings of top builders by achievements" accent="yellow">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Achievements" value={totalPosts?.toString() || '0'} accent="blue" />
          <StatBadge label="Active Builders" value="Loading..." accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Top Builders (by achievements)</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>#1 Builder</span>
              <span className="font-mono text-xs">0x...</span>
            </div>
            <div className="flex justify-between items-center">
              <span>#2 Builder</span>
              <span className="font-mono text-xs">0x...</span>
            </div>
            <div className="flex justify-between items-center">
              <span>#3 Builder</span>
              <span className="font-mono text-xs">0x...</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Rankings are calculated onchain based on total achievements and engagement.
        </p>
      </div>
    </AppCard>
  )
}


