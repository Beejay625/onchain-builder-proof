'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCustomerFeedbackProps {
  achievementId: bigint
}

export default function OnchainAchievementCustomerFeedback({ achievementId }: OnchainAchievementCustomerFeedbackProps) {
  const { address, isConnected } = useAccount()
  const [segment, setSegment] = useState('')
  const [feedbackQuote, setFeedbackQuote] = useState('')
  const [feedbackLink, setFeedbackLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordFeedback = async () => {
    if (!isConnected || !address || !segment.trim() || !feedbackQuote.trim()) return

    try {
      const payload = `CUSTOMER_FEEDBACK:segment:${segment}:quote:${feedbackQuote}:link:${feedbackLink || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Customer feedback submission failed:', error)
    }
  }

  return (
    <AppCard title="💬 Customer Feedback" subtitle="Anchor customer quotes and surveys" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Segment *</label>
          <input
            type="text"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            placeholder="Pro devs, NFT creators, grant partners"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Quote *</label>
          <textarea
            value={feedbackQuote}
            onChange={(e) => setFeedbackQuote(e.target.value)}
            rows={3}
            placeholder="Exact quote or paraphrased insight"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reference Link (optional)</label>
          <input
            type="text"
            value={feedbackLink}
            onChange={(e) => setFeedbackLink(e.target.value)}
            placeholder="Zendesk ticket, Notion doc, survey"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordFeedback}
          disabled={isPending || isConfirming || !isConnected || !segment.trim() || !feedbackQuote.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Feedback'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Customer feedback recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
