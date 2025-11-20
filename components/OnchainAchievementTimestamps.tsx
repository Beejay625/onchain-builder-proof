'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTimestampsProps {
  achievementId: bigint
}

export default function OnchainAchievementTimestamps({ achievementId }: OnchainAchievementTimestampsProps) {
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
        <h3 className="text-xl font-bold mb-4">⏰ Timestamps</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const timestamp = Number(post.timestamp) * 1000
  const date = new Date(timestamp)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏰ Blockchain Timestamps</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Unix Timestamp</p>
          <p className="text-lg font-mono text-gray-900">{post.timestamp.toString()}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">Human Readable</p>
          <p className="text-lg text-gray-900">{date.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">ISO Format</p>
          <p className="text-sm font-mono text-gray-600">{date.toISOString()}</p>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            This timestamp is permanently recorded on Base blockchain
          </p>
        </div>
      </div>
    </div>
  )
}
