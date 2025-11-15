'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface FractionalShare {
  id: string
  badgeName: string
  totalShares: number
  pricePerShare: bigint
  ownedShares: number
}

export default function BadgeFractionalization() {
  const [shares, setShares] = useState<FractionalShare[]>([])

  const buyShares = (shareId: string, amount: number) => {
    // Buy fractional shares
    console.log('Buying shares:', amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔢 Fractional Ownership</h2>
      
      <div className="space-y-4">
        {shares.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No fractionalized badges</p>
        ) : (
          shares.map((share) => (
            <div key={share.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{share.badgeName}</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-600">Total Shares</div>
                  <div className="text-lg font-bold">{share.totalShares}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Price/Share</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatEthAmount(share.pricePerShare)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">You Own</div>
                  <div className="text-lg font-bold text-green-600">{share.ownedShares}</div>
                </div>
              </div>
              <button
                onClick={() => buyShares(share.id, 1)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Buy Shares
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
