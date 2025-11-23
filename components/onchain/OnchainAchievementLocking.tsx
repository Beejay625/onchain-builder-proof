'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementLockingProps {
  achievementId: bigint
}

export default function OnchainAchievementLocking({ achievementId }: OnchainAchievementLockingProps) {
  const { address, isConnected } = useAccount()
  const [lockReason, setLockReason] = useState('')
  const [lockDuration, setLockDuration] = useState(0)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const lockAchievement = async () => {
    if (!isConnected || !address || !lockReason.trim()) return

    try {
      const unlockTimestamp = lockDuration > 0 ? Date.now() + (lockDuration * 24 * 60 * 60 * 1000) : 0
      const lockData = `LOCK:${lockReason}:duration:${lockDuration}:unlock:${unlockTimestamp}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, lockData],
      })
    } catch (error) {
      console.error('Locking failed:', error)
    }
  }

  return (
    <AppCard title="🔒 Achievement Locking" subtitle="Lock achievement with duration" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lock Reason *</label>
          <textarea
            value={lockReason}
            onChange={(e) => setLockReason(e.target.value)}
            placeholder="Why are you locking this achievement?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lock Duration (days, 0 = permanent)</label>
          <input
            type="number"
            min="0"
            value={lockDuration}
            onChange={(e) => setLockDuration(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={lockAchievement}
          disabled={isPending || isConfirming || !isConnected || !lockReason.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Locking...' : 'Lock Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Achievement locked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

