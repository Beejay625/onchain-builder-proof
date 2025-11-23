'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface ChainVisualizationProps {
  achievementId: bigint
}

export default function ChainVisualization({ achievementId }: ChainVisualizationProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainChainVisualization')) {
    return null
  }

  return (
    <AppCard title="🔗 Chain Visualization" subtitle="Visualize achievement chain connections" accent="cyan">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Achievement ID" value={achievementId.toString()} accent="blue" />
          <StatBadge label="Chain" value="Base" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Chain Connections</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Author:</span>
              <span className="font-mono">{post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span>{post?.timestamp ? new Date(Number(post.timestamp) * 1000).toLocaleString() : 'N/A'}</span>
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
      </div>
    </AppCard>
  )
}

