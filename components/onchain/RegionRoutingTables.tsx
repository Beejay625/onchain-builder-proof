'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

const REGIONS = ['NA', 'EU', 'APAC', 'AFRICA'] as const
type RegionCode = (typeof REGIONS)[number]

export default function RegionRoutingTables() {
  const { isConnected } = useAccount()
  const [activeRegion, setActiveRegion] = useState<RegionCode>('NA')
  const [latency, setLatency] = useState(120)

  if (!isFeatureEnabled('regionRoutingTables') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🌍 Region Routing Tables"
      subtitle="Decide where to route BuilderProof workflows."
      accent="green"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Region</label>
          <div className="grid grid-cols-4 gap-2">
            {REGIONS.map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`rounded-lg border px-2 py-1 text-sm ${
                  activeRegion === region ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Latency (ms)</label>
          <input
            type="number"
            value={latency}
            onChange={(e) => setLatency(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
          Route {activeRegion} with {latency}ms target latency.
        </div>
      </div>
    </AppCard>
  )
}

