'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes, toHex } from 'viem'

interface OnchainAchievementCrossChainProofAggregatorProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainProofAggregator({
  achievementId,
}: OnchainAchievementCrossChainProofAggregatorProps) {
  const { address, isConnected } = useAccount()
  const [aggregatorId, setAggregatorId] = useState('')
  const [chainCount, setChainCount] = useState('')
  const [proofCount, setProofCount] = useState('')
  const [aggregatorStatus, setAggregatorStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementCrossChainProofAggregator')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !aggregatorId || !chainCount || !proofCount) return

    try {
      const proofHash = keccak256(toBytes(`${aggregatorId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logCrossChainProofAggregator',
        args: [
          achievementId,
          aggregatorId,
          BigInt(chainCount),
          BigInt(proofCount),
          proofHash,
          aggregatorStatus,
        ],
      })
    } catch (error) {
      console.error('Cross-chain proof aggregator submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Cross-Chain Proof Aggregator"
      subtitle="Aggregate proofs across multiple chains with unified verification"
      accent="blue"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aggregator ID *
          </label>
          <input
            type="text"
            value={aggregatorId}
            onChange={(e) => setAggregatorId(e.target.value)}
            placeholder="aggregator-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chain Count *
          </label>
          <input
            type="number"
            value={chainCount}
            onChange={(e) => setChainCount(e.target.value)}
            placeholder="3"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proof Count *
          </label>
          <input
            type="number"
            value={proofCount}
            onChange={(e) => setProofCount(e.target.value)}
            placeholder="10"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={aggregatorStatus}
            onChange={(e) => setAggregatorStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !aggregatorId || !chainCount || !proofCount}
          className="w-full rounded-lg bg-blue-600 text-white py-3 px-4 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Aggregated!'
                : 'Aggregate Proofs'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Proof aggregation successful!</p>
        )}
      </div>
    </AppCard>
  )
}
