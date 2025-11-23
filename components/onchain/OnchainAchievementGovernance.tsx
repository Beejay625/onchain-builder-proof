'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementGovernanceProps {
  achievementId: bigint
}

export default function OnchainAchievementGovernance({ achievementId }: OnchainAchievementGovernanceProps) {
  const { address, isConnected } = useAccount()
  const [proposalType, setProposalType] = useState<'update' | 'delete' | 'merge' | 'split'>('update')
  const [proposalDescription, setProposalDescription] = useState('')
  const [votingDeadline, setVotingDeadline] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createProposal = async () => {
    if (!isConnected || !address || !proposalDescription.trim()) return

    try {
      const deadlineTimestamp = votingDeadline ? Math.floor(new Date(votingDeadline).getTime() / 1000) : 0
      const proposalData = `GOVERNANCE:type:${proposalType}:description:${proposalDescription}:deadline:${deadlineTimestamp}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, proposalData],
      })
    } catch (error) {
      console.error('Proposal creation failed:', error)
    }
  }

  return (
    <AppCard title="🏛️ Achievement Governance" subtitle="Create governance proposal" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Type</label>
          <select
            value={proposalType}
            onChange={(e) => setProposalType(e.target.value as typeof proposalType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="merge">Merge</option>
            <option value="split">Split</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Description *</label>
          <textarea
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            placeholder="Describe your proposal..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Voting Deadline (optional)</label>
          <input
            type="datetime-local"
            value={votingDeadline}
            onChange={(e) => setVotingDeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={createProposal}
          disabled={isPending || isConfirming || !isConnected || !proposalDescription.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Proposal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Governance proposal created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

