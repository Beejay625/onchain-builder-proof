'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function IncidentAutoTriage() {
  const { address, isConnected } = useAccount()
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium')
  const [impact, setImpact] = useState('degraded submission throughput')
  const [playbook, setPlaybook] = useState('rollover to mirror sequencer')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('incidentAutoTriage')) {
    return null
  }

  const handleTriage = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Incident Auto-Triage
Severity: ${severity}
Impact: ${impact}
Playbook: ${playbook}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Incident triage log failed:', error)
    }
  }

  return (
    <AppCard
      title="🚨 Incident Auto-Triage"
      subtitle="Pre-stage mitigations for onchain or infra incidents."
      accent="rose"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Impact</label>
          <input
            type="text"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Playbook</label>
          <textarea
            value={playbook}
            onChange={(e) => setPlaybook(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <button
          onClick={handleTriage}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Publish Triage'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Auto-triage plan anchored
          </div>
        )}
      </div>
    </AppCard>
  )
}

