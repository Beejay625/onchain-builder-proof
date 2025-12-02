'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementSmartContractPerformanceOptimizerProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractPerformanceOptimizer({
  achievementId,
}: OnchainAchievementSmartContractPerformanceOptimizerProps) {
  const { address, isConnected } = useAccount()
  const [optimizerId, setOptimizerId] = useState('')
  const [performanceScore, setPerformanceScore] = useState('')
  const [optimizationType, setOptimizationType] = useState('latency')
  const [optimizerStatus, setOptimizerStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementSmartContractPerformanceOptimizer')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !optimizerId || !performanceScore) return

    try {
      const proofHash = keccak256(toBytes(`${optimizerId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logSmartContractPerformanceOptimizer',
        args: [
          achievementId,
          optimizerId,
          BigInt(performanceScore),
          optimizationType,
          proofHash,
          optimizerStatus,
        ],
      })
    } catch (error) {
      console.error('Performance optimizer submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Smart Contract Performance Optimizer"
      subtitle="Optimize smart contract performance with advanced analytics"
      accent="yellow"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optimizer ID *
          </label>
          <input
            type="text"
            value={optimizerId}
            onChange={(e) => setOptimizerId(e.target.value)}
            placeholder="optimizer-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Performance Score (1-100) *
          </label>
          <input
            type="number"
            value={performanceScore}
            onChange={(e) => setPerformanceScore(e.target.value)}
            placeholder="88"
            min="1"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          >
            <option value="latency">Latency</option>
            <option value="throughput">Throughput</option>
            <option value="resource">Resource Usage</option>
            <option value="multi-objective">Multi-Objective</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={optimizerStatus}
            onChange={(e) => setOptimizerStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="analyzing">Analyzing</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !optimizerId || !performanceScore}
          className="w-full rounded-lg bg-yellow-600 text-white py-3 px-4 font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Optimized!'
                : 'Optimize Performance'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Performance optimization recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

