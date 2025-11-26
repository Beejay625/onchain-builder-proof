'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementImpactProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementImpact({ achievementId }: OnchainAchievementAchievementImpactProps) {
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
        <h3 className="text-xl font-bold mb-4">📊 Achievement Impact</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const impactScore = (Number(post.likes) * 3) + (Number(post.comments) * 7)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Achievement Impact</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{impactScore}</p>
          <p className="text-sm opacity-90">Impact Score</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{post.likes.toString()}</p>
            <p className="text-xs text-gray-600">Likes Impact</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">{post.comments.toString()}</p>
            <p className="text-xs text-gray-600">Comments Impact</p>
          </div>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700">Impact Level</p>
          <p className="text-xs text-gray-600">
            {impactScore >= 100 ? 'High Impact' : impactScore >= 50 ? 'Medium Impact' : 'Growing Impact'}
          </p>
        </div>
      </div>
    </div>
  )
}





