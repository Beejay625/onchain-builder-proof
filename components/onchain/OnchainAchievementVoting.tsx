'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementVotingProps {
  achievementId: bigint
  proposalId?: string
}

export default function OnchainAchievementVoting({ achievementId, proposalId }: OnchainAchievementVotingProps) {
  const { address, isConnected } = useAccount()
  const [vote, setVote] = useState<'yes' | 'no' | 'abstain'>('yes')
  const [voteWeight, setVoteWeight] = useState('1')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const castVote = async () => {
    if (!isConnected || !address) return

    try {
      const voteData = `VOTE:proposal:${proposalId || 'N/A'}:vote:${vote}:weight:${voteWeight}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, voteData],
      })
    } catch (error) {
      console.error('Voting failed:', error)
    }
  }

  return (
    <AppCard title="🗳️ Achievement Voting" subtitle="Cast vote on achievement proposal" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vote</label>
          <select
            value={vote}
            onChange={(e) => setVote(e.target.value as typeof vote)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="abstain">Abstain</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vote Weight (optional)</label>
          <input
            type="text"
            value={voteWeight}
            onChange={(e) => setVoteWeight(e.target.value)}
            placeholder="1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={castVote}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Voting...' : 'Cast Vote'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Vote cast onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

