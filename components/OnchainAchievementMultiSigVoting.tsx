'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMultiSigVoting() {
  const { address } = useAccount()
  const [proposalId, setProposalId] = useState('')
  const [vote, setVote] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitVote = async () => {
    if (!address || !proposalId || !vote) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MULTISIG_VOTE:${proposalId}:${vote}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🗳️ Multi-Sig Voting</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Proposal ID"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={vote}
          onChange={(e) => setVote(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select vote</option>
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
          <option value="abstain">Abstain</option>
        </select>
        <button
          onClick={submitVote}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Vote'}
        </button>
        {isSuccess && <p className="text-green-600">Vote submitted onchain!</p>}
      </div>
    </div>
  )
}

