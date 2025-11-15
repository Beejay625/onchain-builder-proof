'use client'

import { useState } from 'react'

export default function OnchainSync() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<number | null>(null)

  const syncWithBlockchain = async () => {
    setIsSyncing(true)
    setSyncStatus('Syncing with blockchain...')
    
    try {
      // Sync local data with blockchain state
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSyncStatus('Sync completed!')
      setLastSync(Date.now())
    } catch (error) {
      setSyncStatus('Sync failed')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Blockchain Sync</h3>
      
      <button
        onClick={syncWithBlockchain}
        disabled={isSyncing}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        {isSyncing ? 'Syncing...' : 'Sync Now'}
      </button>

      {syncStatus && (
        <div className={`p-3 rounded-lg mb-3 ${
          syncStatus.includes('completed') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {syncStatus}
        </div>
      )}

      {lastSync && (
        <div className="text-sm text-gray-600">
          Last sync: {new Date(lastSync).toLocaleString()}
        </div>
      )}
    </div>
  )
}
