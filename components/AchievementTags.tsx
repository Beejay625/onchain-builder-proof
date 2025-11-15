'use client'

import { useState } from 'react'

interface AchievementTagsProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  editable?: boolean
}

export default function AchievementTags({ tags, onTagsChange, editable = false }: AchievementTagsProps) {
  const [newTag, setNewTag] = useState('')

  const addTag = () => {
    if (!newTag.trim() || tags.includes(newTag.trim())) return
    onTagsChange([...tags, newTag.trim()])
    setNewTag('')
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const commonTags = ['development', 'design', 'learning', 'deployment', 'community', 'open-source']

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏷️ Tags</h3>
      
      {editable && (
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add tag..."
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <button
                key={tag}
                onClick={() => !tags.includes(tag) && onTagsChange([...tags, tag])}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <p className="text-gray-500 text-sm">No tags yet</p>
        ) : (
          tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              {editable && (
                <button
                  onClick={() => removeTag(tag)}
                  className="text-blue-700 hover:text-blue-900"
                >
                  ×
                </button>
              )}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
