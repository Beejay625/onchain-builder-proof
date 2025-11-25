'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface ContractInteractionTrackingProps {
  achievementId: bigint
}

export default function ContractInteractionTracking({ achievementId }: ContractInteractionTrackingProps) {
  const { isConnected } = useAccount()
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('contractInteractionTracking') || !isConnected) {
    return null
  }

  const interactions = post ? Number(post.comments) + Number(post.likes) : 0

  return (
    <AppCard title="📡 Contract Interaction Tracking" subtitle="Monitor BuilderProof contract interactions per achievement" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Interactions" value={interactions.toString()} accent="indigo" />
          <StatBadge label="Latest Author" value={post ? `${post.author.slice(0, 6)}...` : 'n/a'} accent="blue" />
        </div>
        <p className="text-xs text-gray-500">
          Derived from onchain comments + likes for achievement #{achievementId.toString()}.
        </p>
      </div>
    </AppCard>
  )
}

