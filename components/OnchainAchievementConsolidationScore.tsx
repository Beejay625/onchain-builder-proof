'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementConsolidationScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const consolidationScore = Math.min(100, (userPosts?.length || 0) * 3.8)
  const consolidationLevel = consolidationScore >= 75 ? 'Consolidated' :
                             consolidationScore >= 55 ? 'Consolidating' :
                             consolidationScore >= 35 ? 'Unifying' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Consolidation Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{consolidationScore.toFixed(0)}%</p>
          <p className="text-gray-600">Consolidation Score</p>
          <p className="text-lg font-semibold text-pink-600 mt-2">{consolidationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure consolidation of achievements.
        </p>
      </div>
    </div>
  )
}

