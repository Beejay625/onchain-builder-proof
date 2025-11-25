'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function RecurringRoyaltyIndex() {
  const { isConnected } = useAccount()
  const [aov, setAov] = useState(420)
  const [retention, setRetention] = useState(0.84)

  if (!isFeatureEnabled('recurringRoyaltyIndex') || !isConnected) {
    return null
  }

  const royaltyIndex = Math.round(aov * (retention * 100))

  return (
    <AppCard
      title="💿 Recurring Royalty Index"
      subtitle="Model recurring royalty momentum across BuilderProof drops."
      accent="pink"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Avg Royalty (USD)</label>
          <input
            type="number"
            value={aov}
            onChange={(e) => setAov(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Retention</label>
          <input
            type="number"
            step="0.01"
            value={retention}
            onChange={(e) => setRetention(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
      </div>
      <div className="mt-4">
        <StatBadge label="Royalty Index" value={royaltyIndex.toString()} accent="pink" />
        <p className="mt-2 text-xs text-gray-500">
          Index blends average royalty per achievement and retention to forecast treasury income.
        </p>
      </div>
    </AppCard>
  )
}

