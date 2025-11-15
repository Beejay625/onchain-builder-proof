'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface MarketplaceListing {
  id: string
  badgeName: string
  collection: string
  price: bigint
  seller: string
  image: string
}

export default function BadgeMarketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛒 Badge Marketplace</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          List Badge
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {listings.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500 py-12">
            <p className="text-lg mb-2">No badges listed</p>
            <p className="text-sm">List your badges for sale</p>
          </div>
        ) : (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                {listing.image ? (
                  <img src={listing.image} alt={listing.badgeName} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-4xl">🏅</span>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{listing.badgeName}</h3>
              <p className="text-xs text-gray-500 mb-2">{listing.collection}</p>
              <div className="text-lg font-bold text-blue-600 mb-3">
                {formatEthAmount(listing.price)}
              </div>
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
