'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRental() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [rentalPrice, setRentalPrice] = useState('')
  const [duration, setDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const listForRent = async () => {
    if (!address || !postId || !rentalPrice || !duration) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `RENTAL: ${rentalPrice} ETH for ${duration}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏱️ Achievement Rental</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          step="0.001"
          placeholder="Rental price (ETH)"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Duration (e.g., 30 days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={listForRent}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Listing...' : 'List for Rent'}
        </button>
        {isSuccess && <p className="text-green-600">Rental listing created onchain!</p>}
      </div>
    </div>
  )
}

