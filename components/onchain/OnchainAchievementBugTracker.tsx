'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementBugTrackerProps {
  achievementId: bigint
}

export default function OnchainAchievementBugTracker({ achievementId }: OnchainAchievementBugTrackerProps) {
  const { address, isConnected } = useAccount()
  const [bugId, setBugId] = useState('')
  const [bugStatus, setBugStatus] = useState('')
  const [bugNotes, setBugNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !bugId.trim() || !bugStatus.trim() || !bugNotes.trim()) return

    try {
      const payload = `BUG_TRACKER:id:${bugId}:status:${bugStatus}:notes:${bugNotes}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🪲 Bug Tracker submission failed:', error)
    }
  }

  return (
    <AppCard title="🪲 Bug Tracker" subtitle="Link bugs discovered during the sprint" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bug ID *</label>
          <input
            type="text"
            value={bugId}
            onChange={(e) => setBugId(e.target.value)}
            placeholder="Jira-123"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <input
            type="text"
            value={bugStatus}
            onChange={(e) => setBugStatus(e.target.value)}
            placeholder="Fixed / Open"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes *</label>
          <textarea
            value={bugNotes}
            onChange={(e) => setBugNotes(e.target.value)}
            placeholder="Context for this bug"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !bugId.trim() || !bugStatus.trim() || !bugNotes.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Attaching Bug' : 'Attach Bug'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Bug reference stored
          </div>
        )}
      </div>
    </AppCard>
  )
}
