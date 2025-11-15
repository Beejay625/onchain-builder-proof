'use client'

import { useState } from 'react'
import { getTimeAgo } from '@/lib/utils'
import { formatEthAmount } from '@/lib/utils'

interface HistoryItem {
  id: string
  type: 'purchase' | 'sale' | 'offer' | 'listing'
  badgeName: string
  price: bigint
  timestamp: number
  txHash: string
}

export default function MarketplaceHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase': return '🛒'
      case 'sale': return '💰'
      case 'offer': return '📝'
      case 'listing': return '📋'
      default: return '📝'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📜 Marketplace History</h2>
      
      <div className="space-y-3">
        {history.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No marketplace history</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">{getTypeIcon(item.type)}</span>
                <div>
                  <div className="font-semibold text-sm capitalize">{item.type}</div>
                  <div className="text-xs text-gray-600">{item.badgeName}</div>
                  <div className="text-xs text-gray-400">{getTimeAgo(item.timestamp)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">{formatEthAmount(item.price)}</div>
                <a
                  href={`https://basescan.org/tx/${item.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View TX
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
