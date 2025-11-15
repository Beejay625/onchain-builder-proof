'use client'

import { useState } from 'react'

export default function SyncStatus() {
  const [isSynced, setIsSynced] = useState(true)
  const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now())

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Sync Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isSynced ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
            <span className="font-semibold">{isSynced ? 'Synced' : 'Syncing...'}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Last sync: {new Date(lastSyncTime).toLocaleString()}
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Blockchain Status</div>
          <div className="text-sm font-semibold text-blue-700">Connected to Base</div>
        </div>
      </div>
    </div>
  )
}
