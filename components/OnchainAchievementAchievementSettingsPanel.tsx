'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementSettingsPanel() {
  const [notifications, setNotifications] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings Panel</h2>
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="ml-4"
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Public Profile</span>
          <input
            type="checkbox"
            checked={publicProfile}
            onChange={(e) => setPublicProfile(e.target.checked)}
            className="ml-4"
          />
        </label>
      </div>
    </div>
  )
}

