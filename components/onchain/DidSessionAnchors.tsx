'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function DidSessionAnchors() {
  const { isConnected } = useAccount()
  const [sessionId, setSessionId] = useState('did:builder:session/001')
  const [participants, setParticipants] = useState(2)

  if (!isFeatureEnabled('didSessionAnchors') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🔗 DID Session Anchors"
      subtitle="Summaries of DID-authenticated collaboration sessions."
      accent="emerald"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Session Identifier</label>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Participants</label>
          <input
            type="number"
            value={participants}
            onChange={(e) => setParticipants(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <StatBadge label="Anchored Claims" value={(participants * 3).toString()} accent="emerald" />
        <p className="text-xs text-gray-500">
          DID anchors back federated presence proofs for off-chain collaboration rituals.
        </p>
      </div>
    </AppCard>
  )
}

