'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementComplianceAttestationProps {
  achievementId: bigint
}

export default function OnchainAchievementComplianceAttestation({ achievementId }: OnchainAchievementComplianceAttestationProps) {
  const { address, isConnected } = useAccount()
  const [framework, setFramework] = useState<'SOC2' | 'ISO27001' | 'GDPR' | 'Other'>('SOC2')
  const [auditor, setAuditor] = useState('')
  const [attestationSummary, setAttestationSummary] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const submitAttestation = async () => {
    if (!isConnected || !address || !auditor.trim() || !attestationSummary.trim()) return

    try {
      const payload = `COMPLIANCE_ATTEST:framework:${framework}:auditor:${auditor}:summary:${attestationSummary}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Compliance attestation failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ Compliance Attestation" subtitle="Log audit partners and frameworks" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Framework</label>
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value as typeof framework)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="SOC2">SOC 2</option>
            <option value="ISO27001">ISO 27001</option>
            <option value="GDPR">GDPR</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auditor *</label>
          <input
            type="text"
            value={auditor}
            onChange={(e) => setAuditor(e.target.value)}
            placeholder="Auditor firm or validator"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attestation Summary *</label>
          <textarea
            value={attestationSummary}
            onChange={(e) => setAttestationSummary(e.target.value)}
            rows={3}
            placeholder="Summarize the attestation scope"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={submitAttestation}
          disabled={isPending || isConfirming || !isConnected || !auditor.trim() || !attestationSummary.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Attestation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Compliance attestation stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
