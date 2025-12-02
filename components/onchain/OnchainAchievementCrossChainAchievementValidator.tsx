'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementCrossChainAchievementValidatorProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainAchievementValidator({
  achievementId,
}: OnchainAchievementCrossChainAchievementValidatorProps) {
  const { address, isConnected } = useAccount()
  const [validatorId, setValidatorId] = useState('')
  const [chainCount, setChainCount] = useState('')
  const [validationCount, setValidationCount] = useState('')
  const [validatorStatus, setValidatorStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementCrossChainAchievementValidator')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !validatorId || !chainCount || !validationCount) return

    try {
      const proofHash = keccak256(toBytes(`${validatorId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logCrossChainAchievementValidator',
        args: [
          achievementId,
          validatorId,
          BigInt(chainCount),
          BigInt(validationCount),
          proofHash,
          validatorStatus,
        ],
      })
    } catch (error) {
      console.error('Cross-chain achievement validator submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Cross-Chain Achievement Validator"
      subtitle="Validate achievements across multiple blockchain networks"
      accent="cyan"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Validator ID *
          </label>
          <input
            type="text"
            value={validatorId}
            onChange={(e) => setValidatorId(e.target.value)}
            placeholder="validator-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Validation Count *
          </label>
          <input
            type="number"
            value={validationCount}
            onChange={(e) => setValidationCount(e.target.value)}
            placeholder="50"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={validatorStatus}
            onChange={(e) => setValidatorStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !validatorId || !chainCount || !validationCount}
          className="w-full rounded-lg bg-cyan-600 text-white py-3 px-4 font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Validated!'
                : 'Validate Achievement'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Achievement validation successful!</p>
        )}
      </div>
    </AppCard>
  )
}

