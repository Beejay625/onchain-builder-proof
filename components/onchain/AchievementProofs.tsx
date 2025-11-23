'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementProofsProps {
  achievementId: bigint
}

export default function AchievementProofs({ achievementId }: AchievementProofsProps) {
  const { address, isConnected } = useAccount()
  const [proofPurpose, setProofPurpose] = useState('verification')
  const [proofFormat, setProofFormat] = useState<'json-ld' | 'jwt'>('json-ld')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementProofs')) {
    return null
  }

  const handleGenerateProof = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Achievement Proof Generated\nAchievement: #${achievementId.toString()}\nPurpose: ${proofPurpose}\nFormat: ${proofFormat}\nTimestamp: ${new Date().toISOString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Proof generation failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Achievement Proofs" subtitle="Generate verifiable proofs for achievements" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Purpose</label>
          <input
            type="text"
            value={proofPurpose}
            onChange={(e) => setProofPurpose(e.target.value)}
            placeholder="e.g., verification, attestation"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Format</label>
          <select
            value={proofFormat}
            onChange={(e) => setProofFormat(e.target.value as 'json-ld' | 'jwt')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="json-ld">JSON-LD</option>
            <option value="jwt">JWT</option>
          </select>
        </div>
        <button
          onClick={handleGenerateProof}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Generating...' : 'Generate Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Proof generated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

