'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementInsights() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const insights = userPosts && userPosts.length > 0 ? 5 : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💡 Achievement Insights</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-purple-600">{insights}</p>
        <p className="text-gray-600">Personalized insights</p>
        <p className="text-sm text-gray-500 mt-2">
          Based on your activity
        </p>
      </div>
    </div>
  )
}

