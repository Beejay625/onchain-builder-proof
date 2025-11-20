'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationGovernanceToken() {
  const { address, isConnected } = useAccount()
  const [proposalId, setProposalId] = useState('')
  const [voteAmount, setVoteAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleVote = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'voteWithGovernanceToken',
        args: [BigInt(proposalId), BigInt(voteAmount)],
      })
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🗳️ Governance Tokens</h3>
        <p className="text-gray-600">Connect wallet to vote</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🗳️ Governance Token Voting</h3>
      <p className="text-gray-600 mb-4">
        Vote on proposals using governance tokens onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Proposal ID</label>
          <input
            type="text"
            value={proposalId}
            onChange={(e) => setProposalId(e.target.value)}
            placeholder="Enter proposal ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Vote Amount</label>
          <input
            type="number"
            value={voteAmount}
            onChange={(e) => setVoteAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleVote}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Voting...' : '🗳️ Vote'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Vote cast successfully
          </div>
        )}
      </div>
    </div>
  )
}
