'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementNameResolution() {
  const { isConnected } = useAccount()
  const [identifier, setIdentifier] = useState('builder.base')
  const [resolved, setResolved] = useState<string | null>(null)

  if (!isFeatureEnabled('achievementNameResolution')) {
    return null
  }

  const handleResolve = () => {
    if (!isConnected || !identifier.trim()) return
    setResolved('0xabcd...7890') // placeholder resolution
  }

  return (
    <AppCard title="🔍 Name Resolution" subtitle="Resolve multi-namespace names (ENS, Lens, Farcaster) to addresses" accent="slate">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Identifier</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleResolve}
          disabled={!isConnected || !identifier.trim()}
          className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-gray-400"
        >
          Resolve Name
        </button>
        {resolved && (
          <div className="rounded-lg bg-gray-50 p-3 text-sm font-mono text-gray-800">{resolved}</div>
        )}
      </div>
    </AppCard>
  )
}

