'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRoyaltiesProps {
  achievementId: bigint
}

export default function OnchainAchievementRoyalties({ achievementId }: OnchainAchievementRoyaltiesProps) {
  const { address } = useAccount()
  const [royaltyRate, setRoyaltyRate] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setRoyalties = async () => {
    if (!address || !royaltyRate.trim() || !recipientAddress.trim()) return
    
    const royaltyData = `ROYALTIES: ${royaltyRate}% | recipient: ${recipientAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, royaltyData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Royalties</h3>
      
      <input
        type="number"
        value={royaltyRate}
        onChange={(e) => setRoyaltyRate(e.target.value)}
        placeholder="Royalty rate (%)"
        step="0.1"
        min="0"
        max="100"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={setRoyalties}
        disabled={isPending || isConfirming || !royaltyRate.trim() || !recipientAddress.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Royalties Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Royalties configured onchain
        </div>
      )}
    </div>
  )
}
