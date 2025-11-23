'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementDetailViewProps {
  achievementId: bigint
}

export default function AchievementDetailView({ achievementId }: AchievementDetailViewProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementDetailView')) {
    return null
  }

  const timestamp = post?.timestamp ? Number(post.timestamp) * 1000 : null

  return (
    <AppCard title="📄 Achievement Detail View" subtitle="Detailed view of achievement information" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="ID" value={`#${achievementId.toString()}`} accent="blue" />
          <StatBadge label="Author" value={post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'} accent="green" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Likes" value={post?.likes?.toString() || '0'} accent="red" />
          <StatBadge label="Comments" value={post?.comments?.toString() || '0'} accent="blue" />
        </div>
        {post?.content && (
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-semibold mb-2">Content</p>
            <p className="text-xs">{post.content}</p>
          </div>
        )}
        {timestamp && (
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-semibold mb-2">Created</p>
            <p className="text-xs">{new Date(timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>
    </AppCard>
  )
}

