'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementVotingProps {
  achievementId: bigint
}

export default function OnchainAchievementVoting({ achievementId }: OnchainAchievementVotingProps) {
  const { address } = useAccount()
  const [voteType, setVoteType] = useState<'upvote' | 'downvote'>('upvote')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const castVote = async () => {
    if (!address) return
    
    const reactionType = voteType === 'upvote' ? 'vote_up' : 'vote_down'
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addReaction',
      args: [achievementId, reactionType],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🗳️ Onchain Achievement Voting</h3>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setVoteType('upvote')}
          className={`flex-1 px-4 py-2 rounded-lg ${voteType === 'upvote' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          ↑ Upvote
        </button>
        <button
          onClick={() => setVoteType('downvote')}
          className={`flex-1 px-4 py-2 rounded-lg ${voteType === 'downvote' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          ↓ Downvote
        </button>
      </div>
      
      <button
        onClick={castVote}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Voting...' : `Cast ${voteType === 'upvote' ? 'Upvote' : 'Downvote'}`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Vote recorded onchain
        </div>
      )}
    </div>
  )
}
