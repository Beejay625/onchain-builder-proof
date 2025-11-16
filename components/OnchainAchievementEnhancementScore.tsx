'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementEnhancementScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const enhancementScore = (userPosts?.length || 0) * 8.5
  const enhancementLevel = enhancementScore >= 300 ? 'Highly Enhanced' :
                          enhancementScore >= 200 ? 'Enhanced' :
                          enhancementScore >= 100 ? 'Improving' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔧 Enhancement Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{enhancementScore.toFixed(0)}</p>
          <p className="text-gray-600">Enhancement Score</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{enhancementLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure enhancement of achievements.
        </p>
      </div>
    </div>
  )
}

