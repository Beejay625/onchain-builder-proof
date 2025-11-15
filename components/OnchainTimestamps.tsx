'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainTimestampsProps {
  achievementId: bigint
}

export default function OnchainTimestamps({ achievementId }: OnchainTimestampsProps) {
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading timestamp...</div>
      </div>
    )
  }

  if (!post) return null

  const timestamp = Number(post.timestamp)
  const date = new Date(timestamp * 1000)
  const blockNumber = 'latest' // Would be fetched from transaction receipt

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏰ Onchain Timestamps</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Blockchain Timestamp</div>
          <div className="font-semibold">{date.toLocaleString()}</div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Unix Timestamp</div>
          <div className="font-mono text-sm">{timestamp}</div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Block Number</div>
          <div className="font-mono text-sm">{blockNumber}</div>
        </div>
      </div>
    </div>
  )
}

