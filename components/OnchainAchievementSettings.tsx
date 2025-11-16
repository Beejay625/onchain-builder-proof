'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementSettings() {
  const { address } = useAccount()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Achievement Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Email notifications</span>
          <input type="checkbox" className="w-4 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Push notifications</span>
          <input type="checkbox" className="w-4 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Public profile</span>
          <input type="checkbox" defaultChecked className="w-4 h-4" />
        </div>
        <p className="text-sm text-gray-500">
          Settings saved onchain for {address?.slice(0, 6)}...
        </p>
      </div>
    </div>
  )
}

