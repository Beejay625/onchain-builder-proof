'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementModerationProps {
  achievementId: bigint
}

export default function OnchainAchievementModeration({ achievementId }: OnchainAchievementModerationProps) {
  const { address, isConnected } = useAccount()
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'flag' | 'review'>('review')
  const [moderationNote, setModerationNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const moderateAchievement = async () => {
    if (!isConnected || !address || !moderationNote.trim()) return

    try {
      const moderationData = `MODERATION:action:${moderationAction}:note:${moderationNote}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, moderationData],
      })
    } catch (error) {
      console.error('Moderation failed:', error)
    }
  }

  return (
    <AppCard title="⚖️ Achievement Moderation" subtitle="Moderate achievements for quality" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moderation Action</label>
          <select
            value={moderationAction}
            onChange={(e) => setModerationAction(e.target.value as typeof moderationAction)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
            <option value="flag">Flag</option>
            <option value="review">Review</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moderation Note *</label>
          <textarea
            value={moderationNote}
            onChange={(e) => setModerationNote(e.target.value)}
            placeholder="Add moderation notes..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={moderateAchievement}
          disabled={isPending || isConfirming || !isConnected || !moderationNote.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Moderating...' : 'Moderate Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Moderation action recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

