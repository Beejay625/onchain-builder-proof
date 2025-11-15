'use client'

import { useState } from 'react'
import { truncateAddress } from '@/lib/utils'

interface LeaderboardEntry {
  rank: number
  address: string
  achievements: number
  likes: number
  reputation: number
}

export default function AchievementLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [timeframe, setTimeframe] = useState<'all' | 'week' | 'month'>('all')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏆 Leaderboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('all')}
            className={`px-3 py-1 rounded text-sm ${timeframe === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Time
          </button>
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 rounded text-sm ${timeframe === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 rounded text-sm ${timeframe === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No leaderboard data</p>
        ) : (
          leaderboard.map((entry) => (
            <div key={entry.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`text-xl font-bold ${
                  entry.rank <= 3 ? 'text-yellow-500' : 'text-gray-400'
                }`}>
                  #{entry.rank}
                </span>
                <div>
                  <div className="font-semibold text-sm">{truncateAddress(entry.address)}</div>
                  <div className="text-xs text-gray-500">
                    {entry.achievements} achievements • {entry.likes} likes
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{entry.reputation}</div>
                <div className="text-xs text-gray-500">reputation</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
