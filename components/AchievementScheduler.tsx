'use client'

import { useState } from 'react'

interface ScheduledAchievement {
  id: string
  content: string
  scheduledDate: number
  status: 'pending' | 'published'
}

export default function AchievementScheduler() {
  const [scheduled, setScheduled] = useState<ScheduledAchievement[]>([])

  const deleteScheduled = (id: string) => {
    setScheduled(scheduled.filter(s => s.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Schedule Achievements</h2>
      
      <div className="space-y-3">
        {scheduled.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No scheduled achievements</p>
        ) : (
          scheduled.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="text-sm font-semibold mb-1">{item.content.slice(0, 50)}...</div>
                <div className="text-xs text-gray-500">
                  Scheduled: {new Date(item.scheduledDate).toLocaleString()}
                </div>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {item.status}
                </span>
              </div>
              <button
                onClick={() => deleteScheduled(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
