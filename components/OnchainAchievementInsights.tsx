'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementInsightsProps {
  achievementId: bigint
}

export default function OnchainAchievementInsights({ achievementId }: OnchainAchievementInsightsProps) {
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
        <h3 className="text-xl font-bold mb-4">💡 Insights</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const insights = []
  
  if (Number(post.likes) > 10) {
    insights.push('🔥 High engagement - this achievement is popular!')
  }
  
  if (Number(post.comments) > 5) {
    insights.push('💬 Active discussion - builders are engaging')
  }
  
  if (Number(post.likes) === 0 && Number(post.comments) === 0) {
    insights.push('📢 New achievement - share it to get more visibility')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💡 Achievement Insights</h3>
      
      {insights.length > 0 ? (
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span className="text-gray-700">{insight}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No insights available yet</p>
      )}
    </div>
  )
}

