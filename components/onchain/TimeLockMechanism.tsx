'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface TimeLockMechanismProps {
  achievementId: bigint
}

export default function TimeLockMechanism({ achievementId }: TimeLockMechanismProps) {
  const { address, isConnected } = useAccount()
  const [lockDuration, setLockDuration] = useState(7)
  const [lockReason, setLockReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainTimeLock')) {
    return null
  }

  const handleCreateTimeLock = async () => {
    if (!isConnected || !address) return

    try {
      const unlockTimestamp = Math.floor(Date.now() / 1000) + lockDuration * 24 * 60 * 60
      const content = `Time-Lock Created\nAchievement: #${achievementId.toString()}\nDuration: ${lockDuration} days\nUnlocks: ${new Date(unlockTimestamp * 1000).toISOString()}${lockReason ? `\nReason: ${lockReason}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Time-lock creation failed:', error)
    }
  }

  return (
    <AppCard title="⏳ Time-Lock Mechanism" subtitle="Create time-locks for achievement actions" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lock Duration (days)</label>
          <input
            type="number"
            value={lockDuration}
            onChange={(e) => setLockDuration(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (optional)</label>
          <input
            type="text"
            value={lockReason}
            onChange={(e) => setLockReason(e.target.value)}
            placeholder="Why is this locked?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateTimeLock}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Time-Lock'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Time-lock created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}




