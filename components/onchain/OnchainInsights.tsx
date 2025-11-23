'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function OnchainInsights() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainInsights')) {
    return null
  }

  const achievementCount = userPostIds?.length || 0
  const weeklyAverage = achievementCount > 0 ? (achievementCount / 52).toFixed(1) : '0'

  return (
    <AppCard title="💡 Onchain Insights" subtitle="Personalized achievement insights" accent="yellow">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Achievements" value={achievementCount.toString()} accent="blue" />
          <StatBadge label="Weekly Average" value={weeklyAverage} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Insights</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>You're building consistently onchain</li>
            <li>Your achievements are permanently recorded</li>
            <li>Keep up the great work!</li>
          </ul>
        </div>
      </div>
    </AppCard>
  )
}

