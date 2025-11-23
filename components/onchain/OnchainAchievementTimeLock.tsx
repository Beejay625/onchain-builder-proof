'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTimeLockProps {
  achievementId: bigint
}

export default function OnchainAchievementTimeLock({ achievementId }: OnchainAchievementTimeLockProps) {
  const { address, isConnected } = useAccount()
  const [lockUntil, setLockUntil] = useState('')
  const [timeLockReason, setTimeLockReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createTimeLock = async () => {
    if (!isConnected || !address || !lockUntil) return

    try {
      const unlockTimestamp = Math.floor(new Date(lockUntil).getTime() / 1000)
      const timeLockData = `TIMELOCK:unlock:${unlockTimestamp}:reason:${timeLockReason || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, timeLockData],
      })
    } catch (error) {
      console.error('Time lock creation failed:', error)
    }
  }

  return (
    <AppCard title="⏰ Achievement Time Lock" subtitle="Create time-lock for achievement" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unlock Date/Time *</label>
          <input
            type="datetime-local"
            value={lockUntil}
            onChange={(e) => setLockUntil(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Lock Reason (optional)</label>
          <input
            type="text"
            value={timeLockReason}
            onChange={(e) => setTimeLockReason(e.target.value)}
            placeholder="Why is this time-locked?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={createTimeLock}
          disabled={isPending || isConfirming || !isConnected || !lockUntil}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Time Lock'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Time lock created until {new Date(lockUntil).toLocaleString()}
          </div>
        )}
      </div>
    </AppCard>
  )
}

