'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRatingProps {
  achievementId: bigint
}

export default function OnchainAchievementRating({ achievementId }: OnchainAchievementRatingProps) {
  const { address, isConnected } = useAccount()
  const [rating, setRating] = useState(5)
  const [ratingComment, setRatingComment] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const submitRating = async () => {
    if (!isConnected || !address) return

    try {
      const ratingData = `RATING:${rating}:${ratingComment || 'No comment'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, ratingData],
      })
    } catch (error) {
      console.error('Rating submission failed:', error)
    }
  }

  return (
    <AppCard title="⭐ Achievement Rating" subtitle="Rate achievement quality" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span className="text-lg font-bold text-yellow-600">{rating}</span>
            <span>10</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating Comment (optional)</label>
          <textarea
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
            placeholder="Why this rating?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={submitRating}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Rating'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Rating {rating}/10 submitted onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

