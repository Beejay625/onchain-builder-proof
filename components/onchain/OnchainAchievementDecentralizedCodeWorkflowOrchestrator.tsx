'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementDecentralizedCodeWorkflowOrchestratorProps {
  achievementId: bigint
}

export default function OnchainAchievementDecentralizedCodeWorkflowOrchestrator({
  achievementId,
}: OnchainAchievementDecentralizedCodeWorkflowOrchestratorProps) {
  const { address, isConnected } = useAccount()
  const [orchestratorId, setOrchestratorId] = useState('')
  const [workflowCount, setWorkflowCount] = useState('')
  const [workflowType, setWorkflowType] = useState('sequential')
  const [orchestratorStatus, setOrchestratorStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementDecentralizedCodeWorkflowOrchestrator')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !orchestratorId || !workflowCount) return

    try {
      const proofHash = keccak256(toBytes(`${orchestratorId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logDecentralizedCodeWorkflowOrchestrator',
        args: [
          achievementId,
          orchestratorId,
          BigInt(workflowCount),
          workflowType,
          proofHash,
          orchestratorStatus,
        ],
      })
    } catch (error) {
      console.error('Workflow orchestrator submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Decentralized Code Workflow Orchestrator"
      subtitle="Orchestrate code workflows across decentralized networks with configurable execution types"
      accent="purple"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orchestrator ID *
          </label>
          <input
            type="text"
            value={orchestratorId}
            onChange={(e) => setOrchestratorId(e.target.value)}
            placeholder="orchestrator-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workflow Count *
          </label>
          <input
            type="number"
            value={workflowCount}
            onChange={(e) => setWorkflowCount(e.target.value)}
            placeholder="5"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workflow Type *
          </label>
          <select
            value={workflowType}
            onChange={(e) => setWorkflowType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="sequential">Sequential</option>
            <option value="parallel">Parallel</option>
            <option value="conditional">Conditional</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={orchestratorStatus}
            onChange={(e) => setOrchestratorStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !orchestratorId || !workflowCount}
          className="w-full rounded-lg bg-purple-600 text-white py-3 px-4 font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Orchestrated!'
                : 'Orchestrate Workflows'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Workflow orchestration successful!</p>
        )}
      </div>
    </AppCard>
  )
}

