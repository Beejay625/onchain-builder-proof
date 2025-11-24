'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementLatencyHeatmapProps {
  achievementId: bigint
}

export default function AchievementLatencyHeatmap({ achievementId }: AchievementLatencyHeatmapProps) {
  const { isConnected } = useAccount()
  const [region, setRegion] = useState('Global')
  const [p95Latency, setP95Latency] = useState('')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, error } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementLatencyHeatmap')) {
    return null
  }

  const handleLogHeatmap = () => {
    if (!isConnected || !p95Latency.trim()) return

    const content = [
      'Latency Heatmap Sample',
      `Achievement: #${achievementId.toString()}`,
      `Region: ${region}`,
      `P95 Latency: ${p95Latency} ms`,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [content],
    })
  }

  return (
    <AppCard title="🌐 Latency Heatmap" subtitle="Capture regional P95 latency samples for transparency" accent="green">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Region / POP</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">P95 latency (ms)</label>
            <input
              type="number"
              min={0}
              value={p95Latency}
              onChange={(e) => setP95Latency(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Observations</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            placeholder="Explain spikes, mitigations, or planned fixes..."
          />
        </div>
        <button
          onClick={handleLogHeatmap}
          disabled={isPending || isConfirming || !isConnected || !p95Latency.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Heatmap Sample'}
        </button>
        {(isSuccess || error) && (
          <div
            className={`rounded-lg border p-3 text-sm ${
              isSuccess ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {isSuccess ? '✅ Latency sample published onchain' : `⚠️ ${error?.message ?? 'Unable to publish latency sample'}`}
          </div>
        )}
      </div>
    </AppCard>
  )
}


