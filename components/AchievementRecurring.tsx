'use client'

import { useState } from 'react'

interface RecurringAchievement {
  id: string
  title: string
  frequency: 'daily' | 'weekly' | 'monthly'
  nextDue: number
  enabled: boolean
}

export default function AchievementRecurring() {
  const [recurring, setRecurring] = useState<RecurringAchievement[]>([])

  const toggleRecurring = (id: string) => {
    setRecurring(recurring.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔄 Recurring Achievements</h2>
      
      <div className="space-y-3">
        {recurring.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recurring achievements set</p>
        ) : (
          recurring.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">
                  {item.frequency} • Next: {new Date(item.nextDue).toLocaleDateString()}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={() => toggleRecurring(item.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
