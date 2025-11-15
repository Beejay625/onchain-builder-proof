'use client'

import { useState } from 'react'
import { truncateAddress } from '@/lib/utils'

interface Builder {
  address: string
  achievements: number
  reputation: number
  rank: number
}

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week')
  const [topBuilders, setTopBuilders] = useState<Builder[]>([])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🏆 Builder Leaderboard
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 rounded ${timeframe === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 rounded ${timeframe === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeframe('all')}
            className={`px-3 py-1 rounded ${timeframe === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Time
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {topBuilders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No builders yet. Be the first!</p>
        ) : (
          topBuilders.map((builder) => (
            <div key={builder.address} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-bold ${builder.rank <= 3 ? 'text-yellow-500' : 'text-gray-400'}`}>
                  #{builder.rank}
                </span>
                <div>
                  <div className="font-semibold">{truncateAddress(builder.address)}</div>
                  <div className="text-sm text-gray-600">{builder.achievements} achievements</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{builder.reputation}</div>
                <div className="text-xs text-gray-500">reputation</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

