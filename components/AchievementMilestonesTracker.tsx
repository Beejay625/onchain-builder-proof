'use client'

import { useState } from 'react'

interface Milestone {
  id: string
  name: string
  target: number
  current: number
  reward: string
  completed: boolean
}

export default function AchievementMilestonesTracker() {
  const [milestones, setMilestones] = useState<Milestone[]>([])

  const getProgress = (milestone: Milestone) => {
    return Math.min((milestone.current / milestone.target) * 100, 100)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🎯 Milestones Tracker</h2>
      
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No milestones set</p>
        ) : (
          milestones.map((milestone) => (
            <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{milestone.name}</h3>
                {milestone.completed && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    ✓ Completed
                  </span>
                )}
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{milestone.current} / {milestone.target}</span>
                  <span>{Math.round(getProgress(milestone))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getProgress(milestone)}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Reward: {milestone.reward}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
