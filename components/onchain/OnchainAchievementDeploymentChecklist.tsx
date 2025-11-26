'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI} from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDeploymentChecklistProps {
  achievementId: bigint
}

export default function OnchainAchievementDeploymentChecklist({ achievementId }: OnchainAchievementDeploymentChecklistProps) {
  const { address, isConnected } = useAccount()
  const [checklistItem, setChecklistItem] = useState('')
  const [checklistStatus, setChecklistStatus] = useState<'pending' | 'complete' | 'blocked'>('pending')
  const [checklistNotes, setChecklistNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordChecklist = async () => {
    if (!isConnected || !address || !checklistItem.trim()) return

    try {
      const payload = `DEPLOY_CHECK:item:${checklistItem}:status:${checklistStatus}:notes:${checklistNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Deployment checklist submission failed:', error)
    }
  }

  return (
    <AppCard title="🚀 Deployment Checklist" subtitle="Confirm deployment readiness tasks" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Item *</label>
          <input
            type="text"
            value={checklistItem}
            onChange={(e) => setChecklistItem(e.target.value)}
            placeholder="Smoke tests, runbooks, announcement"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={checklistStatus}
            onChange={(e) => setChecklistStatus(e.target.value as typeof checklistStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={checklistNotes}
            onChange={(e) => setChecklistNotes(e.target.value)}
            rows={3}
            placeholder="CI pipeline run ID, approvals, etc"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordChecklist}
          disabled={isPending || isConfirming || !isConnected || !checklistItem.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Deployment Checklist'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Deployment checklist entry recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}
