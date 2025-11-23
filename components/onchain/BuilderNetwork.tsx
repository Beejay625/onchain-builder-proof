'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function BuilderNetwork() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainBuilderNetwork')) {
    return null
  }

  return (
    <AppCard title="🌐 Builder Network" subtitle="Build network through achievements" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Your Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Network Size" value="Loading..." accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Network Benefits</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Connect with other builders</li>
            <li>Discover collaboration opportunities</li>
            <li>Build reputation through achievements</li>
          </ul>
        </div>
      </div>
    </AppCard>
  )
}

