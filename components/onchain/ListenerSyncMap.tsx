'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ListenerSyncMap() {
  const { isConnected } = useAccount()
  const [listeners, setListeners] = useState(6)
  const [lag, setLag] = useState(12)

  const health = useMemo(() => (lag < 20 ? 'Healthy' : 'Lagging'), [lag])

  if (!isFeatureEnabled('listenerSyncMap') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🛰 Listener Sync Map"
      subtitle="Visualize event listeners and sync lag."
      accent="purple"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Listeners</label>
            <input
              type="number"
              value={listeners}
              onChange={(e) => setListeners(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Lag (blocks)</label>
            <input
              type="number"
              value={lag}
              onChange={(e) => setLag(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm text-purple-900">
          {listeners} listeners are {health.toLowerCase()} with {lag} block lag.
        </div>
        <p className="text-xs text-gray-500">Use the sync map to target re-syncs before stats degrade.</p>
      </div>
    </AppCard>
  )
}

