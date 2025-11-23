'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementMultiplierProps {
  achievementId: bigint
}

export default function OnchainAchievementMultiplier({ achievementId }: OnchainAchievementMultiplierProps) {
  const { address, isConnected } = useAccount()
  const [multiplier, setMultiplier] = useState(1.0)
  const [multiplierReason, setMultiplierReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const setMultiplierValue = async () => {
    if (!isConnected || !address) return

    try {
      const multiplierData = `MULTIPLIER:${multiplier}:${multiplierReason || 'Multiplier set'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, multiplierData],
      })
    } catch (error) {
      console.error('Multiplier setting failed:', error)
    }
  }

  return (
    <AppCard title="✨ Achievement Multiplier" subtitle="Set reputation/weight multiplier" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Multiplier Value</label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="10"
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Current multiplier: {multiplier}x</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (optional)</label>
          <input
            type="text"
            value={multiplierReason}
            onChange={(e) => setMultiplierReason(e.target.value)}
            placeholder="Why this multiplier?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={setMultiplierValue}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Multiplier'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Multiplier {multiplier}x set onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

