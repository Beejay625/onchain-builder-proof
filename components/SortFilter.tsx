'use client'

import { useState } from 'react'

interface SortFilterProps {
  onSortChange: (sortBy: string) => void
}

export default function SortFilter({ onSortChange }: SortFilterProps) {
  const [selectedSort, setSelectedSort] = useState('newest')

  const sortOptions = [
    { id: 'newest', label: 'Newest First', icon: '🆕' },
    { id: 'oldest', label: 'Oldest First', icon: '📅' },
    { id: 'most_liked', label: 'Most Liked', icon: '❤️' },
    { id: 'most_commented', label: 'Most Discussed', icon: '💬' },
  ]

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId)
    onSortChange(sortId)
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-semibold text-sm">Sort by:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSortChange(option.id)}
            className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
              selectedSort === option.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
