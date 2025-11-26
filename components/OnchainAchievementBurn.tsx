'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBurnProps {
  achievementId: bigint
}

export default function OnchainAchievementBurn({ achievementId }: OnchainAchievementBurnProps) {
  const { address } = useAccount()
  const [burnReason, setBurnReason] = useState('')
  const [burnAmount, setBurnAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const burnAchievement = async () => {
    if (!address) return
    
    const burnData = `BURN:reason:${burnReason.trim() || 'no-reason'}:amount:${burnAmount.trim() || 'full'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, burnData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔥 Achievement Burn</h3>
      
      <input
        type="text"
        value={burnReason}
        onChange={(e) => setBurnReason(e.target.value)}
        placeholder="Burn reason (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={burnAmount}
        onChange={(e) => setBurnAmount(e.target.value)}
        placeholder="Burn amount (optional, default: full)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={burnAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Burning...' : 'Burn Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Burn recorded onchain
        </div>
      )}
    </div>
  )
}




