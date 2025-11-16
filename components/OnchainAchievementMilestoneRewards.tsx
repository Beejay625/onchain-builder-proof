'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { MILESTONES } from '@/lib/constants'

export default function OnchainAchievementMilestoneRewards() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const achievementCount = userPosts?.length || 0
  const nextMilestone = MILESTONES.find(m => m > achievementCount) || 0
  const rewards = MILESTONES.filter(m => m <= achievementCount).length * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Milestone Rewards</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-600">{rewards}</p>
          <p className="text-gray-600">Reward points earned</p>
        </div>
        <p className="text-sm text-gray-500">
          Next milestone: {nextMilestone} achievements
        </p>
      </div>
    </div>
  )
}

