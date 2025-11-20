'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementMilestones() {
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

  const milestones = [1, 5, 10, 25, 50, 100]
  const currentCount = userPostIds?.length || 0
  const nextMilestone = milestones.find(m => m > currentCount) || 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Achievement Milestones</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{currentCount}</p>
          <p className="text-sm opacity-90">Current Achievements</p>
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-700">Next Milestone</p>
          <p className="text-2xl font-bold text-blue-600">{nextMilestone}</p>
          <p className="text-xs text-gray-600">{nextMilestone - currentCount} more to go</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {milestones.slice(0, 6).map((milestone) => (
            <div
              key={milestone}
              className={`p-2 rounded text-center ${
                currentCount >= milestone
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <p className={`text-sm font-bold ${currentCount >= milestone ? 'text-green-700' : 'text-gray-500'}`}>
                {milestone}
              </p>
              {currentCount >= milestone && <span className="text-xs">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

