'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRollbackProps {
  achievementId: bigint
}

export default function OnchainAchievementRollback({ achievementId }: OnchainAchievementRollbackProps) {
  const { address, isConnected } = useAccount()
  const [rollbackReason, setRollbackReason] = useState('')
  const [targetSnapshot, setTargetSnapshot] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const rollbackAchievement = async () => {
    if (!isConnected || !address || !rollbackReason.trim()) return

    try {
      const rollbackData = `ROLLBACK:${targetSnapshot || 'latest'}:${rollbackReason}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, rollbackData],
      })
    } catch (error) {
      console.error('Rollback failed:', error)
    }
  }

  return (
    <AppCard title="↩️ Achievement Rollback" subtitle="Rollback to previous state" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Snapshot ID (optional)</label>
          <input
            type="text"
            value={targetSnapshot}
            onChange={(e) => setTargetSnapshot(e.target.value)}
            placeholder="Leave empty for latest snapshot"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rollback Reason *</label>
          <textarea
            value={rollbackReason}
            onChange={(e) => setRollbackReason(e.target.value)}
            placeholder="Why are you rolling back?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={rollbackAchievement}
          disabled={isPending || isConfirming || !isConnected || !rollbackReason.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Rolling back...' : 'Rollback Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Rollback initiated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

