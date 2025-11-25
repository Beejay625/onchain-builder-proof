'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCodeReviewProps {
  achievementId: bigint
}

export default function OnchainAchievementCodeReview({ achievementId }: OnchainAchievementCodeReviewProps) {
  const { address, isConnected } = useAccount()
  const [reviewerAddress, setReviewerAddress] = useState('')
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'changes-requested' | 'pending'>('pending')
  const [reviewSummary, setReviewSummary] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const submitReview = async () => {
    if (!isConnected || !address || !reviewerAddress.trim() || !reviewSummary.trim()) return

    try {
      const payload = `CODE_REVIEW:reviewer:${reviewerAddress}:status:${reviewStatus}:summary:${reviewSummary}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Code review failed:', error)
    }
  }

  return (
    <AppCard title="👁️ Code Review" subtitle="Record code review status and feedback" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Address *</label>
          <input
            type="text"
            value={reviewerAddress}
            onChange={(e) => setReviewerAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Review Status</label>
          <select
            value={reviewStatus}
            onChange={(e) => setReviewStatus(e.target.value as typeof reviewStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="approved">Approved</option>
            <option value="changes-requested">Changes Requested</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Review Summary *</label>
          <textarea
            value={reviewSummary}
            onChange={(e) => setReviewSummary(e.target.value)}
            rows={4}
            placeholder="Key feedback and findings"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={submitReview}
          disabled={isPending || isConfirming || !isConnected || !reviewerAddress.trim() || !reviewSummary.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Code Review'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Code review recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
