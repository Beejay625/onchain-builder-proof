'use client'

import { useState } from 'react'

interface MintingQueueItem {
  id: string
  badgeName: string
  status: 'pending' | 'minting' | 'completed' | 'failed'
  timestamp: number
}

export default function BadgeMintingQueue() {
  const [queue, setQueue] = useState<MintingQueueItem[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'minting': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">⏳ Minting Queue</h2>
      
      <div className="space-y-3">
        {queue.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No badges in queue</p>
        ) : (
          queue.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-semibold mb-1">{item.badgeName}</div>
                <div className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
