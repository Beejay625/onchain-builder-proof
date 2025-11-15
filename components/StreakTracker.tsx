'use client'

import { useState, useEffect } from 'react'

interface StreakTrackerProps {
  address?: string
}

export default function StreakTracker({ address }: StreakTrackerProps) {
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [weeklyGoal, setWeeklyGoal] = useState(3)

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        🔥 Build Streak
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600">{longestStreak}</div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{weeklyGoal}</div>
          <div className="text-sm text-gray-600">Weekly Goal</div>
        </div>
      </div>
    </div>
  )
}

