'use client'

import { calculateReputation, getAchievementLevel } from '@/lib/utils'

interface BuilderStatsProps {
  achievements: number
  likes: number
  comments: number
  followers: number
  following: number
}

export default function BuilderStats({
  achievements,
  likes,
  comments,
  followers,
  following
}: BuilderStatsProps) {
  const reputation = calculateReputation(achievements, likes, comments)
  const { level, color } = getAchievementLevel(achievements)

  const stats = [
    { label: 'Achievements', value: achievements, icon: '🏆' },
    { label: 'Likes', value: likes, icon: '❤️' },
    { label: 'Comments', value: comments, icon: '💬' },
    { label: 'Followers', value: followers, icon: '👥' },
    { label: 'Following', value: following, icon: '👤' },
  ]

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📊 Builder Stats</h2>
        <div className={`px-4 py-2 rounded-full bg-${color}-100 text-${color}-700 font-bold`}>
          {level}
        </div>
      </div>

      <div className="mb-4 p-4 bg-white rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">{reputation}</div>
          <div className="text-sm text-gray-600">Reputation Score</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
