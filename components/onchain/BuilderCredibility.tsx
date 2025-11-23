'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function BuilderCredibility() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainBuilderCredibility')) {
    return null
  }

  const achievementCount = userPostIds?.length || 0
  const credibilityScore = achievementCount * 10 + (achievementCount > 10 ? 50 : 0)

  return (
    <AppCard title="⭐ Builder Credibility" subtitle="Calculate credibility based on achievements" accent="yellow">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Credibility Score" value={credibilityScore.toString()} accent="yellow" />
          <StatBadge label="Achievements" value={achievementCount.toString()} accent="blue" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Credibility Factors</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Total achievements count</li>
            <li>Consistency and frequency</li>
            <li>Community engagement</li>
            <li>Verification status</li>
          </ul>
        </div>
      </div>
    </AppCard>
  )
}

