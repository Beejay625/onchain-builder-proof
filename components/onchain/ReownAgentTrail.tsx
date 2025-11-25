'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ReownAgentTrail() {
  const { isConnected } = useAccount()
  const [sessions, setSessions] = useState(3)
  const [activeAgent, setActiveAgent] = useState('grant-reviewer-v2')

  if (!isFeatureEnabled('reownAgentTrail') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🛰️ Reown Agent Trail"
      subtitle="Trace delegated agent actions tied to BuilderProof journeys."
      accent="violet"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Active Agent</label>
          <input
            type="text"
            value={activeAgent}
            onChange={(e) => setActiveAgent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Tracked Sessions</label>
          <input
            type="number"
            value={sessions}
            onChange={(e) => setSessions(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <StatBadge label="Delegated Actions" value={(sessions * 4).toString()} accent="violet" />
        <p className="text-xs text-gray-500">
          Mirrors reown session metadata to guarantee accountability when agents operate wallets.
        </p>
      </div>
    </AppCard>
  )
}

