'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRatingProps {
  achievementId: bigint
}

export default function OnchainAchievementRating({ achievementId }: OnchainAchievementRatingProps) {
  const { address } = useAccount()
  const [rating, setRating] = useState('5')
  const [review, setReview] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const rateAchievement = async () => {
    if (!address) return
    
    const ratingData = `RATING:${rating}:review:${review.trim() || 'no-review'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, ratingData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⭐ Achievement Rating</h3>
      
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>
      
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Review (optional)"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={rateAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Rating...' : 'Rate Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Rating recorded onchain
        </div>
      )}
    </div>
  )
}





