'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementSmartContractSecurityPatternValidatorProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractSecurityPatternValidator({
  achievementId,
}: OnchainAchievementSmartContractSecurityPatternValidatorProps) {
  const { address, isConnected } = useAccount()
  const [validatorId, setValidatorId] = useState('')
  const [patternCount, setPatternCount] = useState('')
  const [patternType, setPatternType] = useState('access-control')
  const [validatorStatus, setValidatorStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementSmartContractSecurityPatternValidator')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !validatorId || !patternCount) return

    try {
      const proofHash = keccak256(toBytes(`${validatorId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logSmartContractSecurityPatternValidator',
        args: [
          achievementId,
          validatorId,
          BigInt(patternCount),
          patternType,
          proofHash,
          validatorStatus,
        ],
      })
    } catch (error) {
      console.error('Security pattern validator submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Smart Contract Security Pattern Validator"
      subtitle="Validate security patterns in smart contracts"
      accent="pink"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pattern Count *
          </label>
          <input
            type="number"
            value={patternCount}
            onChange={(e) => setPatternCount(e.target.value)}
            placeholder="8"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pattern Type *
          </label>
          <select
            value={patternType}
            onChange={(e) => setPatternType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            <option value="access-control">Access Control</option>
            <option value="reentrancy">Reentrancy Guard</option>
            <option value="overflow">Overflow Protection</option>
            <option value="upgrade">Upgrade Pattern</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={validatorStatus}
            onChange={(e) => setValidatorStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="scanning">Scanning</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !validatorId || !patternCount}
          className="w-full rounded-lg bg-pink-600 text-white py-3 px-4 font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Validated!'
                : 'Validate Patterns'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Security pattern validation recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

