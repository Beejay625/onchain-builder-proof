'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementResilienceScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const resilienceScore = Math.min(100, (userPosts?.length || 0) * 4.8)
  const resilienceLevel = resilienceScore >= 85 ? 'Highly Resilient' :
                         resilienceScore >= 65 ? 'Resilient' :
                         resilienceScore >= 45 ? 'Strong' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Resilience Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{resilienceScore.toFixed(0)}%</p>
          <p className="text-gray-600">Resilience Score</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{resilienceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your resilience through achievements.
        </p>
      </div>
    </div>
  )
}

