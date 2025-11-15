'use client'

import { truncateAddress, getTimeAgo } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'mint' | 'like' | 'comment' | 'tip' | 'update'
  hash: string
  timestamp: number
  status: 'success' | 'pending' | 'failed'
}

export default function TransactionHistory() {
  const transactions: Transaction[] = []

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mint': return '⛓️'
      case 'like': return '❤️'
      case 'comment': return '💬'
      case 'tip': return '💰'
      case 'update': return '✏️'
      default: return '📝'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'pending': return 'text-yellow-600'
      case 'failed': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Transaction History</h2>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transactions yet</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(tx.type)}</span>
                <div>
                  <div className="font-semibold capitalize">{tx.type}</div>
                  <a
                    href={`https://basescan.org/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {truncateAddress(tx.hash)}
                  </a>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-semibold ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </div>
                <div className="text-xs text-gray-500">{getTimeAgo(tx.timestamp)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
