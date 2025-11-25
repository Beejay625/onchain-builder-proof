'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AutomationCircuitBreakers() {
  const { isConnected } = useAccount()
  const [threshold, setThreshold] = useState(85)
  const [status, setStatus] = useState<'armed' | 'tripped'>('armed')

  if (!isFeatureEnabled('automationCircuitBreakers') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🧯 Automation Circuit Breakers"
      subtitle="Stop runaway automations when metrics cross blast radius."
      accent="orange"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Usage Threshold (%)</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Breaker Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'armed' | 'tripped')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="armed">Armed</option>
            <option value="tripped">Tripped</option>
          </select>
        </div>
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-900">
          {status === 'armed'
            ? `Breaker armed at ${threshold}% envelope`
            : `Automation paused at ${threshold}% envelope`}
        </div>
        <p className="text-xs text-gray-500">
          Circuit breakers reference orchestrator metrics and can gate BuilderProof workflows automatically.
        </p>
      </div>
    </AppCard>
  )
}

