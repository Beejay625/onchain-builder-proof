'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementHistoryProps {
  achievementId: bigint
}

export default function OnchainAchievementHistory({ achievementId }: OnchainAchievementHistoryProps) {
  const { address } = useAccount()
  
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">📜 Achievement History</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">📜 Achievement History</h3>
        <p className="text-gray-600">No history found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Achievement History</h3>
      
      <div className="space-y-3">
        <div className="border-l-4 border-blue-500 pl-4">
          <p className="font-semibold">Created</p>
          <p className="text-sm text-gray-600">
            {new Date(Number(post.timestamp) * 1000).toLocaleString()}
          </p>
        </div>
        
        <div className="border-l-4 border-green-500 pl-4">
          <p className="font-semibold">Author</p>
          <p className="text-sm text-gray-600 font-mono">{post.author}</p>
        </div>
        
        <div className="border-l-4 border-purple-500 pl-4">
          <p className="font-semibold">Engagement</p>
          <p className="text-sm text-gray-600">
            {post.likes.toString()} likes • {post.comments.toString()} comments
          </p>
        </div>
        
        <div className="border-l-4 border-yellow-500 pl-4">
          <p className="font-semibold">Blockchain</p>
          <a
            href={`https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View on BaseScan ↗
          </a>
        </div>
      </div>
    </div>
  )
}
