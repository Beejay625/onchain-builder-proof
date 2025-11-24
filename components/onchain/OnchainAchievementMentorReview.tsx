'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementMentorReviewProps {
  achievementId: bigint
}

export default function OnchainAchievementMentorReview({ achievementId }: OnchainAchievementMentorReviewProps) {
  const { address, isConnected } = useAccount()
  const [mentorName, setMentorName] = useState('')
  const [mentorFeedback, setMentorFeedback] = useState('')
  const [mentorStrength, setMentorStrength] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !mentorName.trim() || !mentorFeedback.trim()) return

    try {
      const payload = `MENTOR_REVIEW:mentor:${mentorName}:feedback:${mentorFeedback}:strength:${mentorStrength || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🧑‍🏫 Mentor Review submission failed:', error)
    }
  }

  return (
    <AppCard title="🧑‍🏫 Mentor Review" subtitle="Capture mentor or advisor feedback" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mentor Name *</label>
          <input
            type="text"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
            placeholder="Advisor name"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Feedback *</label>
          <textarea
            value={mentorFeedback}
            onChange={(e) => setMentorFeedback(e.target.value)}
            placeholder="Key guidance"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Strength Highlight (optional)</label>
          <input
            type="text"
            value={mentorStrength}
            onChange={(e) => setMentorStrength(e.target.value)}
            placeholder="Execution quality"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !mentorName.trim() || !mentorFeedback.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving Mentor Feedback' : 'Save Mentor Feedback'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Mentor feedback saved
          </div>
        )}
      </div>
    </AppCard>
  )
}
