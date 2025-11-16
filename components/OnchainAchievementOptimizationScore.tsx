'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementOptimizationScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const optimizationScore = Math.min(100, (userPosts?.length || 0) * 5.5)
  const optimizationLevel = optimizationScore >= 90 ? 'Optimized' :
                            optimizationScore >= 70 ? 'Well Optimized' :
                            optimizationScore >= 50 ? 'Optimizing' : 'Improving'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Optimization Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-600">{optimizationScore.toFixed(0)}%</p>
          <p className="text-gray-600">Optimization Score</p>
          <p className="text-lg font-semibold text-amber-600 mt-2">{optimizationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure optimization of achievements.
        </p>
      </div>
    </div>
  )
}

