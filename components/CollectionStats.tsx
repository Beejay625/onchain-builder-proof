'use client'

import { useState } from 'react'

interface CollectionStatsProps {
  collectionId: string
}

export default function CollectionStats({ collectionId }: CollectionStatsProps) {
  const [stats, setStats] = useState({
    totalBadges: 0,
    uniqueOwners: 0,
    floorPrice: 0,
    totalVolume: 0,
    averagePrice: 0,
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Collection Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Total Badges</div>
          <div className="text-xl font-bold">{stats.totalBadges}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Owners</div>
          <div className="text-xl font-bold">{stats.uniqueOwners}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Floor Price</div>
          <div className="text-xl font-bold">{stats.floorPrice} ETH</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Total Volume</div>
          <div className="text-xl font-bold">{stats.totalVolume} ETH</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Avg Price</div>
          <div className="text-xl font-bold">{stats.averagePrice} ETH</div>
        </div>
      </div>
    </div>
  )
}
