'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementENSResolution() {
  const { isConnected } = useAccount()
  const [ensName, setEnsName] = useState('builder.eth')
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null)

  if (!isFeatureEnabled('achievementENSResolution')) {
    return null
  }

  const handleResolve = () => {
    if (!isConnected || !ensName.trim()) return
    // deterministic mock for demo purposes
    setResolvedAddress('0x1234...abCD')
  }

  return (
    <AppCard title="🌐 ENS Resolution" subtitle="Resolve ENS names to addresses for quick onchain actions" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ENS Name</label>
          <input
            type="text"
            value={ensName}
            onChange={(e) => setEnsName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleResolve}
          disabled={!isConnected || !ensName.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          Resolve ENS
        </button>
        {resolvedAddress && (
          <StatBadge label="Resolved Address" value={resolvedAddress} accent="green" />
        )}
      </div>
    </AppCard>
  )
}

