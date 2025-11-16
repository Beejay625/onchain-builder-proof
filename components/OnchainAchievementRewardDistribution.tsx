'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRewardDistribution() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const totalRewards = (userPosts?.length || 0) * 0.1

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Reward Distribution</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-yellow-600">{totalRewards.toFixed(2)} ETH</p>
        <p className="text-gray-600">Total rewards available</p>
        <p className="text-sm text-gray-500">
          Based on {userPosts?.length || 0} achievements
        </p>
      </div>
    </div>
  )
}

