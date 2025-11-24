'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementMilestoneProofProps {
  achievementId: bigint
}

export default function OnchainAchievementMilestoneProof({ achievementId }: OnchainAchievementMilestoneProofProps) {
  const { address, isConnected } = useAccount()
  const [milestoneName, setMilestoneName] = useState('')
  const [milestoneEvidence, setMilestoneEvidence] = useState('')
  const [milestoneImpact, setMilestoneImpact] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordMilestone = async () => {
    if (!isConnected || !address || !milestoneName.trim() || !milestoneEvidence.trim()) return

    try {
      const payload = `MILESTONE_PROOF:name:${milestoneName}:evidence:${milestoneEvidence}:impact:${milestoneImpact || 'N/A'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Milestone proof failed:', error)
    }
  }

  return (
    <AppCard title="🚀 Milestone Proof" subtitle="Attach verifiable evidence for each milestone" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Milestone Name *</label>
          <input
            type="text"
            value={milestoneName}
            onChange={(e) => setMilestoneName(e.target.value)}
            placeholder="Beta launch, audit fix, etc."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Link *</label>
          <input
            type="text"
            value={milestoneEvidence}
            onChange={(e) => setMilestoneEvidence(e.target.value)}
            placeholder="URL, IPFS hash, BaseScan tx, ..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Impact Summary (optional)</label>
          <textarea
            value={milestoneImpact}
            onChange={(e) => setMilestoneImpact(e.target.value)}
            rows={3}
            placeholder="Explain why this milestone matters"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordMilestone}
          disabled={isPending || isConfirming || !isConnected || !milestoneName.trim() || !milestoneEvidence.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Milestone Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Milestone proof anchored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
