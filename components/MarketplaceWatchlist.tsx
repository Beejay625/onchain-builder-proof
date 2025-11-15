'use client'

import { useState } from 'react'

interface WatchlistItem {
  id: string
  badgeName: string
  currentPrice: number
  targetPrice: number
  image: string
}

export default function MarketplaceWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">⭐ Watchlist</h2>
      
      <div className="space-y-3">
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No items in watchlist</p>
        ) : (
          watchlist.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.badgeName} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-xl">🏅</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{item.badgeName}</div>
                <div className="text-xs text-gray-600">
                  Current: {item.currentPrice} ETH • Target: {item.targetPrice} ETH
                </div>
              </div>
              <button
                onClick={() => removeFromWatchlist(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
