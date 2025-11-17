'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementPrivacyControls() {
  const [privacyLevel, setPrivacyLevel] = useState('public')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Privacy Controls</h2>
      <div className="space-y-4">
        <select
          value={privacyLevel}
          onChange={(e) => setPrivacyLevel(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
        <p className="text-sm text-gray-500">
          Control who can see your achievements
        </p>
      </div>
    </div>
  )
}

