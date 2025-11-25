'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ComposabilityBlueprintIds() {
  const { isConnected } = useAccount()
  const [modules, setModules] = useState(5)

  const blueprintId = useMemo(() => `bp-${modules.toString(16)}-${modules * 3}`, [modules])

  if (!isFeatureEnabled('composabilityBlueprintIds') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🧱 Composability Blueprint IDs"
      subtitle="Deterministic IDs for achievement composability kits."
      accent="purple"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Module Count</label>
          <input
            type="number"
            value={modules}
            onChange={(e) => setModules(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm font-mono text-purple-900">
          {blueprintId}
        </div>
        <p className="text-xs text-gray-500">
          Use blueprint IDs when referencing pre-approved composition recipes onchain.
        </p>
      </div>
    </AppCard>
  )
}

