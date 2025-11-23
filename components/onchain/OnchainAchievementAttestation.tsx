'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementAttestationProps {
  achievementId: bigint
}

export default function OnchainAchievementAttestation({ achievementId }: OnchainAchievementAttestationProps) {
  const { address, isConnected } = useAccount()
  const [attestationStatement, setAttestationStatement] = useState('')
  const [attestationEvidence, setAttestationEvidence] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createAttestation = async () => {
    if (!isConnected || !address || !attestationStatement.trim()) return

    try {
      const attestationData = `ATTESTATION:${attestationStatement}:evidence:${attestationEvidence || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, attestationData],
      })
    } catch (error) {
      console.error('Attestation creation failed:', error)
    }
  }

  return (
    <AppCard title="📜 Achievement Attestation" subtitle="Create verifiable attestation" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attestation Statement *</label>
          <textarea
            value={attestationStatement}
            onChange={(e) => setAttestationStatement(e.target.value)}
            placeholder="I attest that..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Link (optional)</label>
          <input
            type="text"
            value={attestationEvidence}
            onChange={(e) => setAttestationEvidence(e.target.value)}
            placeholder="URL or hash to supporting evidence"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={createAttestation}
          disabled={isPending || isConfirming || !isConnected || !attestationStatement.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Attestation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Attestation created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

