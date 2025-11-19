'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function OnchainAchievementNotifications() {
  const { address } = useAccount()
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New achievement minted', time: '2 hours ago', read: false },
    { id: 2, message: 'Someone liked your achievement', time: '5 hours ago', read: false },
    { id: 3, message: 'New comment on your achievement', time: '1 day ago', read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">🔔 Notifications</h3>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border ${
              notification.read 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <p className="text-sm font-medium text-gray-800">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
