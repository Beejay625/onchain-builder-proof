'use client'

import { useState } from 'react'
import { truncateAddress, getTimeAgo } from '@/lib/utils'

interface TransferEvent {
  id: string
  from: string
  to: string
  tokenId: string
  timestamp: number
  txHash: string
}

interface BadgeTransferHistoryProps {
  contractAddress: string
  tokenId: string
}

export default function BadgeTransferHistory({ contractAddress, tokenId }: BadgeTransferHistoryProps) {
  const [transfers, setTransfers] = useState<TransferEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadTransferHistory = async () => {
    setIsLoading(true)
    try {
      // Fetch transfer history from blockchain events
      // This would query Transfer events from the contract
    } catch (error) {
      console.error('Failed to load transfer history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">📜 Transfer History</h3>
        <button
          onClick={loadTransferHistory}
          disabled={isLoading}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:bg-gray-400"
        >
          {isLoading ? 'Loading...' : 'Load History'}
        </button>
      </div>

      <div className="space-y-3">
        {transfers.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transfer history available</p>
        ) : (
          transfers.map((transfer) => (
            <div
              key={transfer.id}
              className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-semibold">{truncateAddress(transfer.from)}</span>
                  <span className="mx-2">→</span>
                  <span className="font-semibold">{truncateAddress(transfer.to)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getTimeAgo(transfer.timestamp)}
                </div>
              </div>
              <a
                href={`https://basescan.org/tx/${transfer.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View TX
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
