'use client'

import { useState } from 'react'

interface BadgeStatsProps {
  badgeId: string
}

export default function BadgeStats({ badgeId }: BadgeStatsProps) {
  const [stats, setStats] = useState({
    totalSupply: 1000,
    holders: 750,
    transfers: 250,
    floorPrice: 0.01,
    volume: 5.5,
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Badge Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Total Supply</div>
          <div className="text-xl font-bold">{stats.totalSupply}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Holders</div>
          <div className="text-xl font-bold">{stats.holders}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Transfers</div>
          <div className="text-xl font-bold">{stats.transfers}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Floor Price</div>
          <div className="text-xl font-bold">{stats.floorPrice} ETH</div>
        </div>
      </div>
    </div>
  )
}
