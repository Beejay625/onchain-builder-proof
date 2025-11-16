'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementImpactScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const impactScore = (userPosts?.length || 0) * 10
  const impactLevel = impactScore >= 200 ? 'High Impact' :
                     impactScore >= 100 ? 'Moderate Impact' :
                     impactScore >= 50 ? 'Growing Impact' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💥 Impact Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-red-600">{impactScore}</p>
          <p className="text-gray-600">Impact Score</p>
          <p className="text-lg font-semibold text-orange-600 mt-2">{impactLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure the impact of your achievements.
        </p>
      </div>
    </div>
  )
}

