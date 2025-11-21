'use client'

import { useState } from 'react'

const initialQueue = [
  { validator: '0x9A1', eta: '2m' },
  { validator: '0x5B2', eta: '5m' },
]

export default function OnchainAchievementValidatorQueue() {
  const [queue] = useState(initialQueue)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Validator Queue</h2>
      <div className="space-y-3">
        {queue.map((entry, idx) => (
          <div key={idx} className="border rounded-lg p-3 flex justify-between">
            <span className="font-mono">{entry.validator}</span>
            <span className="text-sm text-gray-500">ETA {entry.eta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
