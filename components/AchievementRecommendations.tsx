'use client'

import { useState } from 'react'

interface Recommendation {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function AchievementRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">💡 Recommended Achievements</h2>
      
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recommendations yet</p>
        ) : (
          recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{rec.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(rec.difficulty)}`}>
                  {rec.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {rec.category}
                </span>
                <button className="ml-auto px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Start
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
