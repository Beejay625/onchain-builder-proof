'use client'

import { useState } from 'react'

const initialRoadmap = [
  { phase: 'Research', status: 'done' },
  { phase: 'MVP', status: 'in-progress' },
  { phase: 'Launch', status: 'pending' },
]

export default function OnchainAchievementRoadmapTracker() {
  const [roadmap] = useState(initialRoadmap)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🗺️ Roadmap Tracker</h2>
      <div className="space-y-3">
        {roadmap.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between border rounded-lg p-3">
            <p className="font-semibold">{item.phase}</p>
            <span className="text-sm uppercase text-gray-500">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
