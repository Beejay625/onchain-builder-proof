'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function JurisdictionalTriggerGates() {
  const { isConnected } = useAccount()
  const [jurisdiction, setJurisdiction] = useState('EU')
  const [trigger, setTrigger] = useState('high-value transfer')
  const [enabled, setEnabled] = useState(true)

  if (!isFeatureEnabled('jurisdictionalTriggerGates') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🚦 Jurisdictional Trigger Gates"
      subtitle="Define policy gates before executing sensitive workflows."
      accent="orange"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Jurisdiction</label>
          <input
            type="text"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Trigger</label>
          <input
            type="text"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="gate-enabled"
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled((prev) => !prev)}
            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <label htmlFor="gate-enabled" className="text-sm text-gray-700">
            Gate Enabled
          </label>
        </div>
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-900">
          {enabled ? 'Gate enforced' : 'Gate bypassed'} for {jurisdiction} when {trigger} detected.
        </div>
      </div>
    </AppCard>
  )
}

