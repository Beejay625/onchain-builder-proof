'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementOutcomeSurveyProps {
  achievementId: bigint
}

export default function OnchainAchievementOutcomeSurvey({ achievementId }: OnchainAchievementOutcomeSurveyProps) {
  const { address, isConnected } = useAccount()
  const [surveyAudience, setSurveyAudience] = useState('')
  const [surveySummary, setSurveySummary] = useState('')
  const [surveyLink, setSurveyLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !surveyAudience.trim() || !surveySummary.trim()) return

    try {
      const payload = `OUTCOME_SURVEY:audience:${surveyAudience}:summary:${surveySummary}:link:${surveyLink || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('📝 Outcome Survey submission failed:', error)
    }
  }

  return (
    <AppCard title="📝 Outcome Survey" subtitle="Summarize feedback from users or voters" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audience *</label>
          <input
            type="text"
            value={surveyAudience}
            onChange={(e) => setSurveyAudience(e.target.value)}
            placeholder="Grantees, beta users"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Summary *</label>
          <textarea
            value={surveySummary}
            onChange={(e) => setSurveySummary(e.target.value)}
            placeholder="Key findings"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Results (optional)</label>
          <input
            type="text"
            value={surveyLink}
            onChange={(e) => setSurveyLink(e.target.value)}
            placeholder="Google form"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !surveyAudience.trim() || !surveySummary.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing Survey Summary' : 'Publish Survey Summary'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Survey summary posted
          </div>
        )}
      </div>
    </AppCard>
  )
}
