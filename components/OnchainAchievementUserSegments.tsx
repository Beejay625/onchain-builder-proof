'use client'

import { useState } from 'react'

const segmentData = [
  { label: 'Protocol devs', percent: 45 },
  { label: 'Community managers', percent: 30 },
  { label: 'Researchers', percent: 25 },
]

export default function OnchainAchievementUserSegments() {
  const [segments] = useState(segmentData)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">👥 User Segments</h2>
      <div className="space-y-3">
        {segments.map((segment, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm">
              <span>{segment.label}</span>
              <span>{segment.percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${segment.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
