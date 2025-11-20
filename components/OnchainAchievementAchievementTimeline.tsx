'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementTimelineProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementTimeline({ achievementId }: OnchainAchievementAchievementTimelineProps) {
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
        <h3 className="text-xl font-bold mb-4">📅 Achievement Timeline</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const timestamp = Number(post.timestamp) * 1000
  const date = new Date(timestamp)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📅 Achievement Timeline</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <p className="font-semibold">Created</p>
            <p className="text-sm text-gray-600">{date.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <p className="font-semibold">Onchain Record</p>
            <p className="text-sm text-gray-600">Permanently stored on Base</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <p className="font-semibold">Engagement</p>
            <p className="text-sm text-gray-600">
              {post.likes.toString()} likes • {post.comments.toString()} comments
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
