'use client'

import { useState } from 'react'

interface Widget {
  id: string
  type: 'stats' | 'recent' | 'trending' | 'goals'
  title: string
  enabled: boolean
}

export default function AchievementWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: '1', type: 'stats', title: 'Statistics', enabled: true },
    { id: '2', type: 'recent', title: 'Recent Achievements', enabled: true },
    { id: '3', type: 'trending', title: 'Trending', enabled: false },
    { id: '4', type: 'goals', title: 'Goals', enabled: true },
  ])

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(w => 
      w.id === id ? { ...w, enabled: !w.enabled } : w
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🎛️ Widgets</h2>
      
      <div className="space-y-3">
        {widgets.map((widget) => (
          <div key={widget.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <div className="font-semibold text-sm">{widget.title}</div>
                <div className="text-xs text-gray-500 capitalize">{widget.type}</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={widget.enabled}
                onChange={() => toggleWidget(widget.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
