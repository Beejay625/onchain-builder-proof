'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReputationStakingProps {
  achievementId: bigint
}

export default function OnchainAchievementReputationStaking({ achievementId }: OnchainAchievementReputationStakingProps) {
  const { address } = useAccount()
  const [reputationAmount, setReputationAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const stakeReputation = async () => {
    if (!address || !reputationAmount.trim()) return
    
    const stakeData = `REPUTATION_STAKE: ${reputationAmount}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, stakeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Reputation Staking</h3>
      
      <input
        type="number"
        value={reputationAmount}
        onChange={(e) => setReputationAmount(e.target.value)}
        placeholder="Reputation amount to stake"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={stakeReputation}
        disabled={isPending || isConfirming || !reputationAmount.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Staking...' : 'Stake Reputation Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reputation staked onchain
        </div>
      )}
    </div>
  )
}
