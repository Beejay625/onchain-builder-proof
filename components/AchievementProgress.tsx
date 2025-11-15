'use client'

import { useState } from 'react'

interface ProgressGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: number
}

export default function AchievementProgress() {
  const [goals, setGoals] = useState<ProgressGoal[]>([])

  const getProgress = (goal: ProgressGoal) => {
    return Math.min((goal.current / goal.target) * 100, 100)
  }

  const isOverdue = (deadline: number) => {
    return Date.now() > deadline && getProgress(goals.find(g => g.deadline === deadline) || goals[0]) < 100
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Progress Tracker</h2>
      
      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No progress goals set</p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{goal.name}</h3>
                {isOverdue(goal.deadline) && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    Overdue
                  </span>
                )}
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{goal.current} / {goal.target}</span>
                  <span>{Math.round(getProgress(goal))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getProgress(goal)}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
