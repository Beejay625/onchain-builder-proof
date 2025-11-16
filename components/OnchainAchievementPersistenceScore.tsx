'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementPersistenceScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const persistenceScore = Math.min(100, (userPosts?.length || 0) * 4.2)
  const persistenceLevel = persistenceScore >= 80 ? 'Highly Persistent' :
                           persistenceScore >= 60 ? 'Persistent' :
                           persistenceScore >= 40 ? 'Steady' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💪 Persistence Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-red-600">{persistenceScore.toFixed(0)}%</p>
          <p className="text-gray-600">Persistence Score</p>
          <p className="text-lg font-semibold text-orange-600 mt-2">{persistenceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your persistence through achievements.
        </p>
      </div>
    </div>
  )
}

