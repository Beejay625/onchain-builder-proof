'use client'

import { useState } from 'react'

const starterTasks = [
  { title: 'Draft milestone recap', status: 'todo' },
  { title: 'Collect validator signatures', status: 'doing' },
]

export default function OnchainAchievementTaskBoard() {
  const [tasks] = useState(starterTasks)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Task Board</h2>
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div key={idx} className="border rounded-lg p-3 flex justify-between">
            <span>{task.title}</span>
            <span className="text-sm text-gray-500 uppercase">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
