'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementFilters() {
  const [filterType, setFilterType] = useState('all')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Achievement Filters</h2>
      <div className="space-y-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="recent">Recent</option>
          <option value="popular">Popular</option>
          <option value="verified">Verified</option>
        </select>
        <p className="text-sm text-gray-500">
          Filter achievements by type
        </p>
      </div>
    </div>
  )
}

