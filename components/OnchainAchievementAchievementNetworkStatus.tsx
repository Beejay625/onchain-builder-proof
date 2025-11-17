'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementAchievementNetworkStatus() {
  const { isConnected } = useAccount()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🟢 Network Status</h2>
      <div className="text-center">
        <div className={`inline-block px-4 py-2 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="text-lg font-semibold">
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Base network via Reown
        </p>
      </div>
    </div>
  )
}

