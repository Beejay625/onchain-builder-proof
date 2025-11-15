'use client'

import { useState } from 'react'

interface FilterOptions {
  dateRange: 'all' | 'week' | 'month' | 'year'
  category: string
  minLikes: number
  minComments: number
  verifiedOnly: boolean
}

interface AchievementFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
}

export default function AchievementFilters({ onFilterChange }: AchievementFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    category: 'all',
    minLikes: 0,
    minComments: 0,
    verifiedOnly: false,
  })

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Advanced Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Minimum Likes</label>
          <input
            type="number"
            value={filters.minLikes}
            onChange={(e) => updateFilter('minLikes', parseInt(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Minimum Comments</label>
          <input
            type="number"
            value={filters.minComments}
            onChange={(e) => updateFilter('minComments', parseInt(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Verified achievements only</label>
        </div>

        <button
          onClick={() => {
            const resetFilters: FilterOptions = {
              dateRange: 'all',
              category: 'all',
              minLikes: 0,
              minComments: 0,
              verifiedOnly: false,
            }
            setFilters(resetFilters)
            onFilterChange(resetFilters)
          }}
          className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
