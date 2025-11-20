'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReputationWeightingProps {
  achievementId: bigint
}

export default function OnchainAchievementReputationWeighting({ achievementId }: OnchainAchievementReputationWeightingProps) {
  const { address } = useAccount()
  const [weightMultiplier, setWeightMultiplier] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setWeighting = async () => {
    if (!address || !weightMultiplier.trim()) return
    
    const weightData = `REPUTATION_WEIGHTING: ${weightMultiplier}x`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, weightData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Reputation Weighting</h3>
      
      <input
        type="number"
        value={weightMultiplier}
        onChange={(e) => setWeightMultiplier(e.target.value)}
        placeholder="Weight multiplier (e.g., 1.5)"
        step="0.1"
        min="0.1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={setWeighting}
        disabled={isPending || isConfirming || !weightMultiplier.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Reputation Weighting Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reputation weighting set onchain
        </div>
      )}
    </div>
  )
}
