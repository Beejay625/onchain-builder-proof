'use client'

import { useState } from 'react'

const channels = ['Mirror', 'Farcaster', 'Warpcast', 'X']

export default function OnchainAchievementSignalBoost() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleChannel = (channel: string) => {
    setSelected((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">📣 Signal Boost</h2>
      <p className="text-gray-600 mb-4">
        Plan simultaneous announcements across the ecosystems you care about.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {channels.map((channel) => (
          <button
            key={channel}
            onClick={() => toggleChannel(channel)}
            className={`border rounded-lg py-2 ${
              selected.includes(channel) ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
            }`}
          >
            {channel}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        {selected.length === 0
          ? 'Select a channel to start'
          : `Ready to broadcast to ${selected.join(', ')}.`}
      </p>
    </div>
  )
}
