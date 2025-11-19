'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStakingProps {
  achievementId: bigint
}

export default function OnchainAchievementStaking({ achievementId }: OnchainAchievementStakingProps) {
  const { address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [duration, setDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const stakeAchievement = async () => {
    if (!address || !stakeAmount.trim()) return
    
    const stakeData = `STAKE: ${stakeAmount} ETH${duration ? ` | duration: ${duration} days` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, stakeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Achievement Staking</h3>
      
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Stake amount (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration in days (optional)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={stakeAchievement}
        disabled={isPending || isConfirming || !stakeAmount.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Staking...' : 'Stake Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Staking recorded onchain
        </div>
      )}
    </div>
  )
}
