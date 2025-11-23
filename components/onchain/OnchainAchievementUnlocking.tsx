'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementUnlockingProps {
  achievementId: bigint
}

export default function OnchainAchievementUnlocking({ achievementId }: OnchainAchievementUnlockingProps) {
  const { address, isConnected } = useAccount()
  const [unlockConditions, setUnlockConditions] = useState('')
  const [unlockType, setUnlockType] = useState<'time' | 'milestone' | 'manual' | 'automatic'>('manual')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const unlockAchievement = async () => {
    if (!isConnected || !address || !unlockConditions.trim()) return

    try {
      const unlockData = `UNLOCK:${unlockType}:${unlockConditions}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, unlockData],
      })
    } catch (error) {
      console.error('Unlocking failed:', error)
    }
  }

  return (
    <AppCard title="🔓 Achievement Unlocking" subtitle="Configure unlock conditions" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unlock Type</label>
          <select
            value={unlockType}
            onChange={(e) => setUnlockType(e.target.value as typeof unlockType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="time">Time-based</option>
            <option value="milestone">Milestone-based</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unlock Conditions *</label>
          <textarea
            value={unlockConditions}
            onChange={(e) => setUnlockConditions(e.target.value)}
            placeholder="Describe unlock conditions..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={unlockAchievement}
          disabled={isPending || isConfirming || !isConnected || !unlockConditions.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Unlocking...' : 'Set Unlock Conditions'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Unlock conditions set onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

