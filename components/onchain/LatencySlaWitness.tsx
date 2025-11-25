'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function LatencySlaWitness() {
  const { isConnected } = useAccount()
  const [p95, setP95] = useState(480)
  const [target, setTarget] = useState(500)

  if (!isFeatureEnabled('latencySlaWitness') || !isConnected) {
    return null
  }

  const delta = target - p95

  return (
    <AppCard
      title="⏱️ Latency SLA Witness"
      subtitle="Attest to latency performance before issuing guarantees."
      accent="sky"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">P95 (ms)</label>
            <input
              type="number"
              value={p95}
              onChange={(e) => setP95(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Target (ms)</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <StatBadge label="Delta" value={`${delta}ms`} accent={delta >= 0 ? 'sky' : 'red'} />
        <p className="text-xs text-gray-500">Positive delta means we are within SLA envelope.</p>
      </div>
    </AppCard>
  )
}

