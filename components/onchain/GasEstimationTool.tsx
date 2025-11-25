'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function GasEstimationTool() {
  const { isConnected } = useAccount()
  const [calldataBytes, setCalldataBytes] = useState('512')
  const [estimate, setEstimate] = useState<number | null>(null)

  if (!isFeatureEnabled('gasEstimationTool')) {
    return null
  }

  const handleEstimate = () => {
    if (!isConnected || !calldataBytes.trim()) return
    const bytes = Number(calldataBytes) || 0
    setEstimate(21000 + bytes * 16)
  }

  return (
    <AppCard title="⛽ Gas Estimation" subtitle="Estimate gas usage before composing BuilderProof actions" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calldata Size (bytes)</label>
          <input
            type="number"
            value={calldataBytes}
            onChange={(e) => setCalldataBytes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleEstimate}
          disabled={!isConnected || !calldataBytes.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          Estimate Gas
        </button>
        {estimate !== null && (
          <StatBadge label="Estimated Gas" value={`${estimate.toLocaleString()} units`} accent="yellow" />
        )}
      </div>
    </AppCard>
  )
}

