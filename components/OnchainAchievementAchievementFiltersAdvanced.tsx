'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementFiltersAdvanced() {
  const [dateRange, setDateRange] = useState('all')
  const [minLikes, setMinLikes] = useState('0')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Advanced Filters</h2>
      <div className="space-y-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="all">All time</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
        <input
          type="number"
          placeholder="Min likes"
          value={minLikes}
          onChange={(e) => setMinLikes(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <p className="text-sm text-gray-500">
          Advanced filtering options
        </p>
      </div>
    </div>
  )
}

