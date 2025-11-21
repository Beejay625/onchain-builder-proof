'use client'

import { useState } from 'react'

export default function OnchainAchievementPerformanceGuarantee() {
  const [target, setTarget] = useState('99.5')
  const [actual, setActual] = useState('99.1')

  const status = Number(actual) >= Number(target) ? '✅ On Track' : '⚠️ Review Needed'

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Performance Guarantee</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-500">Target uptime %</label>
          <input
            className="w-full border rounded-lg p-2"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Actual uptime %</label>
          <input
            className="w-full border rounded-lg p-2"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
          />
        </div>
      </div>
      <p className="text-lg font-semibold">{status}</p>
    </div>
  )
}
