'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function ContributionTracking() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainContributionTracking')) {
    return null
  }

  return (
    <AppCard title="📊 Contribution Tracking" subtitle="Track all contributions across the platform" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Your Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Total Contributions" value="Loading..." accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Contribution Types</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Code Contributions</li>
            <li>Deployment Proofs</li>
            <li>Collaborations</li>
            <li>Skill Endorsements</li>
          </ul>
        </div>
        <p className="text-xs text-gray-500">
          All contributions are tracked onchain for verifiable proof.
        </p>
      </div>
    </AppCard>
  )
}


