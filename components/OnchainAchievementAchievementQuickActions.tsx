'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementAchievementQuickActions() {
  const { address } = useAccount()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          Mint
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
          Share
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
          Export
        </button>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm">
          Settings
        </button>
      </div>
    </div>
  )
}

