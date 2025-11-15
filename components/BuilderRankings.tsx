'use client'

import { useState } from 'react'
import { truncateAddress } from '@/lib/utils'

interface BuilderRank {
  rank: number
  address: string
  achievements: number
  reputation: number
  totalValue: number
}

export default function BuilderRankings() {
  const [rankings, setRankings] = useState<BuilderRank[]>([])
  const [sortBy, setSortBy] = useState<'achievements' | 'reputation' | 'value'>('achievements')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏆 Builder Rankings</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="achievements">By Achievements</option>
          <option value="reputation">By Reputation</option>
          <option value="value">By Value</option>
        </select>
      </div>
      <div className="space-y-2">
        {rankings.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No rankings available</p>
        ) : (
          rankings.map((builder) => (
            <div key={builder.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`text-xl font-bold ${
                  builder.rank <= 3 ? 'text-yellow-500' : 'text-gray-400'
                }`}>
                  #{builder.rank}
                </span>
                <div>
                  <div className="font-semibold text-sm">{truncateAddress(builder.address)}</div>
                  <div className="text-xs text-gray-500">
                    {builder.achievements} achievements
                  </div>
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
