'use client'

import { useState } from 'react'

interface Escrow {
  id: string
  badgeName: string
  buyer: string
  seller: string
  amount: bigint
  status: 'pending' | 'completed' | 'cancelled'
}

export default function BadgeEscrow() {
  const [escrows, setEscrows] = useState<Escrow[]>([])

  const releaseEscrow = (escrowId: string) => {
    // Release escrow funds
    console.log('Releasing escrow:', escrowId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔒 Escrow</h2>
      
      <div className="space-y-4">
        {escrows.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No active escrows</p>
        ) : (
          escrows.map((escrow) => (
            <div key={escrow.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{escrow.badgeName}</h3>
              <div className="text-sm text-gray-600 mb-3">
                Buyer: {escrow.buyer.slice(0, 10)}... • Seller: {escrow.seller.slice(0, 10)}...
              </div>
              {escrow.status === 'pending' && (
                <button
                  onClick={() => releaseEscrow(escrow.id)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Release Escrow
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
