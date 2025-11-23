'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function ImmutableHistory() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainImmutableHistory')) {
    return null
  }

  return (
    <AppCard title="📜 Immutable History" subtitle="View complete immutable achievement history" accent="slate">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Entries" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Onchain Records" value={userPostIds?.length?.toString() || '0'} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">History Details</p>
          <p className="text-xs">
            All achievement history is permanently recorded on Base blockchain.
            Every action, update, and transaction is immutable and verifiable.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

