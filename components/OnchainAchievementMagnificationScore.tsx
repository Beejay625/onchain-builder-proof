'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMagnificationScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const magnificationScore = (userPosts?.length || 0) * 9.2
  const magnificationLevel = magnificationScore >= 350 ? 'Highly Magnified' :
                            magnificationScore >= 250 ? 'Magnified' :
                            magnificationScore >= 150 ? 'Growing' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Magnification Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-indigo-600">{magnificationScore.toFixed(0)}</p>
          <p className="text-gray-600">Magnification Score</p>
          <p className="text-lg font-semibold text-purple-600 mt-2">{magnificationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure magnification of achievements.
        </p>
      </div>
    </div>
  )
}

