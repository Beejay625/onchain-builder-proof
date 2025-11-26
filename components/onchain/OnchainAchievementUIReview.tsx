'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementUIReviewProps {
  achievementId: bigint
}

export default function OnchainAchievementUIReview({ achievementId }: OnchainAchievementUIReviewProps) {
  const { address, isConnected } = useAccount()
  const [reviewScope, setReviewScope] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')
  const [followUpAction, setFollowUpAction] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const submitReview = async () => {
    if (!isConnected || !address || !reviewScope.trim() || !reviewNotes.trim()) return

    try {
      const payload = `UI_REVIEW:scope:${reviewScope}:notes:${reviewNotes}:action:${followUpAction || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('UI review submission failed:', error)
    }
  }

  return (
    <AppCard title="🎨 UI Review" subtitle="Capture interface review outcomes" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Review Scope *</label>
          <input
            type="text"
            value={reviewScope}
            onChange={(e) => setReviewScope(e.target.value)}
            placeholder="Dashboard modals, wallet connect, etc"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes *</label>
          <textarea
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            rows={3}
            placeholder="Contrast issues, spacing fixes, animation polish"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Action (optional)</label>
          <input
            type="text"
            value={followUpAction}
            onChange={(e) => setFollowUpAction(e.target.value)}
            placeholder="Ship new palette"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={submitReview}
          disabled={isPending || isConfirming || !isConnected || !reviewScope.trim() || !reviewNotes.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving...' : 'Save UI Review'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ UI review stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
