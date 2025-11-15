'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainVotingProps {
  achievementId: bigint
}

export default function OnchainVoting({ achievementId }: OnchainVotingProps) {
  const { address } = useAccount()
  const [voteType, setVoteType] = useState<'upvote' | 'downvote' | null>(null)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const castVote = async (type: 'upvote' | 'downvote') => {
    if (!address) return
    
    setVoteType(type)
    const reactionType = type === 'upvote' ? 'vote_up' : 'vote_down'
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addReaction',
      args: [achievementId, reactionType],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🗳️ Onchain Voting</h3>
      
      <div className="flex gap-4">
        <button
          onClick={() => castVote('upvote')}
          disabled={isPending || isConfirming}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : '↑ Upvote'}
        </button>
        
        <button
          onClick={() => castVote('downvote')}
          disabled={isPending || isConfirming}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : '↓ Downvote'}
        </button>
      </div>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Vote recorded onchain
        </div>
      )}
    </div>
  )
}

