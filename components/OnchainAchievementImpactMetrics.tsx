'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementImpactMetrics() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const impactScore = (userPosts?.length || 0) * 12
  const reachScore = (userPosts?.length || 0) * 8

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Impact Metrics</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">{impactScore}</p>
            <p className="text-sm text-gray-600">Impact Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-teal-600">{reachScore}</p>
            <p className="text-sm text-gray-600">Reach Score</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Measure the impact and reach of your achievements.
        </p>
      </div>
    </div>
  )
}

