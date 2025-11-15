'use client'

import { useState } from 'react'

interface Template {
  id: string
  name: string
  category: string
  content: string
  usageCount: number
}

export default function AchievementTemplatesLibrary() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'development', 'design', 'learning', 'deployment', 'community']

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Template Library</h2>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">
            No templates available
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{template.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.content}</p>
              <div className="text-xs text-gray-500">
                Used {template.usageCount} times
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
