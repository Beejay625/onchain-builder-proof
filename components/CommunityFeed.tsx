'use client'

import { truncateAddress } from '@/lib/utils'

interface FeedItem {
  id: string
  type: 'achievement' | 'milestone' | 'badge'
  user: string
  content: string
  timestamp: number
}

export default function CommunityFeed() {
  const feedItems: FeedItem[] = []

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🏆'
      case 'milestone': return '🎯'
      case 'badge': return '🏅'
      default: return '⭐'
    }
  }

  const getActivityText = (item: FeedItem) => {
    switch (item.type) {
      case 'achievement':
        return 'minted a new achievement'
      case 'milestone':
        return 'reached a milestone'
      case 'badge':
        return 'unlocked a badge'
      default:
        return 'completed an action'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🌐 Community Feed
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {feedItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recent activity</p>
        ) : (
          feedItems.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex items-start gap-3"
            >
              <div className="text-2xl">{getActivityIcon(item.type)}</div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{truncateAddress(item.user)}</span>
                  {' '}{getActivityText(item)}
                </p>
                <p className="text-xs text-gray-600 mt-1">{item.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.timestamp * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
