'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementReportButton() {
  const [reason, setReason] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚨 Report Button</h2>
      <div className="space-y-4">
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select reason</option>
          <option value="spam">Spam</option>
          <option value="inappropriate">Inappropriate</option>
          <option value="other">Other</option>
        </select>
        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Report
        </button>
      </div>
    </div>
  )
}

