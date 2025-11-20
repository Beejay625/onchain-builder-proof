'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementStreaks() {
  const { address } = useAccount()
  
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const currentStreak = userPostIds?.length || 0
  const longestStreak = currentStreak

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔥 Achievement Streaks</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{currentStreak}</p>
          <p className="text-sm opacity-90">Current Streak</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xl font-bold text-blue-600">{currentStreak}</p>
            <p className="text-xs text-gray-600">Current</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-xl font-bold text-purple-600">{longestStreak}</p>
            <p className="text-xs text-gray-600">Longest</p>
          </div>
        </div>
        
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-green-700">Streak Status</p>
          <p className="text-xs text-gray-600">
            {currentStreak > 0 ? '🔥 Keep it up!' : 'Start your streak today!'}
          </p>
        </div>
      </div>
    </div>
  )
}
