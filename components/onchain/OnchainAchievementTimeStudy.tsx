'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTimeStudyProps {
  achievementId: bigint
}

export default function OnchainAchievementTimeStudy({ achievementId }: OnchainAchievementTimeStudyProps) {
  const { address, isConnected } = useAccount()
  const [timeHours, setTimeHours] = useState('')
  const [focusType, setFocusType] = useState('')
  const [timeNote, setTimeNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !timeHours.trim() || !focusType.trim()) return

    try {
      const payload = `TIME_STUDY:hours:${timeHours}:focus:${focusType}:note:${timeNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('⏱️ Time Study submission failed:', error)
    }
  }

  return (
    <AppCard title="⏱️ Time Study" subtitle="Log effort windows and focus blocks" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hours Spent *</label>
          <input
            type="text"
            value={timeHours}
            onChange={(e) => setTimeHours(e.target.value)}
            placeholder="12"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Focus Type *</label>
          <input
            type="text"
            value={focusType}
            onChange={(e) => setFocusType(e.target.value)}
            placeholder="Deep work"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={timeNote}
            onChange={(e) => setTimeNote(e.target.value)}
            placeholder="What happened?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !timeHours.trim() || !focusType.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Time Study' : 'Record Time Study'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Time block logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
