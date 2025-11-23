'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementTimestampsProps {
  achievementId: bigint
}

export default function AchievementTimestamps({ achievementId }: AchievementTimestampsProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainTimestamps')) {
    return null
  }

  const timestamp = post?.timestamp ? Number(post.timestamp) * 1000 : null
  const date = timestamp ? new Date(timestamp) : null

  return (
    <AppCard title="⏰ Achievement Timestamps" subtitle="View permanent blockchain timestamps" accent="slate">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <StatBadge
            label="Blockchain Timestamp"
            value={date ? date.toLocaleString() : 'N/A'}
            accent="blue"
          />
          <StatBadge
            label="Unix Timestamp"
            value={timestamp ? Math.floor(timestamp / 1000).toString() : 'N/A'}
            accent="green"
          />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Timestamp Details</p>
          <p className="text-xs">
            This timestamp is permanently recorded on Base blockchain and cannot be altered.
            It provides immutable proof of when this achievement was created.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

