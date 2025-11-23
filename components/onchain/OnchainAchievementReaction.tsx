'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementReactionProps {
  achievementId: bigint
}

export default function OnchainAchievementReaction({ achievementId }: OnchainAchievementReactionProps) {
  const { address, isConnected } = useAccount()
  const [reactionType, setReactionType] = useState<'like' | 'love' | 'celebrate' | 'support'>('like')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const addReaction = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addReaction',
        args: [achievementId, reactionType],
      })
    } catch (error) {
      console.error('Reaction failed:', error)
    }
  }

  return (
    <AppCard title="❤️ Achievement Reaction" subtitle="React to achievements" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reaction Type</label>
          <select
            value={reactionType}
            onChange={(e) => setReactionType(e.target.value as typeof reactionType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="like">👍 Like</option>
            <option value="love">❤️ Love</option>
            <option value="celebrate">🎉 Celebrate</option>
            <option value="support">💪 Support</option>
          </select>
        </div>
        <button
          onClick={addReaction}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Reacting...' : 'Add Reaction'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Reaction added onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

