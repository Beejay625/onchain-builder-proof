'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function OnchainFeed() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  if (!isFeatureEnabled('onchainFeed')) {
    return null
  }

  return (
    <AppCard title="📰 Onchain Feed" subtitle="Real-time activity feed from blockchain" accent="cyan">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Achievements" value={totalPosts?.toString() || '0'} accent="blue" />
          <StatBadge label="Recent Activity" value="Live" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Feed Activity</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>New achievements minted</span>
              <span className="text-green-600">+{totalPosts?.toString() || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span>Community engagement</span>
              <span className="text-blue-600">Active</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          All feed data is sourced directly from Base blockchain for real-time accuracy.
        </p>
      </div>
    </AppCard>
  )
}

