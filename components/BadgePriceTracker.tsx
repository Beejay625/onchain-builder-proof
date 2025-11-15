'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface PriceData {
  current: bigint
  change24h: number
  change7d: number
  volume24h: bigint
}

interface BadgePriceTrackerProps {
  badgeContract: string
  tokenId: string
}

export default function BadgePriceTracker({ badgeContract, tokenId }: BadgePriceTrackerProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Price Tracker</h3>
      
      {priceData ? (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Current Price</div>
            <div className="text-3xl font-bold text-blue-600">
              {formatEthAmount(priceData.current)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">24h Change</div>
              <div className={`text-lg font-semibold ${
                priceData.change24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h}%
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">7d Change</div>
              <div className={`text-lg font-semibold ${
                priceData.change7d >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {priceData.change7d >= 0 ? '+' : ''}{priceData.change7d}%
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No price data available</p>
      )}
    </div>
  )
}
