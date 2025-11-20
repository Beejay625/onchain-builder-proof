'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMilestoneRewardsProps {
  achievementId: bigint
}

export default function OnchainAchievementMilestoneRewards({ achievementId }: OnchainAchievementMilestoneRewardsProps) {
  const { address } = useAccount()
  const [milestoneName, setMilestoneName] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const claimMilestoneReward = async () => {
    if (!address || !milestoneName.trim()) return
    
    const rewardData = `MILESTONE_REWARD: ${milestoneName}${rewardAmount ? ` | ${rewardAmount}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, rewardData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎁 Milestone Rewards</h3>
      
      <input
        type="text"
        value={milestoneName}
        onChange={(e) => setMilestoneName(e.target.value)}
        placeholder="Milestone name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={rewardAmount}
        onChange={(e) => setRewardAmount(e.target.value)}
        placeholder="Reward amount (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={claimMilestoneReward}
        disabled={isPending || isConfirming || !milestoneName.trim()}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Claiming...' : 'Claim Milestone Reward Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Milestone reward claimed onchain
        </div>
      )}
    </div>
  )
}
