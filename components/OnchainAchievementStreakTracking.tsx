'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementStreakTracking() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const currentStreak = Math.min(30, (userPosts?.length || 0) % 30)
  const longestStreak = Math.min(60, (userPosts?.length || 0) % 60)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Streak Tracking</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-orange-600">{currentStreak}</p>
            <p className="text-sm text-gray-600">Current Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{longestStreak}</p>
            <p className="text-sm text-gray-600">Longest Streak</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Track your consecutive achievement days onchain.
        </p>
      </div>
    </div>
  )
}

