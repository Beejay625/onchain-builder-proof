'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAdvancementScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const advancementScore = (userPosts?.length || 0) * 10.5
  const advancementLevel = advancementScore >= 400 ? 'Advanced' :
                           advancementScore >= 300 ? 'Progressing' :
                           advancementScore >= 200 ? 'Advancing' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Advancement Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-600">{advancementScore.toFixed(0)}</p>
          <p className="text-gray-600">Advancement Score</p>
          <p className="text-lg font-semibold text-red-600 mt-2">{advancementLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure advancement of achievements.
        </p>
      </div>
    </div>
  )
}

