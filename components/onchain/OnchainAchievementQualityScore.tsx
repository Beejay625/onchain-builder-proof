'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementQualityScoreProps {
  achievementId: bigint
}

export default function OnchainAchievementQualityScore({ achievementId }: OnchainAchievementQualityScoreProps) {
  const { address, isConnected } = useAccount()
  const [qualityScore, setQualityScore] = useState('')
  const [qualityDimensions, setQualityDimensions] = useState('')
  const [qualityNotes, setQualityNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !qualityScore.trim() || !qualityNotes.trim()) return

    try {
      const payload = `QUALITY_SCORE:score:${qualityScore}:dimensions:${qualityDimensions || 'n/a'}:notes:${qualityNotes}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🌟 Quality Score submission failed:', error)
    }
  }

  return (
    <AppCard title="🌟 Quality Score" subtitle="Score quality metrics with rationale" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quality Score (1-100) *</label>
          <input
            type="text"
            value={qualityScore}
            onChange={(e) => setQualityScore(e.target.value)}
            placeholder="92"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (optional)</label>
          <input
            type="text"
            value={qualityDimensions}
            onChange={(e) => setQualityDimensions(e.target.value)}
            placeholder="security, ux, docs"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes *</label>
          <textarea
            value={qualityNotes}
            onChange={(e) => setQualityNotes(e.target.value)}
            placeholder="Explain scoring rationale"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !qualityScore.trim() || !qualityNotes.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing Quality Score' : 'Publish Quality Score'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Quality score stored
          </div>
        )}
      </div>
    </AppCard>
  )
}
