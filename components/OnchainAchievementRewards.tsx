'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRewards() {
  const { address } = useAccount()
  const [rewardAmount, setRewardAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimReward = async () => {
    if (!address || !rewardAmount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`REWARD: ${rewardAmount} tokens`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎁 Achievement Rewards</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Reward amount"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={claimReward}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Claiming...' : 'Claim Reward'}
        </button>
        {isSuccess && <p className="text-green-600">Reward claimed onchain!</p>}
      </div>
    </div>
  )
}
