'use client'

import { useState } from 'react'

interface SwapOffer {
  id: string
  yourBadge: string
  theirBadge: string
  status: 'pending' | 'accepted' | 'rejected'
}

export default function BadgeSwap() {
  const [swaps, setSwaps] = useState<SwapOffer[]>([])

  const acceptSwap = (swapId: string) => {
    setSwaps(swaps.map(s => 
      s.id === swapId ? { ...s, status: 'accepted' as const } : s
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔄 Badge Swaps</h2>
      
      <div className="space-y-4">
        {swaps.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No swap offers</p>
        ) : (
          swaps.map((swap) => (
            <div key={swap.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-center flex-1">
                  <div className="text-sm font-semibold">{swap.yourBadge}</div>
                  <div className="text-xs text-gray-500">Your Badge</div>
                </div>
                <div className="text-2xl mx-4">⇄</div>
                <div className="text-center flex-1">
                  <div className="text-sm font-semibold">{swap.theirBadge}</div>
                  <div className="text-xs text-gray-500">Their Badge</div>
                </div>
              </div>
              {swap.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => acceptSwap(swap.id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
