'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementFocusTimerProps {
  achievementId: bigint
}

export default function OnchainAchievementFocusTimer({ achievementId }: OnchainAchievementFocusTimerProps) {
  const { address, isConnected } = useAccount()
  const [sessionType, setSessionType] = useState('')
  const [sessionDuration, setSessionDuration] = useState('')
  const [sessionNote, setSessionNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !sessionType.trim() || !sessionDuration.trim()) return

    try {
      const payload = `FOCUS_TIMER:session:${sessionType}:duration:${sessionDuration}:note:${sessionNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🧠 Focus Timer submission failed:', error)
    }
  }

  return (
    <AppCard title="🧠 Focus Timer" subtitle="Log intentional focus sessions" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Type *</label>
          <input
            type="text"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            placeholder="Builder / Review"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (mins) *</label>
          <input
            type="text"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(e.target.value)}
            placeholder="90"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={sessionNote}
            onChange={(e) => setSessionNote(e.target.value)}
            placeholder="What moved forward?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !sessionType.trim() || !sessionDuration.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving Focus Session' : 'Save Focus Session'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Focus session logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
