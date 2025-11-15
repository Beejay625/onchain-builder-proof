'use client'

import { useState } from 'react'

interface Insight {
  type: 'trend' | 'milestone' | 'engagement' | 'recommendation'
  title: string
  description: string
  value: string
}

export default function AchievementInsights() {
  const [insights, setInsights] = useState<Insight[]>([])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return '📈'
      case 'milestone': return '🎯'
      case 'engagement': return '💬'
      case 'recommendation': return '💡'
      default: return '⭐'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">💡 Insights</h2>
      
      <div className="space-y-4">
        {insights.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No insights available</p>
        ) : (
          insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="text-lg font-semibold text-blue-600">{insight.value}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
