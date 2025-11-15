'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface LendingOffer {
  id: string
  badgeName: string
  dailyRate: bigint
  duration: number
  lender: string
}

export default function BadgeLending() {
  const [offers, setOffers] = useState<LendingOffer[]>([])

  const borrowBadge = (offerId: string) => {
    // Borrow badge from lender
    console.log('Borrowing badge:', offerId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📚 Badge Lending</h2>
      
      <div className="space-y-4">
        {offers.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No lending offers available</p>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{offer.badgeName}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Daily Rate</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatEthAmount(offer.dailyRate)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="text-lg font-bold">{offer.duration} days</div>
                </div>
              </div>
              <button
                onClick={() => borrowBadge(offer.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Borrow Badge
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
