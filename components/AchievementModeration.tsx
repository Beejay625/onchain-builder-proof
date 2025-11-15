'use client'

import { useState } from 'react'

interface ModerationAction {
  id: string
  type: 'approve' | 'reject' | 'flag'
  achievementId: string
  reason?: string
}

export default function AchievementModeration() {
  const [pendingItems, setPendingItems] = useState<any[]>([])

  const moderateItem = (itemId: string, action: 'approve' | 'reject') => {
    // Moderate achievement
    setPendingItems(pendingItems.filter(item => item.id !== itemId))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">⚖️ Moderation</h2>
      
      <div className="space-y-4">
        {pendingItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No items pending moderation</p>
        ) : (
          pendingItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-semibold mb-2">{item.content}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => moderateItem(item.id, 'approve')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => moderateItem(item.id, 'reject')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
