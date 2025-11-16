'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSustainabilityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const sustainabilityScore = Math.min(100, (userPosts?.length || 0) * 4.3)
  const sustainabilityLevel = sustainabilityScore >= 75 ? 'Sustainable' :
                              sustainabilityScore >= 55 ? 'Maintainable' :
                              sustainabilityScore >= 35 ? 'Steady' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌱 Sustainability Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{sustainabilityScore.toFixed(0)}%</p>
          <p className="text-gray-600">Sustainability Score</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{sustainabilityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure sustainability of your achievements.
        </p>
      </div>
    </div>
  )
}

