'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementValidationProps {
  achievementId: bigint
}

export default function AchievementValidation({ achievementId }: AchievementValidationProps) {
  const { address, isConnected } = useAccount()
  const [verifierAddress, setVerifierAddress] = useState('')
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | 'pending'>('valid')
  const [validationNotes, setValidationNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementValidation')) {
    return null
  }

  const handleValidate = async () => {
    if (!isConnected || !address || !verifierAddress) return

    try {
      const content = `Achievement Validation\nAchievement: #${achievementId.toString()}\nVerifier: ${verifierAddress}\nResult: ${validationResult}${validationNotes ? `\nNotes: ${validationNotes}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return (
    <AppCard title="✅ Achievement Validation" subtitle="Validate achievements with verifier addresses" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verifier Address</label>
          <input
            type="text"
            value={verifierAddress}
            onChange={(e) => setVerifierAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Validation Result</label>
          <select
            value={validationResult}
            onChange={(e) => setValidationResult(e.target.value as 'valid' | 'invalid' | 'pending')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="valid">Valid</option>
            <option value="invalid">Invalid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Validation Notes (optional)</label>
          <textarea
            value={validationNotes}
            onChange={(e) => setValidationNotes(e.target.value)}
            placeholder="Validation details..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleValidate}
          disabled={isPending || isConfirming || !isConnected || !verifierAddress}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Validating...' : 'Validate Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Validation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

