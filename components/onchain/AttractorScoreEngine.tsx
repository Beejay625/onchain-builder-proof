'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AttractorScoreEngine() {
  const { isConnected } = useAccount()
  const [signals, setSignals] = useState(12)
  const [weight, setWeight] = useState(1.3)

  const score = useMemo(() => Math.round(signals * weight * 10), [signals, weight])

  if (!isFeatureEnabled('attractorScoreEngine') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🧲 Attractor Score Engine"
      subtitle="Quantify how attractive a builder’s activity is to new collaborators."
      accent="rose"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Signals</label>
            <input
              type="number"
              value={signals}
              onChange={(e) => setSignals(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Weight</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <StatBadge label="Attractor Score" value={score.toString()} accent="rose" />
        <p className="text-xs text-gray-500">
          Higher scores reflect how strongly a builder attracts endorsements, references, and co-signs.
        </p>
      </div>
    </AppCard>
  )
}

