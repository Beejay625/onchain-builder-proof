'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementVotingProps {
  achievementId: bigint
}

export default function AchievementVoting({ achievementId }: AchievementVotingProps) {
  const { address, isConnected } = useAccount()
  const [voteType, setVoteType] = useState<'upvote' | 'downvote'>('upvote')
  const [voteReason, setVoteReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainVoting')) {
    return null
  }

  const handleVote = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Vote: ${voteType}\nAchievement: #${achievementId.toString()}${voteReason ? `\nReason: ${voteReason}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Voting failed:', error)
    }
  }

  return (
    <AppCard title="🗳️ Achievement Voting" subtitle="Vote on achievements with upvote/downvote system" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vote Type</label>
          <select
            value={voteType}
            onChange={(e) => setVoteType(e.target.value as 'upvote' | 'downvote')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="upvote">Upvote</option>
            <option value="downvote">Downvote</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (optional)</label>
          <input
            type="text"
            value={voteReason}
            onChange={(e) => setVoteReason(e.target.value)}
            placeholder="Why are you voting this way?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleVote}
          disabled={isPending || isConfirming || !isConnected}
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:bg-gray-400 ${
            voteType === 'upvote' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {isPending || isConfirming ? 'Voting...' : voteType === 'upvote' ? '👍 Upvote' : '👎 Downvote'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Vote recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

