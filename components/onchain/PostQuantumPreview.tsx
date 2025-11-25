'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function PostQuantumPreview() {
  const { isConnected } = useAccount()
  const [schemes, setSchemes] = useState(2)
  const [pilotUsers, setPilotUsers] = useState(11)

  const readiness = useMemo(
    () => Math.min(100, Math.round(((schemes * 2 + pilotUsers) / 50) * 100)),
    [schemes, pilotUsers]
  )

  if (!isFeatureEnabled('postQuantumPreview') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🔐 Post-Quantum Preview"
      subtitle="Track PQ-ready cryptography pilots before global rollout."
      accent="teal"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Schemes Tested</label>
            <input
              type="number"
              value={schemes}
              onChange={(e) => setSchemes(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Pilot Users</label>
            <input
              type="number"
              value={pilotUsers}
              onChange={(e) => setPilotUsers(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <StatBadge label="Readiness" value={`${readiness}%`} accent="teal" />
        <p className="text-xs text-gray-500">
          Readiness score mixes tested schemes and real pilot participants.
        </p>
      </div>
    </AppCard>
  )
}

