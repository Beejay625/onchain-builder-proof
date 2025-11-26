'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRunbookLinkProps {
  achievementId: bigint
}

export default function OnchainAchievementRunbookLink({ achievementId }: OnchainAchievementRunbookLinkProps) {
  const { address, isConnected } = useAccount()
  const [runbookName, setRunbookName] = useState('')
  const [runbookUrl, setRunbookUrl] = useState('')
  const [runbookNotes, setRunbookNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordRunbook = async () => {
    if (!isConnected || !address || !runbookName.trim() || !runbookUrl.trim()) return

    try {
      const payload = `RUNBOOK_LINK:name:${runbookName}:url:${runbookUrl}:notes:${runbookNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Runbook link logging failed:', error)
    }
  }

  return (
    <AppCard title="📘 Runbook Link" subtitle="Attach runbooks for repeatable ops" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Runbook Name *</label>
          <input
            type="text"
            value={runbookName}
            onChange={(e) => setRunbookName(e.target.value)}
            placeholder="Deploy procedure, incident response"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Runbook URL *</label>
          <input
            type="text"
            value={runbookUrl}
            onChange={(e) => setRunbookUrl(e.target.value)}
            placeholder="https://notion.so/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={runbookNotes}
            onChange={(e) => setRunbookNotes(e.target.value)}
            rows={3}
            placeholder="Updated weekly, contact info"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordRunbook}
          disabled={isPending || isConfirming || !isConnected || !runbookName.trim() || !runbookUrl.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving...' : 'Save Runbook Link'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Runbook link anchored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
