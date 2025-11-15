'use client'

import { useState } from 'react'
import { getTimeAgo } from '@/lib/utils'

interface HistoryEvent {
  id: string
  type: 'mint' | 'update' | 'like' | 'comment' | 'transfer'
  description: string
  timestamp: number
  txHash: string
}

export default function OnchainHistory() {
  const [history, setHistory] = useState<HistoryEvent[]>([])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'mint': return '🎨'
      case 'update': return '✏️'
      case 'like': return '❤️'
      case 'comment': return '💬'
      case 'transfer': return '🔄'
      default: return '📝'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📜 Onchain History</h2>
      
      <div className="space-y-3">
        {history.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No history available</p>
        ) : (
          history.map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{getEventIcon(event.type)}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold capitalize">{event.type}</div>
                <div className="text-xs text-gray-600">{event.description}</div>
                <div className="text-xs text-gray-400 mt-1">{getTimeAgo(event.timestamp)}</div>
              </div>
              <a
                href={`https://basescan.org/tx/${event.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs"
              >
                View TX
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
