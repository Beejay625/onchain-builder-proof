'use client'

import { truncateAddress, getTimeAgo } from '@/lib/utils'

interface TrendingAchievement {
  id: string
  content: string
  author: string
  likes: number
  comments: number
  timestamp: number
}

export default function TrendingAchievements() {
  const trendingAchievements: TrendingAchievement[] = []

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🔥 Trending Achievements
        </h2>
        <span className="text-sm text-gray-500">Last 24h</span>
      </div>

      <div className="space-y-3">
        {trendingAchievements.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No trending achievements yet</p>
        ) : (
          trendingAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    #{index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">{achievement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{truncateAddress(achievement.author)}</span>
                    <span>❤️ {achievement.likes}</span>
                    <span>💬 {achievement.comments}</span>
                    <span>{getTimeAgo(achievement.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
