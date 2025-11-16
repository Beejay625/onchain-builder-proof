'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementQuadraticVoting() {
  const { address } = useAccount()
  const [proposalId, setProposalId] = useState('')
  const [votes, setVotes] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const castQuadraticVote = async () => {
    if (!address || !proposalId || !votes) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(proposalId), `QVOTE: ${votes} quadratic votes`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Quadratic Voting</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Proposal ID"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Number of votes"
          value={votes}
          onChange={(e) => setVotes(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={castQuadraticVote}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Voting...' : 'Cast Quadratic Vote'}
        </button>
        {isSuccess && <p className="text-green-600">Vote cast onchain!</p>}
      </div>
    </div>
  )
}

