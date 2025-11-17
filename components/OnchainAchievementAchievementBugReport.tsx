'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementBugReport() {
  const [bug, setBug] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🐛 Bug Report</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Describe the bug..."
          value={bug}
          onChange={(e) => setBug(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Report Bug
        </button>
      </div>
    </div>
  )
}

