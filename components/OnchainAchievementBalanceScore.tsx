'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBalanceScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const balanceScore = Math.min(100, (userPosts?.length || 0) * 5.2)
  const balanceLevel = balanceScore >= 85 ? 'Well Balanced' :
                       balanceScore >= 65 ? 'Balanced' :
                       balanceScore >= 45 ? 'Moderate' : 'Developing'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚖️ Balance Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-indigo-600">{balanceScore.toFixed(0)}%</p>
          <p className="text-gray-600">Balance Score</p>
          <p className="text-lg font-semibold text-purple-600 mt-2">{balanceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure balance of your achievements.
        </p>
      </div>
    </div>
  )
}

