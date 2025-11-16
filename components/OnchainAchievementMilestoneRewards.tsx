'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMilestoneRewards() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const milestone = userPosts?.length || 0
  const nextMilestone = milestone < 5 ? 5 : milestone < 10 ? 10 : milestone < 25 ? 25 : 50

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Milestone Rewards</h2>
      <div className="space-y-2">
        <p className="text-gray-600">Current: {milestone} achievements</p>
        <p className="text-gray-600">Next milestone: {nextMilestone}</p>
        <p className="text-sm text-gray-500">
          Claim rewards at milestones
        </p>
      </div>
    </div>
  )
}
