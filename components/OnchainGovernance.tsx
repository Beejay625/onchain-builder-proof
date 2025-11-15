'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainGovernanceProps {
  achievementId: bigint
}

export default function OnchainGovernance({ achievementId }: OnchainGovernanceProps) {
  const { address } = useAccount()
  const [proposalTitle, setProposalTitle] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createProposal = async () => {
    if (!address || !proposalTitle.trim()) return
    
    const proposalData = `GOVERNANCE_PROPOSAL: ${proposalTitle} - ${proposalDescription || 'No description'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, proposalData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏛️ Onchain Governance</h3>
      
      <input
        type="text"
        value={proposalTitle}
        onChange={(e) => setProposalTitle(e.target.value)}
        placeholder="Proposal title"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={proposalDescription}
        onChange={(e) => setProposalDescription(e.target.value)}
        placeholder="Proposal description..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <button
        onClick={createProposal}
        disabled={isPending || isConfirming || !proposalTitle.trim()}
        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Governance Proposal'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Proposal created onchain
        </div>
      )}
    </div>
  )
}

