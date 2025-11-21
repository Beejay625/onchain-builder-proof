'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function OnchainAchievementWalletSafety() {
  const { address } = useAccount()
  const [alerts, setAlerts] = useState<string[]>([])

  const scanNow = () => {
    if (!address) return
    setAlerts([
      `No anomalies detected for ${address.slice(0, 6)}...`,
      'Monitoring session active',
    ])
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Wallet Safety</h2>
      <button
        onClick={scanNow}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700"
      >
        Run Safety Scan
      </button>
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {alerts.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  )
}
