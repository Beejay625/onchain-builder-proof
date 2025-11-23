'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCommentsModerationProps {
  achievementId: bigint
}

export default function AchievementCommentsModeration({ achievementId }: AchievementCommentsModerationProps) {
  const { address, isConnected } = useAccount()
  const [moderationAction, setModerationAction] = useState<'approve' | 'delete' | 'flag'>('approve')
  const [commentId, setCommentId] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCommentsModeration')) {
    return null
  }

  const handleModerate = async () => {
    if (!isConnected || !address || !commentId.trim()) return

    try {
      const content = `Comment Moderation\nAchievement: #${achievementId.toString()}\nComment: ${commentId}\nAction: ${moderationAction}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Moderation failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ Achievement Comments Moderation" subtitle="Moderate comments on achievements" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment ID</label>
          <input
            type="text"
            value={commentId}
            onChange={(e) => setCommentId(e.target.value)}
            placeholder="Comment identifier"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moderation Action</label>
          <select
            value={moderationAction}
            onChange={(e) => setModerationAction(e.target.value as 'approve' | 'delete' | 'flag')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="approve">Approve</option>
            <option value="delete">Delete</option>
            <option value="flag">Flag for Review</option>
          </select>
        </div>
        <button
          onClick={handleModerate}
          disabled={isPending || isConfirming || !isConnected || !commentId.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Moderating...' : 'Moderate Comment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Comment moderated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

