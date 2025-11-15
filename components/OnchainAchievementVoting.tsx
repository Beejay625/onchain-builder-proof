'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementVoting() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: postId ? [BigInt(postId)] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const castVote = async () => {
    if (!address || !postId || !vote) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'addReaction',
      args: [BigInt(postId), vote === 'up' ? 'upvote' : 'downvote'],
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
        <div className="flex gap-4">
          <button
            onClick={() => setVote('up')}
            className={`flex-1 px-4 py-2 rounded-lg ${vote === 'up' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            👍 Upvote
          </button>
          <button
            onClick={() => setVote('down')}
            className={`flex-1 px-4 py-2 rounded-lg ${vote === 'down' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            👎 Downvote
          </button>
        </div>
        <button
          onClick={castVote}
          disabled={isPending || isConfirming || !vote}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Voting...' : 'Cast Vote'}
        </button>
        {isSuccess && <p className="text-green-600">Vote cast onchain!</p>}
      </div>
    </div>
  )
}

