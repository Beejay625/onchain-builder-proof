'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainImmutableHistoryProps {
  achievementId: bigint
}

export default function OnchainImmutableHistory({ achievementId }: OnchainImmutableHistoryProps) {
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
      <h3 className="text-xl font-bold mb-4">📜 Onchain Immutable History</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
          <div className="text-sm text-gray-600 mb-1">Created On</div>
          <div className="font-bold text-lg">{date.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Block #{timestamp}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Author</div>
          <div className="font-mono text-sm break-all">{post.author}</div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm text-gray-600 mb-1">Engagement</div>
          <div className="flex gap-4 mt-2">
            <div>
              <div className="text-xs text-gray-500">Likes</div>
              <div className="font-bold">{Number(post.likes)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Comments</div>
              <div className="font-bold">{Number(post.comments)}</div>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
          ⚠️ This record is permanently stored on the blockchain and cannot be modified
        </div>
      </div>
    </div>
  )
}

