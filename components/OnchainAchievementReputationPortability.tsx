'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementReputationPortability() {
  const { address } = useAccount()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Reputation Portability</h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          Transfer reputation across chains
        </p>
        <p className="text-sm text-gray-500 font-mono break-all">{address || 'Not connected'}</p>
        <p className="text-sm text-gray-500">
          Portable across all EVM chains
        </p>
      </div>
    </div>
  )
}

