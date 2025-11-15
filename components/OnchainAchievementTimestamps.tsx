'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTimestampsProps {
  achievementId: bigint
}

export default function OnchainAchievementTimestamps({ achievementId }: OnchainAchievementTimestampsProps) {
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading timestamps...</div>
      </div>
    )
  }

  if (!post) return null

  const timestamp = Number(post.timestamp)
  const date = new Date(timestamp * 1000)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏰ Onchain Achievement Timestamps</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Blockchain Timestamp</div>
          <div className="font-bold text-lg">{date.toLocaleString()}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Unix Timestamp</div>
          <div className="font-mono text-sm">{timestamp}</div>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          ⚠️ This timestamp is permanently recorded on the blockchain
        </div>
      </div>
    </div>
  )
}
