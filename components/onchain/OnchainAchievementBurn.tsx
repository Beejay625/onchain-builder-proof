'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementBurnProps {
  achievementId: bigint
}

export default function OnchainAchievementBurn({ achievementId }: OnchainAchievementBurnProps) {
  const { address, isConnected } = useAccount()
  const [burnReason, setBurnReason] = useState('')
  const [confirmBurn, setConfirmBurn] = useState(false)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const burnAchievement = async () => {
    if (!isConnected || !address || !burnReason.trim() || !confirmBurn) return

    try {
      const burnData = `BURN:${burnReason}:${Date.now()}:PERMANENT`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, burnData],
      })
    } catch (error) {
      console.error('Burn failed:', error)
    }
  }

  return (
    <AppCard title="🔥 Achievement Burn" subtitle="Permanently mark achievement as burned" accent="red">
      <div className="space-y-4">
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-semibold">⚠️ Warning: This action is permanent and cannot be undone.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Burn Reason *</label>
          <textarea
            value={burnReason}
            onChange={(e) => setBurnReason(e.target.value)}
            placeholder="Why are you burning this achievement?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="confirmBurn"
            checked={confirmBurn}
            onChange={(e) => setConfirmBurn(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="confirmBurn" className="text-sm text-gray-700">
            I understand this action is permanent
          </label>
        </div>
        <button
          onClick={burnAchievement}
          disabled={isPending || isConfirming || !isConnected || !burnReason.trim() || !confirmBurn}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Burning...' : 'Burn Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Achievement marked as burned onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

