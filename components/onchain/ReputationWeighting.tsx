'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function ReputationWeighting() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainReputationWeighting')) {
    return null
  }

  const reputationScore = userPostIds?.length ? Number(userPostIds.length) * 10 : 0
  const votingWeight = Math.min(reputationScore / 100, 1)

  return (
    <AppCard title="⚖️ Reputation Weighting" subtitle="Weighted voting based on reputation" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Reputation Score" value={reputationScore.toString()} accent="blue" />
          <StatBadge label="Voting Weight" value={`${(votingWeight * 100).toFixed(1)}%`} accent="purple" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Weight Calculation</p>
          <p className="text-xs">
            Your voting weight is calculated based on your total achievements and reputation score.
            Higher reputation = higher voting weight in governance decisions.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

