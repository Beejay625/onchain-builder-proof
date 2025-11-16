'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDiversity() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const diversityScore = Math.min(100, (userPosts?.length || 0) * 4)
  const diversityLevel = diversityScore >= 70 ? 'Highly Diverse' :
                         diversityScore >= 50 ? 'Diverse' :
                         diversityScore >= 30 ? 'Moderate' : 'Focused'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌈 Achievement Diversity</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-cyan-600">{diversityScore}%</p>
          <p className="text-gray-600">Diversity Score</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">{diversityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure diversity of your achievements.
        </p>
      </div>
    </div>
  )
}

