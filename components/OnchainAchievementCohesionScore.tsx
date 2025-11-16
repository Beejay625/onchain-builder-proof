'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCohesionScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const cohesionScore = Math.min(100, (userPosts?.length || 0) * 4.7)
  const cohesionLevel = cohesionScore >= 75 ? 'Cohesive' :
                        cohesionScore >= 55 ? 'Unified' :
                        cohesionScore >= 35 ? 'Connected' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🧩 Cohesion Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-teal-600">{cohesionScore.toFixed(0)}%</p>
          <p className="text-gray-600">Cohesion Score</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{cohesionLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure cohesion of your achievements.
        </p>
      </div>
    </div>
  )
}

