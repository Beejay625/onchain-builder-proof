'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Auction {
  id: string
  badgeName: string
  startingPrice: bigint
  currentBid: bigint
  endTime: number
  highestBidder: string
}

export default function BadgeAuction() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [bidAmount, setBidAmount] = useState('')

  const placeBid = (auctionId: string) => {
    // Place bid on auction
    console.log('Placing bid:', bidAmount)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔨 Auctions</h2>
      
      <div className="space-y-4">
        {auctions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No active auctions</p>
        ) : (
          auctions.map((auction) => (
            <div key={auction.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{auction.badgeName}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Current Bid</div>
                  <div className="text-xl font-bold text-blue-600">
                    {formatEthAmount(auction.currentBid)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Ends In</div>
                  <div className="text-xl font-bold">
                    {Math.floor((auction.endTime - Date.now()) / 1000 / 60)}m
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Bid amount"
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => placeBid(auction.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
