'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface OnchainVotingProps {
  achievementId: bigint
}

export default function OnchainVoting({ achievementId }: OnchainVotingProps) {
  const [voteType, setVoteType] = useState<'upvote' | 'downvote' | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const castVote = async (support: boolean) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'vote',
        args: [achievementId, support],
      })
      setVoteType(support ? 'upvote' : 'downvote')
    } catch (error) {
      console.error('Vote error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🗳️ Vote</h3>
      <div className="flex gap-3">
        <button
          onClick={() => castVote(true)}
          disabled={isPending}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          ↑ Upvote
        </button>
        <button
          onClick={() => castVote(false)}
          disabled={isPending}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
        >
          ↓ Downvote
        </button>
      </div>
      {isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
          ✓ Vote recorded onchain
        </div>
      )}
    </div>
  )
}