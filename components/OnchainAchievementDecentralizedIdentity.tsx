'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementDecentralizedIdentity() {
  const { address } = useAccount()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🆔 Decentralized Identity</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-mono break-all">{address || 'Not connected'}</p>
        <p className="text-gray-600">
          Your onchain identity
        </p>
        <p className="text-sm text-gray-500">
          Self-sovereign identity on blockchain
        </p>
      </div>
    </div>
  )
}

