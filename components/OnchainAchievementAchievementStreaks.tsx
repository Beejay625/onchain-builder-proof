'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementStreaks() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const currentStreak = userPosts?.length || 0
  const longestStreak = currentStreak

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Achievement Streaks</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{currentStreak}</p>
          <p className="text-sm text-gray-600">Current</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{longestStreak}</p>
          <p className="text-sm text-gray-600">Longest</p>
        </div>
      </div>
    </div>
  )
}

