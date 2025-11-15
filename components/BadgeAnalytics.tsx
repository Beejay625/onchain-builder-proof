'use client'

import { useState } from 'react'

interface AnalyticsData {
  views: number
  likes: number
  shares: number
  priceHistory: { date: number; price: number }[]
}

export default function BadgeAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Badge Analytics</h3>
      
      {analytics ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-xs text-gray-600 mb-1">Views</div>
              <div className="text-xl font-bold text-blue-600">{analytics.views}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-xs text-gray-600 mb-1">Likes</div>
              <div className="text-xl font-bold text-green-600">{analytics.likes}</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <div className="text-xs text-gray-600 mb-1">Shares</div>
              <div className="text-xl font-bold text-purple-600">{analytics.shares}</div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No analytics data available</p>
      )}
    </div>
  )
}
