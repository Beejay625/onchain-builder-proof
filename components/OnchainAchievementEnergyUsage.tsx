'use client'

import { useState } from 'react'

export default function OnchainAchievementEnergyUsage() {
  const [baseline, setBaseline] = useState('0')
  const [current, setCurrent] = useState('0')
  const [offset, setOffset] = useState('0')

  const delta = Number(current || 0) - Number(baseline || 0) - Number(offset || 0)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Energy Usage Impact</h2>
      <p className="text-gray-600 mb-4">
        Estimate the net energy delta introduced by an achievement rollout.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Baseline (kWh)</label>
          <input
            className="w-full border rounded-lg p-2"
            type="number"
            value={baseline}
            onChange={(e) => setBaseline(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Current</label>
          <input
            className="w-full border rounded-lg p-2"
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Offsets</label>
          <input
            className="w-full border rounded-lg p-2"
            type="number"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
          />
        </div>
      </div>
      <div className="p-4 bg-slate-50 rounded-lg">
        <p className="text-gray-500 text-sm">Net Delta</p>
        <p className={`text-3xl font-bold ${delta > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {delta.toFixed(2)} kWh
        </p>
      </div>
    </div>
  )
}
