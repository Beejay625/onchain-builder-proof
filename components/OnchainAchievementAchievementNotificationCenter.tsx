'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementNotificationCenter() {
  const [notifications] = useState([
    { id: 1, message: 'New achievement unlocked', time: '2m ago' },
    { id: 2, message: 'Someone liked your post', time: '5m ago' },
  ])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔔 Notification Center</h2>
      <div className="space-y-2">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">{notif.message}</p>
            <p className="text-xs text-gray-500">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

