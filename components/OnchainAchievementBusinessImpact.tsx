'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBusinessImpactProps {
  achievementId: bigint
}

export default function OnchainAchievementBusinessImpact({ achievementId }: OnchainAchievementBusinessImpactProps) {
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
        <h3 className="text-xl font-bold mb-4">🏢 Business Impact</h3>
        <p className="text-gray-600">Calculating impact...</p>
      </div>
    )
  }

  const impact = Number(post.likes) * 100 + Number(post.comments) * 250

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏢 Business Impact</h3>
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg text-white">
        <p className="text-3xl font-bold">${impact.toLocaleString()}</p>
        <p className="text-sm opacity-80">Estimated value</p>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Calculated from community engagement metrics.
      </p>
    </div>
  )
}
