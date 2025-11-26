'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRoadmapCheckpointProps {
  achievementId: bigint
}

export default function OnchainAchievementRoadmapCheckpoint({ achievementId }: OnchainAchievementRoadmapCheckpointProps) {
  const { address, isConnected } = useAccount()
  const [milestoneName, setMilestoneName] = useState('')
  const [phaseStatus, setPhaseStatus] = useState<'planned' | 'in-progress' | 'complete'>('planned')
  const [nextSteps, setNextSteps] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logCheckpoint = async () => {
    if (!isConnected || !address || !milestoneName.trim()) return

    try {
      const payload = `ROADMAP_CHECKPOINT:milestone:${milestoneName}:status:${phaseStatus}:next:${nextSteps || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Roadmap checkpoint logging failed:', error)
    }
  }

  return (
    <AppCard title="🗺️ Roadmap Checkpoint" subtitle="Capture milestone status and next steps" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Milestone *</label>
          <input
            type="text"
            value={milestoneName}
            onChange={(e) => setMilestoneName(e.target.value)}
            placeholder="Season 3 beta, Governance rollout"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={phaseStatus}
            onChange={(e) => setPhaseStatus(e.target.value as typeof phaseStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps (optional)</label>
          <textarea
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
            rows={3}
            placeholder="Security review, partner sync, KPI monitoring"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={logCheckpoint}
          disabled={isPending || isConfirming || !isConnected || !milestoneName.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Roadmap Checkpoint'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Roadmap checkpoint recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
