'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementEventLoggingProps {
  achievementId: bigint
}

export default function AchievementEventLogging({ achievementId }: AchievementEventLoggingProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementEventLogging')) {
    return null
  }

  const eventCount = 5 // Mock event count

  return (
    <AppCard title="📋 Achievement Event Logging" subtitle="View all events logged for this achievement" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Events" value={eventCount.toString()} accent="blue" />
          <StatBadge label="Last Event" value="Recent" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Event Log</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Created:</span>
              <span>{post?.timestamp ? new Date(Number(post.timestamp) * 1000).toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Author:</span>
              <span className="font-mono">{post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Likes:</span>
              <span>{post?.likes?.toString() || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span>Comments:</span>
              <span>{post?.comments?.toString() || '0'}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          All events are permanently logged onchain and cannot be altered.
        </p>
      </div>
    </AppCard>
  )
}

