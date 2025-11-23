'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementHighlightProps {
  achievementId: bigint
}

export default function OnchainAchievementHighlight({ achievementId }: OnchainAchievementHighlightProps) {
  const { address, isConnected } = useAccount()
  const [highlightReason, setHighlightReason] = useState('')
  const [highlightDuration, setHighlightDuration] = useState(30)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const highlightAchievement = async () => {
    if (!isConnected || !address || !highlightReason.trim()) return

    try {
      const expiryTimestamp = Date.now() + (highlightDuration * 24 * 60 * 60 * 1000)
      const highlightData = `HIGHLIGHT:reason:${highlightReason}:duration:${highlightDuration}:expiry:${expiryTimestamp}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, highlightData],
      })
    } catch (error) {
      console.error('Highlighting failed:', error)
    }
  }

  const unhighlightAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const unhighlightData = `UNHIGHLIGHT:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, unhighlightData],
      })
    } catch (error) {
      console.error('Unhighlighting failed:', error)
    }
  }

  return (
    <AppCard title="⭐ Achievement Highlight" subtitle="Highlight important achievements" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Reason *</label>
          <textarea
            value={highlightReason}
            onChange={(e) => setHighlightReason(e.target.value)}
            placeholder="Why is this achievement highlighted?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Duration (days)</label>
          <input
            type="number"
            min="1"
            max="365"
            value={highlightDuration}
            onChange={(e) => setHighlightDuration(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={highlightAchievement}
            disabled={isPending || isConfirming || !isConnected || !highlightReason.trim()}
            className="flex-1 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Highlighting...' : 'Highlight'}
          </button>
          <button
            onClick={unhighlightAchievement}
            disabled={isPending || isConfirming || !isConnected}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
          >
            Unhighlight
          </button>
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Highlight status updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

