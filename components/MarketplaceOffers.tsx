'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Offer {
  id: string
  buyer: string
  amount: bigint
  expiresAt: number
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
}

interface MarketplaceOffersProps {
  badgeTokenId: string
}

export default function MarketplaceOffers({ badgeTokenId }: MarketplaceOffersProps) {
  const [offers, setOffers] = useState<Offer[]>([])

  const acceptOffer = (offerId: string) => {
    setOffers(offers.map(o => 
      o.id === offerId ? { ...o, status: 'accepted' as const } : o
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Offers</h3>
      
      <div className="space-y-3">
        {offers.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No offers received</p>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold text-sm">{offer.buyer.slice(0, 10)}...</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatEthAmount(offer.amount)}
                  </div>
                </div>
                {offer.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptOffer(offer.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                      Reject
                    </button>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Expires: {new Date(offer.expiresAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
