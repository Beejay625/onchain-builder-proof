'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementIncidentLogProps {
  achievementId: bigint
}

export default function OnchainAchievementIncidentLog({ achievementId }: OnchainAchievementIncidentLogProps) {
  const { address, isConnected } = useAccount()
  const [incidentSeverity, setIncidentSeverity] = useState('')
  const [incidentSummary, setIncidentSummary] = useState('')
  const [incidentResolution, setIncidentResolution] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !incidentSeverity.trim() || !incidentSummary.trim()) return

    try {
      const payload = `INCIDENT_LOG:severity:${incidentSeverity}:summary:${incidentSummary}:resolution:${incidentResolution || 'pending'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🚨 Incident Log submission failed:', error)
    }
  }

  return (
    <AppCard title="🚨 Incident Log" subtitle="Capture incidents or outages" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity *</label>
          <input
            type="text"
            value={incidentSeverity}
            onChange={(e) => setIncidentSeverity(e.target.value)}
            placeholder="sev-1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Summary *</label>
          <textarea
            value={incidentSummary}
            onChange={(e) => setIncidentSummary(e.target.value)}
            placeholder="Describe impact"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resolution (optional)</label>
          <textarea
            value={incidentResolution}
            onChange={(e) => setIncidentResolution(e.target.value)}
            placeholder="Mitigation steps"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !incidentSeverity.trim() || !incidentSummary.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging Incident' : 'Log Incident'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Incident logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
