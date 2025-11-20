'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementMetricsProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementMetrics({ achievementId }: OnchainAchievementAchievementMetricsProps) {
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
        <h3 className="text-xl font-bold mb-4">📈 Achievement Metrics</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const engagementScore = Number(post.likes) + (Number(post.comments) * 2)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📈 Achievement Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{post.likes.toString()}</p>
          <p className="text-sm text-gray-600">Likes</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{post.comments.toString()}</p>
          <p className="text-sm text-gray-600">Comments</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{engagementScore}</p>
          <p className="text-sm text-gray-600">Engagement Score</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">
            {Math.floor((Date.now() - Number(post.timestamp) * 1000) / (1000 * 60 * 60 * 24))}
          </p>
          <p className="text-sm text-gray-600">Days Active</p>
        </div>
      </div>
    </div>
  )
}

