'use client'

import { useMemo, useState } from 'react'

export default function OnchainAchievementImpactSimulation() {
  const [users, setUsers] = useState('1000')
  const [conversion, setConversion] = useState('12')
  const [avgValue, setAvgValue] = useState('45')

  const projectedValue = useMemo(() => {
    const u = Number(users) || 0
    const c = Number(conversion) || 0
    const v = Number(avgValue) || 0
    return ((u * c) / 100) * v
  }, [users, conversion, avgValue])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Impact Simulation</h2>
      <p className="text-gray-600 mb-4">Estimate revenue-equivalent impact before deploying onchain.</p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          className="border rounded-lg p-2"
          placeholder="Users"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        />
        <input
          className="border rounded-lg p-2"
          placeholder="Conversion %"
          value={conversion}
          onChange={(e) => setConversion(e.target.value)}
        />
        <input
          className="border rounded-lg p-2"
          placeholder="Avg value"
          value={avgValue}
          onChange={(e) => setAvgValue(e.target.value)}
        />
      </div>
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-gray-500 text-sm">Projected Impact</p>
        <p className="text-3xl font-bold text-green-600">${projectedValue.toFixed(2)}</p>
      </div>
    </div>
  )
}
