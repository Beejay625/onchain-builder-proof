'use client'

import { useState } from 'react'

interface ComparisonData {
  achievement1: { id: string; likes: number; comments: number; timestamp: number }
  achievement2: { id: string; likes: number; comments: number; timestamp: number }
}

export default function AchievementComparison() {
  const [comparison, setComparison] = useState<ComparisonData | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Compare Achievements</h3>
      
      {comparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-sm font-semibold mb-3">Achievement #{comparison.achievement1.id}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Likes:</span>
                <span className="font-semibold">{comparison.achievement1.likes}</span>
              </div>
              <div className="flex justify-between">
                <span>Comments:</span>
                <span className="font-semibold">{comparison.achievement1.comments}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-sm font-semibold mb-3">Achievement #{comparison.achievement2.id}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Likes:</span>
                <span className="font-semibold">{comparison.achievement2.likes}</span>
              </div>
              <div className="flex justify-between">
                <span>Comments:</span>
                <span className="font-semibold">{comparison.achievement2.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Select achievements to compare</p>
      )}
    </div>
  )
}
