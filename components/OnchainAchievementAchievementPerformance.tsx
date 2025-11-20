'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementPerformanceProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementPerformance({ achievementId }: OnchainAchievementAchievementPerformanceProps) {
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
        <h3 className="text-xl font-bold mb-4">⚡ Performance</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const performanceScore = (Number(post.likes) * 2) + (Number(post.comments) * 5)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚡ Achievement Performance</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{performanceScore}</p>
          <p className="text-sm opacity-90">Performance Score</p>
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
        
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm font-semibold text-purple-700">Performance Rating</p>
          <p className="text-xs text-gray-600">
            {performanceScore >= 50 ? 'Excellent' : performanceScore >= 20 ? 'Good' : 'Growing'}
          </p>
        </div>
      </div>
    </div>
  )
}

