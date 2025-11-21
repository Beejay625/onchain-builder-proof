'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAccessLogProps {
  achievementId: bigint
}

export default function OnchainAchievementAccessLog({ achievementId }: OnchainAchievementAccessLogProps) {
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
        <h3 className="text-xl font-bold mb-4">📂 Access Log</h3>
        <p className="text-gray-600">Fetching onchain log...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📂 Access Log</h3>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="font-semibold text-gray-700">Last Accessed</p>
          <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-700">Record Owner</p>
          <p className="text-xs font-mono text-gray-600 break-all">{post.author}</p>
        </div>
      </div>
    </div>
  )
}
