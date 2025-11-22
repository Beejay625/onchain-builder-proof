'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function GovernanceProposals() {
  const { address, isConnected } = useAccount()
  const [proposalTitle, setProposalTitle] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  const [votingDeadline, setVotingDeadline] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainGovernance')) {
    return null
  }

  const handleCreateProposal = async () => {
    if (!isConnected || !address || !proposalTitle.trim() || !proposalDescription.trim()) return

    try {
      const content = `Governance Proposal: ${proposalTitle}\n\n${proposalDescription}${votingDeadline ? `\n\nVoting Deadline: ${votingDeadline}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Proposal creation failed:', error)
    }
  }

  return (
    <AppCard title="🏛️ Governance Proposal" subtitle="Create governance proposals for achievements" accent="teal">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Title</label>
          <input
            type="text"
            value={proposalTitle}
            onChange={(e) => setProposalTitle(e.target.value)}
            placeholder="Proposal title..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            placeholder="Describe your proposal..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Voting Deadline (optional)</label>
          <input
            type="date"
            value={votingDeadline}
            onChange={(e) => setVotingDeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateProposal}
          disabled={isPending || isConfirming || !isConnected || !proposalTitle.trim() || !proposalDescription.trim()}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Proposal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Governance proposal created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

