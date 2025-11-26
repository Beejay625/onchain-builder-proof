'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementPeerReview() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitReview = async () => {
    if (!address || !postId || !review || !rating) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `REVIEW:${rating}:${review}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Peer Review</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Review content"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Below Average</option>
          <option value="1">1 - Poor</option>
        </select>
        <button
          onClick={submitReview}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Review'}
        </button>
        {isSuccess && <p className="text-green-600">Review submitted onchain!</p>}
      </div>
    </div>
  )
}




