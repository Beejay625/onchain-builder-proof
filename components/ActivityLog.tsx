'use client'

import { useState } from 'react'
import { getTimeAgo } from '@/lib/utils'

interface Activity {
  id: string
  type: string
  description: string
  timestamp: number
  user?: string
}

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mint': return '🎨'
      case 'like': return '❤️'
      case 'comment': return '💬'
      case 'follow': return '👥'
      case 'tip': return '💰'
      default: return '⭐'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📋 Activity Log</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No activity recorded</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold capitalize mb-1">{activity.type}</div>
                <div className="text-xs text-gray-600">{activity.description}</div>
                <div className="text-xs text-gray-400 mt-1">{getTimeAgo(activity.timestamp)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
