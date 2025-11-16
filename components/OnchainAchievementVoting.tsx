'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementVoting() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [voteType, setVoteType] = useState('upvote')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const castVote = async () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `VOTE: ${voteType}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🗳️ Achievement Voting</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={voteType}
          onChange={(e) => setVoteType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="upvote">Upvote</option>
          <option value="downvote">Downvote</option>
        </select>
        <button
          onClick={castVote}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Voting...' : 'Cast Vote'}
        </button>
        {isSuccess && <p className="text-green-600">Vote cast onchain!</p>}
      </div>
    </div>
  )
}
