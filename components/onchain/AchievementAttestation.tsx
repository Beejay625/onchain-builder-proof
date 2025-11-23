'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementAttestationProps {
  achievementId: bigint
}

export default function AchievementAttestation({ achievementId }: AchievementAttestationProps) {
  const { address, isConnected } = useAccount()
  const [attestationType, setAttestationType] = useState<'proof' | 'endorsement' | 'verification'>('proof')
  const [attestationContent, setAttestationContent] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAttestation')) {
    return null
  }

  const handleCreateAttestation = async () => {
    if (!isConnected || !address || !attestationContent.trim()) return

    try {
      const content = `Attestation: ${attestationType}\nAchievement: #${achievementId.toString()}\nContent: ${attestationContent}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Attestation creation failed:', error)
    }
  }

  return (
    <AppCard title="✍️ Achievement Attestation" subtitle="Create verifiable attestations for achievements" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attestation Type</label>
          <select
            value={attestationType}
            onChange={(e) => setAttestationType(e.target.value as 'proof' | 'endorsement' | 'verification')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="proof">Proof</option>
            <option value="endorsement">Endorsement</option>
            <option value="verification">Verification</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attestation Content</label>
          <textarea
            value={attestationContent}
            onChange={(e) => setAttestationContent(e.target.value)}
            placeholder="Your attestation statement..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateAttestation}
          disabled={isPending || isConfirming || !isConnected || !attestationContent.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Attestation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Attestation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

