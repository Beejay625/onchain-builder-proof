'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRiskSignalProps {
  achievementId: bigint
}

export default function OnchainAchievementRiskSignal({ achievementId }: OnchainAchievementRiskSignalProps) {
  const { address, isConnected } = useAccount()
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low')
  const [riskDescription, setRiskDescription] = useState('')
  const [nextReviewDate, setNextReviewDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const publishRiskSignal = async () => {
    if (!isConnected || !address || !riskDescription.trim()) return

    try {
      const reviewTimestamp = nextReviewDate ? Math.floor(new Date(nextReviewDate).getTime() / 1000) : 0
      const payload = `RISK_SIGNAL:level:${riskLevel}:desc:${riskDescription}:review:${reviewTimestamp}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Risk signal failed:', error)
    }
  }

  return (
    <AppCard title="⚠️ Risk Signal" subtitle="Broadcast risk context for this proof" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value as typeof riskLevel)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Description *</label>
          <textarea
            value={riskDescription}
            onChange={(e) => setRiskDescription(e.target.value)}
            rows={3}
            placeholder="Describe the risk and mitigation plan"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Next Review (optional)</label>
          <input
            type="datetime-local"
            value={nextReviewDate}
            onChange={(e) => setNextReviewDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={publishRiskSignal}
          disabled={isPending || isConfirming || !isConnected || !riskDescription.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Risk Signal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Risk signal anchored for stakeholders
          </div>
        )}
      </div>
    </AppCard>
  )
}
