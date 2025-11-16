'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementWeeklyGoals() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const weeklyGoal = 5
  const current = userPosts?.length || 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Weekly Goals</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{current}/{weeklyGoal}</p>
          <p className="text-gray-600">This week</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${Math.min(100, (current / weeklyGoal) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

