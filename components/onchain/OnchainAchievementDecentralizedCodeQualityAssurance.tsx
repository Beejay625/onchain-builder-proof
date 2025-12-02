'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementDecentralizedCodeQualityAssuranceProps {
  achievementId: bigint
}

export default function OnchainAchievementDecentralizedCodeQualityAssurance({
  achievementId,
}: OnchainAchievementDecentralizedCodeQualityAssuranceProps) {
  const { address, isConnected } = useAccount()
  const [assuranceId, setAssuranceId] = useState('')
  const [qualityScore, setQualityScore] = useState('')
  const [qualityStandard, setQualityStandard] = useState('ISO-25010')
  const [assuranceStatus, setAssuranceStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementDecentralizedCodeQualityAssurance')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !assuranceId || !qualityScore) return

    try {
      const proofHash = keccak256(toBytes(`${assuranceId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logDecentralizedCodeQualityAssurance',
        args: [
          achievementId,
          assuranceId,
          BigInt(qualityScore),
          qualityStandard,
          proofHash,
          assuranceStatus,
        ],
      })
    } catch (error) {
      console.error('Quality assurance submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Decentralized Code Quality Assurance"
      subtitle="Ensure code quality standards across decentralized development networks"
      accent="teal"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assurance ID *
          </label>
          <input
            type="text"
            value={assuranceId}
            onChange={(e) => setAssuranceId(e.target.value)}
            placeholder="qa-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Score (1-100) *
          </label>
          <input
            type="number"
            value={qualityScore}
            onChange={(e) => setQualityScore(e.target.value)}
            placeholder="85"
            min="1"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Standard *
          </label>
          <select
            value={qualityStandard}
            onChange={(e) => setQualityStandard(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          >
            <option value="ISO-25010">ISO-25010</option>
            <option value="CMMI">CMMI</option>
            <option value="Six-Sigma">Six-Sigma</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={assuranceStatus}
            onChange={(e) => setAssuranceStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="review">Under Review</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !assuranceId || !qualityScore}
          className="w-full rounded-lg bg-teal-600 text-white py-3 px-4 font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Assured!'
                : 'Submit Quality Assurance'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Quality assurance recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

