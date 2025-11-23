'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementFreezeProps {
  achievementId: bigint
}

export default function OnchainAchievementFreeze({ achievementId }: OnchainAchievementFreezeProps) {
  const { address, isConnected } = useAccount()
  const [freezeReason, setFreezeReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const freezeAchievement = async () => {
    if (!isConnected || !address || !freezeReason.trim()) return

    try {
      const freezeData = `FREEZE:${Date.now()}:${freezeReason}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, freezeData],
      })
    } catch (error) {
      console.error('Freeze failed:', error)
    }
  }

  return (
    <AppCard title="🛑 Freeze Achievement" subtitle="Temporarily freeze achievement state" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Freeze Reason</label>
          <textarea
            value={freezeReason}
            onChange={(e) => setFreezeReason(e.target.value)}
            placeholder="Why are you freezing this achievement?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={freezeAchievement}
          disabled={isPending || isConfirming || !isConnected || !freezeReason.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Freezing...' : 'Freeze Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Achievement frozen onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

