'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTranscendenceScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const transcendenceScore = Math.min(100, (userPosts?.length || 0) * 5.9)
  const transcendenceLevel = transcendenceScore >= 95 ? 'Transcended' :
                             transcendenceScore >= 80 ? 'Transcending' :
                             transcendenceScore >= 60 ? 'Elevated' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌟 Transcendence Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-600">{transcendenceScore.toFixed(0)}%</p>
          <p className="text-gray-600">Transcendence Score</p>
          <p className="text-lg font-semibold text-amber-600 mt-2">{transcendenceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure transcendence of achievements.
        </p>
      </div>
    </div>
  )
}

