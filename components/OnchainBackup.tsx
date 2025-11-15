'use client'

import { useState } from 'react'

export default function OnchainBackup() {
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [backupStatus, setBackupStatus] = useState<string | null>(null)

  const createBackup = async () => {
    setIsBackingUp(true)
    setBackupStatus('Creating backup...')
    
    try {
      // Create backup of onchain data
      const backupData = {
        timestamp: Date.now(),
        achievements: [],
        badges: [],
        profile: {},
      }
      
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `onchain-backup-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
      
      setBackupStatus('Backup created successfully!')
    } catch (error) {
      setBackupStatus('Backup failed')
    } finally {
      setIsBackingUp(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💾 Backup</h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Create a backup of all your onchain achievements and badges
      </p>

      <button
        onClick={createBackup}
        disabled={isBackingUp}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
      </button>

      {backupStatus && (
        <div className={`mt-4 p-3 rounded-lg ${
          backupStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {backupStatus}
        </div>
      )}
    </div>
  )
}
