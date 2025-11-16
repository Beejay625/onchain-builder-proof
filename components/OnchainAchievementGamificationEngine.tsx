'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementGamificationEngine() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const level = (userPosts?.length || 0) < 5 ? 1 : (userPosts?.length || 0) < 10 ? 2 : (userPosts?.length || 0) < 25 ? 3 : 4

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎮 Gamification Engine</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-pink-600">Level {level}</p>
        <p className="text-gray-600">Current level</p>
        <p className="text-sm text-gray-500">
          Based on {userPosts?.length || 0} achievements
        </p>
      </div>
    </div>
  )
}

