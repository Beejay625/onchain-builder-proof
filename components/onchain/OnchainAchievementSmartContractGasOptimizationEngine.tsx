'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementSmartContractGasOptimizationEngineProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractGasOptimizationEngine({
  achievementId,
}: OnchainAchievementSmartContractGasOptimizationEngineProps) {
  const { address, isConnected } = useAccount()
  const [engineId, setEngineId] = useState('')
  const [gasSavings, setGasSavings] = useState('')
  const [optimizationType, setOptimizationType] = useState('storage')
  const [engineStatus, setEngineStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementSmartContractGasOptimizationEngine')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !engineId || !gasSavings) return

    try {
      const proofHash = keccak256(toBytes(`${engineId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logSmartContractGasOptimizationEngine',
        args: [
          achievementId,
          engineId,
          BigInt(gasSavings),
          optimizationType,
          proofHash,
          engineStatus,
        ],
      })
    } catch (error) {
      console.error('Gas optimization engine submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Smart Contract Gas Optimization Engine"
      subtitle="Optimize gas usage with advanced analysis and automated recommendations"
      accent="amber"
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
            placeholder="gas-opt-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gas Savings (wei) *
          </label>
          <input
            type="number"
            value={gasSavings}
            onChange={(e) => setGasSavings(e.target.value)}
            placeholder="100000"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optimization Type *
          </label>
          <select
            value={optimizationType}
            onChange={(e) => setOptimizationType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          >
            <option value="storage">Storage</option>
            <option value="computation">Computation</option>
            <option value="memory">Memory</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={engineStatus}
            onChange={(e) => setEngineStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="analyzing">Analyzing</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !engineId || !gasSavings}
          className="w-full rounded-lg bg-amber-600 text-white py-3 px-4 font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Optimized!'
                : 'Optimize Gas'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Gas optimization recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

