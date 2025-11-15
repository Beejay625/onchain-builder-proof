'use client'

import { useState } from 'react'

interface Highlight {
  id: string
  achievementId: string
  title: string
  pinned: boolean
}

export default function AchievementHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  const togglePin = (id: string) => {
    setHighlights(highlights.map(h => 
      h.id === id ? { ...h, pinned: !h.pinned } : h
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">⭐ Highlights</h2>
      
      <div className="space-y-3">
        {highlights.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No highlights yet</p>
        ) : (
          highlights.map((highlight) => (
            <div key={highlight.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePin(highlight.id)}
                  className={`text-xl ${highlight.pinned ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  {highlight.pinned ? '⭐' : '☆'}
                </button>
                <div>
                  <div className="font-semibold text-sm">{highlight.title}</div>
                  <div className="text-xs text-gray-500">Achievement #{highlight.achievementId}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
