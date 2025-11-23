'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCommentingProps {
  achievementId: bigint
}

export default function OnchainAchievementCommenting({ achievementId }: OnchainAchievementCommentingProps) {
  const { address, isConnected } = useAccount()
  const [commentText, setCommentText] = useState('')
  const [commentType, setCommentType] = useState<'general' | 'question' | 'feedback' | 'suggestion'>('general')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const addComment = async () => {
    if (!isConnected || !address || !commentText.trim()) return

    try {
      const commentData = `COMMENT:type:${commentType}:text:${commentText}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, commentData],
      })
    } catch (error) {
      console.error('Commenting failed:', error)
    }
  }

  return (
    <AppCard title="💬 Achievement Commenting" subtitle="Add comments to achievements" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment Type</label>
          <select
            value={commentType}
            onChange={(e) => setCommentType(e.target.value as typeof commentType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="general">General</option>
            <option value="question">Question</option>
            <option value="feedback">Feedback</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment *</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={addComment}
          disabled={isPending || isConfirming || !isConnected || !commentText.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Commenting...' : 'Add Comment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Comment added onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

