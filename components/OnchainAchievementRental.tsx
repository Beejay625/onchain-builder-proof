'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRentalProps {
  achievementId: bigint
}

export default function OnchainAchievementRental({ achievementId }: OnchainAchievementRentalProps) {
  const { address } = useAccount()
  const [rentalPrice, setRentalPrice] = useState('')
  const [rentalDuration, setRentalDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const listForRental = async () => {
    if (!address || !rentalPrice.trim() || !rentalDuration.trim()) return
    
    const rentalData = `RENTAL: ${rentalPrice} ETH | duration: ${rentalDuration} days`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, rentalData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏱️ Rental Listing</h3>
      
      <input
        type="number"
        value={rentalPrice}
        onChange={(e) => setRentalPrice(e.target.value)}
        placeholder="Rental price per day (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={rentalDuration}
        onChange={(e) => setRentalDuration(e.target.value)}
        placeholder="Maximum rental duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={listForRental}
        disabled={isPending || isConfirming || !rentalPrice.trim() || !rentalDuration.trim()}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Listing...' : 'List for Rental Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Rental listing recorded onchain
        </div>
      )}
    </div>
  )
}
