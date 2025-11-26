'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementGrantMilestoneProps {
  achievementId: bigint
}

export default function OnchainAchievementGrantMilestone({ achievementId }: OnchainAchievementGrantMilestoneProps) {
  const { address, isConnected } = useAccount()
  const [milestoneName, setMilestoneName] = useState('')
  const [milestoneStatus, setMilestoneStatus] = useState<'planned' | 'submitted' | 'approved' | 'paid'>('planned')
  const [milestoneEvidence, setMilestoneEvidence] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordMilestone = async () => {
    if (!isConnected || !address || !milestoneName.trim()) return

    try {
      const payload = `GRANT_MILESTONE:name:${milestoneName}:status:${milestoneStatus}:evidence:${milestoneEvidence || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Grant milestone submission failed:', error)
    }
  }

  return (
    <AppCard title="🎯 Grant Milestone" subtitle="Track grant milestones and proofs" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Milestone Name *</label>
          <input
            type="text"
            value={milestoneName}
            onChange={(e) => setMilestoneName(e.target.value)}
            placeholder="M2 Audit, Beta Ship, Retro Submission"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={milestoneStatus}
            onChange={(e) => setMilestoneStatus(e.target.value as typeof milestoneStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="planned">Planned</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Link (optional)</label>
          <input
            type="text"
            value={milestoneEvidence}
            onChange={(e) => setMilestoneEvidence(e.target.value)}
            placeholder="Mirror update, onchain tx, PDF"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordMilestone}
          disabled={isPending || isConfirming || !isConnected || !milestoneName.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Grant Milestone'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Grant milestone recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
