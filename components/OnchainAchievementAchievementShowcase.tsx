'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementShowcaseProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementShowcase({ achievementId }: OnchainAchievementAchievementShowcaseProps) {
  const { address } = useAccount()
  
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading || !post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">⭐ Achievement Showcase</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⭐ Achievement Showcase</h3>
      
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white mb-4">
        <p className="text-2xl font-bold mb-2">Achievement #{post.id.toString()}</p>
        <p className="text-sm opacity-90 line-clamp-2">{post.content}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xl font-bold text-blue-600">{post.likes.toString()}</p>
          <p className="text-xs text-gray-600">Likes</p>
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-xl font-bold text-green-600">{post.comments.toString()}</p>
          <p className="text-xs text-gray-600">Comments</p>
        </div>
      </div>
    </div>
  )
}
