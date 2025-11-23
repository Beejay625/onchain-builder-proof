'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCompletionRateProps {
  achievementId: bigint
}

export default function OnchainAchievementCompletionRate({ achievementId }: OnchainAchievementCompletionRateProps) {
  const { address, isConnected } = useAccount()
  const [completionData, setCompletionData] = useState({
    tasksCompleted: '',
    totalTasks: '',
    completionPercentage: '',
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordCompletionRate = async () => {
    if (!isConnected || !address || !completionData.completionPercentage.trim()) return

    try {
      const completionDataStr = `COMPLETION_RATE:tasks:${completionData.tasksCompleted || 'N/A'}:total:${completionData.totalTasks || 'N/A'}:percentage:${completionData.completionPercentage}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, completionDataStr],
      })
    } catch (error) {
      console.error('Completion rate recording failed:', error)
    }
  }

  return (
    <AppCard title="📊 Achievement Completion Rate" subtitle="Track task completion progress" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tasks Completed (optional)</label>
          <input
            type="text"
            value={completionData.tasksCompleted}
            onChange={(e) => setCompletionData({ ...completionData, tasksCompleted: e.target.value })}
            placeholder="e.g., 7"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Tasks (optional)</label>
          <input
            type="text"
            value={completionData.totalTasks}
            onChange={(e) => setCompletionData({ ...completionData, totalTasks: e.target.value })}
            placeholder="e.g., 10"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Completion Percentage *</label>
          <input
            type="text"
            value={completionData.completionPercentage}
            onChange={(e) => setCompletionData({ ...completionData, completionPercentage: e.target.value })}
            placeholder="e.g., 70%"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={recordCompletionRate}
          disabled={isPending || isConfirming || !isConnected || !completionData.completionPercentage.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Completion Rate'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Completion rate recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

