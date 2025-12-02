'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementDecentralizedCodeGovernanceEngineProps {
  achievementId: bigint
}

export default function OnchainAchievementDecentralizedCodeGovernanceEngine({
  achievementId,
}: OnchainAchievementDecentralizedCodeGovernanceEngineProps) {
  const { address, isConnected } = useAccount()
  const [engineId, setEngineId] = useState('')
  const [proposalCount, setProposalCount] = useState('')
  const [votingMechanism, setVotingMechanism] = useState('quadratic')
  const [engineStatus, setEngineStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementDecentralizedCodeGovernanceEngine')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !engineId || !proposalCount) return

    try {
      const proofHash = keccak256(toBytes(`${engineId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logDecentralizedCodeGovernanceEngine',
        args: [
          achievementId,
          engineId,
          BigInt(proposalCount),
          votingMechanism,
          proofHash,
          engineStatus,
        ],
      })
    } catch (error) {
      console.error('Governance engine submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Decentralized Code Governance Engine"
      subtitle="Governance engine for decentralized code repositories"
      accent="purple"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engine ID *
          </label>
          <input
            type="text"
            value={engineId}
            onChange={(e) => setEngineId(e.target.value)}
            placeholder="governance-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proposal Count *
          </label>
          <input
            type="number"
            value={proposalCount}
            onChange={(e) => setProposalCount(e.target.value)}
            placeholder="12"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voting Mechanism *
          </label>
          <select
            value={votingMechanism}
            onChange={(e) => setVotingMechanism(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="quadratic">Quadratic</option>
            <option value="weighted">Weighted</option>
            <option value="one-vote">One Vote Per Address</option>
            <option value="delegated">Delegated</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={engineStatus}
            onChange={(e) => setEngineStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="upgrading">Upgrading</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !engineId || !proposalCount}
          className="w-full rounded-lg bg-purple-600 text-white py-3 px-4 font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Deployed!'
                : 'Deploy Governance Engine'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Governance engine deployed!</p>
        )}
      </div>
    </AppCard>
  )
}

