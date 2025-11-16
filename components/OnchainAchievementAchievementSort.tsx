'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementSort() {
  const [sortBy, setSortBy] = useState('newest')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Sort Options</h2>
      <div className="space-y-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="popular">Most popular</option>
          <option value="liked">Most liked</option>
        </select>
        <p className="text-sm text-gray-500">
          Sort achievements
        </p>
      </div>
    </div>
  )
}

