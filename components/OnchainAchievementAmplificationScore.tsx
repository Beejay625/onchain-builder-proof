'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAmplificationScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const amplificationScore = (userPosts?.length || 0) * 7.5
  const amplificationLevel = amplificationScore >= 250 ? 'High Amplification' :
                             amplificationScore >= 200 ? 'Amplified' :
                             amplificationScore >= 150 ? 'Growing' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📢 Amplification Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-pink-600">{amplificationScore.toFixed(0)}</p>
          <p className="text-gray-600">Amplification Score</p>
          <p className="text-lg font-semibold text-rose-600 mt-2">{amplificationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure amplification of achievements.
        </p>
      </div>
    </div>
  )
}

