'use client'

import { useState } from 'react'
import { truncateAddress, getTimeAgo } from '@/lib/utils'

interface FeedItem {
  id: string
  type: 'achievement' | 'comment' | 'like' | 'badge'
  user: string
  content: string
  timestamp: number
  achievementId?: string
}

export default function OnchainFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'achievement': return '🏆'
      case 'comment': return '💬'
      case 'like': return '❤️'
      case 'badge': return '🏅'
      default: return '⭐'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📰 Onchain Feed</h2>
      
      <div className="space-y-4">
        {feedItems.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No activity yet</p>
        ) : (
          feedItems.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getItemIcon(item.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{truncateAddress(item.user)}</span>
                    <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{getTimeAgo(item.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
