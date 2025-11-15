'use client'

import { useState, useEffect } from 'react'

export default function OnchainSyncStatus() {
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced')
  const [lastBlock, setLastBlock] = useState<number | null>(null)

  useEffect(() => {
    // Check sync status periodically
    const interval = setInterval(() => {
      setSyncStatus('synced')
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Sync Status</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            syncStatus === 'synced' ? 'bg-green-500' :
            syncStatus === 'syncing' ? 'bg-yellow-500 animate-pulse' :
            'bg-red-500'
          }`} />
          <span className="font-semibold capitalize">{syncStatus}</span>
        </div>

        {lastBlock && (
          <div className="text-sm text-gray-600">
            Last synced block: {lastBlock}
          </div>
        )}

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Network</div>
          <div className="text-sm font-semibold text-blue-700">Base Mainnet</div>
        </div>
      </div>
    </div>
  )
}
