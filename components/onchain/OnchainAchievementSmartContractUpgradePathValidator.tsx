'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementSmartContractUpgradePathValidatorProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractUpgradePathValidator({
  achievementId,
}: OnchainAchievementSmartContractUpgradePathValidatorProps) {
  const { address, isConnected } = useAccount()
  const [validatorId, setValidatorId] = useState('')
  const [upgradePath, setUpgradePath] = useState('')
  const [riskAssessment, setRiskAssessment] = useState('5')
  const [validatorStatus, setValidatorStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementSmartContractUpgradePathValidator')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !validatorId || !upgradePath) return

    try {
      const proofHash = keccak256(toBytes(`${validatorId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logSmartContractUpgradePathValidator',
        args: [
          achievementId,
          validatorId,
          upgradePath,
          BigInt(riskAssessment),
          proofHash,
          validatorStatus,
        ],
      })
    } catch (error) {
      console.error('Upgrade path validator submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Smart Contract Upgrade Path Validator"
      subtitle="Validate and assess risk for smart contract upgrade paths"
      accent="orange"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upgrade Path *
          </label>
          <input
            type="text"
            value={upgradePath}
            onChange={(e) => setUpgradePath(e.target.value)}
            placeholder="v1.0.0 -> v2.0.0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Assessment (0-10) *
          </label>
          <input
            type="number"
            value={riskAssessment}
            onChange={(e) => setRiskAssessment(e.target.value)}
            placeholder="5"
            min="0"
            max="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !validatorId || !upgradePath}
          className="w-full rounded-lg bg-orange-600 text-white py-3 px-4 font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Validated!'
                : 'Validate Upgrade Path'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Upgrade path validation recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

