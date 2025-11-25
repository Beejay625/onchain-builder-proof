'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function DataSovereigntyLedger() {
  const { isConnected } = useAccount()
  const [jurisdictions, setJurisdictions] = useState(3)
  const [exceptions, setExceptions] = useState(1)

  if (!isFeatureEnabled('dataSovereigntyLedger') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🗺️ Data Sovereignty Ledger"
      subtitle="Track jurisdictional requirements tied to builder data."
      accent="indigo"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Jurisdictions</label>
            <input
              type="number"
              value={jurisdictions}
              onChange={(e) => setJurisdictions(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Exceptions</label>
            <input
              type="number"
              value={exceptions}
              onChange={(e) => setExceptions(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <StatBadge label="Coverage" value={`${jurisdictions - exceptions}/${jurisdictions}`} accent="indigo" />
        <p className="text-xs text-gray-500">
          Use the ledger to prove residency-aware storage policies for BuilderProof evidence.
        </p>
      </div>
    </AppCard>
  )
}

