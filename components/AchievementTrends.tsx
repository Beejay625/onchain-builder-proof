'use client'

import { useState } from 'react'

interface Trend {
  category: string
  growth: number
  count: number
  trend: 'up' | 'down' | 'stable'
}

export default function AchievementTrends() {
  const [trends, setTrends] = useState<Trend[]>([])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
      default: return '📊'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Trends</h2>
      
      <div className="space-y-3">
        {trends.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No trend data available</p>
        ) : (
          trends.map((trend) => (
            <div key={trend.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTrendIcon(trend.trend)}</span>
                <div>
                  <div className="font-semibold text-sm capitalize">{trend.category}</div>
                  <div className="text-xs text-gray-500">{trend.count} achievements</div>
                </div>
              </div>
              <div className={`text-lg font-bold ${getTrendColor(trend.trend)}`}>
                {trend.growth > 0 ? '+' : ''}{trend.growth}%
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
