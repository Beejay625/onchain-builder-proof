'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAuditTrailProps {
  achievementId: bigint
}

export default function OnchainAchievementAuditTrail({ achievementId }: OnchainAchievementAuditTrailProps) {
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
        <h3 className="text-xl font-bold mb-4">📝 Audit Trail</h3>
        <p className="text-gray-600">Loading onchain entries...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📝 Audit Trail</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-700">Creation Event</p>
          <p className="text-xs text-gray-600">
            {new Date(Number(post.timestamp) * 1000).toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-semibold text-green-700">Author</p>
          <p className="text-xs font-mono text-gray-600 break-all">{post.author}</p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="font-semibold text-purple-700">Contract</p>
          <p className="text-xs font-mono text-gray-600 break-all">{BUILDER_PROOF_CONTRACT}</p>
        </div>
      </div>
    </div>
  )
}
