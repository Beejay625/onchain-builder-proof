'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementOriginalityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const originalityScore = Math.min(100, (userPosts?.length || 0) * 4.9)
  const originalityLevel = originalityScore >= 80 ? 'Highly Original' :
                            originalityScore >= 60 ? 'Original' :
                            originalityScore >= 40 ? 'Creative' : 'Exploring'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✨ Originality Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-pink-600">{originalityScore.toFixed(0)}%</p>
          <p className="text-gray-600">Originality Score</p>
          <p className="text-lg font-semibold text-rose-600 mt-2">{originalityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure originality of your achievements.
        </p>
      </div>
    </div>
  )
}

