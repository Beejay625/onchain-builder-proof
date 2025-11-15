'use client'

import { useState } from 'react'

interface Streak {
  id: string
  type: 'daily' | 'weekly' | 'monthly'
  currentStreak: number
  longestStreak: number
  lastActivity: number
}

export default function AchievementStreaks() {
  const [streaks, setStreaks] = useState<Streak[]>([])

  const getStreakStatus = (streak: Streak) => {
    const daysSinceLastActivity = Math.floor((Date.now() - streak.lastActivity) / (1000 * 60 * 60 * 24))
    if (daysSinceLastActivity === 0) return 'active'
    if (daysSinceLastActivity === 1) return 'warning'
    return 'broken'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔥 Streaks</h2>
      
      <div className="space-y-4">
        {streaks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No streaks active</p>
        ) : (
          streaks.map((streak) => {
            const status = getStreakStatus(streak)
            return (
              <div key={streak.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold capitalize">{streak.type} Streak</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    status === 'active' ? 'bg-green-100 text-green-700' :
                    status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600">Current</div>
                    <div className="text-xl font-bold text-orange-600">{streak.currentStreak}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Longest</div>
                    <div className="text-xl font-bold text-red-600">{streak.longestStreak}</div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
