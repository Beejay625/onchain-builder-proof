'use client'

import { getTimeAgo } from '@/lib/utils'

interface TimelineEvent {
  id: string
  type: 'achievement' | 'milestone' | 'badge' | 'level'
  title: string
  description: string
  timestamp: number
}

interface AchievementTimelineProps {
  events: TimelineEvent[]
}

export default function AchievementTimeline({ events }: AchievementTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => b.timestamp - a.timestamp)

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🏆'
      case 'milestone': return '🎯'
      case 'badge': return '🏅'
      case 'level': return '⭐'
      default: return '📝'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Achievement Timeline</h2>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="space-y-6">
          {sortedEvents.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No timeline events yet</p>
          ) : (
            sortedEvents.map((event, index) => (
              <div key={event.id} className="relative flex gap-4">
                <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <span className="text-sm">{getEventIcon(event.type)}</span>
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <p className="text-xs text-gray-400">{getTimeAgo(event.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
