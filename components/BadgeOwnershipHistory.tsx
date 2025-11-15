'use client'

import { useState } from 'react'
import { truncateAddress, getTimeAgo } from '@/lib/utils'

interface OwnershipRecord {
  owner: string
  timestamp: number
  txHash: string
  event: 'mint' | 'transfer' | 'burn'
}

interface BadgeOwnershipHistoryProps {
  badgeTokenId: string
}

export default function BadgeOwnershipHistory({ badgeTokenId }: BadgeOwnershipHistoryProps) {
  const [ownershipHistory, setOwnershipHistory] = useState<OwnershipRecord[]>([])

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'mint': return '🎨'
      case 'transfer': return '🔄'
      case 'burn': return '🔥'
      default: return '📝'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Ownership History</h3>
      
      <div className="space-y-3">
        {ownershipHistory.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No ownership history available</p>
        ) : (
          ownershipHistory.map((record, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg flex items-center gap-3"
            >
              <span className="text-2xl">{getEventIcon(record.event)}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold capitalize">{record.event}</div>
                <div className="text-xs text-gray-600">
                  Owner: {truncateAddress(record.owner)}
                </div>
                <div className="text-xs text-gray-500">
                  {getTimeAgo(record.timestamp)}
                </div>
              </div>
              <a
                href={`https://basescan.org/tx/${record.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs"
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
