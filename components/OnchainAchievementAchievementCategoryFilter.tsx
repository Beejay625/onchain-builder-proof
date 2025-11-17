'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementCategoryFilter() {
  const [category, setCategory] = useState('all')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏷️ Category Filter</h2>
      <div className="space-y-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="learning">Learning</option>
        </select>
        <p className="text-sm text-gray-500">
          Filter by category
        </p>
      </div>
    </div>
  )
}

