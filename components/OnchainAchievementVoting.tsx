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
    
    const voteData = `VOTE: ${voteType}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, voteData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🗳️ Voting</h3>
      
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="upvote"
            checked={voteType === 'upvote'}
            onChange={(e) => setVoteType(e.target.value as 'upvote')}
          />
          <span>Upvote</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="downvote"
            checked={voteType === 'downvote'}
            onChange={(e) => setVoteType(e.target.value as 'downvote')}
          />
          <span>Downvote</span>
        </label>
      </div>
      
      <button
        onClick={castVote}
        disabled={isPending || isConfirming}
        className={`w-full px-4 py-2 rounded-lg disabled:bg-gray-400 ${
          voteType === 'upvote'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {isPending || isConfirming ? 'Voting...' : `Cast ${voteType} Onchain`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Vote recorded onchain
        </div>
      )}
    </div>
  )
}
