'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRewardDistributionProps {
  achievementId: bigint
}

export default function OnchainAchievementRewardDistribution({ achievementId }: OnchainAchievementRewardDistributionProps) {
  const { address } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const distributeReward = async () => {
    if (!address || !recipientAddress.trim() || !rewardAmount.trim()) return
    
    const rewardData = `REWARD_DISTRIBUTION: ${recipientAddress} | amount: ${rewardAmount}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, rewardData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎁 Reward Distribution</h3>
      
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <input
        type="number"
        value={rewardAmount}
        onChange={(e) => setRewardAmount(e.target.value)}
        placeholder="Reward amount"
        step="0.01"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={distributeReward}
        disabled={isPending || isConfirming || !recipientAddress.trim() || !rewardAmount.trim()}
        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Distributing...' : 'Distribute Reward Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reward distribution recorded onchain
        </div>
      )}
    </div>
  )
}
