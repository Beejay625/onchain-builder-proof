'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementFractionalizationProps {
  achievementId: bigint
}

export default function OnchainAchievementFractionalization({ achievementId }: OnchainAchievementFractionalizationProps) {
  const { address } = useAccount()
  const [totalShares, setTotalShares] = useState('')
  const [sharePrice, setSharePrice] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const fractionalize = async () => {
    if (!address || !totalShares.trim() || !sharePrice.trim()) return
    
    const fractionalData = `FRACTIONALIZATION: ${totalShares} shares | price: ${sharePrice} ETH per share`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, fractionalData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔢 Fractionalization</h3>
      
      <input
        type="number"
        value={totalShares}
        onChange={(e) => setTotalShares(e.target.value)}
        placeholder="Total shares"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={sharePrice}
        onChange={(e) => setSharePrice(e.target.value)}
        placeholder="Price per share (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={fractionalize}
        disabled={isPending || isConfirming || !totalShares.trim() || !sharePrice.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Fractionalizing...' : 'Fractionalize Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Fractionalization recorded onchain
        </div>
      )}
    </div>
  )
}
