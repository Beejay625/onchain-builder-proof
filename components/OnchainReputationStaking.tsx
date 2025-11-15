'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainReputationStakingProps {
  achievementId: bigint
}

export default function OnchainReputationStaking({ achievementId }: OnchainReputationStakingProps) {
  const { address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeDuration, setStakeDuration] = useState('30')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const stakeReputation = async () => {
    if (!address || !stakeAmount) return
    
    const stakeData = `REPUTATION_STAKING: ${stakeAmount} reputation for ${stakeDuration} days`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, stakeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Onchain Reputation Staking</h3>
      
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Reputation amount to stake"
        step="1"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={stakeDuration}
        onChange={(e) => setStakeDuration(e.target.value)}
        placeholder="Stake duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={stakeReputation}
        disabled={isPending || isConfirming || !stakeAmount || parseFloat(stakeAmount) <= 0}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Staking...' : `Stake ${stakeAmount || '0'} Reputation`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reputation staking recorded onchain
        </div>
      )}
    </div>
  )
}
