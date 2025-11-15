'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainRewardsProps {
  achievementId: bigint
  recipientAddress: `0x${string}`
}

export default function OnchainRewards({ achievementId, recipientAddress }: OnchainRewardsProps) {
  const { address } = useAccount()
  const [rewardAmount, setRewardAmount] = useState('')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const distributeReward = async () => {
    if (!address || !rewardAmount) return
    
    const amount = parseEther(rewardAmount)
    const rewardText = `REWARD: ${rewardAmount} ETH distributed to ${recipientAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, rewardText],
      value: amount,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎁 Onchain Rewards Distribution</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Your Balance</div>
        <div className="font-semibold">{balance ? formatEther(balance.value) : '0'} ETH</div>
      </div>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-gray-600">Recipient</div>
        <div className="font-mono text-sm">{recipientAddress}</div>
      </div>
      
      <input
        type="number"
        value={rewardAmount}
        onChange={(e) => setRewardAmount(e.target.value)}
        placeholder="Reward amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={distributeReward}
        disabled={isPending || isConfirming || !rewardAmount || parseFloat(rewardAmount) <= 0}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Distributing...' : `Distribute ${rewardAmount || '0'} ETH Reward`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reward distributed onchain
        </div>
      )}
    </div>
  )
}

