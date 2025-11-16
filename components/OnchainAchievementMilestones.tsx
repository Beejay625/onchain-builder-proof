'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMilestones() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const milestones = [10, 25, 50, 100, 250, 500]
  const currentCount = userPosts?.length || 0
  const nextMilestone = milestones.find(m => m > currentCount) || milestones[milestones.length - 1]
  const progress = (currentCount / nextMilestone) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Achievement Milestones</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">
            Current: {currentCount} / Next: {nextMilestone}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full" 
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Track your progress toward the next milestone.
        </p>
      </div>
    </div>
  )
}
