'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

interface Proposal {
  id: string
  title: string
  description: string
  votesFor: number
  votesAgainst: number
  deadline: number
}

export default function GovernanceVoting() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [voteChoice, setVoteChoice] = useState<'for' | 'against' | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleVote = async (proposalId: string, support: boolean) => {
    try {
      // Vote on proposal via smart contract
      const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            inputs: [
              { name: 'proposalId', type: 'uint256' },
              { name: 'support', type: 'bool' },
            ],
            name: 'vote',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'vote',
        args: [BigInt(proposalId), support],
      })
    } catch (error) {
      console.error('Vote error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🗳️ Governance</h2>
      
      <div className="space-y-4">
        {proposals.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No active proposals</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{proposal.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{proposal.description}</p>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">For</div>
                  <div className="text-lg font-bold text-green-600">{proposal.votesFor}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">Against</div>
                  <div className="text-lg font-bold text-red-600">{proposal.votesAgainst}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleVote(proposal.id, true)}
                  disabled={isPending}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  Vote For
                </button>
                <button
                  onClick={() => handleVote(proposal.id, false)}
                  disabled={isPending}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                >
                  Vote Against
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
