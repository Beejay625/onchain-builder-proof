'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSuccessRateProps {
  achievementId: bigint
}

export default function OnchainAchievementSuccessRate({ achievementId }: OnchainAchievementSuccessRateProps) {
  const { address, isConnected } = useAccount()
  const [successMetrics, setSuccessMetrics] = useState({
    goalsMet: '',
    successPercentage: '',
    successNotes: '',
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordSuccessRate = async () => {
    if (!isConnected || !address || !successMetrics.successPercentage.trim()) return

    try {
      const successData = `SUCCESS_RATE:goals:${successMetrics.goalsMet || 'N/A'}:percentage:${successMetrics.successPercentage}:notes:${successMetrics.successNotes || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, successData],
      })
    } catch (error) {
      console.error('Success rate recording failed:', error)
    }
  }

  return (
    <AppCard title="✅ Achievement Success Rate" subtitle="Track achievement success metrics" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Goals Met (optional)</label>
          <input
            type="text"
            value={successMetrics.goalsMet}
            onChange={(e) => setSuccessMetrics({ ...successMetrics, goalsMet: e.target.value })}
            placeholder="e.g., 8/10 goals"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Success Percentage *</label>
          <input
            type="text"
            value={successMetrics.successPercentage}
            onChange={(e) => setSuccessMetrics({ ...successMetrics, successPercentage: e.target.value })}
            placeholder="e.g., 85%"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Success Notes (optional)</label>
          <textarea
            value={successMetrics.successNotes}
            onChange={(e) => setSuccessMetrics({ ...successMetrics, successNotes: e.target.value })}
            placeholder="Additional context..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordSuccessRate}
          disabled={isPending || isConfirming || !isConnected || !successMetrics.successPercentage.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Success Rate'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Success rate recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

