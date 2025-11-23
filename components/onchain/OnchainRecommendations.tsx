'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function OnchainRecommendations() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainRecommendations')) {
    return null
  }

  const achievementCount = userPostIds?.length || 0
  const nextMilestone = achievementCount < 5 ? 5 : achievementCount < 10 ? 10 : achievementCount < 25 ? 25 : 50

  return (
    <AppCard title="💡 Onchain Recommendations" subtitle="Get achievement recommendations" accent="pink">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Your Achievements" value={achievementCount.toString()} accent="blue" />
          <StatBadge label="Next Milestone" value={nextMilestone.toString()} accent="purple" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Recommendations</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Create {nextMilestone - achievementCount} more achievement{nextMilestone - achievementCount !== 1 ? 's' : ''} to reach the next milestone</li>
            <li>Share your achievements to build your network</li>
            <li>Explore collaboration opportunities</li>
          </ul>
        </div>
      </div>
    </AppCard>
  )
}

