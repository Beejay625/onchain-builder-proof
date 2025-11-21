'use client'

import { useState } from 'react'

const alertTemplates = [
  { title: 'Spam surge detected', severity: 'high' },
  { title: 'Moderation backlog', severity: 'medium' },
]

export default function OnchainAchievementRiskAlerts() {
  const [alerts, setAlerts] = useState(alertTemplates)

  const clearAlert = (index: number) => {
    setAlerts((prev) => prev.filter((_, idx) => idx !== index))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🚨 Risk Alerts</h2>
      {alerts.length === 0 && <p className="text-gray-500">System green.</p>}
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div key={idx} className="border rounded-lg p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold">{alert.title}</p>
              <p className="text-xs uppercase text-gray-500">{alert.severity}</p>
            </div>
            <button className="text-sm text-indigo-600" onClick={() => clearAlert(idx)}>
              Acknowledge
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
