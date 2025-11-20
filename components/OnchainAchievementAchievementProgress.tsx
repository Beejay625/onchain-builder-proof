'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementProgress() {
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

  const currentCount = userPostIds?.length || 0
  const nextGoal = Math.ceil(currentCount / 10) * 10 + 10
  const progress = (currentCount / nextGoal) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📈 Achievement Progress</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{currentCount}</p>
          <p className="text-sm opacity-90">Current Achievements</p>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress to {nextGoal}</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-green-700">Next Goal</p>
          <p className="text-xl font-bold text-green-600">{nextGoal} achievements</p>
          <p className="text-xs text-gray-600">{nextGoal - currentCount} more to go</p>
        </div>
      </div>
    </div>
  )
}
