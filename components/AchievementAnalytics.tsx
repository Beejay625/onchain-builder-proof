'use client'

import { useState } from 'react'

interface AnalyticsData {
  totalAchievements: number
  totalLikes: number
  totalComments: number
  averageEngagement: number
  topCategory: string
  growthRate: number
}

export default function AchievementAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📈 Achievement Analytics</h2>
      
      {analytics ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total Achievements</div>
            <div className="text-2xl font-bold text-blue-600">{analytics.totalAchievements}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total Likes</div>
            <div className="text-2xl font-bold text-green-600">{analytics.totalLikes}</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total Comments</div>
            <div className="text-2xl font-bold text-purple-600">{analytics.totalComments}</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Avg Engagement</div>
            <div className="text-2xl font-bold text-yellow-600">{analytics.averageEngagement}</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Top Category</div>
            <div className="text-2xl font-bold text-orange-600">{analytics.topCategory}</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Growth Rate</div>
            <div className="text-2xl font-bold text-red-600">+{analytics.growthRate}%</div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No analytics data available</p>
      )}
    </div>
  )
}
