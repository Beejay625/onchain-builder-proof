'use client'

import { useState } from 'react'

export default function OnchainAchievementInvestorBrief() {
  const [metrics, setMetrics] = useState({
    tvl: '250000',
    retention: '82',
    runway: '9',
  })

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">💼 Investor Brief</h2>
      <p className="text-gray-600 mb-4">Summarize essential KPI snapshots alongside achievements.</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="border rounded-lg p-3 text-center">
            <p className="text-xs uppercase tracking-wide text-gray-500">{key}</p>
            <p className="text-2xl font-semibold text-indigo-600">{value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Use this brief when sharing onchain proof decks with ecosystem investors.
      </p>
    </div>
  )
}
