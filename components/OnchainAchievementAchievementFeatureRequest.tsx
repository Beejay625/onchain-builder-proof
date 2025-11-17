'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementFeatureRequest() {
  const [feature, setFeature] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💡 Feature Request</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Describe your feature idea..."
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Submit Request
        </button>
      </div>
    </div>
  )
}

