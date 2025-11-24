'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementOpsChecklistProps {
  achievementId: bigint
}

export default function OnchainAchievementOpsChecklist({ achievementId }: OnchainAchievementOpsChecklistProps) {
  const { address, isConnected } = useAccount()
  const [checklistItem, setChecklistItem] = useState('')
  const [checklistStatus, setChecklistStatus] = useState('')
  const [checklistEvidence, setChecklistEvidence] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !checklistItem.trim() || !checklistStatus.trim()) return

    try {
      const payload = `OPS_CHECKLIST:item:${checklistItem}:status:${checklistStatus}:evidence:${checklistEvidence || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('✅ Ops Checklist submission failed:', error)
    }
  }

  return (
    <AppCard title="✅ Ops Checklist" subtitle="Track critical checklist items" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Item *</label>
          <input
            type="text"
            value={checklistItem}
            onChange={(e) => setChecklistItem(e.target.value)}
            placeholder="Docs reviewed"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <input
            type="text"
            value={checklistStatus}
            onChange={(e) => setChecklistStatus(e.target.value)}
            placeholder="done / pending"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence (optional)</label>
          <input
            type="text"
            value={checklistEvidence}
            onChange={(e) => setChecklistEvidence(e.target.value)}
            placeholder="Link or hash"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !checklistItem.trim() || !checklistStatus.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging Checklist Item' : 'Log Checklist Item'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Checklist item logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
