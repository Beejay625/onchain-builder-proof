'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementHistoryProps {
  achievementId: bigint
}

export default function OnchainAchievementHistory({ achievementId }: OnchainAchievementHistoryProps) {
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading history...</div>
      </div>
    )
  }

  if (!post) return null

  const timestamp = Number(post.timestamp)
  const date = new Date(timestamp * 1000)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Onchain Achievement History</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="text-sm text-gray-600">Created</div>
          <div className="font-semibold">{date.toLocaleString()}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Author</div>
          <div className="font-mono text-sm break-all">{post.author}</div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Engagement</div>
          <div className="flex gap-4">
            <div>
              <div className="text-xs text-gray-500">Likes</div>
              <div className="font-bold text-lg">{Number(post.likes)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Comments</div>
              <div className="font-bold text-lg">{Number(post.comments)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
