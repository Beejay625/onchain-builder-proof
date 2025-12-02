'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementDecentralizedCodeComplianceFrameworkProps {
  achievementId: bigint
}

export default function OnchainAchievementDecentralizedCodeComplianceFramework({
  achievementId,
}: OnchainAchievementDecentralizedCodeComplianceFrameworkProps) {
  const { address, isConnected } = useAccount()
  const [frameworkId, setFrameworkId] = useState('')
  const [complianceStandard, setComplianceStandard] = useState('GDPR')
  const [complianceScore, setComplianceScore] = useState('')
  const [frameworkStatus, setFrameworkStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementDecentralizedCodeComplianceFramework')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !frameworkId || !complianceScore) return

    try {
      const proofHash = keccak256(toBytes(`${frameworkId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logDecentralizedCodeComplianceFramework',
        args: [
          achievementId,
          frameworkId,
          complianceStandard,
          BigInt(complianceScore),
          proofHash,
          frameworkStatus,
        ],
      })
    } catch (error) {
      console.error('Compliance framework submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Decentralized Code Compliance Framework"
      subtitle="Manage compliance frameworks for decentralized code"
      accent="emerald"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Framework ID *
          </label>
          <input
            type="text"
            value={frameworkId}
            onChange={(e) => setFrameworkId(e.target.value)}
            placeholder="framework-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compliance Standard *
          </label>
          <select
            value={complianceStandard}
            onChange={(e) => setComplianceStandard(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          >
            <option value="GDPR">GDPR</option>
            <option value="HIPAA">HIPAA</option>
            <option value="SOC2">SOC2</option>
            <option value="ISO27001">ISO27001</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compliance Score (1-100) *
          </label>
          <input
            type="number"
            value={complianceScore}
            onChange={(e) => setComplianceScore(e.target.value)}
            placeholder="95"
            min="1"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={frameworkStatus}
            onChange={(e) => setFrameworkStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="review">Under Review</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !frameworkId || !complianceScore}
          className="w-full rounded-lg bg-emerald-600 text-white py-3 px-4 font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Framework Created!'
                : 'Create Framework'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Compliance framework created!</p>
        )}
      </div>
    </AppCard>
  )
}

