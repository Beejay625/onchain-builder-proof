'use client'

import { useState } from 'react'

interface AdvancedFilters {
  dateRange: { start: string; end: string }
  minLikes: number
  maxLikes: number
  minComments: number
  maxComments: number
  categories: string[]
  verifiedOnly: boolean
  hasBadges: boolean
}

export default function AchievementFiltersAdvanced() {
  const [filters, setFilters] = useState<AdvancedFilters>({
    dateRange: { start: '', end: '' },
    minLikes: 0,
    maxLikes: 1000,
    minComments: 0,
    maxComments: 100,
    categories: [],
    verifiedOnly: false,
    hasBadges: false,
  })

  const updateFilter = (key: keyof AdvancedFilters, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Advanced Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Likes Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={filters.minLikes}
              onChange={(e) => updateFilter('minLikes', parseInt(e.target.value) || 0)}
              placeholder="Min"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              value={filters.maxLikes}
              onChange={(e) => updateFilter('maxLikes', parseInt(e.target.value) || 1000)}
              placeholder="Max"
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
            />
            <span className="text-sm">Verified only</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.hasBadges}
              onChange={(e) => updateFilter('hasBadges', e.target.checked)}
            />
            <span className="text-sm">Has badges</span>
          </label>
        </div>
      </div>
    </div>
  )
}
