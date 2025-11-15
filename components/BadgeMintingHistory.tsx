'use client'

import { useState } from 'react'
import { getTimeAgo } from '@/lib/utils'

interface MintingRecord {
  id: string
  badgeName: string
  tokenId: string
  status: 'success' | 'failed' | 'pending'
  timestamp: number
  txHash?: string
}

export default function BadgeMintingHistory() {
  const [mintingHistory, setMintingHistory] = useState<MintingRecord[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'failed': return 'text-red-600'
      case 'pending': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📜 Minting History</h2>
      
      <div className="space-y-3">
        {mintingHistory.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No minting history</p>
        ) : (
          mintingHistory.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">{record.badgeName}</div>
                <div className="text-xs text-gray-500">
                  Token ID: {record.tokenId} • {getTimeAgo(record.timestamp)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
                {record.txHash && (
                  <a
                    href={`https://basescan.org/tx/${record.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs"
                  >
                    View TX
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
