'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRewardsProps {
  achievementId: bigint
}

export default function OnchainAchievementRewards({ achievementId }: OnchainAchievementRewardsProps) {
  const { address } = useAccount()
  const [rewardType, setRewardType] = useState('token')
  const [rewardAmount, setRewardAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const claimReward = async () => {
    if (!address || !rewardAmount) return
    
    const rewardData = `ACHIEVEMENT_REWARD: ${rewardType} - Amount: ${rewardAmount}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, rewardData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎁 Onchain Achievement Rewards</h3>
      
      <select
        value={rewardType}
        onChange={(e) => setRewardType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="token">Token</option>
        <option value="nft">NFT</option>
        <option value="badge">Badge</option>
        <option value="reputation">Reputation</option>
      </select>
      
      <input
        type="text"
        value={rewardAmount}
        onChange={(e) => setRewardAmount(e.target.value)}
        placeholder="Reward amount"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={claimReward}
        disabled={isPending || isConfirming || !rewardAmount}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Claiming...' : 'Claim Reward'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reward claimed onchain
        </div>
      )}
    </div>
  )
}
