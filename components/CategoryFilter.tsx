'use client'

import { useState } from 'react'

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '📋' },
  { id: 'development', name: 'Development', icon: '💻' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'learning', name: 'Learning', icon: '📚' },
  { id: 'deployment', name: 'Deployment', icon: '🚀' },
  { id: 'community', name: 'Community', icon: '🤝' },
  { id: 'content', name: 'Content', icon: '✍️' },
  { id: 'other', name: 'Other', icon: '⭐' },
]

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategoryChange(categoryId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h3 className="font-semibold mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
