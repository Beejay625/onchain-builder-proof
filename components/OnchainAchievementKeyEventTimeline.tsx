'use client'

import { useState } from 'react'

const defaultEvents = [
  { label: 'Idea locked', date: '2025-01-02' },
  { label: 'Contract deployed', date: '2025-01-17' },
]

export default function OnchainAchievementKeyEventTimeline() {
  const [events] = useState(defaultEvents)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🕒 Key Event Timeline</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="font-semibold">{event.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
