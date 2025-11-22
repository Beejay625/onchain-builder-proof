'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPeerReviewProps {
  achievementId: bigint
  reviewerAddress: string
}

export default function AchievementPeerReview({ achievementId, reviewerAddress }: AchievementPeerReviewProps) {
  const { address, isConnected } = useAccount()
  const [rating, setRating] = useState('5')
  const [reviewText, setReviewText] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementPeerReview')) {
    return null
  }

  const handleSubmitReview = async () => {
    if (!isConnected || !address || !reviewText.trim()) return

    try {
      const reviewContent = `PEERREVIEW:RATING${rating}:${reviewText}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, reviewContent],
      })
    } catch (error) {
      console.error('Peer review submission failed:', error)
    }
  }

  return (
    <AppCard title="👥 Peer Review" subtitle="Submit peer reviews with ratings for validation" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Below Average</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Review Text</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmitReview}
          disabled={isPending || isConfirming || !isConnected || !reviewText.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting Review...' : 'Submit Peer Review'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-800">
            ✅ Peer review submitted onchain with rating {rating}/5
          </div>
        )}
      </div>
    </AppCard>
  )
}

