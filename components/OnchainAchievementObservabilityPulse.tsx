'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementObservabilityPulseProps {
  achievementId: bigint
}

export default function OnchainAchievementObservabilityPulse({ achievementId }: OnchainAchievementObservabilityPulseProps) {
  const { address } = useAccount()
  const [uptime, setUptime] = useState('99.95%')
  const [latency, setLatency] = useState('320ms p95')
  const [incidentCount, setIncidentCount] = useState('0 in last 7d')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishPulse = () => {
    if (!address) return

    const payload = `OBS_PULSE|uptime:${uptime}|latency:${latency}|incidents:${incidentCount}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-50 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📡 Observability Pulse</h3>
      <p className="text-sm text-gray-600 mb-4">Stream real-time reliability stats to the achievement ledger.</p>

      <div className="space-y-3 mb-4">
        <input value={uptime} onChange={(e) => setUptime(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Uptime" />
        <input value={latency} onChange={(e) => setLatency(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Latency" />
        <input value={incidentCount} onChange={(e) => setIncidentCount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Incident count" />
      </div>

      <button
        onClick={publishPulse}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing pulse...' : 'Publish observability pulse'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Observability pulse recorded.
        </div>
      )}
    </section>
  )
}
