'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Royalty {
  id: string
  badgeName: string
  royaltyRate: number
  totalEarned: bigint
  pending: bigint
}

export default function BadgeRoyalties() {
  const [royalties, setRoyalties] = useState<Royalty[]>([])

  const claimRoyalties = (royaltyId: string) => {
    // Claim pending royalties
    console.log('Claiming royalties:', royaltyId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">💵 Royalties</h2>
      
      <div className="space-y-4">
        {royalties.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No royalties available</p>
        ) : (
          royalties.map((royalty) => (
            <div key={royalty.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{royalty.badgeName}</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-600">Rate</div>
                  <div className="text-lg font-bold">{royalty.royaltyRate}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Total Earned</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatEthAmount(royalty.totalEarned)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Pending</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatEthAmount(royalty.pending)}
                  </div>
                </div>
              </div>
              {royalty.pending > 0 && (
                <button
                  onClick={() => claimRoyalties(royalty.id)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Claim Royalties
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
