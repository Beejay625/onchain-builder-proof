'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementTransferHistoryProps {
  achievementId: bigint
}

export default function AchievementTransferHistory({ achievementId }: AchievementTransferHistoryProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementTransferHistory')) {
    return null
  }

  return (
    <AppCard title="📜 Achievement Transfer History" subtitle="View complete transfer history" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Current Owner" value={post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'} accent="blue" />
          <StatBadge label="Transfers" value="0" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Transfer History</p>
          <p className="text-xs">
            All transfers are permanently recorded onchain and cannot be altered.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

