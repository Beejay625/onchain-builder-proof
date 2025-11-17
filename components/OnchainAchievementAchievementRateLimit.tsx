'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementRateLimit() {
  const [limit, setLimit] = useState(10)
  const [remaining, setRemaining] = useState(7)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏱️ Rate Limit</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Remaining requests</span>
          <span className="font-bold">{remaining} / {limit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${(remaining / limit) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

